import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Select, Input, Button, Tooltip, Spin } from "antd";
import { CaretDownFilled, InfoCircleOutlined } from "@ant-design/icons";
import MaskedInput from "antd-mask-input";
import "./AboutContainer.scss";

import { SET_ABOUT } from "../../../../store/actions/AuthAction";

import { getCompanyType } from "../../../../services/parameter/Parameter";

const { Option } = Select;

const AboutContainer = (props) => {
  const dispatch = useDispatch();
  const [companyType, setCompanyType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nwpwNumber, setNpwp] = useState("");
  const [companyTypeList, setList] = useState(undefined);

  useEffect(() => {
    getCompanyType().then((data) => {
      setList(data);
    });
  }, []);

  const onValidate = () => {
    if (companyType === "" || companyName === "" || nwpwNumber === "") {
      return true;
    } else {
      return false;
    }
  };

  function onChangeType(val) {
    setCompanyType(val);
  }

  function onChangeName(val) {
    setCompanyName(val.target.value);
  }

  function onChangeNpwp(val) {
    var string = val.target.value;
    setNpwp(string.replace(/[^0-9]/g, ""));
  }

  const text = (
    <span>
      Mohon menuliskan perusahaan Anda tanpa PT./CV/dll. <br /> Contoh: Laris
      Manis Bersama
    </span>
  );

  return (
    <div className="container-about">
      <Row>
        <Col span={24} className="title-about black-text">
          Tentang Perusahaan Anda
        </Col>
        <Col span={24} className="sub-title-about light-text">
          Silahkan memasukkan nama dan jenis perusahaan Anda
        </Col>
        <Col className="title-content-about light-text">
          <span className="red-text">*</span> wajib diisi
        </Col>
      </Row>

      <Row className="title-selection-about black-text" align="middle">
        <Col lg={7}>
          Jenis Perusahaan Anda:<span className="red-text">*</span>
        </Col>
        <Col lg={8}>
          {companyTypeList === undefined && <Spin />}
          {companyTypeList !== undefined && (
            <Select
              suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
              placeholder="Pilih Jenis Perusahaan"
              onChange={onChangeType}
              style={{
                minWidth: "265px",
                maxWidth: "265px",
                borderRadius: "3px",
                fontWeight: "normal",
              }}
            >
              {companyTypeList.map((data) => {
                return <Option key={data.code} value={data.value}>{data.value}</Option>;
              })}
            </Select>
          )}
        </Col>
      </Row>
      <Row className="title-selection-about black-text" align="middle">
        <Col lg={7} style={{ marginTop: "4px" }}>
          Nama Perusahaan Anda:<span className="red-text">*</span>
        </Col>
        <Col lg={8}>
          <Input
            placeholder="Nama sesuai Akta Pendirian"
            onChange={onChangeName}
          />
        </Col>
        <Col>
          <Tooltip placement="right" title={text}>
            <InfoCircleOutlined
              style={{ fontSize: "25px", color: "#DA3832", marginLeft: "10px" }}
            />
          </Tooltip>
        </Col>
      </Row>
      <Row className="title-selection-about black-text" align="middle">
        <Col lg={7} style={{ marginTop: "4px" }}>
          Nomor NPWP:<span className="red-text">*</span>
        </Col>
        <Col lg={8}>
          <MaskedInput
            mask="11.111.111.1-111.111"
            placeholder="xx.xxx.xxx.x-xxx.xxx"
            style={{ maxWidth: "265px" }}
            onChange={onChangeNpwp}
          />
        </Col>
      </Row>
      <Row justify="space-between" className="container-button-about">
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
            className="button-footer"
            type="primary"
            onClick={() => {
              dispatch({
                type: SET_ABOUT,
                companyName,
                companyType,
                nwpwNumber,
              });
              props.nextStep();
            }}
          >
            Selanjutnya
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AboutContainer;
