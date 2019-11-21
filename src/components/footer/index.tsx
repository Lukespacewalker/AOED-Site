import * as React from "react";
import style from "./footer.module.scss";
import yt_icon from "@images/ui/youtube_icon.png";
import fb_icon from "@images/ui/fb_icon.png";

class Footer extends React.Component<{ dark: boolean, author: string }, {}> {
    public static defaultProps = {
        dark: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { dark, author } = this.props;
        return (
            <footer className={(dark ? style.dark : ``)}>
                <div className={style.right}>
                    <div>สามารถติดตาม สมาคม ได้ผ่านช่องทางเหล่านี้</div>
                    <a href="https://www.facebook.com/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%81%E0%B8%A7%E0%B8%94%E0%B8%A5%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2-270832269657665">
                        <img src={fb_icon} className={style.icon} /></a>
                    <a href="https://www.youtube.com/channel/UCvsRQbojFgwimZw9K82aw1A/">
                        <img src={yt_icon} className={style.icon} /></a>
                </div>
                <div className={style.left}> © {new Date().getFullYear()} สงวนลิขสิทธิ์ สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย
                    <br /> สร้างสรรค์โดย <a href="https://lukespacewalker.github.io">{author}</a>
                    <br /> Made with <a href="https://www.gatsbyjs.org/">Gatsby</a> Developed with <a href="https://visualstudio.microsoft.com/">Visual Studio 2019</a>
                    <br /> CI/CD and Hosting by <a href="https://app.netlify.com/sites/aoed/deploys"><img style={{ verticalAlign: `text-top` }} src="https://api.netlify.com/api/v1/badges/9b9b26c3-6609-4db6-b771-53c2a995256f/deploy-status" /></a>
                </div>
            </footer>
        );
    }
}
export default Footer;