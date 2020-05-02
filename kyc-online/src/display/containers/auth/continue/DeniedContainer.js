import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./LogReffContainer.scss";

import denied from "../../../../assets/images/general/error_page.png"

const DeniedContainer = (props) => {
  return (
    <Row className="container-otp">
      <Col span={24}>
        <img
          src={denied}
          alt="triangle with all three sides equal"
          height="100"
          width="100"
          style={{marginBottom:"40px"}}
        />
        <div className="title-otp black-text">
          Mohon maaf, Anda tidak bisa melanjutkan <br /> pengisian aplikasi
        </div>
        <div className="sub-title-otp light-text">
          Anda telah memasukkan kode OTP sebanyak lima kali. Anda harus menunggu
          <br />
          selama 24 jam untuk dapat mengakses kembali aplikasi ini.
        </div>
        <Link to="/">
          <Button className="button-footer" type="primary">
            Keluar
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default DeniedContainer;
