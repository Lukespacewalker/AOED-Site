import * as React from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";
import ListLayout from "@components/layout/listlayout";
import Paper from "@components/paper";
import SEO from "@components/seo";
import "./laws.scss"

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
        }
      },
    } = this.props;
    return (
      <ListLayout title="กฎหมาย" image={image}>
        <SEO title="กฎหมาย" />
        <h1>พระราชบัญญัติ</h1>
        <div className="box">
          <a href="http://www.ratchakitcha.soc.go.th/DATA/PDF/2562/A/067/T_0215.PDF">พระราชบัญญัติ ควบคุมโรคจากการประกอบอาชีพและโรคจากสิ่งแวดล้อม พ.ศ. 2562</a>
        </div>
        <div className="box">
          <a href="http://envocc.ddc.moph.go.th/uploads/law/law-5-insurance.pdf">พระราชบัญญัติประกันสังคม พ.ศ. 2533</a>
        </div>
        <div className="box">
          <a href="http://envocc.ddc.moph.go.th/uploads/law/law-6-compensation.pdf">พระราชบัญญัติเงินทดแทน พ.ศ. 2537</a>
        </div>
        <h1>กฎกระทรวง</h1>
        <h2>กระทรวงแรงงาน</h2>
        <div className="box">
          <a href="http://www3.mol.go.th/sites/default/files/laws/th/00151640.pdf">กฎกระทรวง กำหนดหลักเกณฑ์และวิธีการตรวจสุขภาพของลูกจ้าง และส่งผลการตรวจแก่พนักงานตรวจแรงงาน พ.ศ. 2547</a>
        </div>
        <h1>ประกาศกระทรวง</h1>
        <h2>กระทรวงแรงงาน</h2>
        <div className="box">
          <a href="http://www.ratchakitcha.soc.go.th/DATA/PDF/2540/E/039/7.PDF">ประกาศกระทรวงแรงงานและสวัสดิการสังคม เรื่อง หลักเกณฑ์การวินิจฉัยและการประเมินการสูญเสียสมรรถภาพของผู้ป่วยหรือบาดเจ็บด้วยโรคจากการทำงาน</a>
        </div>

        
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/laws.jpg" }) {
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
