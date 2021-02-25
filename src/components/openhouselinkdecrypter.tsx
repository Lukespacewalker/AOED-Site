import * as React from "react";
class LinkDecrypter extends React.Component<{}, {}> {
  private date = new Date();
  constructor(props) {
    super(props);
  }

  state = {
    text: "กำลังตรวจสอบวันที่อนุญาติให้ลงทะเบียน ...",
  };

  componentDidMount() {
    if (this.date>= new Date("2021-02-25T09:00:00+07:00") && this.date < new Date("2021-02-26T00:00:00+07:00")) {
      fetch("/.netlify/functions/key")
        .then(function (response) {
          if (!response.ok) {
            throw new Error('NOT OK');
          }else{
            return response;
          }
        })
        .then(res=>res.json())
        .then((response) => {
          const url = response.url;
          this.setState({
            text:<>ลงทะเบียนเข้าร่วมงานเพิ่ม ได้ที่ <a href={url}>Google Form</a> สำหรับผู้ที่ลงทะเบียนได้ในรอบแรกแล้ว กรุณาอย่าลงทะเบียนซ้ำ โดยถ้ามีข้อมูลการลงทะเบียนผิดพลาดให้ติดต่อ ทีมงานได้ทาง <a href="mailto:OpenHouseOccmed@Gmail.com">OpenHouseOccmed@Gmail.com</a></>
          });
        })
        .catch((error) => {
            this.setState({
                text:
                  "ไม่สามารถตรวจสอบวันที่จาก Server ได้"
              });
        });
    } else {
      this.setState({
        text:
          "ขณะนี้ปิดรับลงทะเบียนแล้ว"
      });
    }
  }

  render() {
      return(
        <div className="emphasize" style={{display:`block`}}>
        {this.state.text}
        </div>
      )
  }
}

export default LinkDecrypter;
