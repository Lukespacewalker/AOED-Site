import * as React from "react";
import { graphql, } from "gatsby";
import ListLayout from "@components/layout/listlayout";
import SEO from "@components/seo";

class Contact extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: {
        file: {
          childImageSharp: { gatsbyImageData: image },
        }
      },
    } = this.props;
    return (
      <ListLayout title="ติดต่อสมาคม" image={image}>
        <SEO title="ติดต่อสมาคม" />
        <h2>พ.อ. นพ. คทาวุธ ดีปรีชา</h2>
        <h4>เลขาสมาคมโรคจากการประกอบอาชีพและสิ่งแวดล้อมแห่งประเทศไทย</h4>
        <p>
          Email 📧: 
          <a target="_blank" href="https://mailhide.io/e/m739nD1X">
            กดลิงค์เพื่อดู Email
          </a>
        </p>
      </ListLayout>
    );
  }
}
export default Contact;

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/contact.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;
