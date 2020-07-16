import * as React from "react";
import * as PropTypes from "prop-types";
import Img from "gatsby-image";
import Header from "@components/header";
import Carousal from "@components/carousal";

import style from "./banner.module.scss";
import cstyle from "@components/carousal/carousal.module.scss";

import { StaticQuery, graphql } from "gatsby";

class Banner extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    let videoClassName = cstyle.video;
    if (typeof window !== "undefined" && /Edge/.test(navigator.userAgent)) {
      videoClassName = cstyle.edgevideo;
    }
    return (
      <StaticQuery
        query={query}
        render={(data) => {
          const {
            file: {
              childImageSharp: { fluid: banner },
            },
          } = data;
          return (
            <div className={style.bannerContainer}>
              <Carousal>
                <div className={cstyle.item}>
                  <Img
                    imgStyle={{ objectPosition: "center top" }}
                    style={{ height: `100%` }}
                    fluid={banner}
                  />
                  <div className={style.bannerText}></div>
                </div>
              </Carousal>
            </div>
          );
        }}
      />
    );
  }
}

export default Banner;

const query = graphql`
  query {
    file(relativePath: { eq: "splash.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 2048)  {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
