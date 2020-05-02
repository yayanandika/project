import React, { useState, useEffect } from 'react';
import { 
    Row,Col,Button,DatePicker,Spin,message
} from 'antd';
import Axios from "axios";
import "./MeetRMSettingContainer.scss";
import { DownloadOutlined,LoadingOutlined } from "@ant-design/icons";
import locale from 'antd/es/date-picker/locale/id_ID';
import 'moment/locale/id';
import moment from "moment";
import { GetParameterByModule } from "../../../../services/parameter/Parameter";
import { GetMeetRMDate, PutMeetRMDate } from "../../../../services/meetrmsetting/MeetRMSetting";
moment.locale("id");
//import RMModal from './Modal/RMModal';

const RMModal = React.lazy(() =>
  import("../../../components/meetrmsetting/RMModal")
);

const MeetRMSettingContainer = props => {

    const dateFormat = 'YYYY/MM/DD';
    const layoutlbl = {xs: 24,sm: 24,md: 22,lg: 23,xl: 23};
    const layoutVal_sm = {xs: 15,sm: 15,md: 8,lg: 5,xl: 5};
    const _minWidth = 200;

    const [ismodal, setismodal] = useState(false);
    const [isloadingdownload, setisloadingdownload] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [firstload, setfirstload] = useState(0);
    const [rmdate, setrmdate] = useState(undefined);
    const [flagdownloaddoc1, setflagdownloaddoc1] = useState(false);
    const [flagdownloaddoc2, setflagdownloaddoc2] = useState(false);
    const [downloadLink1, setdownloadLink1] = useState('');
    const [downloadLink2, setdownloadLink2] = useState('');
    const [termandcond1, settermandcond1] = useState('');
    const [termandcond2, settermandcond2] = useState('');
    const [termandcond3, settermandcond3] = useState('');
    const [termandcond4, settermandcond4] = useState('');
    const [termandcond5, settermandcond5] = useState('');
    const [termandcond6, settermandcond6] = useState('');
    const [termandcond7, settermandcond7] = useState('');
    const [termandcond8, settermandcond8] = useState('');
    const [termandcond9, settermandcond9] = useState('');
    const [termandcond10, settermandcond10] = useState('');
    const [issubmit, setissubmit] = useState(false);

    useEffect(() => {
        const processData = () => {

            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                
                GetParameterByModule('termsAndCondition2').then(data => {
                    data.map(result => {
                        
                        if (result.code === "1"){
                            settermandcond1(result.code+'. '+result.value);
                        }
                        if (result.code === "2"){
                            settermandcond2(result.code+'. '+result.value);
                        }
                        if (result.code === "3"){
                            settermandcond3(result.code+'. '+result.value);
                        }
                        if (result.code === "4"){
                            settermandcond4(result.code+'. '+result.value);
                        }
                        if (result.code === "5"){
                            settermandcond5(result.code+'. '+result.value);
                        }
                        if (result.code === "6"){
                            settermandcond6(result.code+'. '+result.value);
                        }
                        if (result.code === "7"){
                            settermandcond7(result.code+'. '+result.value);
                        }
                        if (result.code === "8"){
                            settermandcond8(result.code+'. '+result.value);
                        }
                        if (result.code === "9"){
                            settermandcond9(result.code+'. '+result.value);
                        }
                        if (result.code === "10"){
                            settermandcond10(result.code+'. '+result.value);
                        }
                        return true
                    });
                }).catch(() => {
                    setisloading(false);
                });
                
                // get company details
                GetMeetRMDate().then(result => {
                    const data = result.data;
                    setrmdate(data.meetingDate===""?undefined:data.meetingDate);
                    setflagdownloaddoc1(data.downloaded1);
                    setflagdownloaddoc2(data.downloaded2);
                    setdownloadLink1(data.downloadLink1);
                    setdownloadLink2(data.downloadLink2);
                    if (data.documentCompleted){
                        setismodal(false);
                    }else{
                        setismodal(true);
                    }
                    
                    setisloading(false);
                }).catch(() => {
                    setisloading(false);
                });
                setfirstload(1);
            }
            
            if (issubmit){
                PutMeetRMDate(RMDate).then(data => {
                    if (data.success){
                        props.nextStep();
                    }else{
                        message.warning('Update data gagal dilakukan');
                    }
                }).catch(() => {
                    message.warning('Update data gagal dilakukan');
                });
                setissubmit(false);
            }
        }
        processData();
      });

      const RMDate = {
        meetingDate: rmdate
    }

    function disabledDate(current) {
        return current && current < moment().startOf("day");
      }

    const onValidate = () => {
        if (rmdate === undefined || rmdate === "" 
        ){
            return true;
        }else{
            return false;
        }
      };

    const handlePrev = () => {
        props.prevStep();
    }
    const handleNext = () => {
        //setissubmit(true);
        if (!flagdownloaddoc1 || !flagdownloaddoc2){
            message.warning('Mohon download file spesimen dan file lainnya terlebih dahulu');
            return;
        }
        setissubmit(true);
    }
    function onChangermdate(val) {
      var string = (val === null ? undefined : val.format('YYYY/MM/DD')) ;
      console.log(string);
      setrmdate(string);
    }
    function downloadFile(id) {
        // const a = document.createElement("a");
        // a.href = 'http://'+downloadlink;
        // a.click();
        setisloadingdownload(true);
        var urldwnld = downloadLink1;
        if (id===2){
            urldwnld = downloadLink2;
        }
        var filename = urldwnld.substring(urldwnld.lastIndexOf('/')+1);
        Axios({
            url: urldwnld,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
            if (id===1){
                setflagdownloaddoc1(true);
            }
            if (id===2){
                setflagdownloaddoc2(true);
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            setisloadingdownload(false);
          }).catch(() => {
            message.warning('Gagal download');
            setisloadingdownload(false);
        });
      }
        
    return (
        <div className="container-meetrmsetting">
        <RMModal 
                    visible={ismodal}
                    //visible={false}
                    onClickBtn={handlePrev}
                    />

            <Spin spinning={isloading} delay={500}>
            <Row>
                <Col span={24} className="title-meetrmsetting black-text">
                Sedikit Lagi!
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={16} md={22} lg={24} xl={24}
                className="sub-title-meetrmsetting light-text">
                Sebelum Anda menyelesaikan aplikasi ini, Anda menentukan jadwal Anda untuk bertemu dengan RM Anda
                </Col>
            </Row>
            <Row>
                <Col className="title-content-meetrmsetting light-text">
                <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            <Row className="title-selection-meetrmsetting-header black-text" align="middle">
                <Col {...layoutlbl}>
                Kapan saat yang tepat untuk RM kami mengunjungi Anda untuk menyelesaikan aplikasi ini?<span className="red-text">*</span>
                </Col>
            </Row>
            <Row className="title-selection-meetrmsetting black-text" align="middle">
                <Col {...layoutVal_sm}>
                <DatePicker placeholder="YYYY/MM/DD" locale={locale}
                        inputReadOnly disabledDate={disabledDate}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}
                        value={rmdate !== undefined ? moment(rmdate, dateFormat) : undefined}
                        onChange={onChangermdate} 
                        />
                </Col>
            </Row>
            <Row className="title-selection-meetrmsetting-header black-text" align="middle">
                <Col {...layoutlbl}>
                Mohon untuk <i>download</i> file dibawah ini dan diisi sebelum RM mengunjungi Anda<span className="red-text">*</span>
                </Col>
            </Row>
            <Spin spinning={isloadingdownload} tip="Proses download..." delay={500} style={{width:"500px"}}>
            <Row className="title-selection-meetrmsetting black-text" align="middle">
                <Col xs={12} sm={11} md={9} lg={7} xl={5}>
                    <Button type="primary" icon={<DownloadOutlined />} 
                    onClick={() => downloadFile(1)}
                    className="button-download-left">
                        <span style={{textAlign:"left",marginLeft:"9px"}}><i>Download</i>&nbsp;Spesimen dan<br/>Form FATCA dan CRS</span>
                    </Button>
                </Col>
                <Col>
                    <Button type="primary" icon={<DownloadOutlined />} 
                    onClick={() => downloadFile(2)}
                    className="button-download-right">
                        <span className="title-download-button"><i>Download</i>&nbsp;dokumen lainnya</span>
                    </Button>
                </Col>
            </Row>
            </Spin>
            <Row className="title-selection-meetrmsetting-header black-text" align="middle">
                <Col {...layoutlbl}>
                Pastikan Anda menyiapkan dokumen asli agar RM dapat melakukan proses autentikasi pada saat mengunjungi Anda.
                </Col>
            </Row>
            <Row className="akta-pendirian black-text" align="middle">
                <Col {...layoutlbl}>
                {termandcond1} <br/>
                {termandcond2} <br/>
                {termandcond3} <br/>
                {termandcond4} <br/>
                {termandcond5} <br/>
                {termandcond6} <br/>
                {termandcond7} <br/>
                {termandcond8} <br/>
                {termandcond9} <br/>
                {termandcond10}
                </Col>
            </Row>
            <Row>
                <Col className="container-button" align="left"
                    xs={12} sm={16} md={17} lg={19} xl={20}>
                        <Button type="primary" onClick={handlePrev} className="button-footer">Kembali</Button>
                    </Col>
                    <Col className="container-button" align="right"
                    xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button type="primary" className="button-footer" disabled={onValidate()}
                        icon={issubmit? <LoadingOutlined /> : null} 
                        onClick={handleNext}>{issubmit?'Loading' : 'Kirim'}</Button>
                </Col>
            </Row>
            </Spin>
        </div>
    );
};

export default MeetRMSettingContainer;