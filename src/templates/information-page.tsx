import * as React from "react";
import { graphql } from "gatsby";
import SEO from "@components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage } from "gatsby-plugin-image";
import { Pre } from "@components/code";
import scrollTo, { scrollToId } from "@components/scroller";
import ArticleLayout from "@components/layout/articlelayout";
import { H1, H2, H3, H4, DetailTocItem, IAuthor, TOCItem } from "./template";
import ImagesView from "@components/imagesview";

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

  private target: string;

  renderAuthors(authorsList: Array<IAuthor>) {
    const nodes = authorsList.map((author, index) => {
      const positions = author.position.map((pos, index) => (
        <div key={index}>{pos}</div>
      ));
      return (
        <div className="flex md:flex-col flex-row gap-3 items-center" key={index}>
          <GatsbyImage
            className="flex-0 h-24 w-24 md:h-36 md:w-36 rounded-full shadow-md"
            image={author.avatar.childImageSharp.gatsbyImageData}
            alt={author.name}
          />
          <div className="flex-1">
            <div className="text-center text-color-primary font-bold text-sm">{author.name}</div>
            <div className="text-center text-sm">{positions}</div>
          </div>
        </div>
      );
    });
    return <div className="flex md:flex-col flex-row justify-items-center items-center mb-6 md:mb-0 md:mr-6">{nodes}</div>;
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

  componentDidMount() {
    if (this.target !== "") {
      scrollToId(this.target)
    } else {
      this.target = "";
    }
  }

  render() {
    const {
      data: {
        mdx: {
          tableOfContents: { items },
          frontmatter: { title, type, attachments, useGallery, date, authors: a, excerpt },

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
      image = attachments[0].childImageSharp.gatsbyImageData;
      attachments.forEach(
        (attachment: { name: string; childImageSharp: any }) => {
          if (attachment.name.indexOf("_bg") != -1)
            image = attachment.childImageSharp.gatsbyImageData;
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

        image={!useGallery ? image : null}
        aside={asideContent}
      >
        {excerpt != null ? (
          <SEO title={title} description={excerpt} imageUrl={ogImage.publicURL} imageWidth={ogImage.childImageSharp.original.width} imageHeight={ogImage.childImageSharp.original.height} />
        ) : (
          <SEO title={title} description={excerpt} />
        )}
        <div className="MDXRenderer-body">
          {useGallery ? (
            <ImagesView
              fluids={attachments.map((a) => a.childImageSharp.gatsbyImageData)}
            ></ImagesView>
          ) : (
            ""
          )}
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
        useGallery
        date(formatString: "dddd, DD MMMM YYYY", locale: "th")
        authors {
          id
          name
          position
          avatar {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED,width:200,height:200)
            }
          }
        }
        excerpt
        attachments {
          name
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
            original {
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
