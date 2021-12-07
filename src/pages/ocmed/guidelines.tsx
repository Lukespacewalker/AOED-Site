import * as React from "react";
import { graphql } from "gatsby";
import ListLayout from "@components/layout/listlayout";
import SEO from "@components/seo";
import { ListItem } from "@components/list-item";

class GuidelinesIndex extends React.Component<{ data: any }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: {
        file: {
          childImageSharp: { gatsbyImageData: image },
        },
        spirometry: {
          childImageSharp: { gatsbyImageData: spirometry },
        },
        audiometry: {
          childImageSharp: { gatsbyImageData: audiometry },
        },
        confined: {
          childImageSharp: { gatsbyImageData: confined },
        },
      },
    } = this.props;
    return (
      <ListLayout title="แนวทางเวชปฏิบัติ" image={image}>
        <SEO title="แนวทางเวชปฏิบัติ" />
        <div className="flex flex-col gap-6">
          <ListItem
            tagLine="2557"
            isExternal={true}
            header="แนวทางการตรวจสุขภาพคนทํางานในที่อับอากาศ พ.ศ.2557"
            to="/ocmed/guidelines/book_confined.pdf"
            image={confined}
          />
          <ListItem
            tagLine="2558"
            isExternal={true}
            header="แนวทางการตรวจและแปลผลสมรรถภาพการได้ยิน ในงานอาชีวอนามัย พ.ศ.2558"
            to="/ocmed/guidelines/book_audiometry.pdf"
            image={audiometry}
          />
          <ListItem
            tagLine="2557"
            isExternal={true}
            header="แนวทางการตรวจและแปลผลสมรรถภาพปอด ด้วยวิธีสไปโรเมตรีย์ในงานอาชีวอนามัย พ.ศ.2557"
            to="/ocmed/guidelines/book_spirometry.pdf"
            image={spirometry}
          />
        </div>
      </ListLayout>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "splash/guide.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    spirometry: file(relativePath: { eq: "guidelines/book_spirometry-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    audiometry: file(relativePath: { eq: "guidelines/book_audiometry-001.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }

    confined: file(relativePath: { eq: "guidelines/book_confined-01.jpg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
    
  }
`;

export default GuidelinesIndex;
