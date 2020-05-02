import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import "./LogReffContainer.scss";

const LogReffContainer = props => {
  const [reffNumber, setReff] = useState("");
  const [email, setEmail] = useState("");

  const onChangeReff = val => {
    var string = val.target.value;
    console.log(string.replace(/[^0-9]/g, ""));
    setReff(string.replace(/[^0-9]/g, ""));
  };

  const onChangeEmail = val => {
    setEmail(val.target.value);
  };

  return (
    <Row className="container-otp">
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <div className="title-otp black-text">
            Melanjutkan pembukaan rekening Anda
          </div>
          <div className="sub-title-otp light-text">
            Kami akan mengirimkan kode OTP ke e-mail nasabah setelah Anda
            memasukkan nomor referensi dan e-mail Admin Nasabah.
          </div>
        </Col>
      </Row>
      <Row className="title-selection-otp black-text">
        <Col span={24} style={{ marginBottom: "60px" }}>
          <Input
            placeholder="Masukkan nomor referensi Anda*"
            className="input-otp"
            size="large"
            onChange={onChangeReff}
            value={reffNumber}
            type="text"
            maxLength="6"
          />
        </Col>
        <Col span={24}>
          <Input
            placeholder="Masukkan alamat e-mail Admin Nasabah*"
            className="input-otp"
            size="large"
            onChange={onChangeEmail}
            value={email}
            type="text"
          />
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Button
            className="button-footer"
            type="primary"
            onClick={() => {
              props.check();
            }}
          >
            Selanjutnya
          </Button>
        </Col>
      </Row>
    </Row>
  );
};

export default LogReffContainer;
