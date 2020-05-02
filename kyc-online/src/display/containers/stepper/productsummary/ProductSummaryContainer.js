import React, {useState, useEffect} from 'react';
import { Row, Col, Table, ConfigProvider, Button, Popconfirm, message, Spin } from "antd";
import {
  PlusCircleFilled,
  EditOutlined,
  MinusCircleFilled
} from "@ant-design/icons";
import "./ProductSummaryContainer.scss";
import { GetParameterByModule } from "../../../../services/parameter/Parameter";
import { GetProductSummary, DeleteProductSummary } from "../../../../services/productsummary/ProductSummary";

const ProductDetailsModal = React.lazy(() =>
  import("../../../components/productdetails/ProductDetailsModal")
);

const ProductSummary = props => {

    const [firstload, setfirstload] = useState(0);
    const [ismodal, setismodal] = useState(false);
    const [isupdatemodal, setisupdatemodal] = useState(false);
    const [dataproduct, setdataproduct] = useState([]);
    
    const [datamodal, setdatamodal] = useState([]);
    const [isloading, setisloading] = useState(true);

    const [loadtable, setloadtable] = useState(false);
    const [isdelete, setisdelete] = useState(false);
    const [idproduct, setidproduct] = useState(undefined);

    const [parnamaproduk, setparnamaproduk] = useState([]);
    const [parsumberdana, setparsumberdana] = useState([]);
    const [partujuandgnbank, setpartujuandgnbank] = useState([]);
    const [partujuanrekening, setpartujuanrekening] = useState([]);
    const [parrataaktivitas, setparrataaktivitas] = useState([]);
            
    const [linkgiro, setlinkgiro] = useState('');
    const [linkgiroib, setlinkgiroib] = useState('');
    const [linksavings, setlinksavings] = useState('');
    const [linksavingsib, setlinksavingsib] = useState('');

    useEffect(() => {
      const processData = () => {
          if (firstload === 0){
            // scroll on top
            window.scroll({top: 0,left: 0,behavior: 'smooth',});
            try{
              // get parameter
              GetParameterByModule('productLink').then(data => {
                
              setlinkgiro(data.find(x => x.code.toLowerCase() === 'giro').value);
              setlinkgiroib(data.find(x => x.code.toLowerCase() === 'giro ib').value);
              setlinksavings(data.find(x => x.code.toLowerCase() === 'savings').value);
              setlinksavingsib(data.find(x => x.code.toLowerCase() === 'savings ib').value);

              }).catch(() => {
              });
              GetParameterByModule('productName').then(data => {
              setparnamaproduk(data);

              GetParameterByModule('sourceOfFund').then(data => {
                setparsumberdana(data);

                  GetParameterByModule('purposeFund').then(data => {
                    setpartujuandgnbank(data);
                        
                      GetParameterByModule('purposeOpenAccount').then(data => {
                        setpartujuanrekening(data);
                            
                          GetParameterByModule('avgTransaction').then(data => {
                            setparrataaktivitas(data);
                            
                            setloadtable(true);
                            setisloading(false);
                          }).catch(() => {
                            setisloading(false);
                        });
                      }).catch(() => {
                        setisloading(false);
                    });
                  }).catch(() => {
                    setisloading(false);
                });
              }).catch(() => {
                setisloading(false);
              });
              }).catch(() => {
              setisloading(false);
              });
            } catch {

            }
            setfirstload(1);
          }
          if (loadtable && firstload===1){
              var dtp = [];
              GetProductSummary().then(response => {
                if (!response.success){
                  return;
                }
                const dt = response.data;
                dt.map(result => {
                const dtprod = {
                    key: result.id,
                    id: result.id,
                    productCode: result.productCode,
                    isSyariah: result.isSyariah,
                    zakatFlag: result.zakatFlag,
                    currency: result.currency,
                    sourceOfFund: result.sourceOfFund,
                    purposeFund: result.purposeFund,
                    purposeOpenAccount: result.purposeOpenAccount,
                    avgTransaction: result.avgTransaction,
  
                    productCode_name: parnamaproduk.find(x => x.code === result.productCode).value,
                    isSyariah_name: result.isSyariah === "Y" ? "Syariah" : "Konven",
                    sourceOfFund_name: parsumberdana.find(x => x.code === result.sourceOfFund).value,
                    purposeFund_name: partujuandgnbank.find(x => x.code === result.purposeFund).value,
                    purposeOpenAccount_name: partujuanrekening.find(x => x.code === result.purposeOpenAccount).value,
                    avgTransaction_name: parrataaktivitas.find(x => x.code === result.avgTransaction).value
                  };
                  dtp = [...dtp, dtprod];
                  setisloading(true);
                  return true;
                });
                // var test = dtp.sort(function (a) {
                //   return a.id;
                // });
                setdataproduct(dtp);
                setisloading(false);
            }).catch(() => {
              setisloading(false);
          });
            
          setloadtable(false);
        }
        if (isdelete){
          DeleteProductSummary(parseInt(idproduct, 10)).then(data => {
            if (data.success){
              setloadtable(true);
            }else{
                message.warning('Update data gagal dilakukan');
            }
          });
          setidproduct(undefined);
          setisdelete(false);
        }
      }
      processData();
  });
    
    const handleModalCancel = () => {
      setismodal(false);
    }
    const handleModalShow = () => {
      if (dataproduct.length>=3){
        message.warning("Batas maksimal data produk hanya 3");
        return;
      }
        setisupdatemodal(false);
        setismodal(true);
    }
    
    const onValidate = () => {
        if (dataproduct.length <= 0){
        return true;}
        else{
        return false;}
    };

    const handlePrev = () => {
      props.prevStep();
    }
    const handleNext = () => {
      props.nextStep();
    }

  const submitmodal = () => {
    //setdataproduct([]);
    setismodal(false);
    setloadtable(true);
    setisloading(true);
  }

  const productEmpty = () => (
    <div
      style={{
        textAlign: "center",
        fontWeight: "normal",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      Belum ada produk
    </div>
  );

    const productColumns = [
      {
        title: "No.",
        key: "nomor",
        width: 10,
        render : (text, record, index) => (index+1),
      },
      {
        title: "Nama Produk",
        dataIndex: "productCode_name",
        key: "productCode_name",
        width: 120
      },
      {
        title: "Jenis",
        dataIndex: "isSyariah_name",
        key: "isSyariah_name",
        width: 70
      },
      {
        title: "Mata Uang",
        dataIndex: "currency",
        key: "currency",
        width: 100
      },
      {
        title: "Sumber Dana",
        dataIndex: "sourceOfFund_name",
        key: "sourceOfFund_name",
        width: 160
      },
      {
        title: "Modal",
        dataIndex: "purposeFund_name",
        key: "purposeFund_name",
        width: 100
      },
      {
        title: "Tujuan",
        dataIndex: "purposeOpenAccount_name",
        key: "purposeOpenAccount_name",
        width: 105
      },
      {
        title: "Transaksi",
        dataIndex: "avgTransaction_name",
        key: "avgTransaction_name",
        width: 150
      },
      {
        fixed: 'right',
        width: 90,
        title: "",
        key: "action",
        render: (text,record) => (
          <span>
              <EditOutlined
                style={{
                  fontSize: "25px",
                  color: "#DA3832",
                  marginRight: "5px",
                  curstylesor: "pointer"
                  
                }}
                onClick={() => {
                  const updated = record.productCode;
                  setdatamodal(dataproduct.filter(item => item.productCode === updated));
                  setisupdatemodal(true);
                  setismodal(true);
                }}
              />
            <Popconfirm
              placement="topLeft"
              title="Apakah Anda yakin ingin menghapus data produk ini?"
              okText="Hapus"
              cancelText="Batal"
              onConfirm={() => {
                const deleted = record.id;
                //setdataproduct(dataproduct.filter(item => item.productCode !== deleted));
                setisdelete(true);
                setidproduct(deleted);
                setloadtable(true);
                setisloading(true);
              }}
            >
              <MinusCircleFilled
                style={{
                  fontSize: "25px",
                  color: "#DA3832",
                  marginLeft: "5px",
                  cursor: "pointer"
                }}
              />
            </Popconfirm>
          </span>
        )
      }
    ];
      
    return (
    <div className="container-productsummary">
      <ProductDetailsModal 
                        isupdatemodal={isupdatemodal}
                        datamodal={datamodal}
                        visible={ismodal}
                        closable={true}
                        onClickBtnAdd={submitmodal}
                        onCancel={handleModalCancel}
                        />
        <Row>
                <Col span={24} className="title-productsummary black-text">
                Ringkasan Data Produk
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={16} md={22} lg={24} xl={24}
                className="sub-title-productsummary light-text">
                Table dibawah merupakan ringkasan dari produk yang sudah Anda pilih.
                </Col>
            </Row>
            
            <Spin spinning={isloading} delay={500}>
            <Row>
                <Col xs={12} sm={17} md={18} lg={19} xl={19}>
                  {/* <div style={{minWidth:"640px", width:"1000px"}} */}
                  <ConfigProvider renderEmpty={productEmpty}>
                      <Table
                      rowKey='id'
                        //style={{ marginBottom: "15px", minWidth: '680px', width: '120%' }}
                        className="style-table"
                        size="small"
                        bordered
                        dataSource={dataproduct}
                        columns={productColumns}
                        pagination={false}
                      />
                  </ConfigProvider>
                  {/* </div> */}
                </Col>
            </Row>
            <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
            onClick={handleModalShow}
          >
            <PlusCircleFilled
              style={{
                color: "#DA3832",
                fontSize: "25px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px"
              }}
            />
            <span
              style={{
                fontSize: "15px",
                display: "inline-block",
                verticalAlign: "middle",
                color: "black"
              }}
            >
              Tambahkan Rekening
            </span>
          </div>
          
          </Spin>
            <Row>
                <Col className="paragraph-info light-text">
                Info produk lebih lanjut<br/>
                    1. <a href={linkgiro} target="_blank" rel="noopener noreferrer">Giro</a><br/>
                    2. <a href={linkgiroib} target="_blank" rel="noopener noreferrer">Giro iB</a><br/>
                    3. <a href={linksavings} target="_blank" rel="noopener noreferrer">Savings</a><br/>
                    4. <a href={linksavingsib} target="_blank" rel="noopener noreferrer">Savings iB</a>
                    {/* <p className="paragraph-info light-text">
                    </p> */}
                </Col>
            </Row>
            <Row>
            <Col className="container-button" align="left"
                xs={12} sm={16} md={17} lg={19} xl={20}>
                    <Button type="primary" onClick={handlePrev} className="button-footer-product">Kembali</Button>
            </Col>
            <Col className="container-button-right" align="right"
                xs={3} sm={3} md={1} lg={1} xl={1}>
                    <Button type="primary" onClick={handleNext} className="button-footer-product" 
                    disabled={onValidate()}
                    >
                        Selanjutnya</Button>
            </Col>
            </Row>
    </div>
    );
}

export default ProductSummary;