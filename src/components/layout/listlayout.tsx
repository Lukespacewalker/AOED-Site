import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Header from "@components/header";
import { Footer } from "@components/footer";
import {container,titleSuperContainer,image as imageStyle,titleContainer,title as titleStyle} from "./listlayout.module.scss";

class ListPage extends React.Component<
  { title: string; image: any },
  any
> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, image, title } = this.props;
    return (
      <>
        <Header />
        <div className={container}>
          <div className={titleSuperContainer}>
            <GatsbyImage image={image} alt="background" className={imageStyle} />
            <header className={`container ${titleContainer}`}>
              <h1 className={titleStyle}>{title}</h1>
            </header>
          </div>
        </div>
        <main className="container">{children}</main>
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

export default ListPage;
