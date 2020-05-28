import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import Header from "@components/header";
import Footer from "@components/footer";
import style from "./layout.module.scss";

interface ILayoutProps {
  data: any;
  title: string;
  type: string;
  date: string;
  customImage: FluidObject;
  bigSplash: boolean;
  children: any;
}

class Layout extends React.Component<ILayoutProps, {}> {
  public static defaultProps = {
    customImage: null,
    bigSplash: true,
    by: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      //data: { site, file },
      title,
      type,
      date,
      customImage,
      bigSplash,
      children,
    } = this.props;
    let imageStyle = {
      height: "100%",
      position: "absolute",
      zIndex: "-3",
      width: "100%",
    };
    /*
    let image =
      customImage !== null ? (
        <Img fluid={customImage} alt="background" style={imageStyle} />
      ) : (
        <Img
          fluid={file.childImageSharp.fluid}
          alt="background"
          style={imageStyle}
        />
      );*/

    return (
      <>
        <Header />
        <div className={style.layout}>
          <h1 className={style.title}>{title}</h1>
          <main className={style.childrenContainer}>{children}</main>
        </div>
        <Footer />
      </>
    );
  }
}

/*
      <>
        <Header />
        <div className={style.titleContainer+" container"}>
          <h1 className={style.title}>{title}</h1>
          <span>
          {date != null ? (
          <div className={style.by}>{date}</div>
        ) : (
          ``
        )}
          </span>
        </div>
        <div
          className={
            style.bannerContainer +
            ` ` +
            (customImage !== null && bigSplash ? style.tall : ``)
          }
        >
          {image}
          <div
            className={
              style.gradient +
              ` ` +
              (customImage !== null && bigSplash ? style.tall : ``)
            }
          />
        </div>
        <div className={style.layout}>
          <main className={style.childrenContainer}>{children}</main>
        </div>
        <Footer author={site.siteMetadata.author} />
      </>
*/

const withGraphQL = (Component: any) => {
  return (props: any) => {
    const data = useStaticQuery(graphql`
      query SiteTitleQuery {
        file(relativePath: { eq: "splash/article.jpg" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            fluid(quality: 90, maxWidth: 4096) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `);
    return <Component data={data} {...props} />;
  };
};

export default Layout;
