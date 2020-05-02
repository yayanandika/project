import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import "./LandingContainer.scss";

const LandingContainer = props => {
  return (
    <div className="background-landing">
      <Row
        justify="center"
        align="middle"
        className="container-landing white-text"
      >
        <Col>
          <Row>
            <Col className="title-landing">
              Selamat Datang di <br />
              Pembukaan Rekening Bisnis <br />
              CIMB Niaga
            </Col>
          </Row>
          <Row gutter={[48, 10]} align="middle">
            <Col md={10} lg={8}>
              <Button
                type="primary"
                className="button-landing"
                onClick={() => {
                  props.nextStep();
                }}
              >
                Buka rekening baru
              </Button>
              <div className="button-title-landing">
                Saya ingin memulai pembukaan rekening baru
              </div>
            </Col>
            <Col md={10} lg={8}>
              <Link to="/cont">
                <Button className="button-landing-hover">
                  Lanjutkan isi form
                </Button>
              </Link>
              <div className="button-title-landing">
                Saya ingin melanjutkan pengisian aplikasi
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LandingContainer;
