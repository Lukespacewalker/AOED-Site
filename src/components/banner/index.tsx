import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Carousal from "@components/carousal";

import { bannerContainer, bannerText, darken } from "./banner.module.scss";
import { item, video } from "@components/carousal/carousal.module.scss";

import { useStaticQuery, StaticQuery, graphql } from "gatsby";

const Banner: React.FC = () => {
  const data = useStaticQuery(query);
  const {
    file: {
      childImageSharp: { gatsbyImageData: banner },
    },
  } = data;

  return (
    <div className={bannerContainer}>
      <Carousal>
        <div className={item}>
          <GatsbyImage
            alt="Banner Image"
            imgStyle={{ objectPosition: "center center" }}
            style={{ height: `100%` }}
            image={banner}
          />
          <div className={bannerText}>
            สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย
          </div>
        </div>
      </Carousal>
      <div className={darken}></div>
    </div>
  );
};

export default Banner;

const query = graphql`
  query {
    file(relativePath: { eq: "splash.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;
