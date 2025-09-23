import * as React from "react";
import yt_icon from "@images/ui/youtube_icon.png";
import fb_icon from "@images/ui/fb_icon.png";

export const Footer: React.FunctionComponent = (props) => {
  return (
    <footer className="bg-gray-100 mt-3">
      <div className="max-w-8xl mx-auto flex flex-wrap gap-6 px-6 py-3">
        <div className="flex-1">
          <div>สามารถติดตาม สมาคม ได้ผ่านช่องทางเหล่านี้</div>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%81%E0%B8%A7%E0%B8%94%E0%B8%A5%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2-270832269657665">
              <img src={fb_icon} className="h-12" /></a>
            <a href="https://www.youtube.com/channel/UCvsRQbojFgwimZw9K82aw1A/">
              <img src={yt_icon} className="h-12" /></a>
          </div>
        </div>
        <div className="flex-1">
          © Anno Domini 2019 - {new Date().getFullYear()} สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย <br />
          Design + Coding by{" "}
          <a href="https://lukespacewalker.github.io">
            นพ. สุทธิศักดิ์ เด่นดวงใจ
          </a>
          <br /> Made with <a href="https://www.gatsbyjs.org/">Gatsby</a> + <a href="https://tailwindcss.com/">Tailwind CSS</a>
          | Developed with{" "}
          <a href="https://visualstudio.microsoft.com/">Visual Studio Code Insider</a>
        </div>
      </div>
    </footer>
  );
};