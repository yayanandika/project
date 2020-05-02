import React, {useState, useEffect} from 'react';
import { 
    Row,Col,Select,Input,Button,Checkbox,message,Spin
} from 'antd';
import "./CompanyAddressContainer.scss";
import { GetProvience, GetCity, GetKecamatan, GetKelurahan } from "../../../../services/address/Address";
import { GetCompanyAddress, PutCompanyAddress } from "../../../../services/companyaddress/CompanyAddress";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const CompanyAddressContainer = props => {

    const [firstload, setfirstload] = useState(0);

    const [hiddenAddrs, sethiddenAddrs] = useState(true);
    const layoutlbl = {xs: 24,sm: 24,md: 24,lg: 10,xl: 8};
    const layoutVal_lg = {xs: 12,sm: 12,md: 12,lg: 7,xl: 7};
    const _minWidth = 220;
    
    const [isloading, setisloading] = useState(true);
    const [issubmit, setissubmit] = useState(false);
    
    const [alamat, setalamat] = useState(undefined);
    const [rt, setrt] = useState(undefined);
    const [rw, setrw] = useState(undefined);
    const [provinsi, setprovinsi] = useState(undefined);
    const [kotakab, setkotakab] = useState(undefined);
    const [kecamatan, setkecamatan] = useState(undefined);
    const [kelurahan, setkelurahan] = useState(undefined);
    const [kodearea1, setkodearea1] = useState(undefined);
    const [notelp1, setnotelp1] = useState(undefined);
    const [kodearea2, setkodearea2] = useState(undefined);
    const [notelp2, setnotelp2] = useState(undefined);
    const [email, setemail] = useState(undefined);
    const [isemail, setisemail] = useState(true);
    const [alamat2, setalamat2] = useState(undefined);
    const [rt2, setrt2] = useState(undefined);
    const [rw2, setrw2] = useState(undefined);
    const [provinsi2, setprovinsi2] = useState(undefined);
    const [kotakab2, setkotakab2] = useState(undefined);
    const [kecamatan2, setkecamatan2] = useState(undefined);
    const [kelurahan2, setkelurahan2] = useState(undefined);
    const [chkAlamat, setchkAlamat] = useState(false);

    // array address
    const [arrprovinsi, setarrprovinsi] = useState([]);
    const [arrkotakab1, setarrkotakab1] = useState([]);
    const [arrkecamatan1, setarrkecamatan1] = useState([]);
    const [arrkelurahan1, setarrkelurahan1] = useState([]);
    
    const [arrkotakab2, setarrkotakab2] = useState([]);
    const [arrkecamatan2, setarrkecamatan2] = useState([]);
    const [arrkelurahan2, setarrkelurahan2] = useState([]);
    
    const [changeprovinsi1, setchangeprovinsi1] = useState(false);
    const [changekabkota1, setchangekabkota1] = useState(false);
    const [changekecamatan1, setchangekecamatan1] = useState(false);
    
    const [changeprovinsi2, setchangeprovinsi2] = useState(false);
    const [changekabkota2, setchangekabkota2] = useState(false);
    const [changekecamatan2, setchangekecamatan2] = useState(false);

    useEffect(() => {
        const processData = () => {
            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                // Get Provience
                GetProvience().then(data => {
                    setarrprovinsi(data.data);
                }).catch(() => {
                    setisloading(false);
                });
                // get company address
                GetCompanyAddress().then(result => {
                    const registeredAddr = result.data.registeredAddr;
                    const mailingAddr = result.data.mailingAddr;
    
                    setalamat(registeredAddr.address);
                    setrt(registeredAddr.rt);
                    setrw(registeredAddr.rw);
                    setprovinsi(registeredAddr.province);
                    setkotakab(registeredAddr.city);
                    setkecamatan(registeredAddr.kecamatan);
                    setkelurahan(registeredAddr.kelurahan);
                    setnotelp1(registeredAddr.phoneNumber1);
                    setnotelp2(registeredAddr.phoneNumber2);
                    setkodearea1(registeredAddr.areaCode1);
                    setkodearea2(registeredAddr.areaCode2);
                    setemail(registeredAddr.email);
    
                    GetCity(registeredAddr.province).then(data => {
                        setarrkotakab1(data.data);
                    }).catch(() => {
                        setisloading(false);
                    });
                    GetKecamatan(registeredAddr.city).then(data => {
                        setarrkecamatan1(data.data);
                    }).catch(() => {
                        setisloading(false);
                    });
                    GetKelurahan(registeredAddr.kecamatan).then(data => {
                        setarrkelurahan1(data.data);
                    }).catch(() => {
                        setisloading(false);
                    });

    
                    if (mailingAddr!=null){
                        setchkAlamat(true);
                        sethiddenAddrs(false);
                        setalamat2(mailingAddr.address);
                        setrt2(mailingAddr.rt);
                        setrw2(mailingAddr.rw);
                        setprovinsi2(mailingAddr.province);
                        setkotakab2(mailingAddr.city);
                        setkecamatan2(mailingAddr.kecamatan);
                        setkelurahan2(mailingAddr.kelurahan);
    
                        GetCity(mailingAddr.province).then(data => {
                            setarrkotakab2(data.data);
                        }).catch(() => {
                            setisloading(false);
                        });
                        GetKecamatan(mailingAddr.city).then(data => {
                            setarrkecamatan2(data.data);
                        }).catch(() => {
                            setisloading(false);
                        });
                        GetKelurahan(mailingAddr.kecamatan).then(data => {
                            setarrkelurahan2(data.data);
                        }).catch(() => {
                            setisloading(false);
                        });
                    }else{
                        setchkAlamat(false);
                        sethiddenAddrs(true);
                        setalamat2(undefined);
                        setrt2(undefined);
                        setrw2(undefined);
                        setprovinsi2(undefined);
                        setkotakab2(undefined);
                        setkecamatan2(undefined);
                        setkelurahan2(undefined);
                    }
                    setisloading(false);
                }).catch(() => {
                    setisloading(false);
                });
    
                
                setfirstload(1);
            }
            if (changeprovinsi1){
                setkotakab(undefined);
                setarrkecamatan1([]);
                setarrkelurahan1([]);
                setkecamatan(undefined);
                setkelurahan(undefined);
                GetCity(provinsi).then(data => {
                    setarrkotakab1(data.data);
                });
                // axiosKotaKab1();
                setchangeprovinsi1(false);
            }
            if (changekabkota1){
                setkecamatan(undefined);
                setarrkelurahan1([]);
                setkelurahan(undefined);
                GetKecamatan(kotakab).then(data => {
                    setarrkecamatan1(data.data);
                });
                // axiosKecamatan1();
                setchangekabkota1(false);
            }
            if (changekecamatan1){
                setkelurahan(undefined);
                GetKelurahan(kecamatan).then(data => {
                    setarrkelurahan1(data.data);
                });
                // axiosKelurahan1();
                setchangekecamatan1(false);
            }
            
            if (changeprovinsi2){
                GetCity(provinsi2).then(data => {
                    setarrkotakab2(data.data);
                    setkotakab2(undefined);
                    setarrkecamatan2([]);
                    setarrkelurahan2([]);
                    setkecamatan2(undefined);
                    setkelurahan2(undefined);
                });
                // axiosKotaKab2();
                setchangeprovinsi2(false);
            }
            if (changekabkota2){
                GetKecamatan(kotakab2).then(data => {
                    setarrkecamatan2(data.data);
                    setkecamatan2(undefined);
                    setarrkelurahan2([]);
                    setkelurahan2(undefined);
                });
                // axiosKecamatan2();
                setchangekabkota2(false);
            }
            if (changekecamatan2){
                GetKelurahan(kecamatan2).then(data => {
                    setarrkelurahan2(data.data);
                    setkelurahan2(undefined);
                });
                // axiosKelurahan2();
                setchangekecamatan2(false);
            }
            if (issubmit){
                PutCompanyAddress(CompanyAddress()).then(data => {
                    if (data.success){
                        props.nextStep();
                    }else{
                        message.warning('Update data gagal dilakukan');
                    }
                });
                setissubmit(false);
            }
        };
        processData();
    });

    const optProvinsi = () => {
        return buildoption(arrprovinsi);
    }
    const optKotaKab1 = () => {
        return buildoption(arrkotakab1);
    }
    const optKecamatan1 = () => {
        return buildoption(arrkecamatan1);
    }
    const optKelurahan1 = () => {
        return buildoption(arrkelurahan1);
    }

    // ---- surat menyurat ----

    const optKotaKab2 = () => {
        return buildoption(arrkotakab2);
    }
    const optKecamatan2 = () => {
        return buildoption(arrkecamatan2);
    }
    const optKelurahan2 = () => {
        return buildoption(arrkelurahan2);
    }

    const buildoption = (dataparam) => {
        let optData = null;
        if (dataparam != null){
            optData = dataparam.map((item, i) => {
            return (<Option key={item.id} value={item.id.toString()}>{item.name}</Option>)
                });
            }
            return optData;
        }    
    
    const onValidate = () => {
        var isDisabled = false;
        if (alamat === undefined || alamat.trim() === ""
            || rt === undefined || rt.trim() === "" 
            || rw  === undefined  || rw.trim() === ""
            || provinsi  === undefined || provinsi === ""
            || kotakab  === undefined || kotakab === "" 
            || kecamatan  === undefined || kecamatan === ""
            || kelurahan === undefined || kelurahan === ""
            || kodearea1  === undefined || kodearea1.trim() === ""
            || notelp1 === undefined || notelp1.trim() === ""
            || notelp1 === undefined || notelp1.trim() === ""
            || email === undefined || email.trim() === ""
            || isemail === false
            || issubmit === true
            ) {
                isDisabled = true;
            }

        if (chkAlamat === true){
            if (alamat2 === undefined || alamat2.trim() === ""
            || rt2 === undefined || rt2.trim() === ""
            || rw2 === undefined || rw2.trim() === ""
            || provinsi2 === undefined || provinsi2 === ""
            || kotakab2 === undefined || kotakab2 === ""
            || kecamatan2 === undefined || kecamatan2 === ""
            || kelurahan2 === undefined || kelurahan2 === ""
            || issubmit === true
            ){
            isDisabled = true;
            }
        }
        
        
      return isDisabled;
    };

    const CompanyAddress = () => {
        const registeredAddr = {
            registeredAddr: {
                address: alamat,
                rt: rt,
                rw: rw,
                province: provinsi,
                city: kotakab,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                phoneNumber1: notelp1,
                phoneNumber2: notelp2,
                areaCode1: kodearea1,
                areaCode2: kodearea2,
                email: email
            }
        };
        const regmailaddrs = {
            registeredAddr: {
                address: alamat,
                rt: rt,
                rw: rw,
                province: provinsi,
                city: kotakab,
                kecamatan: kecamatan,
                kelurahan: kelurahan,
                phoneNumber1: notelp1,
                phoneNumber2: notelp2,
                areaCode1: kodearea1,
                areaCode2: kodearea2,
                email: email
            },
            mailingAddr: {
                address: alamat2,
                rt: rt2,
                rw: rw2,
                province: provinsi2,
                city: kotakab2,
                kecamatan: kecamatan2,
                kelurahan: kelurahan2
            }
        };

        if (chkAlamat){
            return regmailaddrs;
        }else{
            return registeredAddr;
        }
    };

      function onChangealamat (val) {
        var string = val.target.value;
        console.log(string);
        setalamat(string);
      }
      function onChangert (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setrt(string.replace(/[^0-9]/g, ""));
      }
      function onChangerw (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setrw(string.replace(/[^0-9]/g, ""));
      }
      function onChangeprovinsi (val) {
        console.log(val);
        setprovinsi(val);
        setchangeprovinsi1(true);
      }
      function onChangekotakab (val) {
        console.log(val);
        setkotakab(val);
        setchangekabkota1(true);
      }
      function onChangekecamatan (val) {
        console.log(val);
        setkecamatan(val);
        setchangekecamatan1(true);
      }
      function onChangekelurahan (val) {
        console.log(val);
        setkelurahan(val);
      }
      function onChangekodearea1 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setkodearea1(string.replace(/[^0-9]/g, ""));
      }
      function onChangenotelp1 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setnotelp1(string.replace(/[^0-9]/g, ""));
      }
      function onChangekodearea2 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setkodearea2(string.replace(/[^0-9]/g, ""));
      }
      function onChangenotelp2 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setnotelp2(string.replace(/[^0-9]/g, ""));
      }
      function onChangeemail (val) {
        var string = val.target.value;
        console.log(string);
        setemail(string);
        isEmail(string);
      }
      const isEmail = (semail) => {
        /* eslint-disable */
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(semail.trim()) ||
            semail.trim() === ""){
                setisemail(true);
            }
            else{
                setisemail(false);
            }
            
        /* eslint-enable */
      }
      function onChangealamat2 (val) {
        var string = val.target.value;
        console.log(string);
        setalamat2(string);
      }
      function onChangert2 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setrt2(string.replace(/[^0-9]/g, ""));
      }
      function onChangerw2 (val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setrw2(string.replace(/[^0-9]/g, ""));
      }
      function onChangeprovinsi2 (val) {
        console.log(val);
        setprovinsi2(val);
        setchangeprovinsi2(true);
      }
      function onChangekotakab2 (val) {
        console.log(val);
        setkotakab2(val);
        setchangekabkota2(true);
      }
      function onChangekecamatan2 (val) {
        console.log(val);
        setkecamatan2(val);
        setchangekecamatan2(true);
      }
      function onChangekelurahan2 (val) {
        console.log(val);
        setkelurahan2(val);
      }

    function onChangeHide(e) {
        if (e.target.checked){
            sethiddenAddrs(false);
            setchkAlamat(true)
        }
        else{
            sethiddenAddrs(true);
            setchkAlamat(false)
        }
      }

    const handlePrev = () => {
        return props.goCmp(0);
    }
    const handleNext = () => {
        setissubmit(true);
    }
        
    return (
        <div className="container-companyaddress">
            <Spin spinning={isloading} delay={500}>
            <Row>
                <Col span={24} className="title-companyaddress black-text">
                Detail Perusahaan
                </Col>
            </Row>
            <Row>
                <Col span={24} className="sub-title-companyaddress light-text">
                Silahkan memasukkan data perusahaan Anda.
                </Col>
            </Row>
            <Row>
                <Col className="title-content-companyaddress light-text">
                <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="top">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Alamat Perusahaan yang terdaftar:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <TextArea placeholder="Alamat sesuai SIUP/NIB" rows={3} maxLength={50}
                    style={{
                        width: '100%',
                        minWidth:_minWidth,
                        }}
                    onChange={onChangealamat} value={alamat}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                RT / RW:<span className="red-text">*</span>
                </Col>
                <Col xs={15} sm={7} md={5} lg={4} xl={3}>
                    <Input placeholder="001" maxLength={3} style={{ width: '40%'}} onChange={onChangert} value={rt}/>
                    <span className="title-separator">/</span>
                    <Input placeholder="001" maxLength={3} style={{ width: '40%'}} onChange={onChangerw} value={rw}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Provinsi:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Provinsi" onChange={onChangeprovinsi} value={provinsi}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrprovinsi.length<=0?true:false}
                    >
                        {optProvinsi()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kota/Kabupaten:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kota/Kabupaten" onChange={onChangekotakab} value={kotakab}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkotakab1.length<=0?true:false}
                    >
                        {optKotaKab1()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kecamatan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kecamatan" onChange={onChangekecamatan} value={kecamatan}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkecamatan1.length<=0?true:false}
                    >
                        {optKecamatan1()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kelurahan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kelurahan" onChange={onChangekelurahan} value={kelurahan}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkelurahan1.length<=0?true:false}
                    >
                        {optKelurahan1()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Nomor Telepon 1:<span className="red-text">*</span>
                </Col>
                <Col xs={20} sm={12} md={8} lg={6} xl={5}>
                    <Input placeholder="Kode area" maxLength={4} style={{ width: '40%', minWidth:90}} 
                    onChange={onChangekodearea1} value={kodearea1}/>
                    <span className="title-space"></span>
                    <Input placeholder="Nomor telepon" maxLength={8} style={{ width: '50%', minWidth:120}} 
                    onChange={onChangenotelp1} value={notelp1}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                Nomor Telepon 2:
                </Col>
                <Col xs={20} sm={12} md={8} lg={6} xl={5}>
                    <Input placeholder="Kode area" maxLength={4} style={{ width: '40%', minWidth:90}} 
                    onChange={onChangekodearea2} value={kodearea2}/>
                    <span className="title-space"></span>
                    <Input placeholder="Nomor telepon" maxLength={8} style={{ width: '50%', minWidth:120}} 
                    onChange={onChangenotelp2} value={notelp2}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col {...layoutlbl} className="title-height-companyaddress">
                E-mail Perusahaan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg} className={isemail === true ? "" : "error-border"}>
                    <Input placeholder="contoh@mail.com" maxLength={20} 
                    style={{ width: '100%', minWidth:_minWidth}} onChange={onChangeemail} value={email}/>
                </Col>
            </Row>
            <Row><Col xs={{offset:0}} sm={{offset:0}} md={{offset:0}} lg={{offset:10}} xl={{offset:8}}
            className="error-title" hidden={isemail === true ? true : false}>Mohon isi dengan format yang sesuai</Col></Row>
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col>
                    <Checkbox onChange={onChangeHide} checked={chkAlamat} className="title-chkbox">Alamat surat menyurat Perusahaan berbeda dengan alamat terdaftar</Checkbox>
                </Col>
            </Row>

            {/* -------- alamat surat menyurat -------- */}

            <Row className="title-selection-companyaddress black-text" align="top" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                Alamat Perusahaan yang terdaftar:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <TextArea placeholder="Alamat sesuai SIUP/NIB" rows={3} maxLength={50}
                    onChange={onChangealamat2} value={alamat2}
                    style={{
                        width: '100%',
                        minWidth:_minWidth,
                        }}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                RT / RW:<span className="red-text">*</span>
                </Col>
                <Col xs={15} sm={7} md={5} lg={4} xl={3}>
                    <Input placeholder="001" maxLength={3} style={{ width: '40%'}} 
                    onChange={onChangert2} value={rt2}/>
                    <span className="title-separator">/</span>
                    <Input placeholder="001" maxLength={3} style={{ width: '40%'}} 
                    onChange={onChangerw2} value={rw2}/>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                Provinsi:<span className="red-text">*</span> 
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Provinsi" onChange={onChangeprovinsi2} value={provinsi2} 
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrprovinsi.length<=0?true:false}
                    >
                        {optProvinsi()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kota/Kabupaten:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kota/Kabupaten" onChange={onChangekotakab2} value={kotakab2}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkotakab2.length<=0?true:false}
                    >
                        {optKotaKab2()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kecamatan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kecamatan" onChange={onChangekecamatan2} value={kecamatan2}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkecamatan2.length<=0?true:false}
                    >
                        {optKecamatan2()}
                    </Select>
                </Col>
            </Row>
            <Row className="title-selection-companyaddress black-text" align="middle" hidden={hiddenAddrs}>
                <Col {...layoutlbl} className="title-height-companyaddress">
                Kelurahan:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Kelurahan" onChange={onChangekelurahan2} value={kelurahan2}
                        style={{width: '100%',minWidth:_minWidth,borderRadius: "3px",fontWeight: "normal"}}
                        showSearch optionFilterProp="children" disabled={arrkelurahan2.length<=0?true:false}
                    >
                        {optKelurahan2()}
                    </Select>
                </Col>
            </Row>
            </Spin>
            <Row>
                <Col  className="container-button-left-companyaddress"
                xs={12} sm={16} md={17} lg={19} xl={20}>
                    <Button type="primary" onClick={handlePrev} className="button-footer">Kembali</Button>
                </Col>
                <Col
                xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Button type="primary" className="button-footer" disabled={onValidate()}
                    icon={issubmit? <LoadingOutlined /> : null} 
                    onClick={handleNext}>{issubmit?'Loading' : 'Selanjutnya'}</Button>
                </Col>
            </Row>
                
        </div>
    );
};

export default CompanyAddressContainer;