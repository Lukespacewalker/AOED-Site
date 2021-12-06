import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { Footer } from "@components/footer";
import SEO from "@components/seo";
import Header from "@components/header";
import Banner from "@components/banner";
import { Card } from "@components/card";
import { ListItem } from "@components/list-item";
import { GatsbyImage } from "gatsby-plugin-image";
import { trim, renderListItems,renderCards } from "@utilities";

// Styles
import yt_icon from "@images/ui/youtube_icon.png";
import "./index.scss";

class IndexPage extends React.Component<{ data: any }, {}> {
  private navigationHandler(target: string) {
    return (event) => {
      navigate(target);
    };
  }

  private renderArticleContainer(nodes: Array<any>) {
    return (
      <div className="flex gap-6 flex-col xl:flex-row items-start">
        <div style={{ flex: `2 1 0%` }} className="flex gap-6 flex-col">
          {renderCards(nodes.slice(0, 3))}
        </div>
        <div className="flex gap-3 flex-wrap flex-1 gap-3 items-start">
          {renderListItems(nodes.slice(3),true)}
        </div>
      </div>
    )
  }

  private renderListItems(nodes: Array<any>) {
    return nodes.map((node, i) => {
      const {
        fields: { slug },
        frontmatter: { excerpt, title, date, attachments },
      } = node;
      const image = (
        attachments !== undefined &&
        attachments != null &&
        attachments.length > 0 &&
        attachments[0] != null
      ) ? attachments[0].childImageSharp.gatsbyImageData : null;
      return (<ListItem trim={true} style={{ flex: `1 1 50%` }} image={image}
        header={title} superHeader={date} to={slug}>
        <p>{excerpt}</p>
      </ListItem>)
    });
  }

  private renderCards(nodes: Array<any>) {
    return nodes.map((node, i) => {
      const {
        fields: { slug },
        frontmatter: { excerpt, title, date, attachments },
      } = node;
      const image = (
        attachments !== undefined &&
        attachments != null &&
        attachments.length > 0 &&
        attachments[0] != null
      ) ? attachments[0].childImageSharp.gatsbyImageData : null;
      return (<Card image={image} superHeader={date}
        header={title} to={slug}>
        <p>{excerpt}</p>
      </Card>)
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { data }: { data: any } = this.props;
    const {
      news: { nodes: news },
      articles: { nodes: articles },
    } = data;
    const {
      ogimage: { ogimagePublicURL },
    } = data;

    return (
      <>
        <SEO
          title=""
          image={ogimagePublicURL}
          keywords={[
            `AOED`,
            `Occupational`,
            `Medicine`,
            `สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย`,
            `อาชีวเวชศาสตร์`,
            `โรคจากการประกอบอาชีพ`,
            `สิ่งแวดล้อม`,
            `สมาคม`,
          ]}
        />
        <Header isFrontPage={true} />
        <Banner />
        <section className="max-w-8xl mx-auto px-6 my-6">
          <h1 id="news" className="text-color-gradient">
            ข่าวสาร
            <Link to="/news">
              <span className="text-sm"> ดูทั้งหมด</span>
            </Link>
          </h1>
          {this.renderArticleContainer(news)}
        </section>
        <div id="youtube-section" className="text-white">
          <section className="max-w-8xl mx-auto px-6 my-6">
            <div id="youtube">
              <a href="https://www.youtube.com/channel/UCqfU3FdLjGk3mdW-IbJ-1uA">
                <img id="youtube" src={yt_icon} />
              </a>
              <a href="https://www.youtube.com/channel/UCqfU3FdLjGk3mdW-IbJ-1uA">
                <h1>iOccHealth Channel</h1>
              </a>
            </div>
            <div className="youtube-grid">
              <div className="youtube-container">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/-Ahai-K6crA"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h3>
                  วิดีโอบันทึกงาน Online Occupational Medicine Open House ครั้งที่
                  2.5
                </h3>
                <p>
                  สาขา Occupational Medicine นั้น คืออะไร เรียนอะไรบ้าง
                  จบแล้วทำงานอะไร และการอบรม 2 เดือนต่างจากเรียน 3 ปี อย่างไร
                </p>
              </div>
            </div>
            <div className="youtube-grid" style={{ marginTop: `2em` }}>
              <div className="youtube-container">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/fhpn1LGRz-8"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div>
                <h3>การรับมือกับไวรัส COVID19 ในที่ทำงาน</h3>
                <p>
                  ผลกระทบที่บริษัท จะได้รับจากการระบาดของไวรัสโควิดในปีนี้มีมากมาย
                  ไม่ว่าจะเป็น การลาป่วย ของพนักงานทั้งจากการเจ็บป่วย และความกังวล
                  ทำให้ขาดคนทำงาน ความต้องการสินต้าประเภท ที่เกี่ยวข้องกับ
                  อุปกรณ์ป้องกันเชื้อโรคมีมากขึ้น หรือปัญหาการขนส่งสินค้าของ
                  supplier ทำให้บริษัท ไม่ได้รับสินค้าตามกำหนด ผู้ประกอบการ
                  จึงต้องเตรียม แผนรับมือ เอาไว้ เพื่อให้เกิดความเสียหายน้อยที่สุด{" "}
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="max-w-8xl mx-auto px-6 my-6">
          <h1 id="articles" className="text-color-gradient">
            บทความ
            <Link to="/articles">
              <span className="text-sm"> ดูทั้งหมด</span>
            </Link>
          </h1>
          {this.renderArticleContainer(articles)}
        </section>
        <Footer />
      </>
    );
  }
}

export const query = graphql`
  fragment MDXFragment on MdxConnection {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        excerpt
        date(formatString: "dddd, DD MMMM YYYY", locale: "th")
        attachments {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }

  query {

    news: allMdx(
      limit: 8
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "news" } } }
    ) {
      ...MDXFragment
    }

    articles: allMdx(
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "articles" } } }
    ) {
      ...MDXFragment
    }

    ogimage: file(relativePath: { eq: "main_ogimage.png" }) {
      publicURL
    }
  }
`;
export default IndexPage;
