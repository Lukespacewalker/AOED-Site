import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Header from "@components/header";
import Footer from "@components/footer";
import {layout,titleStyle,childrenContainer} from "./layout.module.scss";

interface ILayoutProps {
  data: any;
  title: string;
  type: string;
  date: string;
  customImage: any;
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
        <GatsbyImage image={customImage} alt="background" style={imageStyle} />
      ) : (
        <GatsbyImage
          image={file.childImageSharp.gatsbyImageData}
          alt="background"
          style={imageStyle}
        />
      );*/

    return (
      <>
        <Header />
        <div className={layout}>
          <h1 className={titleStyle}>{title}</h1>
          <main className={childrenContainer}>{children}</main>
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
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    `);
    return <Component data={data} {...props} />;
  };
};

export default Layout;
