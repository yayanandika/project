import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Radio,
  Select,
  Input,
  Checkbox,
  Upload
} from "antd";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import "./StakeHolderModal.scss";

const { Option } = Select;
const { Dragger } = Upload;

const ReceiverModal = props => {
  const [partOf, setPartOf] = useState(undefined);
  const [position, setPosition] = useState(undefined);
  const [isTransaction, setTransaction] = useState(false);
  const [nationality, setNationality] = useState(undefined);
  const [gender, setGender] = useState(undefined);

  const onChange = checkedValues => {
    setPosition(checkedValues);
    if (checkedValues.includes("transaksi")) {
      setTransaction(true);
    } else {
      setTransaction(false);
    }
    console.log(position);
  };

  return (
    <Modal
      maskClosable={false}
      width={740}
      title={<span>Tambah Penerima Kuasa</span>}
      visible={props.visibility}
      closeIcon={
        <CloseOutlined
          style={{
            color: "#DA3832",
            fontSize: "20px",
            marginRight: "20px",
            marginTop: "20px"
          }}
        />
      }
      onCancel={() => {
        props.closeModal();
      }}
      footer={[
        <Button
          style={{ minWidth: "150px", minHeight: "40px", fontSize: "15px" }}
          key="submit"
          type="primary"
          onClick={() => {
            props.closeModal();
          }}
        >
          Tambah
        </Button>
      ]}
    >
      <span className="red-text">*</span> wajib diisi
      <div className="title-selection">
        <Row style={{ lineHeight: "30px" }}>
          <Col span={24}>
            Apakah penerima kuasa merupakan bagian dari <i>Stakeholder</i>?:
            <span className="red-text">*</span>
          </Col>
          <Col span={24}>
            <Radio.Group
              onChange={e => {
                setPartOf(e.target.value);
              }}
              value={partOf}
              style={{width:"70%"}}
            >
              <Radio value={"ya"}>Ya</Radio>
              <Radio value={"tidak"} style={{float:"right"}}>Tidak</Radio>
            </Radio.Group>
          </Col>
        </Row>

        {partOf === "ya" && (
          <div>
            <Row>
              <Col span={10}>
                Nama:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Select
                  defaultValue={undefined}
                  style={{ width: "100%" }}
                  onChange={() => {
                    console.log(123);
                  }}
                  placeholder="Pilih nama dari stakeholders"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">ching chong</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </Col>
            </Row>

            <Row align="middle">
              <Col span={10}>
                Jabatan:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Checkbox.Group onChange={onChange}>
                  <Checkbox value="konfirmasi">Konfirmasi</Checkbox>
                  <br />
                  <Checkbox value="transaksi">Transaksi</Checkbox>
                </Checkbox.Group>
              </Col>
            </Row>

            {isTransaction && (
              <Row>
                <Col span={10}>
                  Specimen Produk:<span className="red-text">*</span>
                </Col>
                <Col span={14}>
                  <Select
                    mode="multiple"
                    defaultValue={undefined}
                    style={{ width: "100%" }}
                    onChange={value => {
                      console.log(value);
                    }}
                    placeholder="Pilih jenis produk Anda"
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="ching chong">ching chong</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </Col>
              </Row>
            )}
          </div>
        )}

        {partOf === "tidak" && (
          <div>
            <Row>
              <Col span={10}>
                Nama:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Input placeholder="Nama sesuai KTP" />
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                Kewarganegaraan:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Radio.Group
                  onChange={e => {
                    setNationality(e.target.value);
                  }}
                  value={nationality}
                >
                  <Radio value={"wni"}>WNI</Radio>
                  <Radio value={"wna"}>WNA</Radio>
                </Radio.Group>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                Jenis Kelamin:<span className="red-text">*</span>
              </Col>
              <Col span={14}>
                <Radio.Group
                  onChange={e => {
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
                    {nationality === "wni" ? "No. KTP:" : "No. Passport:"}
                    <span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Input
                      placeholder={
                        nationality === "wni"
                          ? "16 digit"
                          : "Sesuai kewarganegaraan"
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    {nationality === "wni" ? " No. NPWP:" : "No. TIN:"}
                    <span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Input
                      placeholder={
                        nationality === "wni"
                          ? "xx.xxx.xxx.x-xxx.xxx"
                          : "Sesuai kewarganegaraan"
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    No. Handphone:<span className="red-text">*</span>
                  </Col>
                  <Col>
                    <Input addonBefore="+62" />
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    No. Telepon Kantor:<span className="red-text">*</span>
                  </Col>
                  <Col>
                    <Input addonBefore="+62" />
                  </Col>
                </Row>

                <Row align="middle">
                  <Col span={10}>
                    Jenis Kuasa:<span className="red-text">*</span>
                  </Col>
                  <Col span={14}>
                    <Checkbox.Group onChange={onChange}>
                      <Checkbox value="konfirmasi">Konfirmasi</Checkbox>

                      <Checkbox value="transaksi">Transaksi</Checkbox>
                    </Checkbox.Group>
                  </Col>
                </Row>

                {isTransaction && (
                  <Row>
                    <Col span={10}>
                      Specimen Produk:<span className="red-text">*</span>
                    </Col>
                    <Col span={14}>
                      <Select
                        mode="multiple"
                        defaultValue={undefined}
                        style={{ width: "100%" }}
                        onChange={value => {
                          console.log(value);
                        }}
                        placeholder="Pilih jenis produk Anda"
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="ching chong">ching chong</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </Col>
                  </Row>
                )}

                <Row style={{ lineHeight: "20px", marginTop: "20px" }}>
                  <Col span={12}>
                    <Col>
                      <i>Upload</i>
                      {nationality === "wni" ? "KTP:" : "Passport:"}
                      <span className="red-text">*</span>
                      <br />
                      <span style={{ fontSize: "15px", color: "#797979" }}>
                        (.pdf, .png, .jpg, max 2 MB)
                      </span>
                    </Col>
                    <Col style={{ padding: "10px 10px 10px 0" }}>
                      <Dragger>
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
                      <i>Upload</i> {nationality === "wni" ? "NPWP:" : "TIN:"}
                      <span className="red-text">*</span>
                      <br />
                      <span style={{ fontSize: "15px", color: "#797979" }}>
                        (.pdf, .png, .jpg, max 2 MB)
                      </span>
                    </Col>
                    <Col style={{ padding: "10px 0 10px 0" }}>
                      <Dragger>
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
    </Modal>
  );
};

export default ReceiverModal;
