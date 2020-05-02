import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Radio,
  Input,
  DatePicker,
  ConfigProvider,
  Checkbox,
  InputNumber,
  Upload,
} from "antd";
import MaskedInput from "antd-mask-input";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import id_ID from "antd/lib/locale-provider/id_ID";
import "./StakeHolderModal.scss";
import moment from "moment";
import "moment/locale/id";

import {
  addStakeHolder,
  updateStakeHolder,
} from "../../../services/stakeholder/Stakeholder";

moment.locale("id");

const { Dragger } = Upload;

const StakeHolderModal = (props) => {
  const [stakeHolderType, setStakeType] = useState(undefined);
  const [corporateName, setCorporateName] = useState(undefined);
  const [fullName, setFullName] = useState(undefined);
  const [dob, setDob] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const [identSerialNum, setId] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState(undefined);
  const [npwpNumber, setNpwpNumber] = useState(undefined);
  //const [address, setAddress] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [jobPosition, setJobPosition] = useState([]);
  const [nationality, setNationality] = useState(undefined);
  const [isShareHolder, setShareHolder] = useState(false);
  const [ownership, setOwnership] = useState(undefined);
  const [loading, setloading] = useState(false);

  //upload doc
  const [idDoc, setIdDoc] = useState([]);
  const [npwpDoc, setNpwpDoc] = useState([]);

  useEffect(() => {
    if (props.data !== null) {
      var data = props.data;
      console.log(data);
      setStakeType(data.type);
      setFullName(data.fullName);
      setDob(data.dob);
      setGender(data.gender);
      setId(data.identSerialNum);
      setPhoneNumber(data.phoneNumber);
      setNpwpNumber(data.npwpNumber);
      setEmail(data.emailAddr);
      setJobPosition(data.jobPosition);
      setNationality(data.nationality);
      setOwnership(data.ownership);
      setCorporateName(data.corporateName);
    }
  }, [props.data]);

  const resetForm = () => {
    setTimeout(() => {
      setStakeType(undefined);
      setFullName(undefined);
      setDob(undefined);
      setGender(undefined);
      setId(undefined);
      setPhoneNumber(undefined);
      setNpwpNumber(undefined);
      setEmail(undefined);
      setJobPosition([]);
      setNationality(undefined);
      setOwnership(undefined);
      setIdDoc([]);
      setNpwpDoc([]);
    }, 500);
  };

  const onValidate = () => {
    if (stakeHolderType === "I") {
      if (
        stakeHolderType === undefined ||
        fullName === "" ||
        dob === "" ||
        gender === undefined ||
        identSerialNum === "" ||
        phoneNumber === "" ||
        npwpNumber === "" ||
        email === "" ||
        jobPosition.length === 0 ||
        nationality === undefined ||
        idDoc.length === 0 ||
        npwpDoc.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (ownership <= 25) {
        if (corporateName === "" || corporateName === undefined) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          stakeHolderType === undefined ||
          corporateName === "" ||
          fullName === "" ||
          dob === "" ||
          gender === undefined ||
          identSerialNum === "" ||
          phoneNumber === "" ||
          npwpNumber === "" ||
          email === "" ||
          nationality === undefined ||
          idDoc.length === 0 ||
          npwpDoc.length === 0
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const propsIdUpload = {
    accept: ".pdf,.png,.jpg",
    multiple: false,
    onRemove: (file) => {
      const index = idDoc.indexOf(file);
      const newFileList = idDoc.slice();
      newFileList.splice(index, 1);
      setIdDoc(newFileList);
    },
    beforeUpload: (file) => {
      setIdDoc([...idDoc, file]);
      return false;
    },
    onChange: (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setIdDoc(fileList);
    },
    fileList: idDoc,
  };

  const propsNpwpUpload = {
    accept: ".pdf,.png,.jpg",
    multiple: false,
    onRemove: (file) => {
      const index = npwpDoc.indexOf(file);
      const newFileList = npwpDoc.slice();
      newFileList.splice(index, 1);
      setNpwpDoc(newFileList);
    },
    beforeUpload: (file) => {
      setNpwpDoc([...npwpDoc, file]);
      return false;
    },
    onChange: (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      setNpwpDoc(fileList);
    },
    fileList: npwpDoc,
  };

  function disabledDate(current) {
    // Cannot select days after today and today
    return current && current > moment().endOf("day");
  }

  return (
    <Modal
      maskClosable={false}
      width={740}
      title={
        <span>
          Tambah <i>Stakeholder</i>
        </span>
      }
      visible={props.visibility}
      closeIcon={
        <CloseOutlined
          style={{
            color: "#DA3832",
            fontSize: "20px",
            marginRight: "20px",
            marginTop: "20px",
          }}
        />
      }
      onCancel={() => {
        props.closeModal();
        resetForm();
      }}
      footer={[
        <Button
          style={{ minWidth: "150px", minHeight: "40px", fontSize: "15px" }}
          key="submit"
          type="primary"
          loading={loading}
          disabled={onValidate()}
          onClick={() => {
            setloading(true);
            let data;
            let formdata;
            if (stakeHolderType === "I") {
              data = {
                fullName: fullName,
                dob: dob,
                gender: gender,
                nationality: nationality,
                identSerialNum: identSerialNum,
                phoneNumber: "0" + phoneNumber,
                npwpNumber: npwpNumber,
                emailAddr: email,
                jobPosition: jobPosition,
                type: stakeHolderType,
                ownership: jobPosition.includes("S") ? ownership + "%" : null,
              };
              formdata = new FormData();
              formdata.append("identFile", idDoc);
              formdata.append("npwpFile", npwpDoc);
            } else {
              if (ownership >= 25) {
                data = {
                  corporateName: corporateName,
                  fullName: fullName,
                  dob: dob,
                  gender: gender,
                  nationality: nationality,
                  identSerialNum: identSerialNum,
                  phoneNumber: "0" + phoneNumber,
                  npwpNumber: npwpNumber,
                  emailAddr: email,
                  type: stakeHolderType,
                  ownership: ownership,
                  jobPosition: ["I"],
                };
                formdata = new FormData();
                formdata.append("identFile", idDoc);
                formdata.append("npwpFile", npwpDoc);
              } else {
                data = {
                  corporateName: corporateName,
                  ownership: ownership,
                  jobPosition: ["I"],
                  type: stakeHolderType,
                };
              }
            }

            if (props.data !== null) {
              data.id = props.data.id;

              console.log(data);

              updateStakeHolder(data).then((data) => {
                console.log(data);
                setloading(false);
                props.onSubmit(data, formdata);
                props.closeModal();
                resetForm();
              });
            } else {
              addStakeHolder(data, formdata).then((data) => {
                console.log(data);
                setloading(false);
                props.onSubmit(data, formdata);
                props.closeModal();
                resetForm();
              });
            }
          }}
        >
          {props.data !== null ? "Update" : "Tambah"}
        </Button>,
      ]}
    >
      <span className="red-text">*</span> wajib diisi
      <div className="title-selection">
        <Row>
          <Col span={10}>
            Jenis <i>Stakeholder</i>:<span className="red-text">*</span>
          </Col>
          <Col span={14}>
            <Radio.Group
              onChange={(e) => {
                setStakeType(e.target.value);
                setOwnership(0);
              }}
              value={stakeHolderType}
            >
              <Radio value={"I"}>Individual</Radio>
              <Radio value={"C"}>Korporat</Radio>
            </Radio.Group>
          </Col>
        </Row>

        {stakeHolderType === "I" && (
          <div>
            <Row>
              <Col span={10}>
                Nama:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Input
                  placeholder="Nama sesuai KTP"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                Kewarganegaraan:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Radio.Group
                  onChange={(e) => {
                    setNationality(e.target.value);
                    setId(undefined);
                    setNpwpNumber(undefined);
                  }}
                  value={nationality}
                >
                  <Radio value={"WNI"}>WNI</Radio>
                  {/* <Radio value={"wna"}>WNA</Radio> */}
                </Radio.Group>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                Jenis Kelamin:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Radio.Group
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                >
                  <Radio value={"Male"}>Laki-laki</Radio>
                  <Radio value={"Female"}>Perempuan</Radio>
                </Radio.Group>
              </Col>
            </Row>

            {nationality !== undefined && (
              <div>
                <Row>
                  <Col span={10}>
                    {nationality === "WNI" ? "No. KTP:" : "No. Passport:"}
                    <span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Input
                      maxLength={nationality === "WNI" ? 16 : 9}
                      onChange={(e) => {
                        if (nationality === "WNI") {
                          setId(e.target.value.replace(/[^0-9]/g, ""));
                        } else {
                          setId(e.target.value.toUpperCase());
                        }
                      }}
                      value={identSerialNum}
                      placeholder={
                        nationality === "WNI"
                          ? "16 digit"
                          : "Sesuai kewarganegaraan"
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    {nationality === "WNI" ? " No. NPWP:" : "No. TIN:"}
                    <span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    {nationality === "WNI" ? (
                      <MaskedInput
                        mask="11.111.111.1-111.111"
                        placeholder="xx.xxx.xxx.x-xxx.xxx"
                        onChange={(e) => setNpwpNumber(e.target.value)}
                        value={npwpNumber}
                      />
                    ) : (
                      <Input
                        onChange={(e) => setNpwpNumber(e.target.value)}
                        placeholder={"Sesuai kewarganegaraan"}
                        value={npwpNumber}
                      />
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    Tanggal Lahir:<span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <ConfigProvider locale={id_ID}>
                      <DatePicker
                        placeholder={"YYYY-MM-DD"}
                        disabledDate={disabledDate}
                        format={"YYYY-MM-DD"}
                        showToday={false}
                        defaultValue={
                          dob === undefined
                            ? undefined
                            : moment(dob, "YYYY-MM-DD")
                        }
                        onChange={(date, dateString) => setDob(dateString)}
                      />
                    </ConfigProvider>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    Nomor Handphone:<span className="red-text">*</span>
                  </Col>
                  <Col>
                    <Input
                      maxLength="11"
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      value={phoneNumber}
                      addonBefore="+62"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    E-mail:<span className="red-text">*</span>
                  </Col>
                  <Col>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contoh@mail.com"
                      value={email}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    Jabatan:<span className="red-text">*</span>
                  </Col>
                  <Col style={{ lineHeight: "28px" }}>
                    <Checkbox.Group
                      onChange={(checkedValues) => {
                        setJobPosition(checkedValues);
                        if (checkedValues.includes("S")) {
                          setShareHolder(true);
                        } else {
                          setShareHolder(false);
                        }
                      }}
                      value={jobPosition}
                    >
                      <Checkbox value="D">Direktur</Checkbox>
                      <br />
                      <Checkbox value="K">Komisioner</Checkbox>
                      <br />
                      <span>
                        <Checkbox value="S">
                          <i>Shareholder</i>
                        </Checkbox>
                        <InputNumber
                          disabled={!isShareHolder}
                          size="small"
                          defaultValue={0}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value) => value.replace("%", "")}
                          onChange={(value) => setOwnership(value)}
                          value={ownership}
                        />
                        <span
                          style={{ fontWeight: "lighter", fontSize: "15px" }}
                        >
                          share
                        </span>
                      </span>
                    </Checkbox.Group>
                  </Col>
                </Row>

                <Row style={{ lineHeight: "20px", marginTop: "20px" }}>
                  <Col span={12}>
                    <Col>
                      <i>Upload</i>{" "}
                      {nationality === "WNI" ? "KTP:" : "Passport:"}
                      <span className="red-text">*</span>
                      <br />
                      <span style={{ fontSize: "15px", color: "#797979" }}>
                        (.pdf, .png, .jpg, max 2 MB)
                      </span>
                    </Col>
                    <Col style={{ padding: "10px 10px 10px 0" }}>
                      <Dragger {...propsIdUpload}>
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined style={{ fontSize: "24px" }} />
                        </p>
                        <p className="ant-upload-text">
                          Klik untuk upload data
                        </p>
                      </Dragger>
                    </Col>
                  </Col>
                  <Col span={12}>
                    <Col>
                      <i>Upload</i> {nationality === "WNI" ? "NPWP:" : "TIN:"}
                      <span className="red-text">*</span>
                      <br />
                      <span style={{ fontSize: "15px", color: "#797979" }}>
                        (.pdf, .png, .jpg, max 2 MB)
                      </span>
                    </Col>
                    <Col style={{ padding: "10px 0 10px 0" }}>
                      <Dragger {...propsNpwpUpload}>
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined style={{ fontSize: "24px" }} />
                        </p>
                        <p className="ant-upload-text">
                          Klik untuk upload data
                        </p>
                      </Dragger>
                    </Col>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        )}

        {stakeHolderType === "C" && (
          <div>
            <Row>
              <Col span={10}>
                Nama Perusahaan:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Input
                  placeholder="Sesuai Akta Pendirian"
                  onChange={(e) => setCorporateName(e.target.value)}
                  value={corporateName}
                />
                <Col>
                  <i>Shareholder</i> {"  "}
                  <InputNumber
                    size="small"
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace("%", "")}
                    onChange={(value) => setOwnership(value)}
                    value={ownership}
                  />
                  <span style={{ fontWeight: "lighter", fontSize: "15px" }}>
                    share
                  </span>
                </Col>
              </Col>
            </Row>

            {ownership >= 25 && (
              <div>
                <Row>
                  <Col span={10}>
                    Nama Pengendali Akhir:<span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Input
                      placeholder="Nama sesuai KTP"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    Kewarganegaraan:<span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Radio.Group
                      onChange={(e) => {
                        setNationality(e.target.value);
                      }}
                      value={nationality}
                    >
                      <Radio value={"WNI"}>WNI</Radio>
                      {/* <Radio value={"wna"}>WNA</Radio> */}
                    </Radio.Group>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    Jenis Kelamin:<span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Radio.Group
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      value={gender}
                    >
                      <Radio value={"laki-laki"}>Laki-laki</Radio>
                      <Radio value={"perempuan"}>Perempuan</Radio>
                    </Radio.Group>
                  </Col>
                </Row>

                {nationality !== undefined && (
                  <div>
                    <Row>
                      <Col span={10}>
                        {nationality === "WNI" ? "No. KTP:" : "No. Passport:"}
                        <span className="red-text">*</span>
                      </Col>
                      <Col span={14}>
                        <Input
                          placeholder={
                            nationality === "WNI"
                              ? "16 digit"
                              : "Sesuai kewarganegaraan"
                          }
                          onChange={(e) => setId(e.target.value)}
                          value={identSerialNum}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
                        {nationality === "WNI" ? " No. NPWP:" : "No. TIN:"}
                        <span className="red-text">*</span>
                      </Col>
                      <Col span={14}>
                        <Input
                          placeholder={
                            nationality === "WNI"
                              ? "xx.xxx.xxx.x-xxx.xxx"
                              : "Sesuai kewarganegaraan"
                          }
                          onChange={(e) => setNpwpNumber(e.target.value)}
                          value={npwpNumber}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
                        Tanggal Lahir:<span className="red-text">*</span>
                      </Col>
                      <Col span={14}>
                        <ConfigProvider locale={id_ID}>
                          <DatePicker
                            disabledDate={disabledDate}
                            format={"DD-MM-YYYY"}
                            showToday={false}
                            defaultValue={
                              dob === undefined
                                ? undefined
                                : moment(dob, "YYYY-MM-DD")
                            }
                            onChange={(date, dateString) => setDob(dateString)}
                          />
                        </ConfigProvider>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
                        Nomor Handphone:<span className="red-text">*</span>
                      </Col>
                      <Col>
                        <Input
                          addonBefore="+62"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col span={10}>
                        E-mail:<span className="red-text">*</span>
                      </Col>
                      <Col>
                        <Input
                          placeholder="contoh@mail.com"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </Col>
                    </Row>

                    <Row style={{ lineHeight: "20px", marginTop: "20px" }}>
                      <Col span={12}>
                        <Col>
                          <i>Upload</i>{" "}
                          {nationality === "WNI" ? "KTP:" : "Passport:"}
                          <span className="red-text">*</span>
                          <br />
                          <span style={{ fontSize: "15px", color: "#797979" }}>
                            (.pdf, .png, .jpg, max 2 MB)
                          </span>
                        </Col>
                        <Col style={{ padding: "10px 10px 10px 0" }}>
                          <Dragger {...propsIdUpload}>
                            <p className="ant-upload-drag-icon">
                              <UploadOutlined style={{ fontSize: "24px" }} />
                            </p>
                            <p className="ant-upload-text">
                              Klik untuk upload data
                            </p>
                          </Dragger>
                        </Col>
                      </Col>
                      <Col span={12}>
                        <Col>
                          <i>Upload</i>{" "}
                          {nationality === "WNI" ? "NPWP:" : "TIN:"}
                          <span className="red-text">*</span>
                          <br />
                          <span style={{ fontSize: "15px", color: "#797979" }}>
                            (.pdf, .png, .jpg, max 2 MB)
                          </span>
                        </Col>
                        <Col style={{ padding: "10px 0 10px 0" }}>
                          <Dragger {...propsNpwpUpload}>
                            <p className="ant-upload-drag-icon">
                              <UploadOutlined style={{ fontSize: "24px" }} />
                            </p>
                            <p className="ant-upload-text">
                              Klik untuk upload data
                            </p>
                          </Dragger>
                        </Col>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default StakeHolderModal;
