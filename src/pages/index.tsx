import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Footer from "@components/footer";
import SEO from "@components/seo";
import Header from "@components/header";
import Paper from "@components/paper";
import Img from "gatsby-image";

// Styles
import yt_icon from "@images/ui/youtube_icon.png";
import "./index.scss";

class IndexPage extends React.Component<{ data: any }, {}> {
  private navigationHandler(target: string) {
    return (event) => {
      navigate(target);
    };
  }

  private renderArticles(nodes: Array<any>) {
    return nodes.map((node, i) => {
      const {
        fields: { slug },
        frontmatter: { excerpt, title,date, attachments },
      } = node;
      if (
        attachments !== undefined &&
        attachments != null &&
        attachments.length > 0
        && attachments[0] != null
      ) {
        return (
          <Paper
            style={{ cursor: `pointer` }}
            key={i}
            onClick={this.navigationHandler(slug)}
            side={
              <Img
                style={{ height: `100%` }}
                fluid={attachments[0].childImageSharp.fluid}
                alt={title}
              />
            }
          >
            <h1>{title}</h1>
            <div className="date">{date}</div>
            <p>{excerpt}</p>
            <Link to={slug}>อ่านต่อ</Link>
          </Paper>
        );
      } else
        return (
          <Paper key={i}>
            <h1>{title}</h1>
            <div className="date">{date}</div>
            <p>{excerpt}</p>
            <Link to={slug}>อ่านต่อ</Link>
          </Paper>
        );
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { data }: { data: any } = this.props;
    const {
      site: { siteMetadata: meta },
    } = data; // ECMA6 Destructuring Pattern
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
            `สมาคม`
          ]}
        />
        <Header siteTitle="" isFrontPage={true} />
        <div className="container" style={{marginTop:`125px`}}>
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
                src="https://www.youtube.com/embed/fhpn1LGRz-8"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div>
              <h3>การรับมือกับไวรัส COVID19 ในที่ทำงาน</h3>
              <p>
  ผลกระทบที่บริษัท จะได้รับจากการระบาดของไวรัสโควิดในปีนี้มีมากมาย ไม่ว่าจะเป็น การลาป่วย ของพนักงานทั้งจากการเจ็บป่วย และความกังวล ทำให้ขาดคนทำงาน ความต้องการสินต้าประเภท ที่เกี่ยวข้องกับ อุปกรณ์ป้องกันเชื้อโรคมีมากขึ้น หรือปัญหาการขนส่งสินค้าของ supplier ทำให้บริษัท ไม่ได้รับสินค้าตามกำหนด ผู้ประกอบการ จึงต้องเตรียม แผนรับมือ เอาไว้ เพื่อให้เกิดความเสียหายน้อยที่สุด              </p>
            </div>
          </div>
        </div>
        <div className="container">
        <h1 id="news">
            ข่าวสารล่าสุด
            <Link to="/news">
              <span style={{ fontSize: `0.6em` }}> ดูทั้งหมด</span>
            </Link>{" "}
          </h1>
          <div className="super-grid">{this.renderArticles(news)}</div>
          <h1 id="project">
            บทความ
            <Link to="/articles">
              <span style={{ fontSize: `0.6em` }}> ดูทั้งหมด</span>
            </Link>
          </h1>
          <div className="super-grid">{this.renderArticles(articles)}</div>
        </div>
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
            fluid(quality: 90, maxWidth: 2048)  {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }

  query {
    site {
      siteMetadata {
        title
        author
      }
    }

    news: allMdx(
      limit: 4
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
