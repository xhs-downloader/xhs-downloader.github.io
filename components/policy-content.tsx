"use client";

import { useTranslation } from "@/lib/language-context";

function PolicyEn() {
  return (
    <>
      <div className="section">
        <h2 className="section-title">Privacy Policy</h2>
        <p>
          At Xiaohongshu Downloader, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you
          visit our website and use our services.
        </p>
      </div>

      <div className="section">
        <h2 className="section-title">Information We Collect</h2>
        <ol>
          <li>
            This website will not collect your personal information. The user&apos;s
            personal information is not used in this site and not provide user information
            to third parties.
          </li>
          <li>
            This website uses Google Analytics as an analysis tool, and Google Analytics
            has the possibility of automatically acquiring user information. Please refer to
            the privacy policy of Google Analytics for information acquired, the purpose of
            use, and the provision to the third party.
          </li>
        </ol>
      </div>

      <div className="section">
        <h2 className="section-title">Cookies and Tracking Technologies</h2>
        <p>We are not using Cookies and similar tracking technologies on the website.</p>
      </div>

      <div className="section">
        <h2 className="section-title">Copyright Policy</h2>
        <p>
          Xiaohongshu Downloader respects the intellectual property rights of others and
          expects users of the service to do the same.
        </p>
        <h3>DMCA Notices</h3>
        <ol>
          <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright</li>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material that is claimed to be infringing</li>
          <li>Information reasonably sufficient to permit us to contact you</li>
          <li>A statement of good faith belief that use is not authorized</li>
          <li>A statement that the information in the notification is accurate</li>
        </ol>
        <h3>User Responsibility</h3>
        <p>
          Users are responsible for ensuring they have the right to download content from
          Xiaohongshu. Our service is intended for personal use only.
        </p>
      </div>
    </>
  );
}

const zh = {
  title: "隐私政策",
  intro: "小红书下载器非常重视您的隐私。本隐私政策说明了当您访问我们的网站并使用我们的服务时，我们如何收集、使用、披露和保护您的信息。",
  collectTitle: "我们收集的信息",
  collect1: "本网站不会收集您的个人信息，用户的个人信息不会在本站使用，也不会向第三方提供用户信息。",
  collect2: "本网站使用 Google Analytics 作为分析工具，Google Analytics 有可能自动获取用户信息。关于所获取的信息、使用目的及向第三方提供的情况，请参阅 Google Analytics 的隐私政策。",
  cookieTitle: "Cookie 与追踪技术",
  cookieText: "本网站不使用 Cookie 及类似的追踪技术。",
  copyrightTitle: "版权政策",
  copyrightText: "小红书下载器尊重他人的知识产权，并期望服务用户同样如此。对于符合适用法律的版权侵权通知，我们将予以回应。",
  dmcaTitle: "DMCA 通知",
  dmcaIntro: "如果您认为您的受版权保护作品以构成版权侵权的方式被复制，并可通过我们的服务访问，请提供以下信息与我们联系：",
  dmca1: "版权所有者或其授权人的实体或电子签名",
  dmca2: "被声称受到侵权的受版权保护作品的说明",
  dmca3: "被声称侵权的材料的说明及其在服务中的位置",
  dmca4: "足以让我们与您联系的信息，如地址、电话号码和电子邮件地址",
  dmca5: "声明您有充分理由相信，被投诉使用方式未经版权所有者、其代理人或法律授权",
  dmca6: "声明通知中的信息准确无误，并在伪证处罚的约束下，您有权代表版权所有者行事",
  userTitle: "用户责任",
  userText: "用户有责任确保自己有权从小红书下载内容。我们的服务仅供个人使用，用户不得在未获原创作者适当授权的情况下将下载内容用于商业目的。",
};

function PolicyZh() {
  return (
    <>
      <div className="section">
        <h2 className="section-title">{zh.title}</h2>
        <p>{zh.intro}</p>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.collectTitle}</h2>
        <ol>
          <li>{zh.collect1}</li>
          <li>{zh.collect2}</li>
        </ol>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.cookieTitle}</h2>
        <p>{zh.cookieText}</p>
      </div>
      <div className="section">
        <h2 className="section-title">{zh.copyrightTitle}</h2>
        <p>{zh.copyrightText}</p>
        <h3>{zh.dmcaTitle}</h3>
        <p>{zh.dmcaIntro}</p>
        <ol>
          <li>{zh.dmca1}</li>
          <li>{zh.dmca2}</li>
          <li>{zh.dmca3}</li>
          <li>{zh.dmca4}</li>
          <li>{zh.dmca5}</li>
          <li>{zh.dmca6}</li>
        </ol>
        <h3>{zh.userTitle}</h3>
        <p>{zh.userText}</p>
      </div>
    </>
  );
}

export default function PolicyContent() {
  const { lang } = useTranslation();
  return lang === "zh" ? <PolicyZh /> : <PolicyEn />;
}
