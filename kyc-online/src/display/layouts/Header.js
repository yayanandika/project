import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Row, Col } from "antd";
import Steps, { Step } from "rc-steps";
import logo from "../../assets/images/general/cimb-logo-white trim.png";
import "rc-steps/assets/index.css";
import "../../assets/css/header.scss";

import { CHANGE_STEP } from "../../store/actions/StepperAction";

const { Header } = Layout;

const HeaderLayout = props => {
  const dispatch = useDispatch();
  const header = [
    {
      title: <span>Detail perusahaan</span>
    },
    {
      title: <span>Data Produk</span>
    },
    {
      title: <i>Stakeholders Management</i>
    },
    {
      title: (
        <span>
          BizChannel & <br /> <i>e-statement</i>
        </span>
      )
    },
    {
      title: (
        <span>
          <i>Upload</i> dokumen
        </span>
      )
    },
    {
      title: <span>Sedikit lagi!</span>
    },
    {
      title: (
        <span>
          RM <i>visit</i>
        </span>
      )
    }
  ];
  const step = useSelector(state => state.stepper);
  const [isStepper, setStepper] = useState(false);
  const lastStep = step.lastStep;
  const currentStep = step.step;

  useEffect(() => {
    setStepper(step.stepHeader);
  }, [step.stepHeader]);

  const changeStep = index => {
    dispatch({ type: CHANGE_STEP, index });
  };

  return (
    <Header
      style={{
        background:
          "-webkit-linear-gradient(top, #c4161c, #ad1319, #961116, #800e13, #6b0c0f)",
        height: isStepper ? "136px" : "56px",
        lineHeight: "10px",
        position: "fixed",
        zIndex: 1,
        width: "100%"
      }}
    >
      <img
        src={logo}
        alt="cimb logo"
        height="26px"
        style={{ marginTop: "15px" }}
      />
      {isStepper && (
        <Row style={{ marginTop: "7px", minHeight: "82px" }}>
          <Col span={24} style={{ minHeight: "72px" }}>
            <Steps
              labelPlacement="vertical"
              current={currentStep}
              size="small"
              onChange={index => {
                console.log("ini ke : ", index);
                changeStep(index);
                //setCurrentStep(index);
              }}
            >
              {header.map((data, index) => {
                return (
                  <Step
                    key={index}
                    className={lastStep === index ? "is-last" : ""}
                    title={data.title}
                    status={
                      lastStep >= index
                        ? currentStep === index
                          ? ""
                          : "finish"
                        : ""
                    }
                    disabled={lastStep >= index ? false : true}
                  />
                );
              })}
            </Steps>
          </Col>
          <Col
            span={24}
            style={{
              padding: 0,
              textAlign: "right",
              color: "#fff",
              fontSize: "13px"
            }}
          >
            No. Referensi: 3456789012
          </Col>
        </Row>
      )}
    </Header>
  );
};

export default HeaderLayout;
