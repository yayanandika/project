import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "./OtpContainer.scss";

const OtpContainer = props => {
  const [otpNumber, setOtp] = useState("");
  const cont = props.isCont !== undefined ? true : false;

  function onChangeOtp(val) {
    var string = val.target.value;
    console.log(string.replace(/[^0-9]/g, ""));
    setOtp(string.replace(/[^0-9]/g, ""));
  }

  return (
    <Row className="container-otp" justify="space-around">
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <div className="title-otp black-text">
            Verifikasi untuk mengisi Aplikasi Anda
          </div>
          <div className="sub-title-otp light-text">
            Kami telah mengirimkan kode verifikasi ke email Admin Nasabah.
            Silahkan memasukan kode verifikasi yang diberikan melalui email
            Admin Nasabah
          </div>
        </Col>
      </Row>
      <Row className="title-selection-otp black-text">
        <Col span={24}>
          <Input
            placeholder="6 digit angka"
            className="input-otp"
            size="large"
            onChange={onChangeOtp}
            value={otpNumber}
            type="text"
            maxLength="6"
          />
        </Col>
        <Col span={24}>
          <Button
            className="button-footer"
            type="primary"
            onClick={() => {
              if (cont) {
                props.check();
              } else {
                props.nextStep();
              }
            }}
          >
            Verifikasi
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          Jika Anda belum mendapatkan kode verifikasi, klik{" "}
          <span className="red-text">disini</span> untuk mengirim ulang kode
          verifikasi. Pastikan Anda memeriksa folder spam di e-mail Admin
          Nasabah.
        </Col>
      </Row>
    </Row>
  );
};

export default OtpContainer;
