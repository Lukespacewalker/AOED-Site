import * as React from "react";
import * as PropTypes from "prop-types";
import Img from "gatsby-image";
import Header from "./header/header";
import style from "./banner.module.scss";

import cstyle from "./carousal.module.scss";
import back_icon from "@images/ui/left-arrow.svg";
import next_icon from "@images/ui/right-arrow.svg";

import { StaticQuery, graphql } from "gatsby";
import loop from "../videos/loop.mp4";

class Carousal extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
    }


    state = {
        index: 0
    }

    prev() {
        const purpose = this.state.index - 1;
        this.setState({ index: purpose });
    }

    next() {
        const purpose = this.state.index + 1;
        this.setState({ index: purpose });
    }

    render() {
        return (
            <div className={cstyle.container}>
                <div className={cstyle.rootCarousal}>
                    {this.props.children}
                </div>
                <div className={cstyle.back} onClick={this.prev}>
                    <img src={back_icon} />
                </div>
                <div className={cstyle.next} onClick={this.next}>
                    <img src={next_icon} />
                </div>
            </div>
        );
    }
}

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
        const { siteTitle, siteSubtitle, siteShortTitle } = this.props;
        return (<StaticQuery
            query={query}
            render={data => (<div className={style.bannerContainer}>
                <Carousal>
                    <div className={cstyle.item}>
                        <video src={loop} autoPlay={true} muted={true} loop={true} style={{
                            height: `100%`,
                            width: `100%`,
                            objectFit: "cover",
                        }}></video>
                        <div className={style.bannerText}>
                            <h1>{siteTitle}</h1>
                            <h2 lang="en" style={{ fontSize: `2rem` }}>{siteSubtitle}</h2>
                        </div>
                    </div>
                    <div className={cstyle.item}>
                        <Img fluid={data.file.childImageSharp.fluid} alt="background" style={{ height: `100%` }} />
                        <div className={style.specialBannerText}>
                            <div>
                                <h1>ธ สถิตในดวงใจนิจนิรันดร์</h1>
                                <h2>ข้าพระพุทธเจ้า </h2>
                                <h2>สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย</h2>
                            </div>
                        </div>
                    </div>
                </Carousal>
                <div className={style.gradient} />
                <Header siteTitle={siteShortTitle} isFrontPage={true} />
            </div>)} />);
    }
}


/*
   

 
 */

export default Banner;

const query = graphql`
    query{
    file(relativePath: { eq: "king.jpg" }) {
              childImageSharp {
                # Specify the image processing specifications right in the query.
                fluid(quality: 90, maxWidth: 4096) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
        }
    }
`;
