import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";

class GuidelinesIndex extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }

  handleOnClick = (target) => window.open(target);

  render() {
    const {
      data: {
        file: {
          childImageSharp: { gatsbyImageData: image },
        },
        spirometry: {
          childImageSharp: { gatsbyImageData: spirometry },
        },
        audiometry: {
          childImageSharp: { gatsbyImageData: audiometry },
        },
        confined: {
          childImageSharp: { gatsbyImageData: confined },
        },
      },
    } = this.props;
    return (
      <ListLayout title="แนวทางเวชปฏิบัติ" image={image}>
        <SEO title="แนวทางเวชปฏิบัติ" />
        <div className="two-grid">
        <Paper
          style={{ cursor: `pointer` }}
          onClick={()=>this.handleOnClick("/ocmed/guidelines/book_confined.pdf")}
          sbs
          side={
            <GatsbyImage image={confined}></GatsbyImage>
          }
        >
          <div style={{marginTop:`0.5rem`}}>แนวทางการตรวจสุขภาพคนทํางานในที่อับอากาศ พ.ศ.2557</div>
        </Paper>
        <Paper
          style={{ cursor: `pointer` }}
          onClick={()=>this.handleOnClick("/ocmed/guidelines/book_audiometry.pdf")}
          sbs
          side={
            <GatsbyImage image={audiometry}></GatsbyImage>
          }
        >
          <div style={{marginTop:`0.5rem`}}>แนวทางการตรวจและแปลผลสมรรถภาพการได้ยิน ในงานอาชีวอนามัย พ.ศ.2558</div>
        </Paper>
        <Paper
          style={{ cursor: `pointer` }}
          onClick={()=>this.handleOnClick("/ocmed/guidelines/book_spirometry.pdf")}
          sbs
          side={
            <GatsbyImage image={spirometry}></GatsbyImage>
          }
        >
          <div style={{marginTop:`0.5rem`}}>แนวทางการตรวจและแปลผลสมรรถภาพปอด ด้วยวิธีสไปโรเมตรีย์ในงานอาชีวอนามัย พ.ศ.2557</div>
        </Paper>
        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/guide.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    spirometry: file(relativePath: { eq: "guidelines/book_spirometry-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }

    audiometry: file(relativePath: { eq: "guidelines/book_audiometry-001.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }

    confined: file(relativePath: { eq: "guidelines/book_confined-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FIXED)
      }
    }
    
  }
`;

export default GuidelinesIndex;
