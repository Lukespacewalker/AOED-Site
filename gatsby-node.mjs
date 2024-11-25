/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { resolve, dirname } from "path";
import { createFilePath } from "gatsby-source-filesystem";
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))

export function onCreateWebpackConfig({ actions }) {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@components": resolve(__dirname, "src/components"),
                "@utilities": resolve(__dirname, "src/utilities"),
                "@images": resolve(__dirname, "src/images"),
                "@authors": resolve(__dirname, "src/contents/authors"),
            }
        }
    });
}

export function onCreateNode({ node, getNode, actions }) {
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
}

export function createPages({ graphql, actions }) {
    const { createPage } = actions;
    return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            internal {
              contentFilePath
            }
            frontmatter{
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
      }
    }
  `).then(result => {
        result.data.allMdx.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: `${resolve(`./src/templates/information-page.tsx`)}?__contentFilePath=${node.internal.contentFilePath}`,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug,
                    images: node.frontmatter.attachments
                }
            });
        });
    });
}


export function createSchemaCustomization({ actions, schema }) {
    const { createTypes } = actions;
    const typeDefs = [
        "type Mdx implements Node { frontmatter: MdxFrontmatter }",
        `type MdxFrontmatter {
            authors: [AuthorslistJson] @link(by: "id") 
        }`
        //date: Date @dateformat(formatString: "dddd, DD MMMM YYYY", locale: "th")
    ];
    createTypes(typeDefs);
}