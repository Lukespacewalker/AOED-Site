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
          หลักสูตรและเกณฑ์การฝึกอบรมแพทย์ประจำบ้าน
          เพื่อวุฒิบัตรแสดงความรู้ความชำนาญในการประกอบวิชาชีพเวชกรรม
          สาขาเวชศาสตร์ป้องกันแขนงอาชีวเวชศาสตร์ (มคว.1)
        </h1>

        <h1>แผนการฝึกอบรม (มคว.2)</h1>

        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={khonkaen} />
            </div>
            <div><h2>คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น</h2></div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={chula} />
            </div>
            <div><h2>คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h2></div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={chonburi} />
            </div>
            <div><h2>โรงพยาบาลชลบุรี</h2></div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={nop} />
            </div>
            <div><h2>โรงพยาบาลนพรัตน์ราชธานี</h2></div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={kut} />
            </div>
            <div>
              <h2>โรงพยาบาลพระมงกุฎเกล้า</h2>
              <p><a href="../wfme/2/pmk/มคว.2 อาชีวะ พบ.รพ.รร.6 final.pdf">Portable Document</a></p>
              <p><a href="../wfme/2/pmk/มคว.2 อาชีวะ พบ.รพ.รร.6 final.docx">Words Document</a></p>
            </div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={rama} />
            </div>
            <div><h2>คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล</h2></div>
          </div>
        </div>
        <div className="two-grid">
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={songkla} />
            </div>
            <div><h2>คณะแพทยศาสตร์ มหาวิทยาลัยสงขลานครินทร์</h2></div>
          </div>
          <div className="box institute-box">
            <div>
              <img className="institute-logo" src={somdej} />
            </div>
            <div><h2>โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา</h2></div>
          </div>
        </div>

        <h1>รายงานการประเมินตนเอง (มคว.3)</h1>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/guide.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        fluid(quality: 90, maxWidth: 4096) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;

export default LawsIndex;
