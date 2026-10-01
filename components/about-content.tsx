"use client";

import { useTranslation } from "@/lib/language-context";

function AboutEn() {
  return (
    <>
      <h1 className="page-title">About Xiaohongshu Downloader</h1>

      <div className="section">
        <h2 className="section-title">Our Mission</h2>
        <p>
          Xiaohongshu Downloader was created to help users save and archive
          their favorite content from the Xiaohongshu (Red Book) platform. Our
          mission is to provide a simple, fast, and reliable tool for
          downloading videos for personal use.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">How It Works</h2>
        <p>
          Our downloader works by extracting the media files from Xiaohongshu
          posts. Simply copy the URL of the post you want to download, paste it
          into our downloader, and click the download button. Our system will
          process the request and provide you with the downloadable content.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Features</h2>
        <ul className="features">
          <li>Fast and reliable downloads</li>
          <li>Support for videos</li>
          <li>No watermarks on downloaded content</li>
          <li>No registration required</li>
          <li>Simple and user-friendly interface</li>
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Legal Notice</h2>
        <p>
          Xiaohongshu Downloader is intended for personal use only. We respect
          copyright laws and the rights of content creators. Please ensure you
          have the right to download and use the content. Do not use downloaded
          content for commercial purposes without proper authorization from the
          original creator.
        </p>
        <p>
          Our service is not affiliated with, endorsed by, or sponsored by
          Xiaohongshu (Red Book) or its parent company.
        </p>
      </div>
    </>
  );
}

const zh = {
  title: "关于小红书下载器",
  s1Title: "我们的使命",
  s1Text:
    "小红书下载器致力于帮助用户保存和归档小红书（红书）平台上的喜爱内容。我们的目标是提供一个简单、快速、可靠的工具，供用户个人使用时下载视频。",
  s2Title: "使用方式",
  s2Text:
    "我们的下载器通过提取小红书帖子中的媒体文件来工作。只需复制您想下载的帖子链接，粘贴到下载器中，点击下载按钮，系统将处理请求并为您提供可下载的内容。",
  s3Title: "功能特点",
  s3li1: "快速稳定的下载",
  s3li2: "支持视频下载",
  s3li3: "下载内容无水印",
  s3li4: "无需注册账号",
  s3li5: "界面简洁，操作便捷",
  s4Title: "法律声明",
  s4Text1:
    "小红书下载器仅供个人使用。我们尊重版权法律及内容创作者的权益。请确保您有权下载和使用相关内容。未经原创作者适当授权，请勿将下载内容用于商业目的。",
  s4Text2:
    "本服务与小红书（红书）及其母公司没有任何关联，也未获得其认可或赞助。",
};

function AboutZh() {
  return (
    <>
      <h1 className="page-title">{zh.title}</h1>
      <div className="section">
        <h2 className="section-title">{zh.s1Title}</h2>
        <p>{zh.s1Text}</p>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.s2Title}</h2>
        <p>{zh.s2Text}</p>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.s3Title}</h2>
        <ul className="features">
          <li>{zh.s3li1}</li>
          <li>{zh.s3li2}</li>
          <li>{zh.s3li3}</li>
          <li>{zh.s3li4}</li>
          <li>{zh.s3li5}</li>
        </ul>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.s4Title}</h2>
        <p>{zh.s4Text1}</p>
        <p>{zh.s4Text2}</p>
      </div>
    </>
  );
}

export default function AboutContent() {
  const { lang } = useTranslation();
  return lang === "zh" ? <AboutZh /> : <AboutEn />;
}
