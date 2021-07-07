/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@components": path.resolve(__dirname, "src/components"),
                "@images": path.resolve(__dirname, "src/images"),
                "@authors": path.resolve(__dirname, "src/contents/authors"),
            }
        }
    });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` });
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
    {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
        result.data.allMdx.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve(`./src/templates/information-page.tsx`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.fields.slug
                }
            });
        });
    });
};

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions;
    const typeDefs = [
        "type Mdx implements Node { frontmatter: MdxFrontmatter }",
        `type MdxFrontmatter {
            authors: [AuthorslistJson] @link(by: "unique") 
        }`
        //date: Date @dateformat(formatString: "dddd, DD MMMM YYYY", locale: "th")
    ];
    createTypes(typeDefs);
}