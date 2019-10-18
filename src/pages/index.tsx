import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Footer from "@components/footer";
import SEO from "@components/seo";
import Banner from "@components/banner";
import Paper from "@components/paper";
import Img from "gatsby-image";
import "./index.scss";

class IndexPage extends React.Component<{ data: any }, {}> {

    private navigationHandler(target: string) {
        return (event) => {
            navigate(target);
        };
    }

    private newsRenderer(nodes : Array<any>) {
        return nodes.map((node,i) => {
            const { fields: { slug }, frontmatter: { excerpt, title, attachments } } = node;
            if (attachments !== undefined && attachments != null && attachments.length > 0) {
                return (
                    <Paper key={i} onClick={this.navigationHandler(slug)} side={<Img style={{ height: `350px` }} fluid={attachments[0].childImageSharp.fluid} alt={title} />}>
                        <h1>{title}</h1>
                        <p>{excerpt}</p>
                        <Link to={slug}>อ่านต่อ</Link>
                    </Paper>
                );
            }
            else return (
                <Paper onClick={this.navigationHandler(slug)} key={i}>
                    <p>{excerpt}</p>
                </Paper>
            );
        });
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { data }: { data: any } = this.props;
        const { site: { siteMetadata: meta } } = data;  // ECMA6 Destructuring Pattern
        const { news: { nodes:news } } = data;
        const { articles: { nodes: articles } } = data;
        const { congrat } = data;
        return (
            <>
                <SEO
                    title="หน้าแรก"
                    keywords={[`TCOHS`]} />
                <Banner siteTitle={meta.title} siteSubtitle={meta.subtitle} />
                <div className="container">
                    <main className="paper-container">
                        <h1>ประชาสัมพันธ์ <Link to="/news">ทั้งหมด</Link> </h1>
                        <div className="two-grid">
                            {this.newsRenderer(news)}
                        </div>

                        <h1>เรื่องราวที่น่าสนใจ <Link to="/articles">ทั้งหมด</Link> </h1>
                        <div className="two-grid">
                            {this.newsRenderer(articles)}
                        </div>

                        <h1>ขอแสดงความยินดี</h1>
                        <div style={{ overflow: `hidden`, borderRadius: `5px` }}>
                            <Img fluid={congrat.childImageSharp.fluid} alt="congrat" />
                        </div>
                    </main>
                </div>
                <Footer dark author={meta.author} />
            </>
        );
    }
}

export const query = graphql`
  fragment MDXFragment on MdxConnection{
            nodes {
              fields {
                slug
              }
              frontmatter {
                title
                excerpt
                attachments {
                    childImageSharp {
                        fluid(quality: 90, maxWidth: 4096) {
                        ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
              }
            }
 }
    query {
            site {
            siteMetadata {
                title
                subtitle
                author
            }
        }

        news: allMdx(limit:6,sort: {fields: frontmatter___date, order: DESC},filter: {frontmatter: {type: {eq: "news"}}}) {
            ...MDXFragment
        }
        articles: allMdx(limit:6,sort: {fields: frontmatter___date, order: DESC},filter: {frontmatter: {type: {eq: "articles"}}}) {
            ...MDXFragment
        }

        congrat : file(relativePath:  {eq: "congratulation.jpg"}) {
        childImageSharp {
             fluid(quality: 90, maxWidth: 4096) {
            ...GatsbyImageSharpFluid_withWebp
            }
        }
      }

    }
`;
export default IndexPage;