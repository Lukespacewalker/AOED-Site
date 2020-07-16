import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import style from "./index.module.scss";

class NewsIndex extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }

  private navigationHandler(target: string) {
    return event => {
      navigate(target);
    };
  }

  private itemRenderer(nodes: Array<any>) {
    return nodes.map((node, i) => {
      const {
        fields: { slug },
        frontmatter: { excerpt, date, title, attachments }
      } = node;
      if (
        attachments !== undefined &&
        attachments != null &&
        attachments.length > 0
      ) {
        return (
          <Paper
            style={{ cursor: `pointer` }}
            onClick={this.navigationHandler(slug)}
            key={i}
            sbs
            side={
              <Img
                style={{ position: `absolute`, width: `100%`, height: `100%` }}
                fluid={attachments[0].childImageSharp.fluid}
                alt={title}
              />
            }
          >
            <h1>{title}</h1>
            <h3>{date}</h3>
            <p>{excerpt}</p>
            <Link to={slug}>อ่านต่อ</Link>
          </Paper>
        );
      } else
        return (
          <Paper key={i}>
            <p>{excerpt}</p>
          </Paper>
        );
    });
  }

  render() {
    const {
      data: { articles , file : {publicURL, childImageSharp: {fluid:image} } }
    } = this.props;
    return (
      <ListLayout title="บทความ" image={image}>
        <SEO title="บทความ" />
        <div className={style.container}>{this.itemRenderer(articles.nodes)}</div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    articles: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "articles" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          excerpt
          date(formatString: "dddd, DD MMMM YYYY", locale: "th")
          attachments {
            childImageSharp {
              fluid(quality: 90, maxWidth: 2048)  {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }

    file(relativePath: { eq: "splash/article.jpg" }) {
      publicURL
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(quality: 90, maxWidth: 2048)  {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default NewsIndex;
