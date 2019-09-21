import React from "react";
import { graphql, Link } from "gatsby";
import Footer from "@components/footer";
import SEO from "@components/seo";
import Banner from "@components/banner";
import Paper from "@components/paper";
import Img from "gatsby-image";

import "./index.scss";

function newsRenderer(nodes) {
    return nodes.map(node => {
        const { fields: { slug }, frontmatter: { excerpt, title, attachments } }  = node;
        if (attachments !== undefined && attachments != null && attachments.length > 0) {
            return (
                <Paper side={<Img style={{ height: `350px` }} fluid={attachments[0].childImageSharp.fluid} alt={title} />}>
                    <h1>{title}</h1>
                    <p>{excerpt}</p>
                    <Link to={slug}>อ่านต่อ</Link>
                </Paper>
            );
        }
        else return (
            <Paper>
                <p>{excerpt}</p>
            </Paper>
        );
    });
}

const IndexPage = ({ data }) => {

    const { site: { siteMetadata: meta } } = data;  // ECMA6 Destructuring Pattern
    const { news: { nodes } } = data;
    return (
        <>
            <SEO
                title="หน้าแรก"
                keywords={[`TCOHS`]} />
            <Banner siteTitle={meta.title} />
            <div className="container">
                <main className="paper-container">
                    <h1>ประชาสัมพันธ์ <Link to="/news">ดูทั้งหมด</Link> </h1>
                    <div class="two-grid">
                        {newsRenderer(nodes)}
                    </div>
                </main>
            </div>
            <Footer dark author={meta.author} />
        </>
    );
};

/*
             <h1>สารจากประธานคณะกรรมการ</h1>
                    <Paper wide sbs side={
                        <div>
                            <div style={{ width: `350px`, height: `350px`, overflow: `hidden`, borderRadius: `50%`, marginBottom: `1rem` }}><img src={prime} /></div>
                            <h1>นายแพทย์อดุลย์ บัณฑุกุล</h1>
                        </div>
                    }>
                        <p>
                            เป็นที่น่ายินดีเป็นอย่างยิ่งที่สมาพันธ์อาชีวอนามัยและความปลอดภัย
                            แห่งประเทศไทย ได้จัดงานประชุมวิชาการร่วมกัน ในครั้งนี้ การประชุมครั้งนี้
                            เปรียบเสมือนการเริ่มต้นของความร่วมมือระหว่างสามวิชาชีพสำคัญที่มีส่วนในเรื่อง
                            อาชีวอนามัยและความปลอดภัยของคนทำงานได้แก่ เจ้าหน้าที่ความปลอดภัย
                            พยาบาลอาชีวอนามัย และแพทย์อาชีวเวชศาสตร์ สมกับเนื้อหาการประชุมซึ่งคือ
                            collaboration for workers’ health and safety
                        </p>
                        <p>
                            ในช่วงทศวรรษที่ผ่านมามีการเปลี่ยนแปลงเป็นอย่างมากในด้านการประกอบอาชีพ ทั้งด้านกระบวนการทำงาน
                            สิ่งแวดล้อมในการทำงาน และสุขภาพคนทำงาน ในด้านกระบวนการทำงานมีการพัฒนาไปในหลายด้านโดยมีทิศทางที่ดี
                            เพื่อเพิ่มความปลอดภัยในการทำงานให้แก่คนทำงาน เช่นการใช้หุ่นยนต์ในทางอุตสาหกรรม การใช้เครื่องจักรระบบปิด
                            และมีความปลอดภัยมากขึ้น การมีกฎหมายใหม่ๆ โดยเฉพาะทางสาธารณสุขคือพระราชบัญญัติควบคุมโรคจากการ
                            ประกอบอาชีพและสิ่งแวดล้อม ทำให้ แพทย์ และบุคลากรทางการแพทย์สามารถมีบทบาทด้านแรงงานมากขึ้น มีการ
                            ประกาศเขตอุตสาหกรรมพิเศษ ซึ่งจะมีการลงทุนในอุตสาหกรรมใหม่ๆ โดยใช้เครื่องมือ เครื่องจักรที่ทันสมัย เหล่านี้พวก
                            เราจะต้องติดตามให้ทัน เพื่อปรับตัวในการให้บริการด้านอาชีวอนามัยและความปลอดภัยแก่คนทำงานให้ทันสมัย ในด้าน
                            สิ่งแวดล้อมในการทำงาน สถานประกอบการต่างๆ ก็มีความรับผิดชอบต่อสิ่งแวดล้อมมากขึ้น
                        </p>
                        <p>
                            แต่ก็ยังมีอุบัติเหตุต่างๆ เกิดขึ้นตลอดเวลา เราจะมีบทบาทอย่างไรในเรื่องเหล่านี้ ในระยะยาว สิ่งแวดล้อมในการทำงาน ซึ่งมีสารต่างๆ ซึ่งเมื่อ
                            ตรวจวัดแล้วไม่เกินค่ามาตรฐาน แต่ยังเป็นที่สงสัยว่าจะมีผลต่อสุขภาพคนทำงานหรือไม่ โดยเฉพาะการทำให้เกิดโรคมะเร็ง
                            เรื่องเหล่านี้ก็ท้าทายความรู้ในการป้องกัน และการวินิจฉัยโรคต่างๆ ซึ่งเกิดจากการทำงาน ส่วนในด้านสุขภาพคนทำงาน
                            นั้น ในช่วงที่ผ่านมามีการตื่นตัวเรื่องการดูแลสุขภาพ คนทำงานหนุ่มสาวมีสุขภาพแข็งแรงขึ้น อาจมีปัญหาเรื่อง healthy
                            worker effect หรือ presenteeism นอกจากนี้ปัญหาเรื่องอาการและอาการแสดงของโรคต่างๆ อาจจะเปลี่ยนแปลงไป
                            เช่นโรคทางโครงร่างกล้ามเนื้อและกระดูก นอกจากนี้ยังมีปัญหาเรื่องการทำงานในคนทำงานที่มีอายุมาก และการทำงาน
                            ของผู้สูงอายุ เรื่องเหล่านี้ถือเป็นความเปลี่ยนแปลงที่สำคัญที่ต้องตื่นตัวและเตรียมพร้อม นอกเหนือจากเรื่องที่พวกเราได้
                            พยายามทำงานกันทุกวันนี้จึงจำเป็นอย่างยิ่งที่พวกเราทั้งสามวิชาชีพจะได้ร่วมมือกันทำงานโดยมีวัตถุประสงค์เพื่อเสริม
                            งานที่มีอยู่ให้ดียิ่งขึ้น พัฒนางานด้านอาชีวอนามัยและความปลอดภัยที่ควรจะมี และเริ่มงานใหม่ๆ ในด้านดังกล่าว
                        </p>
                    </Paper>

 */

export const query = graphql`
    query {
            site {
            siteMetadata {
                title
                author
            }
        }

        news: allMdx(limit: 6,sort: {fields: frontmatter___date, order: DESC},filter: {frontmatter: {type: {eq: "news"}}}) {
            nodes {
              fields {
                slug
              }
              frontmatter {
                title
                excerpt
                attachments {
                    childImageSharp {
                        fluid(quality: 90, maxWidth: 4096) {
                        ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
              }
            }
        }

    }
`;
export default IndexPage;