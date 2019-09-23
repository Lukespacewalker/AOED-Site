import * as React from "react";
import style from "./footer.module.scss";

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

                <div className={style.author}> © {new Date().getFullYear()} สงวนลิขสิทธิ์ สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย
                    <br /> สร้างสรรค์โดย <a href="https://lukespacewalker.github.io">{author}</a>
                    <br /> Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a> and <a href="https://www.netlify.com/">Netlify</a>
                </div>
            </footer>
        );
    }
}
export default Footer;

/*
 *         <div className={style.supporter}>
        <a href="https://www.facebook.com/sahakornratchaburi/"><img src={logo1}/></a>
        <a href="https://www.facebook.com/%E0%B8%AA%E0%B8%B3%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%98%E0%B8%B2%E0%B8%A3%E0%B8%93%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%88%E0%B8%B1%E0%B8%87%E0%B8%AB%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-222389184454020/"> Facebook สำนักงานสาธารณสุขจังหวัด</a>
        </div>
        */