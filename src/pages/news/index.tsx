import * as React from "react";
import { graphql } from "gatsby";
import { renderListItems } from "@utilities";
import ListLayout from "@components/layout/listlayout";
import SEO from "@components/seo";

class NewsIndex extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data: { articles, file: { publicURL, childImageSharp: { gatsbyImageData: image } } }
    } = this.props;
    return (
      <ListLayout title="ข่าวสาร" image={image}>
        <SEO title="ข่าวสาร" />
        <div className="flex gap-6 flex-wrap">{renderListItems(articles.nodes)}</div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    articles: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "news" } } }
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
            childImageSharp {gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }

    file(relativePath: { eq: "splash/news.jpg" }) {
      publicURL
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export default NewsIndex;
