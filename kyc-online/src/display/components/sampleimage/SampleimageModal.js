import React, {useState,useEffect} from 'react';
import "./SampleimageModal.scss";
import { 
    Modal,Row,Col
} from 'antd';

const SampleimageModal = props => {
    
    const [simg, setsimg] = useState(0);
    const [flgload, setflgload] = useState(0);
    
    const resetForm = () => {
        setTimeout(() => {
            setsimg(null);
            setflgload(0);
        }, 500);
      };
    const handlecancel = () => {
        props.onCancel();
        resetForm();
    }
    useEffect(() => {
        const processData = () => {
            if (flgload === 0 && props.visible){
                setsimg(props.sampleimage);
                setflgload(1);
            }
        }
        processData();
    });
    return (
        <Modal
        visible={props.visible}
        onCancel={handlecancel}
        title={false}
        footer={false}
        width={"700px"}
        closeIcon={false}
        closable={false}
        // bodyStyle={{backgroundImage:`url(${simg})`, backgroundSize:"cover", 
        // backgroundRepeat:"no-repeat",width:"800px",height:"500px"}}
        centered
        className="modalcustom_sampleimage"
        >
            <div className="container-sampleimage">
                <Row align="middle">
                    <Col>
                <img src={simg} alt="contoh"/>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default SampleimageModal;