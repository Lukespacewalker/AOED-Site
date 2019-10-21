import * as React from "react";
import { graphql } from "gatsby";
import Layout from "@components/layout";
import SEO from "@components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";

import "./information-page-style.scss";

interface IAuthor {
    id: number,
    unique: string,
    name: string,
    position: Array<string>,
    avatar: any
}

class InformationPage extends React.Component<{ data: any }, {}> {
    constructor(props) {
        super(props);
    }

    renderAuthors(authorsList: Array<IAuthor>) {
        const nodes = authorsList.map((author, index) => {
            const positions = author.position.map((pos, index) => <div>{pos}</div>);
            return (<div className="author" key={index}>
                <div className="image-container">
                    <Img style={{ borderRadius: `50%` }} fixed={author.avatar.childImageSharp.fixed} alt={author.name} />
                </div>
                <div className="title-container">
                    {author.name}
                </div>
                <div className="positions-container">
                    {positions}
                </div>
            </div>);
        }
        );
        return (
            <div className="author-container">
                {nodes}
            </div>
        );
    }

    render() {
        const { data: { mdx: { frontmatter: { title, type, attachments, date, authors: a, excerpt }, body } } } = this.props;
        let authors: Array<IAuthor> = a;
        let image = null;
        let ogImage = null;
        if (attachments !== undefined && attachments != null && attachments.length > 0) {
            image = attachments[0].childImageSharp.fluid;
            ogImage = attachments[0].publicURL;
        }


        return (
            <Layout title={title} date={date} customImage={image} type={type}>
                {excerpt != null ? (<SEO title={title} description={excerpt} image={ogImage} />) : ``}
                {authors != null ? this.renderAuthors(authors) : ``}
                <div className="MDXRenderer-container">
                    <MDXRenderer images={attachments}>{body}</MDXRenderer>
                </div>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
    	body
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
                        fixed(cropFocus: NORTH, quality: 90,width: 175, height: 175) {
                          ...GatsbyImageSharpFixed
                        }
                    }
              }
            }
            excerpt
            attachments {
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