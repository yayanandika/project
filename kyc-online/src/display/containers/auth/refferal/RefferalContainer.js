import React from "react";
import { Row, Col, Button, message } from "antd";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./RefferalContainer.scss";

const RefferalContainer = props => {
  return (
    <div className="container-refferal">
      <Row align="middle">
        <Col span={24}>
          <div className="title-refferal black-text">
            Harap menyimpan nomor referensi aplikasi pembukaan rekening Anda
          </div>
          <div className="sub-title-refferal light-text">
            Kami juga mengirimkan nomor referensi ke email Admin Nasabah.
            Silahkan log in menggunakan nomor referensi dan e-mail Admin Nasabah
            untuk melanjutkan aplikasi. Jika memiliki pertanyaan silahkan
            menghubungi Relationship Manager Anda.
          </div>
        </Col>
        <Col span={24}>
          <div className="refferal-number">
            1234567890
            <CopyToClipboard
              text={"1234567890"}
              onCopy={() => {
                message.success("Nomor Referensi Tersalin", 3);
              }}
            >
              <span className="copy-refferal">COPY</span>
            </CopyToClipboard>
          </div>
        </Col>
        <Col span={24}>
          <Link to="/ntb">
            <Button className="button-footer" type="primary">
              Masuk
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default RefferalContainer;
