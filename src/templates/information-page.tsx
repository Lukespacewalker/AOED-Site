import * as React from "react";
import { graphql } from "gatsby";
import Layout from "@components/layout";
import SEO from "@components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Img from "gatsby-image";
import { Pre } from "@components/code";
import scrollTo from "@components/scroller";
import ArticleLayout from "@components/layout/articlelayout";

import "./information-page-style.scss";

interface IAuthor {
  id: number;
  unique: string;
  name: string;
  position: Array<string>;
  avatar: any;
}

interface TOCItem {
  url: string;
  title: string;
  items: Array<TOCItem> | null;
}

class H1 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h1 {...other}>
        {useToc ? (
          <a href="#toc" className="font-icon" onClick={scrollTo}>
            &#xe800;
          </a>
        ) : (
          ""
        )}
        {children}
      </h1>
    );
  }
}

class H2 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h2 {...other}>
        {useToc ? (
          <a href="#toc" className="font-icon" onClick={scrollTo}>
            &#xe800;
          </a>
        ) : (
          ""
        )}
        {children}
      </h2>
    );
  }
}

class H3 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h3 {...other}>
        {useToc ? (
          <a href="#toc" className="font-icon" onClick={scrollTo}>
            &#xe800;
          </a>
        ) : (
          ""
        )}
        {children}
      </h3>
    );
  }
}

class InformationPage extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }

  private useTOC = false;

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
          <li key={parentIndex + index}>
            <a href={toc.url} onClick={scrollTo}>
              {toc.title}
            </a>
            <ul>{this.renderTOCItem(toc.items, index * 100)}</ul>
          </li>
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
      ogImage = attachments[0].publicURL;
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
          <SEO title={title} description={excerpt} imageUrl={ogImage} />
        ) : (
          ``
        )}
        <div className="MDXRenderer-body">
          <MDXProvider
            components={{
              // Map HTML element tag to React component
              h1: (props) => <H1 useToc={this.useTOC} {...props}></H1>,
              h2: (props) => <H2 useToc={this.useTOC} {...props}></H2>,
              h3: (props) => <H3 useToc={this.useTOC} {...props}></H3>,
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
          }
        }
      }
    }
  }
`;

export default InformationPage;
