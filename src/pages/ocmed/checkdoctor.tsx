import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import DoctorChecker from "@components/doctor-checker";
import google_sheet from "../../images/google/sheet.png";
import google_app_script from "../../images/google/app_script.png";
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
      <ListLayout title="ตรวจสอบรายชื่อแพทย์" image={image}>
        <SEO title="ตรวจสอบรายชื่อแพทย์" />
        <Card tagLine="ตรวจสอบจากระบบของแพทยสภา" header="แพทย์ที่ได้รับวุฒิบัตรหรือหนังสืออนุมัติ เวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์">
          <a className="text-xl underline" href="https://checkmd.tmc.or.th/">เข้าสู่ระบบตรวจสอบของแพทยสภา</a>
          <p className="text-sm">โดยทั่วไปจะใช้เวลา 1-2 เดือน ข้อมูลความชำนาญเฉพาะทางในเว็บของแพทย์สภาของแพทย์ที่จบการศึกษาในเดือนกรกฎาคมของปีนั้นๆ ถึงจะได้รับการปรับปรุง</p>
        </Card>

        <Card className="my-6" tagLine="ตรวจสอบจากระบบของสมาคม" header="แพทย์ที่ได้รับวุฒิบัตรหรือหนังสืออนุมัติ เวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์ + แพทย์ที่ผ่านการอบรบหลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์ 2 เดือน">
          <DoctorChecker />
          <div className="flex flex-row flex-wrap items-center">
            <div className="text-gray-400 text-sm font-bold">Powered by </div>
            <div className="flex flex-row">
              <img
                src={google_sheet}
                className="h-14"
              />
            </div>
            <div className="flex flex-row">
              <img
                src={google_app_script}
                className="h-14"
              />
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
