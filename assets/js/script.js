document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".download").addEventListener("click", download);
});
async function download(e) {
  e.preventDefault();
  let url = document.querySelector("#url").value;
  if (url) {
    try {
      setLoading(true);
      const keyHex =
        "d2f1e4c8a4b9e7f0d4c8b3a2f4e4d8c9b6a5f4e2d6c1b1a9f8e7d5c5b4a3d2e1";
      const timestamp = Math.floor(Date.now() / 1000);
      const s = `s3$vF!${timestamp.toString(16)}www.v2ob.com#6dKq^`;
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(keyHex),
        {
          name: "HMAC",
          hash: { name: "SHA-256" },
        },
        false,
        ["sign"]
      );
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(s)
      );
      // ArrayBuffer → Base64
      function arrayBufferToBase64(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append(
        "Authorization",
        `timestamp=${timestamp},token=${arrayBufferToBase64(signature)}`
      );
      const response = await fetch(`https://www.v2ob.com/api?url=${url}`, {
        headers: headers,
        method: "POST",
      });
      const res = await response.json();
      if (res.code === 200 && res.data) {
        await doDownload(res.data);
      } else {
        showToast("error", "Url anlalysis failed!");
      }
    } catch (error) {
      console.error(error);
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  } else {
    showToast("warning", "Please enter a video url!");
  }
}

async function doDownload(data) {
  // download the video with blob
  const title = data.title;
  const zip = new JSZip();
  if (!data.imsges) {
    const videoUrl = data.url;
    const coverUrl = data.cover;
    if (videoUrl) {
      await zipVideos(zip, title, videoUrl, coverUrl);
    }
  } else {
    const picsUrl = data.imsges;
    if (picsUrl?.length > 0) {
      await zipImages(zip, title, picsUrl);
    }
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveBlob(zipBlob, `${title}.zip`);
}

async function zipImages(zip, title, images) {
  for (let i = 0; i < images.length; i++) {
    let url = images[i];
    try {
      const res = await fetch(url.replace("http://", "https://"));
      const blob = await res.blob();

      zip.file(`${title}_${i + 1}.jpg`, blob, { binary: true });
    } catch (e) {
      console.log("Error fetching image:", e);
      showToast("error", "Error fetching image:" + e.getMessage());
    }
  }
}
async function zipVideos(zip, title, videoUrl, coverUrl) {
  try {
    const videoRes = await fetch(videoUrl.replace("http://", "https://"));
    const videoblob = await videoRes.blob();

    const coverRes = await fetch(coverUrl.replace("http://", "https://"));
    const coverblob = await coverRes.blob();
    zip.file(`${title}.mp4`, videoblob, { binary: true });
    zip.file(`${title}.jpg`, coverblob, { binary: true });
  } catch (e) {
    console.log("Error fetching video:", e);
    showToast("error", "Error fetching video:" + e.getMessage());
  }
}

function saveBlob(blob, name = null) {
  if (window.navigator.msSaveBlob) {
    if (name) window.navigator.msSaveBlob(blob, name);
    else window.navigator.msSaveBlob(blob);
  } else {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    if (name) a.download = name;
    a.style.display = "none";
    a.click();
  }
}

function showToast(type, message, duration = 3000) {
  let container = document.querySelector("#toast-container");
  if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container");
    container.classList.add("top-center");
    container.setAttribute("role", "alert");
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "true");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toastId = `toast-${guid()}`;
  const toast = document.createElement("div");
  toast.id = toastId;
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");
  let iconSvg = "";
  switch (type) {
    case "success":
      iconSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>';
      break;
    case "error":
      iconSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
      break;
    case "warning":
      iconSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
      break;
    case "info":
      iconSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
      break;
  }

  toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close toast" onclick="removeToast('${toastId}')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
  container.appendChild(toast);
  setTimeout(() => {
    removeToast(toastId);
  }, duration);
  return toastId;
}

function removeToast(id) {
  const toast = document.getElementById(id);
  if (!toast) return;
  toast.classList.add("toast-removing");
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

function guid() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function setLoading(isLoading) {
  const spinner = document.querySelector(".spinner");
  const downloadBtn = document.querySelector(".download");
  const buttonText = downloadBtn.querySelector("span");
  const buttonIcon = downloadBtn.querySelector("svg");
  if (isLoading) {
    spinner.style.display = "inline-block";
    buttonText.textContent = "Downloading...";
    buttonIcon.style.display = "none";
    downloadBtn.disabled = true;
  } else {
    spinner.style.display = "none";
    buttonText.textContent = "Download";
    buttonIcon.style.display = "inline";
    downloadBtn.disabled = false;
  }
}

// =================================================================================================
