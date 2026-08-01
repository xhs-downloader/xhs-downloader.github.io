export function sanitizeFileName(name: string): string {
  return (name || "xhs_video")
    .replace(/[\\/:*?"<>|]/g, "_")
    .replace(/\s+/g, " ")
    .trim();
}

export function removeTrailingPostId(name: string): string {
  const normalized = sanitizeFileName(name);
  return normalized
    .replace(/([_-]?postid[_-]?\d{6,})$/i, "")
    .replace(/([_-]\d{8,})$/, "")
    .replace(/[_-\s]+$/, "")
    .trim();
}

interface VideoFormat {
  url?: string;
  ext?: string;
  fps?: number | string;
  filesize?: number | string;
}

export function pickBestVideoFormat(formats: VideoFormat[]) {
  if (!Array.isArray(formats)) {
    return null;
  }

  const videoFormats = formats.filter((f) => {
    const ext = (f?.ext || "").toLowerCase();
    return !!f?.url && (ext === "mp4" || ext === "mov" || ext === "m4v");
  });

  if (!videoFormats.length) {
    return null;
  }

  videoFormats.sort((a, b) => {
    const aSigned = String(a?.url || "").includes("sign=") ? 1 : 0;
    const bSigned = String(b?.url || "").includes("sign=") ? 1 : 0;
    const fa = Number(a?.fps || 0);
    const fb = Number(b?.fps || 0);
    const sa = Number(a?.filesize || 0);
    const sb = Number(b?.filesize || 0);
    if (bSigned !== aSigned) return bSigned - aSigned;
    if (fb !== fa) return fb - fa;
    return sb - sa;
  });

  return videoFormats[0];
}

interface ImageData {
  images?: string[];
  image_list?: string[];
  image_urls?: string[];
  pics?: string[];
  photo_list?: string[];
  photos?: string[];
  url?: string;
  src?: string;
  image?: string;
  origin?: string;
  original?: string;
  large?: string;
  download_url?: string;
}

export function extractImageUrls(data: ImageData): string[] {
  const candidates = [
    data?.images,
    data?.image_list,
    data?.image_urls,
    data?.pics,
    data?.photo_list,
    data?.photos,
  ];

  const urls: string[] = [];

  const pushUrl = (value: any) => {
    if (typeof value === "string" && value.trim()) {
      urls.push(value.trim());
      return;
    }
    if (value && typeof value === "object") {
      const maybeUrl =
        value.url ||
        value.src ||
        value.image ||
        value.origin ||
        value.original ||
        value.large ||
        value.download_url;
      if (typeof maybeUrl === "string" && maybeUrl.trim()) {
        urls.push(maybeUrl.trim());
      }
    }
  };

  candidates.forEach((entry) => {
    if (Array.isArray(entry)) {
      entry.forEach(pushUrl);
    } else {
      pushUrl(entry);
    }
  });

  const unique: string[] = [];
  const seen = new Set<string>();
  urls.forEach((u) => {
    const key = u.replace("http://", "https://");
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(key);
    }
  });

  return unique;
}
