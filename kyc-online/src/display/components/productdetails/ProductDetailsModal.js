import React, {useState, useEffect} from 'react';
import { 
    Row,Col,Button,Modal,Select,Radio,message
} from 'antd';
import "./ProductDetailsModal.scss";
import closeicon from '../../../assets/images/general/close_symbol.png'
import { GetParameterByModule } from "../../../services/parameter/Parameter";
import { LoadingOutlined } from "@ant-design/icons";
import { PutProductSummary, PostProductSummary } from "../../../services/productsummary/ProductSummary";

const { Option } = Select;

const ProductDetailsModal = props => {

    const [firstload, setfirstload] = useState(0);
    const [flagupdate, setflagupdate] = useState(undefined);
    const [flagadd, setflagadd] = useState(undefined);
    const [ishide, setishide] = useState(true);
    const [idproduct, setidproduct] = useState(undefined);
    const [isSyariah, setisSyariah] = useState(undefined);
    const [zakatFlag, setzakatFlag] = useState(undefined);
    const [productCode, setproductCode] = useState(undefined);
    const [sourceOfFund, setsourceOfFund] = useState(undefined);
    const [purposeFund, setpurposeFund] = useState(undefined);
    const [purposeOpenAccount, setpurposeOpenAccount] = useState(undefined);
    const [avgTransaction, setavgTransaction] = useState(undefined);
    const layoutlbl = {xs: 24,sm: 24,md: 24,lg: 24,xl: 24};
    const layoutVal_lg = {xs: 15,sm: 15,md: 150,lg: 10,xl: 11};
    const _minWidth = 220;

    const [paramproductCodefilter, setparamproductCodefilter] = useState([]);
    const [paramproductCode, setparamproductCode] = useState([]);
    const [paramsourceOfFund, setparamsourceOfFund] = useState([]);
    const [paramtujuandgnbank, setparamtujuandgnbank] = useState([]);
    const [paramtujuanrekening, setparamtujuanrekening] = useState([]);
    const [paramavgTransaction, setparamavgTransaction] = useState([]);
        
    const [issubmit, setissubmit] = useState(false);

    useEffect(() => {
        
        const processData = () => {
            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                // get parameter
                GetParameterByModule('productName').then(data => {
                    setparamproductCode(data);
                    setparamproductCodefilter(data);
                });
                GetParameterByModule('sourceOfFund').then(data => {
                    setparamsourceOfFund(data);
                });
                GetParameterByModule('purposeFund').then(data => {
                    setparamtujuandgnbank(data);
                });
                GetParameterByModule('purposeOpenAccount').then(data => {
                    setparamtujuanrekening(data);
                });
                GetParameterByModule('avgTransaction').then(data => {
                    setparamavgTransaction(data);
                });
                setfirstload(1);
            }
            if (issubmit){
                if (!props.isupdatemodal){
                    PostProductSummary(ProductSummaryAdd).then(data => {
                        if (data.success){
                            setissubmit(false);
                            resetForm();
                            props.onClickBtnAdd();
                        }else{
                            message.warning('Update data gagal dilakukan');
                            setissubmit(false);
                        }
                    });
                }else{
                    PutProductSummary(ProductSummaryUpdate).then(data => {
                        if (data.success){
                            setissubmit(false);
                            resetForm();
                            props.onClickBtnAdd();
                        }else{
                            message.warning('Update data gagal dilakukan');
                            setissubmit(false);
                        }
                    });
                }
            }
            if (props.isupdatemodal && !flagupdate && props.visible){
                const dtmod = props.datamodal;
                dtmod.map(value => {
                    setidproduct(value.id);
                    setisSyariah(value.isSyariah);
                    if (value.isSyariah === "Y"){
                        setishide(false);
                    }else{
                        setishide(true);
                    }
                    setzakatFlag(value.zakatFlag);
                    setproductCode(value.productCode);
                    setsourceOfFund(value.sourceOfFund);
                    setpurposeFund(value.purposeFund);
                    setpurposeOpenAccount(value.purposeOpenAccount);
                    setavgTransaction(value.avgTransaction);
                    return true;
                 });
                setflagupdate(true);
            }
            if (!props.isupdatemodal && !flagadd){
                    setisSyariah(undefined);
                    setishide(true);
                    setzakatFlag(undefined);
                    setproductCode(undefined);
                    setsourceOfFund(undefined);
                    setpurposeFund(undefined);
                    setpurposeOpenAccount(undefined);
                    setavgTransaction(undefined);
                    setflagadd(true);
            }
        }
        processData();
      });
      
      const resetForm = () => {
        setTimeout(() => {
            setidproduct(undefined);
            setisSyariah(undefined);
            setzakatFlag(undefined);
            setproductCode(undefined);
            setsourceOfFund(undefined);
            setpurposeFund(undefined);
            setpurposeOpenAccount(undefined);
            setavgTransaction(undefined);
            setishide(true);
            setflagupdate(undefined);
            setflagadd(false);
        }, 500);
      };
      const ProductSummaryAdd = {
        productCode: productCode,
        currency: 'IDR',
        sourceOfFund: sourceOfFund,
        purposeFund: purposeFund,
        purposeOpenAccount: purposeOpenAccount,
        avgTransaction: avgTransaction,
        zakatFlag: zakatFlag === undefined? 'false':zakatFlag,
        isSyariah: isSyariah
    }
    const ProductSummaryUpdate = {
      id: idproduct,
      productCode: productCode,
      currency: 'IDR',
      sourceOfFund: sourceOfFund,
      purposeFund: purposeFund,
      purposeOpenAccount: purposeOpenAccount,
      avgTransaction: avgTransaction,
      zakatFlag: zakatFlag === undefined? 'false':zakatFlag,
      isSyariah: isSyariah
  }


    const onValidate = () => {
      if (isSyariah === undefined 
        || productCode === undefined 
        || sourceOfFund === undefined 
        || purposeFund === undefined 
        || purposeOpenAccount === undefined 
        || avgTransaction === undefined 
        || issubmit === true
          ){
              return true;
          } else {
              if (isSyariah === "Y" && zakatFlag === undefined){
                  return true;
              }else{
                  return false;
              }
          }
    };
    
    const handleadd = () => {
        setissubmit(true);
    }

    const optparamproductCode = () => {
        return buildoption(paramproductCode);
    }
    const optparamsourceOfFund = () => {
        return buildoption(paramsourceOfFund);
    }
    const optparamtujuandgnbank = () => {
        return buildoption(paramtujuandgnbank);
    }
    const optparamtujuanrekening = () => {
        return buildoption(paramtujuanrekening);
    }
    const optparamavgTransaction = () => {
        return buildoption(paramavgTransaction);
    }

    const buildoption = (dataparam) => {
      let optData = null;
      if (dataparam !== null){
          optData = dataparam.map((item, i) => {
          return (<Option title={item.value}  key={item.code} value={item.code}>{item.value}</Option>)
              });
          }
          return optData;
      }

    const handlecancel = () => {
        props.onCancel();
        resetForm();
    }
    function onChangeisSyariah(val) {
        var string = val.target.value;
        var producttype = '';
        if (string === "Y"){
            setishide(false);
            producttype = 'syariah';
        }
        else{
            setishide(true);
            producttype = 'konven';
        }
        setisSyariah(string);
        setproductCode(undefined);
        setparamproductCode(paramproductCodefilter.filter(item => item.value.toLowerCase().includes(producttype)));

      }
    
    function onChangezakatFlag(val) {
        var string = val.target.value;
      console.log(string);
      setzakatFlag(string);
    }
      
    function onChangeproductCode(val) {
        console.log(val);
        setproductCode(val);
      }
    function onChangesourceOfFund(val) {
        console.log(val);
        setsourceOfFund(val);
      }
      
    function onChangepurposeFund(val) {
        console.log(val);
        setpurposeFund(val);
      }
      
    function onChangepurposeOpenAccount(val) {
        console.log(val);
        setpurposeOpenAccount(val);
      }
      
    function onChangeavgTransaction(val) {
        console.log(val);
        setavgTransaction(val);
      }
      
    return (
        <Modal
        maskClosable={false}
        visible={props.visible}
        onCancel={handlecancel}
        width={"650px"}
        closeIcon={[
                <img key={1} src={closeicon} style={{height:20, width:20, 
                    marginRight:"20px", marginTop:"15px"}}
                alt="Tutup"/>
        ]}
        centered
        footer={[
            <Button style={{ minWidth: "150px", minHeight: "40px", 
            fontSize: "15px",marginTop:"0px",marginRight:"10px" }}
            key="submit" disabled={onValidate()}
            type="primary" onClick={handleadd}
            icon={issubmit? <LoadingOutlined /> : null} 
            >{issubmit?'Loading' : props.isupdatemodal?'Ubah':'Tambah'}</Button>
        ]}
        >
            <div className="container-popproductdetails">
            <Row>
                <Col span={15}
                className="title-popproductdetails black-text">
                    Data Produk
                </Col>
            </Row>
            <Row>
                <Col className="title-content-popproductdetails light-text">
                    <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Apakah Anda mengajukan rekening Syariah?<span className="red-text">*</span>
                <br/>
                </Col>
                <Col span={24}>
                    <Radio.Group onChange={onChangeisSyariah} value={isSyariah}>
                      <Row>
                        <Col span={3}>
                          <Radio value={"Y"}>Ya</Radio>
                        </Col>
                        <Col span={3} offset={18}>
                          <Radio value={"N"}>Tidak</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top" hidden={ishide}>
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Apakah zakat Anda ingin diproses oleh CIMB Niaga?<span className="red-text">*</span>
                </Col>
                <Col span={24}>
                    <Radio.Group size="large" onChange={onChangezakatFlag} value={zakatFlag}>
                      <Row>
                        <Col span={3}>
                          <Radio value={"true"}>Ya</Radio>
                        </Col>
                        <Col span={3} offset={18}>
                          <Radio value={"false"}>Tidak</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Nama produk Anda:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih" //onChange={onChangeprovinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        onChange={onChangeproductCode} value={productCode}
                        disabled={paramproductCode.length<=0?true:false}
                    >
                        {optparamproductCode()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Sumber Dana:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih" //onChange={onChangeprovinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        onChange={onChangesourceOfFund} value={sourceOfFund}
                        disabled={paramsourceOfFund.length<=0?true:false}
                    >
                        {optparamsourceOfFund()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Maksud dan tujuan berhubungan dengan Bank:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih" //onChange={onChangeprovinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        onChange={onChangepurposeFund} value={purposeFund}
                        disabled={paramtujuandgnbank.length<=0?true:false}
                    >
                        {optparamtujuandgnbank()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Tujuan penggunaan dana pada rekening:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih" //onChange={onChangeprovinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        onChange={onChangepurposeOpenAccount} value={purposeOpenAccount}
                        disabled={paramtujuanrekening.length<=0?true:false}
                    >
                        {optparamtujuanrekening()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-popproductdetails black-text" align="top">
                <Col {...layoutlbl} className="title-height-popproductdetails">
                Rata-rata aktivitas normal per bulan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih" //onChange={onChangeprovinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        onChange={onChangeavgTransaction} value={avgTransaction}
                        disabled={paramavgTransaction.length<=0?true:false}
                    >
                        {optparamavgTransaction()}
                    </Select>
                </Col>
            </Row>
            </div>
        </Modal>
    );
};

export default ProductDetailsModal;