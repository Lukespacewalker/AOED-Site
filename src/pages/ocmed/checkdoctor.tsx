import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import DoctorChecker from "@components/doctor-checker";
import aws_lambda from "../../images/aws/AWS Lambda.svg";
import aws_dynamo from"../../images/aws/AWS DynamoDB.svg";

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
      <ListLayout title="ตรวจสอบแพทย์อาชีวเวชศาสตร์" image={image}>
        <SEO title="ตรวจสอบแพทย์อาชีวเวชศาสตร์" />
        <h2>แพทย์ที่ได้รับวุฒิบัตรหรือหนังสืออนุมัติบัตร</h2>
        <h3>เวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์</h3>
        <a style={{fontSize:"2em"}} href="https://checkmd.tmc.or.th/">ตรวจสอบจากระบบของแพทยสภา</a>
        <p>โดยทั่วไปจะใช้เวลา 1-2 เดือน ข้อมูลความชำนาญเฉพาะทางในเว็บของแพทย์สภาของแพทย์ที่จบการศึกษาในเดือนกรกฎาคมของปีนั้นๆ ถึงจะได้รับการปรับปรุง</p>
        <hr />
        <h2>แพทย์ที่ผ่านการอบรบหลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์ (หลักสูตร 2 เดือน)</h2>
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
            <img
              src={aws_lambda}
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
          <img
            src={aws_dynamo}
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
