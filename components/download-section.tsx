"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { useTranslation } from "@/lib/language-context";
import { getVideoInfo, fetchBlobViaApiDownload } from "@/lib/api";
import {
  pickBestVideoFormat,
  extractImageUrls,
  removeTrailingPostId,
} from "@/lib/download-utils";

type ToastType = "success" | "error" | "warning" | "info";

export default function DownloadSection() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");

  const showToast = (type: ToastType, message: string) => {
    setToastType(type);
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const saveBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const doDownload = async (data: any) => {
    const title = removeTrailingPostId(data?.title) || "xhs_video";
    const zip = new JSZip();
    let hasMedia = false;

    const bestVideo = pickBestVideoFormat(data?.formats || []);
    if (bestVideo?.url) {
      const videoBlob = await fetchBlobViaApiDownload(bestVideo.url);
      zip.file(`${title}.mp4`, videoBlob, { binary: true });
      hasMedia = true;
    }

    const imageUrls = extractImageUrls(data);
    for (let i = 0; i < imageUrls.length; i++) {
      try {
        const imageBlob = await fetchBlobViaApiDownload(imageUrls[i]);
        zip.file(`${title}${i + 1}.jpg`, imageBlob, { binary: true });
        hasMedia = true;
      } catch (e) {
        console.log("Skip image:", e);
      }
    }

    if (bestVideo?.url && data?.thumbnail && imageUrls.length === 0) {
      try {
        const coverBlob = await fetchBlobViaApiDownload(data.thumbnail);
        zip.file(`${title}1.jpg`, coverBlob, { binary: true });
      } catch (e) {
        console.log("Skip cover image:", e);
      }
    }

    if (!hasMedia) {
      throw new Error("No downloadable media found");
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveBlob(zipBlob, `${title}.zip`);
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = inputRef.current?.value?.trim();
    if (!url) {
      showToast("warning", "Please input a video url!");
      return;
    }

    try {
      setIsLoading(true);
      const infoRes = await getVideoInfo(url);
      await doDownload(infoRes.data);
      showToast("success", "Download completed");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error: any) {
      console.error(error);
      showToast("error", error?.message || "Download failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="home-section" id="download">
      <div>
        <div className="home-section-title">
          <h2>{t("hero-title")}</h2>
          <div className="download-box">
            <form className="url-input" onSubmit={handleDownload}>
              <input
                ref={inputRef}
                type="text"
                placeholder={t("url-input")}
                disabled={isLoading}
              />
              <button type="submit" className="download" disabled={isLoading}>
                {isLoading && <div className="spinner"></div>}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>{t("download-button")}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className={`toast toast-${toastType}`}>{toastMessage}</div>
      )}
    </section>
  );
}
