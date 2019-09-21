import * as React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Layout from "@components/layout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import style from "./index.module.scss";

class NewsIndex extends React.Component<{ data: any }, {}> {
    constructor(props) {
        super(props);
    }

    private itemRenderer(nodes: any) {
        return nodes.map(node => {
            const { fields: { slug }, frontmatter: { excerpt, title, attachments } } = node;
            if (attachments !== undefined && attachments != null && attachments.length > 0) {
                return (
                    <Paper sbs side={<Img style={{ height: `100%` }} fluid={attachments[0].childImageSharp.fluid} alt={title} />}>
                        <h1>{title}</h1>
                        <p>{excerpt}</p>
                        <Link to={slug}>อ่านต่อ</Link>
                    </Paper>
                );
            }
            else return (
                <Paper>
                    <p>{excerpt}</p>
                </Paper>
            );
        });
    }

    render() {
        const { data: { news } } = this.props;
        return (<Layout title="ประชาสัมพันธ์">
            <SEO title="ประชาสัมพันธ์" />
            <div className={style.container}>
                {this.itemRenderer(news.nodes)}
            </div>
        </Layout>);
    }
}

export const pageQuery = graphql`
  query {
        news: allMdx(sort: {fields: frontmatter___date, order: DESC},filter: {frontmatter: {type: {eq: "news"}}}) {
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
  }
`;

export default NewsIndex;