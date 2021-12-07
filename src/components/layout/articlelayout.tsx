import * as React from "react";
import { FluidObject } from "gatsby-image";
import { GatsbyImage } from "gatsby-plugin-image";
import Header from "@components/header";
import { Footer } from "@components/footer";
import { title as titleStyle, aside as asideStyle, main as mainStyle, mainImage } from "./articlelayout.module.scss";

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
        <div className="container" style={{ marginTop: `141px` }}>
          {image != null ? (
            <GatsbyImage
              className={mainImage}
              image={image}
              alt="background"
            />
          ) : (
            <></>
          )}
          <header className="flex flex-col items-center">
            <div className="tagline">{date}</div>
            <h1 className={titleStyle}>{title}</h1>
          </header>
          <div className="flex flex-col md:flex-row">
            <aside className={asideStyle}>{aside}</aside>
            <main className={mainStyle}>
              {children}
            </main>
          </div>

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
