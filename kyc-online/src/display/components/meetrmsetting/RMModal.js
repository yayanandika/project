import React from 'react';
import { 
    Row,Col,Button,Modal
} from 'antd';
import "./RMModal.scss";
import errorpage_img from '../../../assets/images/general/error_page.png'


const RMModal = props => {
    const handleadd = () => {
        props.onClickBtn();
    }
    return (
        <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        footer={null}
        width={"613px"}
        closeIcon={false}
        closable={false}
        centered
        className="modalcustom_rmdate"
        >
            <div className="container-poprm">
            <Row type="flex" justify="space-around" className="img-error-page">
                <img src={errorpage_img}
                alt="error!"/>
            </Row>
            <Row>
                <Col span={15}
                className="title-poprm black-text">
                    Oops, mohon maaf!
                </Col>
            </Row>
            <Row>
                <Col span={24}
                className="sub-title-poprm black-text">
                    Anda belum bisa mengakses halaman ini karena ada dokumen yang belum anda <i>upload.</i> <br/>
                    Periksa kembali kelengkapan dokumen yang Anda <i>upload.</i>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col className="button-poprm">
                    <Button type="primary" className="button-footer" onClick={handleadd}>Ke halaman Upload</Button>
                </Col>
            </Row>
            </div>
        </Modal>
    );
};

export default RMModal;