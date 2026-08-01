"use client";

import { useTranslation } from "@/lib/language-context";

const tools = [
  {
    key: "1",
    href: "https://chrome-tool.github.io/",
    image: "/assets/images/chrome-tool.png",
  },
  {
    key: "2",
    href: "https://mdtool.eu.org/",
    image: "/assets/images/markdown.png",
  },
  {
    key: "3",
    href: "https://wallpapers-collection.github.io/bing-wallpaper",
    image: "/assets/images/bing-wallpaper.png",
  },
  {
    key: "4",
    href: "https://pixel-wallpaper.github.io/",
    image: "/assets/images/pixel-wallpaper.png",
  },
  {
    key: "5",
    href: "https://tiktok-download.github.io/",
    image: "/assets/images/tiktok-download.png",
  },
  {
    key: "6",
    href: "https://html-online-game.github.io/",
    image: "/assets/images/html-online-game.png",
  },
];

export default function ToolsSection() {
  const { t } = useTranslation();

  return (
    <section className="home-section tools-section" id="tools">
      <div>
        <div className="home-section-title">
          <h2>{t("tools-title")}</h2>
          <p>{t("tools-description")}</p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <div key={tool.key} className="tool-card">
              <a href={tool.href} target="_blank" rel="noopener noreferrer">
                <div className="tool-icon">
                  <img src={tool.image} alt={t(`tool-${tool.key}-title`)} />
                </div>
                <h3>{t(`tool-${tool.key}-title`)}</h3>
                <p>{t(`tool-${tool.key}-description`)}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
