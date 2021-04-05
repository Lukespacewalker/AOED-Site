import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import {intro,introText,introImage} from "./intro.module.scss";
import scrollTo from "@components/scroller";

// Assets
import yt_icon from "@images/ui/youtube_icon.png";
import fb_icon from "@images/ui/fb_icon.png";
import email_icon from "@images/ui/outlook.png";

const query = graphql`
  query {
    authorimage: file(relativePath: { eq: "author.jpg" }) {
      childImageSharp {gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

const Intro: React.FunctionComponent = (props) => {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const {
          authorimage: {
            childImageSharp: { gatsbyImageData: authorFluidImage },
          },
        } = data;
        return (
          <div className={"two-asymmetrical-grid " + intro}>
            <div className={introText}>
              <h1>Hi ! ผมชื่อ สุทธิศักดิ์</h1>
              <p>จบแพทย์จุฬาลงกรณ์มหาวิทยาลัย รุ่น 66</p>
              <p>
                <b>ปัจจุบัน</b> ศึกษาต่อ แพทย์เฉพาะทางสาขาเวชศาสตร์ป้องกันแขนง
                <b>อาชีวเวชศาสตร์</b> ปี 2 <br /> และปริญญาโท
                สาขาการวิจัยและการจัดการด้านสุขภาพ
                ภาควิชาเวชศาสตร์ป้องกันและสังคม จุฬาลงกรณ์มหาวิทยาลัย
              </p>
              <h2>
                ชื่นชอบ{" "}
                <a href="#photography" onClick={scrollTo}>
                  📸 การถ่ายภาพ
                </a>{" "}
                และการท่องเที่ยว
              </h2>
              <h3>
                <a href="#project" onClick={scrollTo}>
                  💻 พัฒนาโปรแกรมและเว็บไซต์
                </a>
              </h3>
              <h3>
                <a href="#blogs" onClick={scrollTo}>
                 ✍ Blogs เกี่ยวกับการเรียนและคอมพิวเตอร์
                </a>
              </h3>
              <h3>
                <a href="#youtube" onClick={scrollTo}>
                 <img src={yt_icon} style={{width:"40px"}}/> คุย Com กับหมอต้น
                </a>
              </h3>
              <h4>สามารถ <a href="#footer" onClick={scrollTo}>
              ติดตามผมได้ที่
                </a></h4>

            </div>
            <GatsbyImage
              className={introImage}
              image={authorFluidImage}
              alt="author"
            />
          </div>
        );
      }}
    />
  );
};
/*
              <a href="https://www.facebook.com/lukespacewalker">
                <img src={fb_icon} className={style.icon} />
              </a>
              <a href="#youtube" onClick={scrollToA}>
                <img src={yt_icon} className={style.icon} />
              </a>
              <a href="https://mailhide.io/e/qJTML">
                <img src={email_icon} className={style.icon} />
              </a>
              */

export default Intro;
