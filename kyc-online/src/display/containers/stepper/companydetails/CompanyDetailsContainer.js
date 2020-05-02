import React, { useState, useEffect } from 'react';
import { 
    Row,Col,Select,Input,DatePicker,Button,
    InputNumber,message,Spin
} from 'antd';
import "./CompanyDetailsContainer.scss";
import locale from 'antd/es/date-picker/locale/id_ID';
import 'moment/locale/id';
import moment from 'moment';
import { LoadingOutlined } from "@ant-design/icons";
import { GetCompanyDetails, PutCompanyDetails } from "../../../../services/companydetails/CompanyDetails";
import { GetCity } from "../../../../services/address/Address";
import { GetParameterByModule } from "../../../../services/parameter/Parameter";

const { Option } = Select;

const CompanyDetailsContainer = props => {

    const dateFormat = 'YYYY/MM/DD';
    const layoutlbl = {xs: 24,sm: 24,md: 24,lg: 10,xl: 8};
    const layoutVal_sm = {xs: 12,sm: 12,md: 9,lg: 5,xl: 5};
    const layoutVal_lg = {xs: 18,sm: 12,md: 12,lg: 7,xl: 7};
    const _minWidth = 220;

    const npwpFormat = (str) => {
        return str.replace(/(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.$4-$5.$6');
      };
    const [isloading, setisloading] = useState(true);
    const [firstload, setfirstload] = useState(0);
    const [CompanyType, setCompanyType] = useState("PT");
    const [companyName, setcompanyName] = useState("Jaya Gemilang");
    const [NPWP, setNPWP] = useState(npwpFormat("232323234444444"));
    const [businessField, setbusinessField] = useState(undefined);
    const [PlaceEstablished, setPlaceEstablished] = useState(undefined);
    const [DateEstablished, setDateEstablished] = useState(undefined);
    const [OperatingIncomeYear, setOperatingIncomeYear] = useState(undefined);
    
    const [parambusinessField, setparambusinessField] = useState([]);
    const [paramPlaceEstablished, setparamPlaceEstablished] = useState([]);

    const [issubmit, setissubmit] = useState(false);
    

    const onValidate = () => {
        if (
            CompanyType === undefined || CompanyType === "" 
            || companyName === undefined || companyName === ""
            || NPWP === undefined || NPWP === "" 
            || businessField === undefined || businessField === ""
            || PlaceEstablished === undefined || PlaceEstablished === "" 
            || DateEstablished === undefined || DateEstablished === "" 
            || OperatingIncomeYear === undefined || OperatingIncomeYear === ""
            || issubmit === true
        ) {
          return true;
        } else {
          return false;
        }
      };

      function onChangebusinessField(val) {
        console.log(val);
        setbusinessField(val);
      }
      function onChangePlaceEstablished(val) {
        console.log(val);
        setPlaceEstablished(val);
      }
      function onChangeDateEstablished(val) {
        var string = (val === null ? undefined : val.format('YYYY/MM/DD')) ;
        console.log(string);
        setDateEstablished(string);
      }
      function onChangeOperatingIncomeYear(val) {
        console.log(val);
        setOperatingIncomeYear(val);
      }
      
    useEffect(() => {
        const processData = () => {

            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                // get parameter
                GetCity('').then(data => {
                    setparamPlaceEstablished(data.data);
                }).catch(() => {
                    setisloading(false);
                });
                GetParameterByModule('businessType').then(data => {
                    setparambusinessField(data);
                }).catch(() => {
                    setisloading(false);
                });
                
                // get company details
                GetCompanyDetails().then(result => {
                    const data = result.data;
                    setCompanyType(data.industryType);
                    setcompanyName(data.industryName);
                    setNPWP(npwpFormat(data.npwpNumber));
                    setbusinessField(data.businessField);
                    setPlaceEstablished(data.placeOfEstablishment);
                    setDateEstablished((data.dateOfEstablishment).replace("-","/"));
                    setOperatingIncomeYear(data.annualSalesIncome);
                    
                    setisloading(false);
                }).catch(() => {
                    setisloading(false);
                });
                
                console.log('seleseeei');
                setfirstload(1);
            }
            
            if (issubmit){
                PutCompanyDetails(CompanyDetails).then(data => {
                    if (data.success){
                        props.goCmp(1);
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

    const CompanyDetails = {
        industryType: CompanyType,
        industryName: companyName,
        businessField: businessField,
        npwpNumber: NPWP,
        placeOfEstablishment: PlaceEstablished,
        dateOfEstablishment: DateEstablished,
        annualSalesIncome: OperatingIncomeYear
    }
      
    const handleNext = () => {
        setissubmit(true);
        //return props.goCmp(1);
    }

      const optbusinessField = () => {
          return buildoption(parambusinessField, 1);
      }
      const optPlaceEstablished = () => {
          return buildoption(paramPlaceEstablished, 0);
      }

      const buildoption = (dataparam, id) => {
        let optData = null;
        if (dataparam !== null){
            optData = dataparam.map((item, i) => {
            if (id === 0){
                return (<Option title={item.name} key={item.id} value={item.id.toString()}>{item.name}</Option>)
                }else{
                    return (<Option title={item.value} key={item.code} value={item.code}>{item.value}</Option>)
                }
            });
            }
            return optData;
        }
        
    return (
        <div className="container-companydetail">
            <Spin spinning={isloading} delay={500}>
            <Row>
                <Col span={24} className="title-companydetail black-text">
                Detail Perusahaan
                </Col>
            </Row>
            <Row>
                <Col span={24} className="sub-title-companydetail light-text">
                Silahkan memasukkan data perusahaan Anda.
                </Col>
            </Row>
            <Row>
                <Col className="title-content-companydetail light-text">
                <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Jenis Perusahaan Anda:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                    <Input value={CompanyType} disabled={true}
                    maxLength={30} style={{ width: '100%', minWidth:_minWidth}}/>
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Nama Perusahaan Anda:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Input value={companyName} disabled={true}
                    maxLength={30} style={{ width: '100%', minWidth:_minWidth}}/>
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                NPWP Perusahaan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                        <Input value={NPWP} disabled={true}
                    maxLength={30} style={{ width: '100%', minWidth:_minWidth}}/>
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Bidang Usaha:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                {/* <div id="testPosition" style={{ overflow: "scroll" }}> */}
                <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        //getPopupContainer={node => node.parentElement}
                        placeholder="Pilih Bidang Usaha"
                        style={{
                        width: '100%',
                        minWidth:_minWidth,
                        borderRadius: "3px",
                        fontWeight: "normal"
                        }}
                        dropdownStyle= {{ overflowX: "auto"}}
                        disabled={parambusinessField.length<=0?true:false}
                        value={businessField}
                        onChange={onChangebusinessField}
                        showSearch optionFilterProp="children"
                    >
                        {optbusinessField()}
                    </Select>
                {/* </div> */}
                    
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Tempat Didirikan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Kota sesuai Akta Pendirian"
                        style={{
                        minWidth:_minWidth,
                        width: '100%',
                        borderRadius: "3px",
                        fontWeight: "normal",
                        }}
                        disabled={paramPlaceEstablished.length<=0?true:false}
                        value={PlaceEstablished}
                        onChange={onChangePlaceEstablished}
                        showSearch optionFilterProp="children"
                    >
                        {optPlaceEstablished()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Tanggal Didirikan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                    <DatePicker placeholder="YYYY/MM/DD" inputReadOnly value={DateEstablished !== undefined ? moment(DateEstablished, dateFormat) : undefined}
                        onChange={onChangeDateEstablished} locale = {locale}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}/>
                </Col>
            </Row>
            <Row className="title-selection-companydetail black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companydetail">
                Penghasilan Operasional per tahun(Rp):<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                    {/* <Input placeholder="Dalam rupiah" value={OperatingIncomeYear}
                        onChange={onChangeOperatingIncomeYear} maxLength={20} style={{ width: '100%',minWidth:_minWidth }}/> */}
                <InputNumber
                maxLength={16}
                        style={{ width: '100%',minWidth:_minWidth }} 
                        onChange={onChangeOperatingIncomeYear}
                        formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        //formatter={value => ` ${value}`.replace(/[^0-9]/g, "")}
                        parser={value => value.replace(/[^0-9 .]/g, "")}
                        value={OperatingIncomeYear}
                        />
                </Col>
            </Row>
            </Spin>
            <Row className="container-button-companydetail">
                <Col>
                    <Button type="primary" className="button-footer" disabled={onValidate()}
                    icon={issubmit? <LoadingOutlined /> : null} 
                    onClick={handleNext}>{issubmit?'Loading' : 'Selanjutnya'}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default CompanyDetailsContainer;