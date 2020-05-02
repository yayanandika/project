import React, { useState, useEffect } from 'react';
import { 
    Row,Col,Button,DatePicker,Upload,Input,Divider,Checkbox,message,Spin
} from 'antd';
import "./DocumentUploadContainer.scss";
import { UploadOutlined, CheckCircleFilled, ExclamationCircleFilled, LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import locale from 'antd/es/date-picker/locale/id_ID';
import moment from "moment";
import MaskedInput from "antd-mask-input";
import "moment/locale/id";
import { API_PutDocumentUpload, GetdocumentDetails, PutdocumentDetails } from "../../../../services/documentupload/DocumentUpload";
import { GetParameterByModule } from "../../../../services/parameter/Parameter";
import imgCover_Akta from '../../../../assets/images/general/Cover_Akta.jpeg';
// import imgNIB from '../../../../assets/images/general/NIB.JPEG';
import imgNPWP from '../../../../assets/images/general/NPWP.PNG';
import imgSIUP from '../../../../assets/images/general/SIUP.JPEG';
import imgSK_Domisili from '../../../../assets/images/general/SK_Domisili.png';
import imgSK_Menkeh from '../../../../assets/images/general/SK_Menkeh.jpeg';
import imgTDPdanNIB from '../../../../assets/images/general/TDPdanNIB.jpg';
import axios from "axios";
//import { Typography } from 'antd';
moment.locale("id");
//const { Paragraph } = Typography;


const SampleImageModal = React.lazy(() =>
  import("../../../components/sampleimage/SampleimageModal")
);

const { Dragger } = Upload;

const DocumentuploadContainer = props => {

    
    const [chkbox, setchkbox] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [firstload, setfirstload] = useState(0);
    const [sampleimg, setsampleimg] = useState(imgNPWP);
    const [sizenonakta, setsizenonakta] = useState(2);
    const [sizeakta, setsizeakta] = useState(5);
    // NPWP Perusahaan
    const [nwpwNumber, setNpwp] = useState(undefined);
    const [npwpfilename, setnpwpfilename] = useState('');
    const [npwpflagsuccessupld, setnpwpflagsuccessupld] = useState(true);
    const [npwpisAction, setnpwpisAction] = useState(undefined);
    const [npwppercentprogress, setnpwppercentprogress] = useState(0);
    // Surat Ijin Usaha Perdagangan/Ijin Setara
    const [businessLicensenumber, setbusinessLicensenumber] = useState(undefined);
    const [businessLicensedate, setbusinessLicensedate] = useState(undefined);
    const [businessLicensefilename, setbusinessLicensefilename] = useState('');
    
    const [businessLicenseflagsuccessupld, setbusinessLicenseflagsuccessupld] = useState(true);
    const [businessLicenseisAction, setbusinessLicenseisAction] = useState(undefined);
    const [businessLicensepercentprogress, setbusinessLicensepercentprogress] = useState(0);
    // Tanda Daftar Perusahaan/Nomor Induk Berusaha
    const [registrationCertificatenumber, setregistrationCertificatenumber] = useState(undefined);
    const [registrationCertificatedate, setregistrationCertificatedate] = useState(undefined);
    const [registrationCertificatefilename, setregistrationCertificatefilename] = useState('');
    
    const [registrationCertificateflagsuccessupld, setregistrationCertificateflagsuccessupld] = useState(true);
    const [registrationCertificateisAction, setregistrationCertificateisAction] = useState(undefined);
    const [registrationCertificatepercentprogress, setregistrationCertificatepercentprogress] = useState(0);
    // Surat Keterangan Domisili
    const [decreeDomicilenumber, setdecreeDomicilenumber] = useState(undefined);
    const [decreeDomiciledate, setdecreeDomiciledate] = useState(undefined);
    const [decreeDomicilefilename, setdecreeDomicilefilename] = useState('');
    
    const [decreeDomicileflagsuccessupld, setdecreeDomicileflagsuccessupld] = useState(true);
    const [decreeDomicileisAction, setdecreeDomicileisAction] = useState(undefined);
    const [decreeDomicilepercentprogress, setdecreeDomicilepercentprogress] = useState(0);
    // Surat Keterangan Menkeh
    const [registrationSKMenkenumber, setregistrationSKMenkenumber] = useState(undefined);
    const [registrationSKMenkefilename, setregistrationSKMenkefilename] = useState('');
    
    const [registrationSKMenkeflagsuccessupld, setregistrationSKMenkeflagsuccessupld] = useState(true);
    const [registrationSKMenkeisAction, setregistrationSKMenkeisAction] = useState(undefined);
    const [registrationSKMenkepercentprogress, setregistrationSKMenkepercentprogress] = useState(0);
    // Akta Pendirian menurut UU PT No. 40 Tahun 2007
    const [deedOfEstablishmentnumber, setdeedOfEstablishmentnumber] = useState(undefined);
    const [deedOfEstablishmentfilename, setdeedOfEstablishmentfilename] = useState('');
    
    const [deedOfEstablishmentflagsuccessupld, setdeedOfEstablishmentflagsuccessupld] = useState(true);
    const [deedOfEstablishmentisAction, setdeedOfEstablishmentisAction] = useState(undefined);
    const [deedOfEstablishmentpercentprogress, setdeedOfEstablishmentpercentprogress] = useState(0);
    // Akta dengan daftar pemegang saham terakhir
    const [deedOfShareholderfilename, setdeedOfShareholderfilename] = useState('');
    
    const [deedOfShareholderflagsuccessupld, setdeedOfShareholderflagsuccessupld] = useState(true);
    const [deedOfShareholderisAction, setdeedOfShareholderisAction] = useState(undefined);
    const [deedOfShareholderpercentprogress, setdeedOfShareholderpercentprogress] = useState(0);
    // Akta dengan daftar direktur terakhir
    const [deedOfDirectorfilename, setdeedOfDirectorfilename] = useState('');
    
    const [deedOfDirectorflagsuccessupld, setdeedOfDirectorflagsuccessupld] = useState(true);
    const [deedOfDirectorisAction, setdeedOfDirectorisAction] = useState(undefined);
    const [deedOfDirectorpercentprogress, setdeedOfDirectorpercentprogress] = useState(0);
    // Akta dengan daftar komisioner terakhir
    const [deedOfCommissionerfilename, setdeedOfCommissionerfilename] = useState('');
    
    const [deedOfCommissionerflagsuccessupld, setdeedOfCommissionerflagsuccessupld] = useState(true);
    const [deedOfCommissionerisAction, setdeedOfCommissionerisAction] = useState(undefined);
    const [deedOfCommissionerpercentprogress, setdeedOfCommissionerpercentprogress] = useState(0);

    const [issubmit, setissubmit] = useState(false);

    const [ismodal, setismodal] = useState(false);
    const [hiddenChk, sethiddenChk] = useState(true);
    const dateFormat = 'YYYY/MM/DD';
    const layoutlbl = {xs: 24,sm: 24,md: 23,lg: 23,xl: 23};
    const layout_title = {xs: 6,sm: 7,md: 7,lg: 6,xl: 6};
    const _minWidth = 200;

    function disabledDate(current) {
        return current && current < moment().startOf("day");
      }

      useEffect(() => {
        const processData = () => {

            if (firstload === 0){
                // scroll on top
                window.scroll({top: 0,left: 0,behavior: 'smooth',});
                // get parameter
                GetParameterByModule('fileSize').then(data => {
                    setsizeakta(data.find(x => x.code === 'akta').value);
                    setsizenonakta(data.find(x => x.code === 'nonAkta').value);
      
                  }).catch(() => {
                });
                GetdocumentDetails().then(result => {
                    if (!result.success){
                        setisloading(false);
                        return;
                    }
                    const datanpwp = result.data.npwp;
                    setNpwp(datanpwp.number);
                    setnpwpfilename(datanpwp.fileName);
                    const databusinessLicense = result.data.businessLicense;
                    setbusinessLicensenumber(databusinessLicense.number);
                    setbusinessLicensedate(databusinessLicense.date===null?undefined:databusinessLicense.date);
                    setbusinessLicensefilename(databusinessLicense.fileName);
                    const dataregistrationCertificate = result.data.registrationCertificate;
                    setregistrationCertificatenumber(dataregistrationCertificate.number);
                    setregistrationCertificatedate(dataregistrationCertificate.date===null?undefined:dataregistrationCertificate.date);
                    setregistrationCertificatefilename(dataregistrationCertificate.fileName);
                    const datadecreeDomicile = result.data.decreeDomicile;
                    setdecreeDomicilenumber(datadecreeDomicile.number);
                    setdecreeDomiciledate(datadecreeDomicile.date===null?undefined:datadecreeDomicile.date);
                    setdecreeDomicilefilename(datadecreeDomicile.fileName);
                    const dataregistrationSKMenke = result.data.registrationSKMenke;
                    setregistrationSKMenkenumber(dataregistrationSKMenke.number);
                    setregistrationSKMenkefilename(dataregistrationSKMenke.fileName);
                    const datadeedOfEstablishment = result.data.deedOfEstablishment;
                    setdeedOfEstablishmentnumber(datadeedOfEstablishment.number);
                    setdeedOfEstablishmentfilename(datadeedOfEstablishment.fileName);
                    const datadeedOfShareholder = result.data.deedOfShareholder;
                    setdeedOfShareholderfilename(datadeedOfShareholder.fileName);
                    const datadeedOfDirector = result.data.deedOfDirector;
                    setdeedOfDirectorfilename(datadeedOfDirector.fileName);
                    const datadeedOfCommissioner = result.data.deedOfCommissioner;
                    setdeedOfCommissionerfilename(datadeedOfCommissioner.fileName);
                    if (datadeedOfShareholder.fileName === null 
                    && datadeedOfDirector.fileName === null 
                    && datadeedOfCommissioner.fileName === null 
                    ){
                        setchkbox(false);
                        sethiddenChk(true);
                    }
                    else{
                        setchkbox(true);
                        sethiddenChk(false);
                    }
                    
                    setisloading(false);
                }).catch(() => {
                    setisloading(false);
                });
                setfirstload(1);
            }
            
            if (issubmit){
                PutdocumentDetails(documentDetails).then(data => {
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

      const documentDetails = {
            npwp: {
            number: nwpwNumber,
            fileName: npwpfilename
            },
            businessLicense: {
            number: businessLicensenumber,
            date: businessLicensedate,
            fileName: businessLicensefilename
            },
            registrationCertificate: {
            number: registrationCertificatenumber,
            date: registrationCertificatedate,
            fileName: registrationCertificatefilename
            },
            decreeDomicile: {
            number: decreeDomicilenumber,
            date: decreeDomiciledate,
            fileName: decreeDomicilefilename
            },
            registrationSKMenke: {
            number: registrationSKMenkenumber,
            fileName: registrationSKMenkefilename
            },
            deedOfEstablishment: {
            number: deedOfEstablishmentnumber,
            fileName: deedOfEstablishmentfilename
            },
            deedOfShareholder: chkbox?{ fileName: deedOfShareholderfilename }
            :null,
            deedOfDirector: chkbox?{ fileName: deedOfDirectorfilename }
            :null,
            deedOfCommissioner: chkbox?({ fileName: deedOfCommissionerfilename })
            :null
        }

    const handlePrev = () => {
        props.prevStep();
    }
    const handleNext = () => {
        setissubmit(true);
    }

    function onChangeHide(e) {
        if (e.target.checked){
            setchkbox(true);
            sethiddenChk(false);
        }
        else{
            setchkbox(false);
            sethiddenChk(true);
        }
      }
      
    function onChangeNpwp(val) {
        var string = val.target.value;
        console.log(string.replace(/[^0-9]/g, ""));
        setNpwp(string.replace(/[^0-9]/g, ""));
    }
    function onChangebusinessLicensedate(val) {
        var string = (val === null ? undefined : val.format('YYYY/MM/DD')) ;
        console.log(string);
        setbusinessLicensedate(string);
      }
      function onChangebusinessLicensenumber (val) {
        var string = val.target.value;
        console.log(string);
        setbusinessLicensenumber(string);
      }
	  
      function onChangeregistrationCertificatedate(val) {
        var string = (val === null ? undefined : val.format('YYYY/MM/DD')) ;
        console.log(string);
        setregistrationCertificatedate(string);
      }
      
      function onChangeregistrationCertificatenumber (val) {
        var string = val.target.value;
        console.log(string);
        setregistrationCertificatenumber(string);
      }
	  
      function onChangedecreeDomiciledate(val) {
        var string = (val === null ? undefined : val.format('YYYY/MM/DD')) ;
        console.log(string);
        setdecreeDomiciledate(string);
      }
      
      function onChangedecreeDomicilenumber (val) {
        var string = val.target.value;
        console.log(string);
        setdecreeDomicilenumber(string);
      }
	  
      function onChangeregistrationSKMenkenumber (val) {
        var string = val.target.value;
        console.log(string);
        setregistrationSKMenkenumber(string);
      }
	  
      function onChangedeedOfEstablishmentnumber (val) {
        var string = val.target.value;
        console.log(string);
        setdeedOfEstablishmentnumber(string);
      }

    const modalshw_imgCover_Akta = () => {
    setsampleimg(imgCover_Akta);
    setismodal(true);
    }
    // const modalshw_imgNIB = () => {
    // setsampleimg(imgNIB);
    // setismodal(true);
    // }
    const modalshw_imgNPWP = () => {
    setsampleimg(imgNPWP);
    setismodal(true);
    }
    const modalshw_imgSIUP = () => {
    setsampleimg(imgSIUP);
    setismodal(true);
    }
    const modalshw_imgSK_Domisili = () => {
    setsampleimg(imgSK_Domisili);
    setismodal(true);
    }
    const modalshw_imgSK_Menkeh = () => {
    setsampleimg(imgSK_Menkeh);
    setismodal(true);
    }
    const modalshw_imgTDP = () => {
    setsampleimg(imgTDPdanNIB);
    setismodal(true);
    }
    const handlemodalcancel = () => {
    setismodal(false);
    }
        
    const handleCheckFile = (file,size) => {
        const chktype = file.type === 'image/jpeg' 
        || file.type === 'image/png' 
        || file.type === 'application/pdf';
        if (!chktype) {
            message.error('Mohon upload file .pdf, .png, .jpeg');
            return false;
        }
        const chksize = file.size / 1024 / 1024 < size;
        if (!chksize) {
            var msgerror = ('Maksimal file upload {0} MB').replace("{0}",size);
            message.error(msgerror);
            return false;
        }
        return true;
    }

    const uploadnpwp = (files) => {
        if (!handleCheckFile(files,sizenonakta)){
            return;
        }
        setnpwpisAction(true);
        setnpwpfilename(files.name);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setnpwppercentprogress(percentCompleted);
            }
          }
          
        const resSuccess = () => {
            setTimeout(() => {
                setnpwpflagsuccessupld(true);
                setnpwpisAction(false);
                setnpwppercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'npwp', data, config)
            .then(res => {
                console.log(res);
                setnpwppercentprogress(100);
                resSuccess();
                // setnpwpflagsuccessupld(true);
                // setnpwpisAction(false);
                // setnpwppercentprogress(0);
                //setnpwpfilename(files.name);
            }).catch((error) => {
                setnpwpflagsuccessupld(false);
                setnpwpisAction(false);
                setnpwppercentprogress(0);
                //setnpwpfilename(files.name);
            });
            console.log('status');
            console.log(files.status);
    }
    const uploadbusinessLicense = (files) => {
        if (!handleCheckFile(files,sizenonakta)){
            return;
        }
        setbusinessLicensefilename(files.name);
        setbusinessLicenseisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setbusinessLicensepercentprogress(percentCompleted);
            }
          }

          const resSuccess = () => {
            setTimeout(() => {
                setbusinessLicenseflagsuccessupld(true);
                setbusinessLicenseisAction(false);
                setbusinessLicensepercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'businessLicense', data, config)
            .then(res => {
                console.log(res);
                setbusinessLicensepercentprogress(100);
                resSuccess();
            }).catch(() => {
                setbusinessLicenseflagsuccessupld(false);
                setbusinessLicenseisAction(false);
                setbusinessLicensepercentprogress(0);
            });
    }
    const uploadregistrationCertificate = (files) => {
        if (!handleCheckFile(files,sizenonakta)){
            return;
        }
        setregistrationCertificatefilename(files.name);
        setregistrationCertificateisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setregistrationCertificatepercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setregistrationCertificateflagsuccessupld(true);
                setregistrationCertificateisAction(false);
                setregistrationCertificatepercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'registrationCertificate', data, config)
            .then(res => {
                console.log(res);
                setregistrationCertificatepercentprogress(100);
                resSuccess();
            }).catch(() => {
                setregistrationCertificateflagsuccessupld(false);
                setregistrationCertificateisAction(false);
                setregistrationCertificatepercentprogress(0);
            });
    }
    const uploaddecreeDomicile = (files) => {
        if (!handleCheckFile(files,sizenonakta)){
            return;
        }
        setdecreeDomicilefilename(files.name);
        setdecreeDomicileisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setdecreeDomicilepercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setdecreeDomicileflagsuccessupld(true);
                setdecreeDomicileisAction(false);
                setdecreeDomicilepercentprogress(0);
                
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'decreeDomicile', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
            setdecreeDomicilepercentprogress(100);
            }).catch(() => {
                setdecreeDomicileflagsuccessupld(false);
                setdecreeDomicileisAction(false);
                setdecreeDomicilepercentprogress(0);
            });
    }
    const uploadregistrationSKMenke = (files) => {
        if (!handleCheckFile(files,sizenonakta)){
            return;
        }
        setregistrationSKMenkefilename(files.name);
        setregistrationSKMenkeisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setregistrationSKMenkepercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setregistrationSKMenkeflagsuccessupld(true);
                setregistrationSKMenkeisAction(false);
                setregistrationSKMenkepercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'registrationSKMenke', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
            setregistrationSKMenkepercentprogress(100);
            }).catch(() => {
                setregistrationSKMenkeflagsuccessupld(false);
                setregistrationSKMenkeisAction(false);
                setregistrationSKMenkepercentprogress(0);
            });
    }
    const uploaddeedOfEstablishment = (files) => {
        if (!handleCheckFile(files,sizeakta)){
            return;
        }
        setdeedOfEstablishmentfilename(files.name);
        setdeedOfEstablishmentisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setdeedOfEstablishmentpercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setdeedOfEstablishmentflagsuccessupld(true);
                setdeedOfEstablishmentisAction(false);
                setdeedOfEstablishmentpercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'deedOfEstablishment', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
                setdeedOfEstablishmentpercentprogress(100);
            }).catch(() => {
                setdeedOfEstablishmentflagsuccessupld(false);
                setdeedOfEstablishmentisAction(false);
                setdeedOfEstablishmentpercentprogress(0);
            });
    }
    const uploaddeedOfShareholder = (files) => {
        if (!handleCheckFile(files,sizeakta)){
            return;
        }
        setdeedOfShareholderfilename(files.name);
        setdeedOfShareholderisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setdeedOfShareholderpercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setdeedOfShareholderflagsuccessupld(true);
                setdeedOfShareholderisAction(false);
                setdeedOfShareholderpercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'deedOfShareholder', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
                setdeedOfShareholderpercentprogress(100);
            }).catch(() => {
                setdeedOfShareholderflagsuccessupld(false);
                setdeedOfShareholderisAction(false);
                setdeedOfShareholderpercentprogress(0);
            });
    }
    const uploaddeedOfDirector = (files) => {
        if (!handleCheckFile(files,sizeakta)){
            return;
        }
        setdeedOfDirectorfilename(files.name);
        setdeedOfDirectorisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setdeedOfDirectorpercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setdeedOfDirectorflagsuccessupld(true);
                setdeedOfDirectorisAction(false);
                setdeedOfDirectorpercentprogress(0);

            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'deedOfDirector', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
                setdeedOfDirectorpercentprogress(100);
            }).catch(() => {
                setdeedOfDirectorflagsuccessupld(false);
                setdeedOfDirectorisAction(false);
                setdeedOfDirectorpercentprogress(0);
            });
    }
    const uploaddeedOfCommissioner = (files) => {
        if (!handleCheckFile(files,sizeakta)){
            return;
        }
        setdeedOfCommissionerfilename(files.name);
        setdeedOfCommissionerisAction(true);
        const config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              if (percentCompleted > 5){
                percentCompleted = percentCompleted - 5;
              }
            setdeedOfCommissionerpercentprogress(percentCompleted);
            }
          }
          
          const resSuccess = () => {
            setTimeout(() => {
                setdeedOfCommissionerflagsuccessupld(true);
                setdeedOfCommissionerisAction(false);
                setdeedOfCommissionerpercentprogress(0);
            }, 500);
        };
        
          let data = new FormData()
          data.append('file', files)
        
          axios.put(API_PutDocumentUpload+'deedOfCommissioner', data, config)
            .then(res => {
                console.log(res);
                resSuccess();
                setdeedOfCommissionerpercentprogress(100);
            }).catch(() => {
                setdeedOfCommissionerflagsuccessupld(false);
                setdeedOfCommissionerisAction(false);
                setdeedOfCommissionerpercentprogress(0);
            });
    }
        
    const buildTitleSelection = (title, ismandatory) => {
        return <Row className="title-selection-documentupload black-text" align="middle">
                    <Col {...layoutlbl}>
                        {title}<span className="red-text">{ismandatory?'*':''}</span>
                    </Col>
                </Row>
    }

    const buildContentDragger = (isActionload,filename,flagsuccessupld) => {
        // var fname = filename.split('.')[0];
        // var typefile = filename.split('.');
        // typefile = typefile[typefile.length-1];
        // if (filename.length>5){
        //     fname = fname.substring(0,2).concat('...',fname.substring(fname.length-2, fname.length),'.',typefile);
        // }
        var repfilename = filename===null?'':filename;
        var fname = repfilename.split('.').slice(0, -1).join('.');
        var extname = repfilename.split('.').pop();
        var firstname = fname.substring(0,fname.length-2);
        var flastname = (fname.substring(fname.length-2, fname.length))+"."+extname;
        //fname = fname.substring(0,3)+'xxx'+fname.substring(fname.length-4, fname.length)
        const success = (<Row>
                            <Col align="left" xs={14} sm={18} md={5} lg={5} xl={4}>
                                {isActionload?<SyncOutlined spin style={{ marginLeft:"15px", fontSize: "24px",lineHeight:"68px", color: "#DA3832" }} /> 
                                :
                                (flagsuccessupld?
                                <CheckCircleFilled style={{ marginLeft:"15px", fontSize: "24px",lineHeight:"68px", color: "green" }} />
                                : <ExclamationCircleFilled style={{ marginLeft:"15px", fontSize: "24px",lineHeight:"68px", color: "#DA3832" }} />)
                                }
                                
                            </Col>
                            <Col align="left" xs={14} sm={18} md={14} lg={15} xl={17}>
                                <span className="firstPart">{firstname}</span>
                                <span className="lastPart">{flastname}</span>
                            </Col>
                            <Col align="left" xs={3} sm={3} md={3} lg={1} xl={3}>
                                <UploadOutlined style={{ marginRight:"50px", fontSize: "24px",lineHeight:"68px", color:"#DA3832"}} />
                            </Col>
                        </Row>);
        const nodata = (<div><p className="ant-upload-drag-icon">
                            {isActionload?
                            <SyncOutlined spin style={{ fontSize: "24px", color: "#DA3832" }} /> 
                            :
                            <UploadOutlined style={{ fontSize: "24px",color:"#DA3832" }} />
                            }
                        </p>
                        <p className="ant-upload-text">
                            Klik untuk upload data
                        </p></div>);

        if (repfilename !== ''){
            return success;
        }else{
            return nodata
        }
    }
    const buildRowStatus = (filename,flagsuccessupld,isAction,percentprogress,module) => {
        var statupload = flagsuccessupld?'Sukses!':'Gagal upload.';
        if (filename === "" || filename === undefined){
            statupload = ''
        }
        var modalshow = null;
        if(module === 1){
            modalshow = modalshw_imgNPWP;
        }else if(module === 2){
            modalshow = modalshw_imgSIUP;
        }else if(module === 4){
            modalshow = modalshw_imgSK_Domisili;
        }else if(module === 5){
            modalshow = modalshw_imgSK_Menkeh;
        }else if(module === 3){
            modalshow = modalshw_imgTDP;
        }else{
            modalshow = modalshw_imgCover_Akta;
        }



        return (<Row align="middle">
        
        <Col align="left" hidden={false} xs={3} sm={3} md={4} lg={3} xl={4}>
            {!isAction?<span style={{color:"grey"}}>{statupload}</span> :
            'Uploading... '+percentprogress+'%'
            // <Progress percent={percentprogress} size="small" status="normal" />
            }
        </Col>
        <Col {...layout_title} align="right"  xs={3} sm={3} md={3} lg={3} xl={2}>
        <div className="contoh-file" style={{cursor:"pointer"}} onClick={modalshow}>
            Contoh file
        </div>
        </Col>
    </Row>);
    }
    const buildDivider = () => {
        return <Row>
                    <Col xs={22} sm={22} md={22} lg={23} xl={23}>
                    <Divider style={{border: "solid 1px #DCDCDC"}} />
                    </Col>
                </Row>
    }
    
    return (
        <div className="container-documentupload">
            <Spin spinning={isloading} delay={500}>
            <SampleImageModal 
                        visible={ismodal}
                        sampleimage={sampleimg}
                        onCancel={handlemodalcancel}/>

            <Row>
                <Col span={24} className="title-documentupload black-text">
                <i>Upload</i> Dokumen
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={22} md={22} lg={23} xl={23}
                className="sub-title-documentupload light-text">
                Format <i>file</i> yang disarankan adalah <i>.pdf, .png, .jpg</i>, maksimal <i>upload</i> 
                &nbsp;adalah <b>{sizenonakta} MB</b> dan untuk <b>Akta adalah {sizeakta} MB</b>. Disarankan dokumen berwarna hitam putih dan jelas terbaca.
                </Col>
            </Row>
            <Row>
                <Col className="title-content-documentupload light-text">
                <span className="red-text">*</span> wajib diisi
                </Col>
            </Row>
            {/* --- row -- */}
            {buildTitleSelection('NPWP Perusahaan:', true)}
            <Row type="flex" style={{marginBottom:"2px"}}>
                <Col {...layout_title}>
                    <Col>
                    <Dragger
                    action={uploadnpwp}
                    showUploadList={false}
                    disabled={npwpisAction}
                    >
                        {buildContentDragger(npwpisAction,npwpfilename,npwpflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor NPWP:<span className="red-text">*</span></Col></Row>
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right">
                        <MaskedInput
                            mask="11.111.111.1-111.111"
                            placeholder="xx.xxx.xxx.x-xxx.xxx"
                            style={{   width: '100%',minWidth:_minWidth }}
                            onChange={onChangeNpwp}
                            value={nwpwNumber}
                        />
                        </Col></Row>
                </Col>
            </Row>
            {buildRowStatus(npwpfilename,npwpflagsuccessupld,npwpisAction,npwppercentprogress,1)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Surat Ijin Usaha Perdagangan/Ijin Setara:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploadbusinessLicense}
                    disabled={businessLicenseisAction}
                    showUploadList={false}>
                        {buildContentDragger(businessLicenseisAction,businessLicensefilename, businessLicenseflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor Surat:<span className="red-text">*</span></Col></Row>
                    <Row><Col style={{marginTop:15}}>Tanggal Kadaluwarsa:<span className="red-text">*</span></Col></Row>
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right"><Input placeholder="Nomor tertera pada dokumen" 
                        value={businessLicensenumber} onChange={onChangebusinessLicensenumber}
                        maxLength={30} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                    <Row align="middle"><Col align="right" className="content-input-doumentupload">
                        <DatePicker placeholder="YYYY/MM/DD" inputReadOnly
                        value={businessLicensedate !== undefined ? moment(businessLicensedate, dateFormat) : undefined}
                        onChange={onChangebusinessLicensedate}
                        locale = {locale} disabledDate={disabledDate}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                </Col>
            </Row>
            {buildRowStatus(businessLicensefilename,businessLicenseflagsuccessupld
                ,businessLicenseisAction,businessLicensepercentprogress,2)}
            {buildDivider()}
            {/* --- row -- */}
            <Row className="title-selection-documentupload black-text" align="middle">
                <Col {...layoutlbl}>
                Tanda Daftar Perusahaan/Nomor Induk Berusaha:<span className="red-text">*</span>
                </Col>
            </Row>
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploadregistrationCertificate}
                    disabled={registrationCertificateisAction}
                    showUploadList={false}>
                    {buildContentDragger(registrationCertificateisAction,registrationCertificatefilename, registrationCertificateflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor:<span className="red-text">*</span></Col></Row>
                    <Row><Col style={{marginTop:15}}>Tanggal Kadaluwarsa:<span className="red-text">*</span></Col></Row>
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right"><Input placeholder="Nomor tertera pada dokumen" 
                        value={registrationCertificatenumber} onChange={onChangeregistrationCertificatenumber}
                        maxLength={30} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                    <Row align="middle"><Col align="right" className="content-input-doumentupload"><DatePicker placeholder="YYYY/MM/DD" inputReadOnly
                        value={registrationCertificatedate !== undefined ? moment(registrationCertificatedate, dateFormat) : undefined}
                        locale = {locale} disabledDate={disabledDate} onChange={onChangeregistrationCertificatedate}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                </Col>
            </Row>
            {buildRowStatus(registrationCertificatefilename,registrationCertificateflagsuccessupld
                ,registrationCertificateisAction,registrationCertificatepercentprogress,3)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Surat Keterangan Domisili:', false)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploaddecreeDomicile}
                    disabled={decreeDomicileisAction}
                    showUploadList={false}>
                    {buildContentDragger(decreeDomicileisAction,decreeDomicilefilename, decreeDomicileflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor Surat:<span className="red-text">*</span></Col></Row>
                    <Row><Col style={{marginTop:15}}>Tanggal Kadaluwarsa:<span className="red-text">*</span></Col></Row>
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right"><Input placeholder="Tertera pada SK Domisili"
                    value={decreeDomicilenumber} onChange={onChangedecreeDomicilenumber}
                        maxLength={30} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                    <Row align="middle"><Col align="right" className="content-input-doumentupload"><DatePicker placeholder="YYYY/MM/DD" inputReadOnly
                        value={decreeDomiciledate !== undefined ? moment(decreeDomiciledate, dateFormat) : undefined}
                        locale = {locale} disabledDate={disabledDate} onChange={onChangedecreeDomiciledate}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                </Col>
            </Row>
            {buildRowStatus(decreeDomicilefilename,decreeDomicileflagsuccessupld
                ,decreeDomicileisAction,decreeDomicilepercentprogress,4)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Surat Keterangan Menkeh:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploadregistrationSKMenke}
                    disabled={registrationSKMenkeisAction}
                    showUploadList={false}>
                    {buildContentDragger(registrationSKMenkeisAction,registrationSKMenkefilename, registrationSKMenkeflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor Surat:<span className="red-text">*</span></Col></Row>
                    {/* <Row><Col style={{marginTop:15}}>Tanggal Kadaluwarsa:<span className="red-text">*</span></Col></Row> */}
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right"><Input placeholder="Tertera pada SK Menkeh" 
                    value={registrationSKMenkenumber} onChange={onChangeregistrationSKMenkenumber}
                    maxLength={30} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                </Col>
            </Row>
            {buildRowStatus(registrationSKMenkefilename,registrationSKMenkeflagsuccessupld
                ,registrationSKMenkeisAction,registrationSKMenkepercentprogress,5)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Akta Pendirian menurut UU PT No. 40 Tahun 2007:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploaddeedOfEstablishment}
                    disabled={deedOfEstablishmentisAction}
                    showUploadList={false}>
                    {buildContentDragger(deedOfEstablishmentisAction,deedOfEstablishmentfilename, deedOfEstablishmentflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
                <Col className="title-content-documentupload black-text"
                 xs={{span: 5, offset: 1}} sm={{span: 6, offset: 1}} 
                 md={{span: 6, offset: 2}} lg={{span: 5, offset: 5}} xl={{span: 4, offset: 5}}>
                    <Row><Col style={{marginTop:5}}>Nomor akta:<span className="red-text">*</span></Col></Row>
                    {/* <Row><Col style={{marginTop:15}}>Tanggal Kadaluwarsa:<span className="red-text">*</span></Col></Row> */}
                </Col>
                <Col span={5}>
                    <Row align="middle"><Col align="right"><Input placeholder="Menurut Akta Pendirian" 
                    value={deedOfEstablishmentnumber} onChange={onChangedeedOfEstablishmentnumber}
                        maxLength={30} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row>
                    {/* <Row align="middle"><Col align="right" className="content-input-doumentupload"><DatePicker placeholder="YYYY/MM/DD" inputReadOnly
                        locale = {locale}
                        format={dateFormat} style={{ width: '100%',minWidth:_minWidth }}/></Col></Row> */}
                </Col>
            </Row>
            {buildRowStatus(deedOfEstablishmentfilename,deedOfEstablishmentflagsuccessupld
                ,deedOfEstablishmentisAction,deedOfEstablishmentpercentprogress)}
            {buildDivider()}

            {/* checkbox */}
            <Row className="title-selection-companyaddress black-text" align="middle">
                <Col>
                    <Checkbox onChange={onChangeHide} checked={chkbox} className="title-chkbox">Saya pernah melakukan pembaharuan akta</Checkbox>
                </Col>
            </Row>

            <div hidden={hiddenChk}>
            {/* --- row -- */}
            {buildTitleSelection('Akta dengan daftar pemegang saham terakhir:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploaddeedOfShareholder}
                    disabled={deedOfShareholderisAction}
                    showUploadList={false}>
                    {buildContentDragger(deedOfShareholderisAction,deedOfShareholderfilename, deedOfShareholderflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
            </Row>
            {buildRowStatus(deedOfShareholderfilename,deedOfShareholderflagsuccessupld
                ,deedOfShareholderisAction,deedOfShareholderpercentprogress)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Akta dengan daftar direktur terakhir:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploaddeedOfDirector}
                    disabled={deedOfDirectorisAction}
                    showUploadList={false}>
                    {buildContentDragger(deedOfDirectorisAction,deedOfDirectorfilename, deedOfDirectorflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
            </Row>
            {buildRowStatus(deedOfDirectorfilename,deedOfDirectorflagsuccessupld
                ,deedOfDirectorisAction,deedOfDirectorpercentprogress)}
            {buildDivider()}
            {/* --- row -- */}
            {buildTitleSelection('Akta dengan daftar komisioner terakhir:', true)}
            <Row type="flex">
                <Col {...layout_title}>
                    <Col>
                    <Dragger action={uploaddeedOfCommissioner}
                    disabled={deedOfCommissionerisAction}
                    showUploadList={false}>
                    {buildContentDragger(deedOfCommissionerisAction,deedOfCommissionerfilename, deedOfCommissionerflagsuccessupld)}
                    </Dragger>
                    </Col>
                </Col>
            </Row>
            {buildRowStatus(deedOfCommissionerfilename,deedOfCommissionerflagsuccessupld,
                deedOfCommissionerisAction,deedOfCommissionerpercentprogress)}
            {buildDivider()}
            </div>
            </Spin>
            <Row>
                <Col className="container-button" align="left"
                    xs={12} sm={16} md={17} lg={19} xl={20}>
                        <Button type="primary" onClick={handlePrev} className="button-footer">Kembali</Button>
                </Col>
                <Col className="container-button" align="right"
                    xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button type="primary" onClick={handleNext} className="button-footer" 
                        icon={issubmit? <LoadingOutlined /> : null} 
                        >{issubmit?'Loading' : 'Selanjutnya'}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default DocumentuploadContainer;