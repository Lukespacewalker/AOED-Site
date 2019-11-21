import * as React from "react";
import * as PropTypes from "prop-types";
import Img from "gatsby-image";
import Header from "@components/header";
import Carousal from "@components/carousal"

import style from "./banner.module.scss";
import cstyle from "@components/carousal/carousal.module.scss";

import { StaticQuery, graphql } from "gatsby";
import loop from "@videos/loop.mp4";



class Banner extends React.Component<{ siteTitle: string, siteSubtitle: string, siteShortTitle: string }, {}> {
    public static propTypes = {
        siteSubtitle: PropTypes.string,
        siteTitle: PropTypes.string
    };

    public static defaultProps = {
        siteTitle: ``,
        siteSubtitle: ``
    };

    constructor(props) {
        super(props);
    }

    render() {
        let videoClassName = cstyle.video;
        if (typeof window !== 'undefined' && /Edge/.test(navigator.userAgent)) {
            videoClassName = cstyle.edgevideo;
        }

        const { siteTitle, siteSubtitle, siteShortTitle } = this.props;
        return (<StaticQuery
            query={query}
            render={data => (<div className={style.bannerContainer}>
                <Carousal>
                    <div className={cstyle.item}>
                        <Img imgStyle={{objectPosition:"center top"}} style={{height:`100%`}} fluid={data.file.childImageSharp.fluid} />
                        <div className={style.bannerDisplay }>
                        <iframe style={{height:`100%`,width:`100%`}} src="https://www.youtube.com/embed/fgXcl2t4qgk" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className={style.bannerText}>
                            <h1 lang="en">iOccHealth Channel</h1>
                            <h2 style={{ fontSize: `2rem` }}>นำเสนอความรู้ดีๆ เกี่ยวกับอาชีวเวชศาสตร์</h2>
                        </div>
                    </div>
                    <div className={cstyle.item}>
                        <video className={videoClassName} src={loop} autoPlay={true} muted={true} loop={true}></video>
                        <div className={style.bannerText}>
                            <h1>{siteTitle}</h1>
                            <h2 lang="en" style={{ fontSize: `2rem` }}>{siteSubtitle}</h2>
                        </div>
                    </div>
                </Carousal>
                <div className={style.gradient} />
                <Header siteTitle={siteShortTitle} isFrontPage={true} />
            </div>)} />);
    }
}

export default Banner;

const query = graphql`
    query{
    file(relativePath: { eq: "splash.jpg" }) {
              childImageSharp {
                # Specify the image processing specifications right in the query.
                fluid(quality: 90, maxWidth: 4096) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
        }
    }
`;
