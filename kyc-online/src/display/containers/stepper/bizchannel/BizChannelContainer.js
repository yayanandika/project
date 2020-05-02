import React, { useState,useEffect } from 'react';
import { 
    Row,Col,Select,Input,Button,Tooltip,message,Spin,Checkbox
} from 'antd';
import "./BizChannelContainer.scss";
import { InfoCircleOutlined,LoadingOutlined } from "@ant-design/icons";
import { GetBizChannel, PutBizchannel, GetBizChannelAdmin } from "../../../../services/bizchannel/BizChannel";
import { GetParameterByModule } from "../../../../services/parameter/Parameter";

const { Option } = Select;

const BizChannelContainer = props => {

    const layoutlbl = {xs: 24,sm: 24,md: 24,lg: 8,xl: 8};
    const layoutVal_sm = {xs: 15,sm: 10,md: 8,lg: 5,xl: 5};
    const layoutVal_lg = {xs: 18,sm: 12,md: 11,lg: 7,xl: 7};
    const _minWidth = 200;
    
    const [isloading, setisloading] = useState(true);
    const [firstload, setfirstload] = useState(0);
    const [autoSyncAccountFlag, setautoSyncAccountFlag] = useState(false);
    const [namaadminbizchannel, setnamaadminbizchannel] = useState(undefined);
    const [userid, setuserid] = useState(undefined);
    const [isuserid, setisuserid] = useState(true);
    const [jabatanadmin, setjabatanadmin] = useState(undefined);
    const [nohp, setnohp] = useState(undefined);
    const [emailadmin, setemailadmin] = useState(undefined);
    const [isemailadmin, setisemailadmin] = useState(true);
    const [perantambahanadmin, setperantambahanadmin] = useState(undefined);
    const [emailestatement, setemailestatement] = useState(undefined);
    const [isemailestatement, setisemailestatement] = useState(true);
    const [issubmit, setissubmit] = useState(false);
    
    const [paramnamaadminbizchannel, setparamnamaadminbizchannel] = useState([]);
    const [paramnamaadminbizchannelftr, setparamnamaadminbizchannelftr] = useState([]);
    //const [paramjabatanadmin, setparamjabatanadmin] = useState([]);
    const [paramperantambahanadmin, setparamperantambahanadmin] = useState([]);
    
    const onValidate = () => {
        if ( namaadminbizchannel === undefined || namaadminbizchannel === "" 
        || userid === undefined || userid === "" 
        || jabatanadmin === undefined || jabatanadmin === "" 
        || nohp === undefined || nohp === "" 
        || emailadmin === undefined || emailadmin === "" 
        || perantambahanadmin === undefined || perantambahanadmin === "" 
        || emailestatement === undefined || emailestatement === "" 
        || isemailadmin === false || isemailestatement === false || isuserid === false
        || issubmit === true
        ) {
          return true;
        } else {
          return false;
        }
      };

      useEffect(() => {
          
        const processData = () => {
            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                // get parameter
                GetBizChannelAdmin().then(response => {
                    var result = response.data;
                    setparamnamaadminbizchannel(result);
                });
                GetBizChannelAdmin().then(response => {
                    var result = response.data;
                    setparamnamaadminbizchannelftr(result);
                });
                    
                // GetParameterByModule('jobPosition').then(data => {
                //     setparamjabatanadmin(data);
                    
                    GetParameterByModule('role').then(data => {
                        setparamperantambahanadmin(data);
                        
                        // get bizchannel
                        GetBizChannel().then(result => {
                            const data = result.data;
                            setnamaadminbizchannel(data.name);
                            setuserid(data.userID);
                            setjabatanadmin(data.jobPosition);
                            setnohp(data.phoneNumber);
                            setemailadmin(data.emailAddr);
                            setperantambahanadmin(data.role);
                            setemailestatement(data.emailStatement);
                            setautoSyncAccountFlag(data.autoSyncAccountFlag==="Y"?true:false);
                            // console.log('ribeeet');
                            // console.log(data.emailStatement);

                            setisloading(false);
                        }).catch(() => {
                            setisloading(false);
                        });
                    }).catch(() => {
                        setisloading(false);
                    });
                // }).catch(() => {
                //     setisloading(false);
                // });
                setfirstload(1);
            }
            if (issubmit){
                PutBizchannel(BizChannel).then(data => {
                    if (data.success){
                        setissubmit(false);
                        props.nextStep();
                    }else{
                        message.warning('Update data gagal dilakukan');
                        setissubmit(false);
                    }
                });
            }
        }
        processData();
      });

      
    function onChangeautoSyncAccountFlag(e) {
        if (e.target.checked){
            setautoSyncAccountFlag(true);
        }
        else{
            setautoSyncAccountFlag(false);
        }
      }

      const BizChannel = {
        name: namaadminbizchannel,
        userID: userid,
        jobPosition: jabatanadmin,
        phoneNumber: nohp,
        role: perantambahanadmin,
        emailAddr: emailadmin,
        emailStatement: emailestatement,
        autoSyncAccountFlag: autoSyncAccountFlag?"Y":"N"
    }

      function onChangenamaadminbizchannel(val) {
        console.log(val);
        setnamaadminbizchannel(val);
        var paramadmin = paramnamaadminbizchannelftr.filter(item => item.id = val);
        paramadmin.map(value => {
            setjabatanadmin(value.jobPosition);
            setnohp(value.mobilePhone);
            return true;
        });
      }
      function onChangeuserid(val) {
        var string = val.target.value;
        console.log(string);
        setuserid(string);
        setisuserid(isUserID(string));
      }
      const isUserID = (suserid) => {
        var valid = false;
        const a = suserid.toLowerCase();
        let b = 0;
        let c = 0;
        for(let i=0;i<a.length;i++)
        {
            if('a' <= a[i] && a[i] <= 'z') // check if you have a lowercase
                b++;
            if('0' <= a[i] && a[i] <= '9') // check if you have a numeric
                c++;
        }
        if ((b > 0 && c> 0 && suserid.trim().length >= 8) || suserid.trim() === ""){
            valid = true;
        }
        return valid;

    }
    //   function onChangejabatanadmin(val) {
    //     console.log(val);
    //     setjabatanadmin(val);
    //   }
    //   function onChangenohp(val) {
    //     var string = val.target.value;
    //     console.log(string.replace(/[^0-9]/g, ""));
    //     setnohp(string.replace(/[^0-9]/g, ""));
    //   }
      function onChangeemailadmin(val) {
        var string = val.target.value;
        console.log(string);
        setemailadmin(string);
        setisemailadmin(isEmail(string));
    }
    const isEmail = (semail) => {
        var valid = false;
        /* eslint-disable */
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(semail.trim()) ||
          semail.trim() === ""){
            valid = true;
          }
          /* eslint-enable */
          return valid;
    }
      function onChangeperantambahanadmin(val) {
        console.log(val);
        setperantambahanadmin(val);
      }
      function onChangeemailestatement(val) {
        var string = val.target.value;
        console.log(string);
        setemailestatement(string);
        setisemailestatement(isEmail(string));
      }

    const handlePrev = () => {
        props.prevStep();
    }
    const handleNext = () => {
        setissubmit(true);
    }

    const optnamaadminbizchannel = () => {
        return buildoption(paramnamaadminbizchannel,0);
    }
    // const optjabatanadmin = () => {
    //     return buildoption(paramjabatanadmin,1);
    // }
    const optperantambahanadmin = () => {
        return buildoption(paramperantambahanadmin,1);
    }

    const buildoption = (dataparam, id) => {
      let optData = null;
      if (dataparam !== null){
          optData = dataparam.map((item, i) => {
              if (id === 0){
          return (<Option key={item.fullName} value={item.fullName}>{item.fullName}</Option>)
              }else{
                return (<Option key={item.code} value={item.code}>{item.value}</Option>)
              }
              });
          }
          return optData;
      } 


    const textNamaAdmin = (
        <span>
          Hanya orang dengan posisi Direktur
          dan Penerima Kuasa Transaksi yang
          bisa menjadi admin.
        </span>
      );
      const textUserID = (
          <span>
            8-12 karakter, kombinasi huruf dan angka
          </span>
        );
        const textPeranTambahan = (
            <span>
            Maker:<br />
Menginstansi transaksi untuk dimintakan persetujuan dari Approver
<br /><br />
Approver:<br />
Menyetujui transaksi yang diinisiasi oleh Maker untuk dapat dijakankan
<br /><br />
Single User:<br />
Membuat transaksi yang langsung dijalankan tanpa persetujuan user lainnya
            </span>
          );
          const textEmailestatement = (
              <span>
                Alamat email ini akan menerima Mutasi/Transaksi Bulanan Perusahaan.
              </span>
            );
        const textsync = (
            <span>Centang jika Anda ingin secara otomatis menyertakan semua rekening dengan nama perusahaan yang sama. Tidak perlu centang jika Anda ingin secara manual menambahkan rekening untuk diakses dari menu Administrator</span>
        );
        
    return (
        <div className="container-bizchannel">
            <Spin spinning={isloading} delay={500}>
            <Row>
                <Col span={24} className="title-bizchannel black-text">
                BizChannel@CIMB & <i>e-statement</i>
                </Col>
            </Row>
            <Row>
                <Col xs={22} sm={22} md={23} lg={23} xl={23}
                className="sub-title-bizchannel light-text">
                Aplikasi pendaftaran layanan internet banking BizChannel@CIMB dan pendaftaran layanan estatement
                </Col>
            </Row>
            <Row>
                <Col className="title-content-bizchannel light-text">
                <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                Nama Admin BizChannel Anda:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg}>
                    <Select
                        //suffixIcon={customSuffixIcon()}
                        placeholder="Nama sesuai KTP"
                        style={{
                        width: '100%',
                        minWidth:_minWidth,
                        borderRadius: "3px",
                        fontWeight: "normal"
                        }}
                        disabled={paramnamaadminbizchannel.length<=0?true:false}
                        onChange={onChangenamaadminbizchannel} value={namaadminbizchannel}
                    >
                        {optnamaadminbizchannel()}
                    </Select>
                </Col>
                <Col md={{ span: 1 }} 
                     lg={{ span: 1 }}>
                         <Tooltip placement="right" title={textNamaAdmin}>
                        <InfoCircleOutlined
                        style={{ fontSize: "25px", color: "#DA3832", marginLeft: "10px" }}
                        />
                    </Tooltip></Col>
            </Row>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                User ID:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm} className={isuserid === true ? "" : "error-border"}>
                    <Input placeholder="8 - 12 karakter" 
                        onChange={onChangeuserid} value={userid}
                        maxLength={12} style={{ width: '100%',minWidth:_minWidth }}/>
                </Col>
                <Col md={{ span: 1 }} 
                     lg={{ span: 1 }}>
                         <Tooltip placement="right" title={textUserID}>
                        <InfoCircleOutlined
                        style={{ fontSize: "25px", color: "#DA3832", marginLeft: "10px" }}
                        />
                    </Tooltip></Col>
            </Row>
            
            <Row><Col xs={{offset:0}} sm={{offset:0}} md={{offset:0}} lg={{offset:10}} xl={{offset:8}}
            className="error-title" hidden={isuserid === true ? true : false}>Mohon isi dengan format yang sesuai</Col></Row>
            
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                Jabatan Admin:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                    <Input value={jabatanadmin} disabled={true} placeholder="Jabatan Admin"/>
                    {/* <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Jabatan Admin"
                        style={{
                        width: '100%',
                        minWidth:_minWidth,
                        borderRadius: "3px",
                        fontWeight: "normal"
                        }}
                        disabled={paramjabatanadmin.length<=0?true:false}
                        onChange={onChangejabatanadmin} value={jabatanadmin}
                    >
                        {optjabatanadmin()}
                    </Select> */}
                </Col>
            </Row>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                Nomor Handphone:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                <Input value={nohp} disabled={true} placeholder="+62xxx-xxxx-xxx"/>
                {/* <Input
                    addonBefore="+62"
                    placeholder="xxxxxxxxxxx"
                    onChange={onChangenohp} 
                    style={{ width: '100%',minWidth:_minWidth }}
                    value={nohp}
                    type="text"
                    maxLength="11"
                /> */}
                </Col>
            </Row>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                E-mail Admin:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg} className={isemailadmin === true ? "" : "error-border"}>
                <Input placeholder="contoh@mail.com" maxLength={20} 
                style={{ width: '100%', minWidth:_minWidth}} 
                onChange={onChangeemailadmin} value={emailadmin}
                />
                </Col>
            </Row>
            
            <Row><Col xs={{offset:0}} sm={{offset:0}} md={{offset:0}} lg={{offset:10}} xl={{offset:8}}
            className="error-title" hidden={isemailadmin === true ? true : false}>Mohon isi dengan format yang sesuai</Col></Row>
            
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                Peran Tambahan Admin:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_sm}>
                    <Select
                        //suffixIcon={<CaretDownFilled style={{ color: "#DA3832" }} />}
                        placeholder="Pilih Peran"
                        style={{
                        width: '100%',
                        minWidth:_minWidth,
                        borderRadius: "3px",
                        fontWeight: "normal"
                        }}
                        disabled={paramperantambahanadmin.length<=0?true:false}
                        onChange={onChangeperantambahanadmin} value={perantambahanadmin}
                    >
                        {optperantambahanadmin()}
                    </Select>
                </Col>
                <Col md={{ span: 1 }} 
                     lg={{ span: 1 }}>
                         <Tooltip placement="right" title={textPeranTambahan}>
                        <InfoCircleOutlined
                        style={{ fontSize: "25px", color: "#DA3832", marginLeft: "10px" }}
                        />
                    </Tooltip></Col>
            </Row>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col xs={12} sm={16} md={18} lg={13} xl={10}>
                    <Checkbox onChange={onChangeautoSyncAccountFlag} checked={autoSyncAccountFlag} className="title-chkbox">Saya ingin melakukan Sinkronisasi Rekening Otomatis</Checkbox>
                </Col>
                <Col md={{ span: 1 }} 
                     lg={{ span: 1 }}>
                         <Tooltip placement="right" title={textsync}>
                        <div className="info-sync">
                        <InfoCircleOutlined style={{ fontSize: "25px", color: "#DA3832"}}/>
                        </div>
                    </Tooltip></Col>
            </Row>
            <br/>
            <Row className="title-selection-bizchannel black-text" align="middle">
                <Col {...layoutlbl} className="title-height-bizchannel">
                E-mail untuk <i>e-statement</i>:<span className="red-text">*</span>
                </Col>
                <Col {...layoutVal_lg} className={isemailestatement === true ? "" : "error-border"}>
                <Input placeholder="contoh@mail.com" maxLength={20} 
                style={{ width: '100%', minWidth:_minWidth}} 
                onChange={onChangeemailestatement} value={emailestatement}
                />
                </Col>
                <Col md={{ span: 1 }} 
                     lg={{ span: 1 }}>
                         <Tooltip placement="right" title={textEmailestatement}>
                        <InfoCircleOutlined
                        style={{ fontSize: "25px", color: "#DA3832", marginLeft: "10px" }}
                        />
                    </Tooltip></Col>
            </Row>

            <Row><Col xs={{offset:0}} sm={{offset:0}} md={{offset:0}} lg={{offset:10}} xl={{offset:8}}
            className="error-title" hidden={isemailestatement === true ? true : false}>Mohon isi dengan format yang sesuai</Col></Row>
            </Spin>
            <Row>
                <Col className="container-button" align="left"
                xs={12} sm={16} md={17} lg={19} xl={20}>
                    <Button type="primary" onClick={handlePrev} className="button-footer">Kembali</Button>
                </Col>
                <Col className="container-button" align="right"
                xs={3} sm={3} md={3} lg={3} xl={3}>
                    <Button type="primary" className="button-footer" disabled={onValidate()}
                    icon={issubmit? <LoadingOutlined /> : null} 
                    onClick={handleNext}>{issubmit?'Loading' : 'Selanjutnya'}</Button>
                </Col>
            </Row>
                
        </div>
    );
};

export default BizChannelContainer;