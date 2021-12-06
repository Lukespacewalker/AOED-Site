import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import { GatsbyImage } from "gatsby-plugin-image";
import Header from "@components/header";
import { Footer } from "@components/footer";
import {title as titleStyle,container} from "./listlayout.module.scss";
import {aside as asideStyle,contentContainer,mainImage} from "./articlelayout.module.scss";

class ArticleLayout extends React.Component<
  {
    title: string;
    image: FluidObject;
    date: string;
    aside: React.ReactComponentElement<any>;
  },
  any
> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, image, title, date, aside } = this.props;
    return (
      <>
        <Header />
        <header className={`container ${container}`}>
          <h1 className={titleStyle}>{title}</h1>
          <span>{date}</span>
        </header>
        <div className={`container ${contentContainer}`}>
          <aside className={asideStyle}>{aside}</aside>
          <main>
            {image != null ? (
              <div>
                <GatsbyImage
                  className={mainImage}
                  image={image}
                  alt="background"
                />
              </div>
            ) : (
              <></>
            )}
            {children}
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

/*
const withGraphQL = (Component: any) => {
    return (props: any) => {
      const data = useStaticQuery(graphql`
        query SiteTitleQuery {}
      `);
      return <Component data={data} {...props} />;
    };
  };
  */

export default ArticleLayout;
