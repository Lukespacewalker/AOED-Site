import * as React from "react";
import * as PropTypes from 'prop-types';
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

interface ISEOProp{
    description: string,
    imageUrl :string,
    imageWidth :number,
    imageHeight :number,
    lang:string,
    meta:Array<any>,
    keywords:Array<string>,
    title:string 
}

class SEO extends React.Component<ISEOProp,any>{
    public static defaultProps = {
        lang: `th`,
        meta: [],
        keywords: [],
    };
    
    public static propTypes = {
        description: PropTypes.string,
        lang: PropTypes.string,
        meta: PropTypes.array,
        keywords: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string.isRequired,
    };

    
    render(){
        const { description, imageUrl,imageWidth,imageHeight, lang, meta, keywords, title } = this.props;
        return (
            <StaticQuery
            query={detailsQuery}
            render = { data => {
                const metaDescription =
                    description || data.site.siteMetadata.description;
                let ogImageUrl = imageUrl || data.ogimage.publicURL;
                let ogImageWidth = imageWidth || data.ogimage.childImageSharp.original.width;
                let ogImageHeight = imageHeight || data.ogimage.childImageSharp.original.height;
                ogImageUrl = "https://www.aoed.org"+ogImageUrl;
                return (
                    <Helmet
                        htmlAttributes={{
                            lang,
                        }}
                        title={title}
                        defaultTitle={data.site.siteMetadata.title}
                        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
                        meta={[
                            {
                                name: `charSet`,
                                content: `UTF-8`,
                            },
                            {
                                name: `description`,
                                content: metaDescription,
                            },
                            {
                                property: `og:title`,
                                content: title,
                            },
                            {
                                property: `og:image`,
                                content: ogImageUrl,
                            },
                            {
                                property: `og:image:width`,
                                content: ogImageWidth,
                            },
                            {
                                property: `og:image:height`,
                                content: ogImageHeight,
                            },
                            {
                                property: `twitter:image`,
                                content: ogImageUrl,
                            },
                            {
                                property: `image`,
                                content: ogImageUrl,
                            },
                            {
                                property: `og:description`,
                                content: metaDescription,
                            },
                            {
                                property: `og:type`,
                                content: `website`,
                            },
                            {
                                name: `twitter:card`,
                                content: `summary`,
                            },
                            {
                                name: `twitter:creator`,
                                content: data.site.siteMetadata.author,
                            },
                            {
                                name: `twitter:title`,
                                content: title,
                            },
                            {
                                name: `twitter:description`,
                                content: metaDescription,
                            },
                        ]
                            .concat(
                                keywords.length > 0
                                    ? {
                                        name: `keywords`,
                                        content: keywords.join(`, `),
                                    }
                                    : []
                            )
                            .concat(meta)}
                    />
                );
            }}
        />
        )
    }

}

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }

    ogimage : file(relativePath: {eq: "main_ogimage.png"}) {
        publicURL
        childImageSharp {
            original {
              height
              width
            }
          }
    }
  }
`;
