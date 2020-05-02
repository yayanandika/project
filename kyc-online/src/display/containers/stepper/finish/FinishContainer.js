import React from 'react';
import { 
    Row,Col,Button
} from 'antd';
import "./FinishContainer.scss";
import done_img from '../../../../assets/images/general/last_page_done.png'


const FinishContainer = props => {

    const handleFinish = () => {
        props.finishStep();
    }

    return (
        <div className="container-finish">
            <Row type="flex" justify="space-around" className="img-done">
                <img src={done_img}
                alt="Selesai!"/>
            </Row>
            <Row>
                <Col xs={12} sm={16} md={22} lg={13} xl={11}
                className="title-finish black-text">
                    Selamat, Anda telah <br/>menyelesaikan proses registrasi!
                </Col>
            </Row>
            <Row>
                <Col xs={20} sm={20} md={18} lg={16} xl={14}
                className="sub-title-finish light-text">
                    RM Anda akan segera menghubungi Anda untuk melanjutkan proses verifikasi, 
                    KYC dan autentikasi untuk pembukaan rekening Anda.
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col className="container-button">
                    <Button type="primary" className="button-footer" onClick={handleFinish}>Keluar</Button>
                </Col>
            </Row>
                
        </div>
    );
};

export default FinishContainer;