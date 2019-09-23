import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";

import Header from "./header/header";
import style from "./banner.module.scss";
import { StaticQuery, graphql } from "gatsby";
import loop from "../videos/loop.mp4";

const Banner = ({ siteTitle, siteSubtitle, siteShortTitle }) => {
    return (
        <StaticQuery
            query={query}
            render={data => (<div className={style.bannerContainer}>
                <div style={{ backgroundColor:`rgb(40, 40, 40)` , height: "100vh", width:`100%`, minHeight: "100%", position: "absolute" }}></div>
                <video src={loop} autoplay="true" muted="true" loop="true" style={{ height: "100vh", minHeight: "100%", position: "absolute"}} ></video>
                <div className={style.gradient}/>
                <Header siteTitle={siteShortTitle} />
                <div className={style.bannerText}> 
                    <h1>{siteTitle}</h1>
                    <h2 lang="en" style={{ fontSize: `2rem` }}>Thailand Association of Occupational and Environmental Medicine</h2>
                </div>
            </div>)}
        />);
};
/*  <Img fluid={data.file.childImageSharp.fluid} alt="background" style={{ height: "100vh", minHeight: "600px", position: "absolute", width: "100%" }} />*/

Banner.propTypes = {
    siteSubtitle: PropTypes.string,
    siteTitle: PropTypes.string
};

Banner.defaultProps = {
    siteTitle: ``,
    siteSubtitle: ``
};

export default Banner;

const query = graphql`
    query{
    file(relativePath: { eq: "splash/5.jpg" }) {
              childImageSharp {
                # Specify the image processing specifications right in the query.
                fluid(quality: 90, maxWidth: 4096) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
        }
    }
`;
