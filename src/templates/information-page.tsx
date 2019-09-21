import * as React from "react";
import { graphql } from "gatsby";
import Layout from "@components/layout";
import SEO from "@components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "./information-page-style.scss";

class InformationPage extends React.Component<{ data: any }, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { data: { mdx: { frontmatter: { title, attachments }, body } } } = this.props;
        let image = null;
        if (attachments !== undefined && attachments != null && attachments.length > 0) {
            image = attachments[0].childImageSharp.fluid;
        }

        return (
            <Layout title={title} customImage={image} >
                <SEO title={title} />
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
            tag
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