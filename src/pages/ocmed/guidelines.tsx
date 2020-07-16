import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
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
          childImageSharp: { fluid: image },
        },
        spirometry: {
          childImageSharp: { fixed: spirometry },
        },
        audiometry: {
          childImageSharp: { fixed: audiometry },
        },
        confined: {
          childImageSharp: { fixed: confined },
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
            <Img fixed={confined}></Img>
          }
        >
          <div style={{marginTop:`0.5rem`}}>แนวทางการตรวจสุขภาพคนทํางานในที่อับอากาศ พ.ศ.2557</div>
        </Paper>
        <Paper
          style={{ cursor: `pointer` }}
          onClick={()=>this.handleOnClick("/ocmed/guidelines/book_audiometry.pdf")}
          sbs
          side={
            <Img fixed={audiometry}></Img>
          }
        >
          <div style={{marginTop:`0.5rem`}}>แนวทางการตรวจและแปลผลสมรรถภาพการได้ยิน ในงานอาชีวอนามัย พ.ศ.2558</div>
        </Paper>
        <Paper
          style={{ cursor: `pointer` }}
          onClick={()=>this.handleOnClick("/ocmed/guidelines/book_spirometry.pdf")}
          sbs
          side={
            <Img fixed={spirometry}></Img>
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
        # Specify the image processing specifications right in the query.
        fluid(quality: 90, maxWidth: 2048)  {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }

    spirometry: file(relativePath: { eq: "guidelines/book_spirometry-01.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fixed(quality: 90, height: 350) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }

    audiometry: file(relativePath: { eq: "guidelines/book_audiometry-001.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fixed(quality: 90, height: 350) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }

    confined: file(relativePath: { eq: "guidelines/book_confined-01.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fixed(quality: 90, height: 350) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    
  }
`;

export default GuidelinesIndex;
