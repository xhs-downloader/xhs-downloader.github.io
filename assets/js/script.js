document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".download").addEventListener("click", downloadVideo);
  document.querySelector(".close").addEventListener("click", () => {
    const errorMessage = document.querySelector(".modal");
    errorMessage.style.display = "none";
  });
});
async function downloadVideo(e) {
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
        const videoTitle = res.data.video_desc;
        const videoUrl = res.data.video_path;
        await doDownloadVideo(videoUrl, videoTitle);
      } else {
        showErrorMessage("Url anlalysis failed!");
      }
    } catch (error) {
      console.error(error);
      showErrorMessage("An error occurred while downloading the video");
    } finally {
      setLoading(false);
    }
  } else {
    showErrorMessage("Please enter a video url!");
  }
}

async function doDownloadVideo(url, fileName) {
  // download the video with blob
  const reponse = await fetch(url);
  const blob = await reponse.blob();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.target = "_blank";
  link.download = fileName + ".mp4";
  link.click();
}

function showErrorMessage(message) {
  const errorMessage = document.querySelector(".modal");
  const errorText = document.querySelector("#errorText");
  errorText.textContent = message;
  errorMessage.style.display = "block";
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
