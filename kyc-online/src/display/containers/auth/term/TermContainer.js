import React, { useState, useEffect } from "react";
import { Row, Col, Collapse, Checkbox, Button, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./TermContainer.scss";

import { getTerm1, getTerm2 } from "../../../../services/parameter/Parameter";

const { Panel } = Collapse;

const header = (
  <span>
    Mohon untuk menyiapkan <i>softcopy</i> dokumen perusahaan Anda:
  </span>
);

const TermContainer = (props) => {
  const [isChecked, setChecked] = useState(false);
  const [term1, setTerm1] = useState(undefined);
  const [term2, setTerm2] = useState(undefined);

  useEffect(() => {
    getTerm1().then((data) => {
      setTerm1(data);
      getTerm2().then((data) => {
        setTerm2(data);
      });
    });
  }, []);

  return (
    <div className="container-term">
      <Row>
        <Col span={24} className="title-term black-text">
          Terima kasih telah memilih CIMB Niaga untuk rekening perusahaan Anda
        </Col>
        <Col span={24} className="sub-title-term light-text">
          Untuk melanjutkan proses pembukaan rekening perusahaan Anda, pastikan
          Anda telah membaca syarat dan ketentuan berlaku agar proses pembuatan
          rekening dapat berjalan dengan lancar.
        </Col>
        <Col className="title-content-term black-text">
          Pastikan bahwa Perusahaan Anda:
        </Col>
      </Row>
      <Col className="sub-title-term black-text">
        {term1 === undefined && (
          <div>
            <Spin />
          </div>
        )}
        {term1 !== undefined &&
          term1.map((data, index) => {
            return (
              <div key={data.id}>
                {index + 1}. {data.value}
              </div>
            );
          })}
      </Col>
      <Col span={24}>
        <Col span={20} style={{ minHeight: "150px" }}>
          <Collapse
            bordered={false}
            expandIconPosition={"right"}
            expandIcon={({ isActive }) => (
              <DownOutlined
                rotate={isActive ? 180 : 0}
                className="collapse-icon-term"
              />
            )}
            className="collapse-term"
          >
            <Panel header={header} className="panel-term">
              {term2 === undefined && <Spin />}
              {term2 !== undefined &&
                term2.map((data, index) => {
                  return (
                    <div key={data.id}>
                      {index + 1}. {data.value}
                    </div>
                  );
                })}
            </Panel>
          </Collapse>
        </Col>
      </Col>
      <Row justify="space-between" className="container-checkbox-term">
        <Col>
          <Checkbox
            checked={isChecked}
            onChange={() => {
              setChecked(!isChecked);
            }}
          >
            Saya menyetujui bahwa perusahaan saya adalah perusahaan Indonesia
            dan berlokasi di Indonesia
          </Checkbox>
        </Col>
        <Col className="button-next-term">
          <Button
            style={{ alignItems: "flex-end" }}
            disabled={!isChecked || term1 === undefined || term2 === undefined}
            className="button-footer"
            type="primary"
            onClick={() => {
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

export default TermContainer;
