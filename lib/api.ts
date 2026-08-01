const API_BASE =
  typeof window !== "undefined"
    ? window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
      ? "http://127.0.0.1/:3000"
      : "https://xhs-download-api.onrender.com"
    : "https://xhs-download-api.onrender.com";

export async function getVideoInfo(url: string) {
  const qs = new URLSearchParams({ url });
  const response = await fetch(`${API_BASE}/get_info?${qs.toString()}`, {
    method: "GET",
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.technical_error || result?.error || "URL analysis failed");
  }
  if (!result?.data) {
    throw new Error("Media info missing");
  }
  return result;
}

export async function fetchBlobViaApiDownload(rawUrl: string) {
  const qs = new URLSearchParams({ url: rawUrl });
  const response = await fetch(`${API_BASE}/download?${qs.toString()}`, {
    method: "GET",
  });
  if (!response.ok) {
    let message = `Download failed (${response.status})`;
    try {
      const payload = await response.json();
      message = payload?.error || message;
    } catch {
      // Keep default message for non-JSON responses.
    }
    throw new Error(message);
  }
  return response.blob();
}
