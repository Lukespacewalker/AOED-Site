import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import "./laws.scss";

import khonkaen from "@images/institude_logo/khonkaen.png";
import chula from "@images/institude_logo/chula.png";

import chonburi from "@images/institude_logo/chonburi.png";
import nop from "@images/institude_logo/nop.png";

import kut from "@images/institude_logo/kut.png";
import rama from "@images/institude_logo/rama.png";

import songkla from "@images/institude_logo/songkla.png";
import somdej from "@images/institude_logo/somdej.png";

class LawsIndex extends React.Component<{ data: any }, {}> {
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
      },
    } = this.props;
    return (
      <ListLayout
        title="มาตรฐานคุณวุฒิความรู้ความชำนาญในการประกอบวิชาชีพเวชกรรม"
        image={image}
      >
        <SEO title="มาตรฐานคุณวุฒิความรู้ความชำนาญในการประกอบวิชาชีพเวชกรรม" />

        <h1>
          หลักสูตรและเกณฑ์การฝึกอบรมแพทย์ประจำบ้าน (มคว.1)
        </h1>
        <h2>
          <Link to="standard1/main">
            หลักสูตรและเกณฑ์การฝึกอบรมแพทย์ประจำบ้าน
            เพื่อวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบ
            วิชาชีพเวชกรรมสาขาเวชศาสตร์ป้องกัน แขนงอาชีวเวชศาสตร์
            สมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย
            (ภายใต้สมาคมเวชศาสตร์ป้องกัน) ฉบับ พ.ศ. 2561
          </Link>
        </h2>
        <h2>
          <Link to="standard1/extra">
            ภาคผนวกที่ 1 ความรู้พื้นฐานของเวชศาสตร์ป้องกันทั่วไป
          </Link>
        </h2>
        <h2>
          <Link to="standard1/extra2">ภาคผนวกที่ 2 เนื้อหาสังเขปของการฝึกอบรม</Link>
        </h2>
        <h2>
          <Link to="standard1/extra3">ภาคผนวกที่ 3 กิจกรรมวิชาชีพที่เชื่อมั่นได้ (EPA)</Link>
        </h2>

        <h1>แผนการฝึกอบรม (มคว.2)</h1>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={khonkaen} />
            </div>
            <div>
              <h2>คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น</h2>
            </div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={chula} />
            </div>
            <div>
              <h2>คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h2>
            </div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={chonburi} />
            </div>
            <div>
              <h2>โรงพยาบาลชลบุรี</h2>
            </div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={nop} />
            </div>
            <div>
              <h2>โรงพยาบาลนพรัตนราชธานี</h2>
            </div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={kut} />
            </div>
            <div>
              <h2>โรงพยาบาลพระมงกุฎเกล้า</h2>
              <p>
                <a href="http://www.oem.pmk.ac.th/curriculum/wfme/plan">
                  อ่านฉบับออนไลน์
                </a>
              </p>
              <p>
                <a href="/wfme/2/pmk/มคว.2 อาชีวะ พบ.รพ.รร.6 final.pdf">PDF</a>
                {" / "}
                <a href="/wfme/2/pmk/มคว.2 อาชีวะ พบ.รพ.รร.6 final.docx">
                  Words
                </a>
              </p>
            </div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={rama} />
            </div>
            <div>
              <h2>คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล</h2>
            </div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={songkla} />
            </div>
            <div>
              <h2>คณะแพทยศาสตร์ มหาวิทยาลัยสงขลานครินทร์</h2>
            </div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={somdej} />
            </div>
            <div>
              <h2>โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา</h2>
            </div>
          </div>
        </div>

        <h1>รายงานการประเมินตนเอง (มคว.3)</h1>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/doc.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(quality: 90, maxWidth: 2048)  {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default LawsIndex;
