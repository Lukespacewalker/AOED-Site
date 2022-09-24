import * as React from "react";

class DoctorChecker extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  state: {
    lang: "th";
    canSubmit: boolean;
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
    canSubmit: false,
    text: "",
    name: "",
    surname: "",
    working: false,
    result: null,
  };

  private setCanSubmit = () => {
    this.setState({
      canSubmit: !(
        this.state.name.match(/^\s*$/) !== null &&
        this.state.surname.match(/^\s*$/) !== null
      ),
    });
  };

  private checkdoctor(lang: "th", name: string, surname: string) {
    let url;
    //if (checkedLicenseNumber == "") {
    url =
      "https://script.google.com/macros/s/AKfycbwJzPUSImBO7-UzM1UL_pkmbdq8AdHjevfS6roDzbQ-_ylko4nGd0bt9eYUusgRKmQ/exec";
    /*
  } else {
    url = `https://nmurcj1r6g.execute-api.ap-southeast-1.amazonaws.com/default/occmed-doctor-search?lang=${lang}&name=${encodeURIComponent(
      name
    )}&surname=${encodeURIComponent(
      surname
    )}&checkedLicenseNumber=${checkedLicenseNumber}`;
  }*/

    fetch(
      `${url}?name=${encodeURIComponent(
        name.trim()
      )}&surname=${encodeURIComponent(surname.trim())}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.statusCode === 200) {
          console.log(json);
          this.setState({ working: false, result: json });
        } else if (json.statusCode === 400) {
          throw new Error("กรอกฟอร์มไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง");
        } else if (json.statusCode === 404) {
          throw new Error("ไม่พบแพทย์ที่ท่านค้นหา");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ working: false, text: error.message });
      });
  }

  private handleSubmit(event) {
    if (this.state.canSubmit) {
      this.setState({ working: true, text: "", result: null });
      this.checkdoctor(this.state.lang, this.state.name, this.state.surname);
    }
    event.preventDefault();
  }

  private renderDoctor(doctor) {
    if (doctor.courseCompletionDate) {
      if (doctor.courseCompletionDate.toString().trim() === "") {
        doctor.courseCompletionDate = undefined;
      }
    }
    return (
      <div key={doctor.Name}>
        <h4 style={{ margin: `0` }}>
          {doctor.name} {doctor.surname}
        </h4>
        <br />
        ผ่านการอบรม 2 เดือน จาก {doctor.institute} รุ่น {doctor.batch}{" "}
        {doctor.courseCompletionDate &&
          "เมื่อปี พ.ศ. " + doctor.courseCompletionDate}
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
        <form
          onSubmit={(event) => this.handleSubmit(event)}
          className="flex gap-6 justify-items-center items-end flex-wrap"
        >
          <div className="flex-1">
            <label className="ml-2 mb-2" for="name">
              ชื่อ*
            </label>
            <input
              id="name"
              required
              className="w-full"
              type="text"
              placeholder="ชื่อ"
              value={this.state.name}
              onChange={(event) => {
                this.setState({ name: event.target.value });
                this.setCanSubmit();
              }}
            ></input>
          </div>
          <div className="flex-1">
            <label className="ml-2 mb-2" for="surname">
              นามสกุล*
            </label>
            <input
              className="w-full"
              id="surname"
              required
              type="text"
              placeholder="นามสกุล"
              value={this.state.surname}
              onChange={(event) => {
                this.setState({ surname: event.target.value });
                this.setCanSubmit();
              }}
            ></input>
          </div>
          <button
            className="flex-0 button h-[36px]"
            disabled={!this.state.canSubmit}
            type="submit"
            onClick={(event) => this.handleSubmit(event)}
          >
            ค้นหา
          </button>
        </form>
        {this.state.working ? (
          <div
            className="mt-3 p-3 rounded bg-amber-100"
            style={{ display: `block` }}
          >
            กำลังค้นหา
          </div>
        ) : this.state.text.length > 0 ? (
          <div
            className="mt-3 p-3 rounded bg-red-100"
            style={{ display: `block` }}
          >
            {this.state.text}
          </div>
        ) : this.state.result != null ? (
          <>
            <div
              className="mt-3 p-3 rounded bg-lime-100"
              style={{ display: `block` }}
            >
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
