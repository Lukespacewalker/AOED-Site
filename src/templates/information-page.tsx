import * as React from "react";
import { graphql } from "gatsby";
import SEO from "@components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Img from "gatsby-image";
import { Pre } from "@components/code";
import scrollTo, { scrollToId } from "@components/scroller";
import ArticleLayout from "@components/layout/articlelayout";
import {H1,H2,H3,H4, DetailTocItem, IAuthor, TOCItem} from "./template";

import "./information-page-style.scss";
class InformationPage extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.target = decodeURIComponent(window.location.hash),
      this.target = this.target.replace('#', '');
      // delete hash so the page won't scroll to it
      window.location.hash = "";
    }
  }
  private useTOC = false;
  
  private target : string;

  renderAuthors(authorsList: Array<IAuthor>) {
    const nodes = authorsList.map((author, index) => {
      const positions = author.position.map((pos, index) => (
        <div key={index}>{pos}</div>
      ));
      return (
        <div className="author" key={index}>
          <div className="image-container">
            <Img
              style={{ borderRadius: `50%` }}
              fixed={author.avatar.childImageSharp.fixed}
              alt={author.name}
            />
          </div>
          <div className="title-container">{author.name}</div>
          <div className="positions-container">{positions}</div>
        </div>
      );
    });
    return <div className="author-container">{nodes}</div>;
  }

  private renderTOCItem(tocs: Array<TOCItem>, parentIndex = 0) {
    const list = tocs.map((toc, index) => {
      if (toc.items != undefined && toc.items.length > 0)
        return (
          <DetailTocItem
            key={parentIndex + index}
            title={toc.title}
            url={toc.url}
          >
            {this.renderTOCItem(toc.items, index * 100)}
          </DetailTocItem>
        );
      else
        return (
          <li key={parentIndex + index}>
            <a href={toc.url} onClick={scrollTo}>
              {toc.title}
            </a>
          </li>
        );
    });
    return <ul>{list}</ul>;
  }

  renderTOC(tocs: Array<TOCItem>) {
    if (tocs.length > 0) {
      this.useTOC = true;
      return (
        <div id="toc" className="toc-container">
          {this.renderTOCItem(tocs)}
        </div>
      );
    } else {
      return "";
    }
  }

  componentDidMount(){
    if(this.target!==""){
      scrollToId(this.target)
    }else{
      this.target = "";
    }
  }

  render() {
    const {
      data: {
        mdx: {
          tableOfContents: { items },
          frontmatter: { title, type, attachments, date, authors: a, excerpt },
          body,
        },
      },
    } = this.props;
    const authors: Array<IAuthor> = a;
    const tocs = items as Array<TOCItem>;
    let image = null;
    let ogImage = null;
    if (
      attachments !== undefined &&
      attachments != null &&
      attachments.length > 0 &&
      attachments[0] != null
    ) {
      image = attachments[0].childImageSharp.fluid;
      attachments.forEach(
        (attachment: { name: string; childImageSharp: any }) => {
          if (attachment.name.indexOf("_bg") != -1)
            image = attachment.childImageSharp.fluid;
        }
      );
      ogImage = attachments[0];
    }

    let asideContent = <div></div>;
    if (authors != null || tocs != null) {
      asideContent = (
        <>
          {authors != null ? this.renderAuthors(authors) : ``}
          {tocs != null ? this.renderTOC(tocs) : ``}
        </>
      );
    }

    return (
      <ArticleLayout
        title={title}
        date={date}
        image={image}
        aside={asideContent}
      >
        {excerpt != null ? (
          <SEO title={title} description={excerpt} imageUrl={ogImage.publicURL} imageWidth={ogImage.childImageSharp.resolutions.width} imageHeight={ogImage.childImageSharp.resolutions.height}/>
        ) : (
          <SEO title={title} description={excerpt} />
        )}
        <div className="MDXRenderer-body">
          <MDXProvider
            components={{
              // Map HTML element tag to React component
              h1: (props) => <H1 useToc={this.useTOC} {...props}></H1>,
              h2: (props) => <H2 useToc={this.useTOC} {...props}></H2>,
              h3: (props) => <H3 useToc={this.useTOC} {...props}></H3>,
              h4: (props) => <H4 useToc={this.useTOC} {...props}></H4>,
              pre: Pre,
            }}
          >
            <MDXRenderer images={attachments}>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </ArticleLayout>
    );
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
      frontmatter {
        title
        type
        tag
        date
        authors {
          id
          name
          position
          avatar {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(cropFocus: NORTH, quality: 90, width: 150, height: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        excerpt
        attachments {
          name
          publicURL
          childImageSharp {
            # Specify the image processing specifications right in the query.
            fluid(quality: 90, maxWidth: 4096) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resolutions {
              height
              width
            }
          }
        }
      }
    }
  }
`;

export default InformationPage;
