document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".download").addEventListener("click", download);
});
async function download(e) {
  e.preventDefault();
  let url = document.querySelector("#url").value;
  if (url) {
    try {
      setLoading(true);
      const headers = new Headers();
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      headers.append("token", "f59cf1bd4164841f974a24bd753e42da");
      headers.append("version", "1.0.0");
      headers.append("time", String(new Date().getUTCSeconds));
      const response = await fetch(
        "https://shuiyinla.com/getVideo?agent=shuiyinla.com",
        {
          headers: headers,
          method: "POST",
          body: "url=" + url,
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );
      const res = await response.json();
      if (response.status === 200 && res.msg !== "解析失败，请重新解析！") {
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
  const videoTitle = data.video_desc;
  const videoUrl = data.video_path;
  const coversUrl = data.video_image_path;
  const zip = new JSZip();
  if (videoUrl) {
    await zipVideos(zip, videoUrl);
  }
  if (coversUrl.length > 0) {
    await zipImages(zip, coversUrl);
  }
  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveBlob(zipBlob, `${videoTitle}.zip`);
}

async function zipImages(zip, images) {
  for (let i = 0; i < images.length; i++) {
    let url = images[i];
    try {
      const res = await fetch(url.replace("http://", "https://"));
      const blob = await res.blob();

      zip.file(`image_${i + 1}.jpg`, blob, { binary: true });
    } catch (e) {
      console.log("Error fetching image:", e);
      showToast("error", "Error fetching image:" + e.getMessage());
    }
  }
}
async function zipVideos(zip, videoUrl) {
  try {
    const res = await fetch(videoUrl.replace("http://", "https://"));
    const blob = await res.blob();
    zip.file(`video.mp4`, blob, { binary: true });
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
