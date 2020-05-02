import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Input, Button } from "antd";
import "./NasabahContainer.scss";

import { checkCustomer } from "../../../../services/auth/Auth";

const NasabahContainer = (props) => {
  const auth = useSelector((state) => state.auth);
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [emailvalid, setEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  let emailvalidregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const onValidate = () => {
    if (companyPhone === "0" || companyEmail === "") {
      return true;
    } else {
      return false;
    }
  };

  function onChangePhone(val) {
    var string = val.target.value;
    setCompanyPhone(string.replace(/[^0-9]/g, ""));
  }

  function onChangeEmail(val) {
    setCompanyEmail(val.target.value);
  }

  return (
    <div className="container-nasabah">
      <Row>
        <Col span={24} className="title-nasabah black-text">
          Detail Admin Nasabah
        </Col>
        <Col span={24} className="sub-title-nasabah light-text">
          Admin Nasabah merupakan orang yang akan mengisi aplikasi ini. Pastikan
          Anda memasukan nomor telepon dan e-mail dengan tepat karena kami akan
          mengirimkan nomor referensi dan kode verifikasi ke alamat e-mail
          tersebut.
        </Col>
        <Col className="title-content-nasabah light-text">
          <span className="red-text">*</span> wajib diisi
        </Col>
      </Row>

      <Row className="title-selection-nasabah black-text" align="middle">
        <Col lg={7}>
          Nomor Handphone Admin:<span className="red-text">*</span>
        </Col>
        <Col lg={8}>
          <Input
            disabled={loading}
            addonBefore="+62"
            onChange={onChangePhone}
            value={companyPhone}
            type="text"
            maxLength="11"
          />
        </Col>
      </Row>

      <Row className="title-selection-nasabah black-text" align="middle">
        <Col lg={7} style={{ marginTop: "4px" }}>
          E-mail kantor Admin:<span className="red-text">*</span>
        </Col>
        <Col lg={8}>
          <Input
            disabled={loading}
            placeholder="contoh@mail.com"
            onChange={onChangeEmail}
            type="email"
          />
        </Col>
        {emailvalid && (
          <div className="red-text" style={{ marginLeft: "10px" }}>
            format email salah
          </div>
        )}
      </Row>

      <Row justify="space-between" className="container-button-nasabah">
        <Col>
          <Button
            className="button-footer"
            type="primary"
            onClick={() => {
              props.prevStep();
            }}
          >
            Kembali
          </Button>
        </Col>
        <Col span={6} className="button-next-about">
          <Button
            disabled={onValidate()}
            loading={loading}
            className="button-footer"
            type="primary"
            onClick={() => {
              setEmailValid(false);
              if (!emailvalidregex.test(companyEmail)) {
                console.log("salah");
                setEmailValid(true);
              } else {
                setLoading(true);
                let body = {
                  industryType: auth.industryType,
                  industryName: auth.industryName,
                  npwpNumber: auth.npwpNumber,
                  phoneNumber: companyPhone,
                  emailAddr: companyEmail,
                };
                checkCustomer(body).then((data) => {
                  if (data.success) {
                    props.nextStep();
                  } else {
                    console.log("nasabah : ", data);
                    setLoading(false);
                  }
                });
              }
            }}
          >
            Selanjutnya
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default NasabahContainer;
