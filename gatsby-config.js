module.exports = {
    siteMetadata: {
        siteUrl: `https://www.tcohs.com`,
        title: `สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย`,
        shortTitle: `AOED`,
        description: `สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย`,
        author: `นพ. สุทธิศักดิ์ เด่นดวงใจ`,
        menus: [{
            order: 2,
            name: `เกี่ยวกับสมาคม`,
            submenus: [
                {
                    order: 1,
                    name: `ประวัติสมาคมโรค`,
                    link: `oem/about`
                },
                {
                    order: 2,
                    name: `ตรวจสอบรายชื่อแพทย์`,
                    link: `oem/physicians`
                },
                {
                    order: 3,
                    name: `ประชาสัมพันธ์`,
                    link: `news`
                }
            ]
        }, {
            order: 3,
            name: `วิชาการ`,
            submenus: [
                {
                    order: 1,
                    name: `บทความ`,
                    link: `articles`
                },
                {
                    order: 2,
                    name: `แนะนำผลงานวิจัย`,
                    link: `education/researches`
                }
            ]
        }, {
            order: 4,
            name: `ดาวน์โหลด`,
            emphasize: true,
            submenus: [
                {
                    order: 1,
                    name: `เอกสารวิชาการ`,
                    link: `download/docs`
                },
                {
                    order: 2,
                    name: `สไลด์การเรียนการสอนแพทย์`,
                    link: `download/slides`
                }
            ]
        }
        ]
    },
    plugins: [
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://tcohs.com`
            }
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                includePaths: ['src/styles']
            }
        },
        `gatsby-plugin-mdx`,
        `gatsby-plugin-no-sourcemaps`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdowns`,
                path: `${__dirname}/src/contents`
            }
        },
        `gatsby-plugin-typescript`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [] // just in case those previously mentioned remark plugins sound cool :)
            }
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        'gatsby-plugin-offline'
    ]
};
