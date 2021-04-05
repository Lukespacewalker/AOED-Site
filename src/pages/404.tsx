import * as React from "react";
import { graphql , Link} from "gatsby";
import ListLayout from "@components/layout/listlayout";
import SEO from "@components/seo";

const browser = typeof window !== "undefined" && window;

class Page404 extends React.Component<{ data: any }, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        const { data: { file: { childImageSharp: { gatsbyImageData } } } } = this.props;
        return browser && (
            <ListLayout image={fluid} title="404: ไม่พบหน้านี้">
                <p>โปรดตรวจสอบ URL ใหม่อีกครั้ง</p>
                <p>หรือกลับไปยัง <Link to="/">หน้าแรก</Link></p>
            </ListLayout>);
    }
}

export const pageQuery = graphql`
query{
      file(relativePath:  {eq: "splash/404.jpg"}) {
        childImageSharp {gatsbyImageData(layout: FULL_WIDTH)
        }
      }
}
`;

export default Page404;