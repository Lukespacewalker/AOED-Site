import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import DoctorChecker from "@components/doctor-checker";
import aws_lambda from "../../images/aws/AWS Lambda.svg";
import aws_dynamo from "../../images/aws/AWS DynamoDB.svg";
import { Card } from "@components/card";

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
        <Card tagLine="วุฒิบัตรหรือหนังสืออนุมัติบัตร" header="เวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์">
          <a className="text-xl underline" href="https://checkmd.tmc.or.th/">ตรวจสอบจากระบบของแพทยสภา</a>
          <p className="text-sm">โดยทั่วไปจะใช้เวลา 1-2 เดือน ข้อมูลความชำนาญเฉพาะทางในเว็บของแพทย์สภาของแพทย์ที่จบการศึกษาในเดือนกรกฎาคมของปีนั้นๆ ถึงจะได้รับการปรับปรุง</p>
        </Card>

        <Card className="my-6" tagLine="หลักสูตร 2 เดือน" header="ผ่านการอบรบหลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์">
          <DoctorChecker />
          <hr className="bg-green-500 h-0.5 my-3" />
          <div className="flex flex-row flex-wrap">
            <a href="https://aws.amazon.com/what-is-cloud-computing">
              <img
                src="https://d0.awsstatic.com/logos/powered-by-aws.png"
                className="h-12"
                alt="Powered by AWS Cloud Computing"
              />
            </a>
            <div className="flex flex-row">
              <img
                src={aws_lambda}
                className="h-12"
              />
              <div>Amazon <br /><b>Lambda</b></div>
            </div>
            <div className="flex flex-row">
              <img
                src={aws_dynamo}
                className="h-12"
              />
              <div>Amazon <br /><b>DynamoDB</b></div>
            </div>
          </div>
        </Card>
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
