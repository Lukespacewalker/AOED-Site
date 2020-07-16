module.exports = {
    siteMetadata: {
        siteUrl: `https://www.aoed.org`,
        title: `สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย`,
        shortTitle: `AOED`,
        subtitle: `The Association of Occupational and Environmental Diseases of Thailand`,
        description: `เว็บไซต์หลักของ สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย The Association of Occupational and Environmental Diseases of Thailand`,
        author: `นพ. สุทธิศักดิ์ เด่นดวงใจ`,
        menus: [
            {
                order: 1,
                name: `องค์กร`,
    
                submenus: [
                    {
                        order: 1,
                        name: `ประวัติสมาคม`,
                        link: `organization/history`
                    }
                ]
            },
            {
            order: 2,
            name: `ประชาสัมพันธ์`,

            submenus: [
                /*{
                    order: 1,
                    name: `ประวัติสมาคมโรค`,
                    link: `oem/about`
                },
                {
                    order: 2,
                    name: `ตรวจสอบรายชื่อแพทย์`,
                    link: `oem/physicians`
                },*/
                {
                    order: 3,
                    name: `ข่าวสาร`,
                    link: `news`
                }
            ]
        }, {
            order: 3,
            name: `วิชาการ`,
            emphasize: false,
            submenus: [
                {
                    order: 1,
                    name: `บทความ`,
                    link: `articles`
                }
                /*,
                {
                    order: 2,
                    name: `แนะนำผลงานวิจัย`,
                    link: `education/researches`
                }*/
            ]
        }, {
            order: 4,
            name: `แพทย์อาชีวเวชศาสตร์`,
            emphasize: false,
            submenus: [
                {
                    order: 1,
                    name: `สมรรถนะแพทย์อาชีวเวชศาสตร์`,
                    link: `ocmed/competencies`
                },
                {
                    order: 1,
                    name: `แนวทางเวชปฏิบัติ`,
                    link: `ocmed/guidelines`
                }
                ,
                {
                    order: 2,
                    name: `กฎหมาย`,
                    link: `ocmed/laws`
                }
                ,
                {
                    order: 3,
                    name: `มาตรฐานคุณวุฒิความรู้ความชำนาญในการประกอบวิชาชีพเวชกรรม`,
                    link: `ocmed/wfme`
                }
            ]
        }, {
            order: 5,
            name: `ติดตาม`,
            emphasize: false,
            submenus: [
                {
                    order: 1,
                    name: `Facebook`,
                    link: `https://www.facebook.com/%E0%B8%AA%E0%B8%A1%E0%B8%B2%E0%B8%84%E0%B8%A1%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%AD%E0%B8%9A%E0%B8%AD%E0%B8%B2%E0%B8%8A%E0%B8%B5%E0%B8%9E%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B9%88%E0%B8%87%E0%B9%81%E0%B8%A7%E0%B8%94%E0%B8%A5%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B9%88%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2-270832269657665`
                },
                {
                    order: 1,
                    name: `iOccHealth Channel`,
                    link: `https://www.youtube.com/channel/UCvsRQbojFgwimZw9K82aw1A/`
                }
            ]
        }
            /*, {
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
        }*/
        ]
    },
    plugins: [
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://www.aoed.org`
            }
        },
        {
            resolve: 'gatsby-plugin-sass',
            options: {
                sassOptions:{
                    includePaths: ['src/styles']
                },
                implementation: require('sass')
            }
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: ['.mdx', '.md'],
                //defaultLayout: require.resolve('./src/components/blog-post-layout.js'),
                remarkPlugins: [require("remark-slug")],
                rehypePlugins:[]
            }
        },
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
        `gatsby-transformer-json`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `The Association of Occupational and Environmental Diseases of Thailand`,
                short_name: `aoed.org`,
                start_url: `/`,
                background_color: `#293d5e`,
                theme_color: `#293d5e`,
                display: `minimal-ui`,
                icon: `src/images/icon.png` // This path is relative to the root of the site.
            }
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        'gatsby-plugin-offline'
    ]
};
