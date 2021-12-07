import * as React from "react";

class DoctorChecker extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  state: {
    lang: "th";
    text: string;
    name: string;
    surname: string;
    working: boolean;
    result: {
      Title: string;
      Name: string;
      Surname: string;
      Year: number;
    };
  } = {
      lang: "th",
      text: "",
      name: "",
      surname: "",
      working: false,
      result: null,
    };

  private checkdoctor(
    lang: "th",
    name: string,
    surname: string,
  ) {
    let url;
    //if (checkedLicenseNumber == "") {
    url = `https://nmurcj1r6g.execute-api.ap-southeast-1.amazonaws.com/default/occmed-doctor-search?lang=${lang}&name=${encodeURIComponent(
      name
    )}&surname=${encodeURIComponent(surname)}`;
    /*
  } else {
    url = `https://nmurcj1r6g.execute-api.ap-southeast-1.amazonaws.com/default/occmed-doctor-search?lang=${lang}&name=${encodeURIComponent(
      name
    )}&surname=${encodeURIComponent(
      surname
    )}&checkedLicenseNumber=${checkedLicenseNumber}`;
  }*/
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 400) {
            throw new Error("กรอกฟอร์มไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
          }
          if (response.status === 404) {
            throw new Error("ไม่พบแพทย์ที่ท่านค้นหา");
          }
        }
      })
      .then((json) => {
        this.setState({ working: false, result: json });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ working: false, text: error.message });
      });
  }

  private handleSubmit(event) {
    console.log("submit");
    this.setState({ working: true, text: "", result: null });
    this.checkdoctor(
      this.state.lang,
      this.state.name,
      this.state.surname
    );
    event.preventDefault();
  }

  private renderDoctor(doctor) {
    return (
      <div key={doctor.Name}>
        <h4 style={{ margin: `0` }}>
          {doctor.Title} {doctor.Name} {doctor.Surname}
        </h4>
        <br />
        อบรมปี {doctor.Year}
        <br />
        {doctor.CheckedLicenseNumber !== undefined
          ? doctor.IsLicenseNumberCorrect
            ? `เลข ว. ${doctor.CheckedLicenseNumber} ตรงกับแพทย์ท่านนี้`
            : `เลข ว. ${doctor.CheckedLicenseNumber} ไม่ตรงกับแพทย์ท่านนี้`
          : ""}
      </div>
    );
  }

  render() {
    /*
            <div>ภาษาที่ต้องการค้นหา</div>
        <button
          type="button"
          className={this.state.lang === "th" ? "selected" : ""}
          onClick={(_) => this.setState({ lang: "th" })}
        >
          ไทย
        </button>
        <button
          type="button"
          className={this.state.lang === "en" ? "selected" : ""}
          onClick={(_) => this.setState({ lang: "en" })}
        >
          อังกฤษ
        </button>
                  <div className="form-group">
            <label for="doctorId">เลข ว.</label>
            <input
              id="doctorId"
              type="number"
              placeholder="ใส่หากต้องการตรวจสอบว่าตรงกับชื่อหรือไม่"
              value={this.state.checkedLicenseNumber}
              onChange={(event) =>
                this.setState({ checkedLicenseNumber: event.target.value })
              }
            ></input>
          </div>
    */
    return (
      <>
        <form onSubmit={event => this.handleSubmit(event)} className="flex gap-6 justify-items-center items-center flex-wrap">
          <input
          className="flex-1"
            id="name"
            type="text"
            placeholder="ชื่อ"
            value={this.state.name}
            onChange={(event) => this.setState({ name: event.target.value })}
          ></input>
          <input
          className="flex-1"
            id="surname"
            type="text"
            placeholder="นามสกุล"
            value={this.state.surname}
            onChange={(event) =>
              this.setState({ surname: event.target.value })
            }
          ></input>
          <button className="flex-0" type="submit" onClick={event => this.handleSubmit(event)}>ค้นหา</button>
        </form>
        {this.state.working ? (
          <div className="emphasize" style={{ display: `block` }}>
            กำลังค้นหา
          </div>
        ) : this.state.text.length > 0 ? (
          <div className="emphasize error" style={{ display: `block` }}>
            {this.state.text}
          </div>
        ) : this.state.result != null ? (
          <>
            <div className="emphasize" style={{ display: `block` }}>
              {this.renderDoctor(this.state.result)}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default DoctorChecker;
