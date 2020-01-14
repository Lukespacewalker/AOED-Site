import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import Header from "@components/header";
import Footer from "@components/footer";
import style from "./listlayout.module.scss";

class ListPage extends React.Component<
  { title: string; image: FluidObject },
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
        <div className={style.container}>
          <div className={style.titleSuperContainer}>
            <Img fluid={image} alt="background" className={style.image} />
            <header className={`container ${style.titleContainer}`}>
              <h1 className={style.title}>{title}</h1>
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
