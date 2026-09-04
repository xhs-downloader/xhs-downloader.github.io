const API_BASE =
  typeof window !== "undefined"
    ? window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
      ? "http://127.0.0.1:3000"
      : "https://xhs-download-api.onrender.com"
    : "https://xhs-download-api.onrender.com";

const API_BK = "https://xhs-download-api-ly6p.onrender.com";
const API_BASES = [API_BASE, API_BK];

function getApiUrl(baseUrl: string, path: string, query: URLSearchParams) {
  return `${baseUrl.replace(/\/$/, "")}${path}?${query.toString()}`;
}

async function fetchWithFallback(path: string, query: URLSearchParams) {
  let lastResponse: Response | undefined;
  let lastError: unknown;

  for (const baseUrl of API_BASES) {
    try {
      const response = await fetch(getApiUrl(baseUrl, path, query), {
        method: "GET",
      });

      if (response.ok) {
        return response;
      }

      lastResponse = response;
    } catch (error) {
      lastError = error;
    }
  }

  if (lastResponse) {
    return lastResponse;
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("API request failed");
}

export async function getVideoInfo(url: string) {
  const qs = new URLSearchParams({ url });
  const response = await fetchWithFallback("/get_info", qs);
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
  const response = await fetchWithFallback("/download", qs);
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
