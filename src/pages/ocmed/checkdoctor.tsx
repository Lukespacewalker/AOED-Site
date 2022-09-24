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
        <Card tagLine="แพทย์อาชีวเวชศาสตร์" header="แพทย์ที่ได้รับวุฒิบัตรหรือหนังสืออนุมัติ เวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์">
          <a className="text-xl underline" href="https://checkmd.tmc.or.th/">ตรวจสอบจากระบบของแพทยสภา</a>
          <p className="text-sm">โดยทั่วไปจะใช้เวลา 1-2 เดือน ข้อมูลความชำนาญเฉพาะทางในเว็บของแพทย์สภาของแพทย์ที่จบการศึกษาในเดือนกรกฎาคมของปีนั้นๆ ถึงจะได้รับการปรับปรุง</p>
        </Card>

        <Card className="my-6" tagLine="แพทย์ที่ผ่านการอบรบหลักสูตร 2 เดือน" header="หลักสูตรอบรมความรู้พื้นฐานด้านอาชีวเวชศาสตร์สำหรับแพทย์">
          <DoctorChecker />
          <hr className="bg-green-500 h-0.5 my-3" />
          <div>* เฉพาะผู้ที่ผ่านการอบรบหลักสูตร 2 เดือน ของโรงพยาบาลนพรัตนราชธานี, มหาวิทยาลัยเชียงใหม่, และมหาวิทยาลัยบูรพา</div>
          <div className="flex flex-row flex-wrap items-center">
            <div className="text-gray-400 text-sm font-bold">Powered by </div>
            <div className="flex flex-row">
              <img
                src={google_sheet}
                className="h-20"
              />
            </div>
            <div className="flex flex-row">
              <img
                src={google_app_script}
                className="h-20"
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
