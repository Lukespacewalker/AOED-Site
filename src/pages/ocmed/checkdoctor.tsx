import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import DoctorChecker from "@components/doctor-checker";


class CheckDoctorIndex extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: {
        file: {
          childImageSharp: { gatsbyImageData: image },
        },
      },
    } = this.props;

    return (
      <ListLayout title="ตรวจสอบแพทย์ที่ผ่านการอบรบ หลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์ (หลักสูตร 2 เดือน)" image={image}>
        <SEO title="ตรวจสอบแพทย์ที่ผ่านการอบรบ หลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์ (หลักสูตร 2 เดือน)" />
        <h2>ยังอยู่ระหว่างการทดสอบระบบ ยังไม่สามารถนำไปใช้อ้างอิงได้</h2>
        <DoctorChecker />
        <hr />
        <div style={{ display: `flex` }}>
          <a href="https://aws.amazon.com/what-is-cloud-computing">
            <img
              src="https://d0.awsstatic.com/logos/powered-by-aws.png"
              height={50}
              alt="Powered by AWS Cloud Computing"
            />
          </a>
          <div
            style={{
              display: `flex`,
              marginLeft:`1em`,
              flexDirection: `row`,
              alignItems: `center`,
            }}
          >
            <StaticImage
              src="../../images/aws/AWS Lambda.svg"
              layout="fixed"
              height={50}
            />
            <div>Amazon <br/><b>Lambda</b></div>
          </div>
          <div
            style={{
              display: `flex`,
              marginLeft:`1em`,
              flexDirection: `row`,
              alignItems: `center`,
            }}
          >
          <StaticImage
            src="../../images/aws/AWS DynamoDB.svg"
            layout="fixed"
            height={50}
          />
            <div>Amazon <br/><b>DynamoDB</b></div>
          </div>

        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/search.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;

export default CheckDoctorIndex;
