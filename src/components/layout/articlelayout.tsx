import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import Header from "@components/header";
import Footer from "@components/footer";
import style from "./listlayout.module.scss";
import articleStyle from "./articlelayout.module.scss";

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
        <header className={`container ${style.container}`}>
          <h1 className={style.title}>{title}</h1>
          <span>{date}</span>
        </header>
        <div className={`container ${articleStyle.contentContainer}`}>
          <aside className={articleStyle.aside}>{aside}</aside>
          <main>
            <div>
              <Img className={articleStyle.mainImage} fluid={image} alt="background" />
            </div>
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
