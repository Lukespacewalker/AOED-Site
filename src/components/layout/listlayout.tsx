import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Header from "@components/header";
import { Footer } from "@components/footer";
import { image as imageStyle, title as titleStyle } from "./listlayout.module.scss";

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
        <div className="relative pb-6" style={{ marginTop: `141px` }}>
          <GatsbyImage image={image} alt="background" className={imageStyle} />
          <h1 className={titleStyle}>{title}</h1>
        </div>
        <main className="container">{children}</main>
        <Footer />
      </>
    );
  }
}

/*
        <div className={container}>
          <div className={titleSuperContainer}>
            
            <header className={`container ${titleContainer}`}>
              <h1 className={titleStyle}>{title}</h1>
            </header>
          </div>
        </div>

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
