import * as React from "react";
import * as PropTypes from "prop-types";
import Img from "gatsby-image";
import Header from "@components/header";
import Carousal from "@components/carousal";

import style from "./banner.module.scss";
import cstyle from "@components/carousal/carousal.module.scss";

import { StaticQuery, graphql } from "gatsby";

class Banner extends React.Component<
  { siteTitle: string; siteSubtitle: string; siteShortTitle: string },
  {}
> {
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
    if (typeof window !== "undefined" && /Edge/.test(navigator.userAgent)) {
      videoClassName = cstyle.edgevideo;
    }

    const { siteTitle, siteSubtitle, siteShortTitle } = this.props;
    return (
      <StaticQuery
        query={query}
        render={data => {
          const {
            file: {
              childImageSharp: { fluid: banner }
            },
            banner2:{
              childImageSharp: { fluid: banner2 }
            },
            banner3:{
              childImageSharp: { fluid: banner3 }
            }
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
                  <div className={style.bannerText}>
                    <h1
                      lang="en"
                      style={{ fontSize: `2.5rem`, fontWeight: `lighter` }}
                    >
                      A physician with an enthusiasm in{" "}
                      <span style={{ fontWeight: `normal` }}>
                        photography, coding, gaming
                      </span>
                    </h1>
                  </div>
                  <div className={style.bannerSource}>
                    <b>Jigokudani, Noboribetsu</b><br/>
                    2018 © Suttisak
                  </div>
                </div>
                <div className={cstyle.item}>
                  <Img
                    imgStyle={{ objectPosition: "center top" }}
                    style={{ height: `100%` }}
                    fluid={banner2}
                  />
                  <div className={style.bannerSource}>
                    <b>Hokkaido Museum, Sapporo</b><br/>
                    2018 © Suttisak
                  </div>
                </div>
                <div className={cstyle.item}>
                  <Img
                    imgStyle={{ objectPosition: "center top" }}
                    style={{ height: `100%` }}
                    fluid={banner3}
                  />
                  <div className={style.bannerSource}>
                    <b>A View from Sapporo TV tower, Sapporo</b><br/>
                    2018 © Suttisak
                  </div>
                </div>
              </Carousal>
              <div className={style.gradient} />
              <Header siteTitle={siteShortTitle} isFrontPage={true} />
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
    file(relativePath: { eq: "splash/main.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4096) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    banner2: file(relativePath: { eq: "banner/2018_hokkaido_historicalmuseum.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4096) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    banner3: file(relativePath: { eq: "banner/2018-Mar-16-09-47-04-_DSC9517.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 4096) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
