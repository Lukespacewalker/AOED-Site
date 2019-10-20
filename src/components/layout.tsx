import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import Header from "./header/header";
import Footer from "./footer";
import style from "./layout.module.scss";

interface ILayoutProps {
    data: any;
    title: string,
    by: string,
    customImage: FluidObject,
    children: any,
}

class Layout extends React.Component<ILayoutProps, {}> {
    public static defaultProps = {
        customImage: null,
        by: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { data: { site, file }, title, by, customImage, children } = this.props;

        let image = customImage !== null ? (<Img fluid={customImage} alt="background" style={{
            height: "100%",
            position: "absolute",
            width: "100%"
        }} />) : (<Img fluid={file.childImageSharp.fluid} alt="background" style={{
            height: "100%",
            position: "absolute",
            width: "100%"
        }} />);
        return (
            <>
                <div className={style.bannerContainer + ` ` + (customImage !== null ? style.tall : ``)}>
                    {image}
                    <div className={style.gradient + ` ` + (customImage !== null ? style.tall : ``)} />
                    <Header />
                    <div className={style.titleContainer}>
                        <h1 className={style.title}>{title}</h1>
                        {by != null ? (<div className={style.by}>โดย {by}</div>) : ``}
                    </div>
                </div>
                <div className={style.layout}>
                    <main className={style.childrenContainer}>{children}</main>
                </div>
                <Footer author={site.siteMetadata.author} />
            </>
        );
    }
}

const withGraphQL = (Component: any) => {
    return (props: any) => {
        const data = useStaticQuery(graphql`
      query SiteTitleQuery {

        site {
          siteMetadata {
            title
            author
          }
        }

        file(relativePath: { eq: "splash/6.jpg" }) {
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

export default withGraphQL(Layout);
