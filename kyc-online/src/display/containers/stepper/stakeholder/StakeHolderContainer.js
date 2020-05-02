import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Table, ConfigProvider, Button, Popconfirm } from "antd";
import {
  PlusCircleFilled,
  CheckCircleFilled,
  EditOutlined,
  MinusCircleFilled,
} from "@ant-design/icons";
import "./StakeHolderContainer.scss";

import { GET_LIST } from "../../../../store/actions/StakeHolderAction";

import {
  getList,
  deleteStakeHolder,
} from "../../../../services/stakeholder/Stakeholder";

const StakeModal = React.lazy(() =>
  import("../../../components/stakeholder/StakeHolderModal")
);

const ReceivModal = React.lazy(() =>
  import("../../../components/stakeholder/ReceiverModal")
);

const StakeHolderContainer = (props) => {
  const dispatch = useDispatch();
  const stakeHolder = useSelector((state) => state.stakeHolder);
  const [stakeModal, setStakeModal] = useState(false);
  const [updateObject, setUpdateObject] = useState(null);
  const [receiverModal, setReceiverModal] = useState(false);
  const [loading, setloading] = useState(false);

  let data = undefined;
  if (stakeHolder.stakeListData !== undefined) {
    if (stakeHolder.stakeListData.length !== 0) {
      data = stakeHolder.stakeListData;
    }
  }

  useEffect(() => {
    const setList = (data) => {
      dispatch({ type: GET_LIST, data });
    };
    setloading(true);
    getList().then((data) => {
      setList(data.data);
      setloading(false);
    });
  }, [dispatch]);

  //data
  const receiverData = [
    {
      key: "1",
      name: "Ricky Adi Kuncoro",
      konfirmasi: true,
      transaksi: true,
    },
    {
      key: "2",
      name: "John",
      konfirmasi: true,
      transaksi: true,
    },
  ];

  const submitStakeHolder = () => {
    const setList = (data) => {
      dispatch({ type: GET_LIST, data });
    };
    setloading(true);
    getList().then((data) => {
      setList(data.data);
      setloading(false);
    });
  };

  //empty-state
  const stakeEmpty = () => (
    <div
      style={{
        textAlign: "center",
        fontWeight: "normal",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      Belum ada <i>stakeholders</i>
    </div>
  );
  const receiverEmpty = () => (
    <div
      style={{
        textAlign: "center",
        fontWeight: "normal",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      Belum ada penerima kuasa
    </div>
  );

  //column
  const stakeColumns = [
    {
      title: "Nama",
      dataIndex: "fullName",
      key: "name",
      width: 190,
    },
    {
      title: "Direktur",
      dataIndex: "jobPosition",
      key: "direktur",
      align: "center",
      render: (jobPosition) => (
        <span>
          {jobPosition.includes("D") && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "Komisaris",
      dataIndex: "jobPosition",
      key: "komisaris",
      align: "center",
      render: (jobPosition) => (
        <span>
          {jobPosition.includes("K") && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "Shareholder",
      dataIndex: "jobPosition",
      key: "shareholder",
      align: "center",
      render: (jobPosition) => (
        <span>
          {jobPosition.includes("S") && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "I.U.B.O.",
      dataIndex: "jobPosition",
      key: "iubo",
      align: "center",
      render: (jobPosition) => (
        <span>
          {jobPosition.includes("I") && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "%",
      dataIndex: "ownership",
      key: "ownership",
      align: "center",
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <span>
          <EditOutlined
            style={{
              fontSize: "25px",
              color: "#DA3832",
              marginRight: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setUpdateObject(record);
              setStakeModal(true);
            }}
          />
          <Popconfirm
            placement="topLeft"
            title="Apakah Anda yakin ingin menghapus data penerima kuasa ini?"
            okText="Hapus"
            cancelText="Batal"
            onConfirm={() => {
              setloading(true);
              console.log(record.id);
              deleteStakeHolder(record.id).then((data) => {
                const setList = (data) => {
                  dispatch({ type: GET_LIST, data });
                };
                getList().then((data) => {
                  setList(data.data);
                  setloading(false);
                });
              });
            }}
          >
            <MinusCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  const receiverColumns = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
      width: 190,
    },
    {
      title: "Konfirmasi",
      dataIndex: "konfirmasi",
      key: "konfirmasi",
      align: "center",
      render: (konfirmasi) => (
        <span>
          {konfirmasi && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "Transaksi",
      dataIndex: "transaksi",
      key: "transaksi",
      align: "center",
      render: (transaksi) => (
        <span>
          {transaksi && (
            <CheckCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      render: () => (
        <span>
          <EditOutlined
            style={{
              fontSize: "25px",
              color: "#DA3832",
              marginRight: "5px",
              cursor: "pointer",
            }}
          />
          <Popconfirm
            placement="topLeft"
            title="Apakah Anda yakin ingin menghapus data penerima kuasa ini?"
            okText="Hapus"
            cancelText="Batal"
            onConfirm={() => console.log("deleted")}
          >
            <MinusCircleFilled
              style={{
                fontSize: "25px",
                color: "#DA3832",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="container-stake">
      <StakeModal
        destroyOnClose
        onSubmit={submitStakeHolder}
        visibility={stakeModal}
        closeModal={() => {
          setStakeModal(false);
          setUpdateObject(null);
        }}
        data={updateObject}
      />

      <ReceivModal
        destroyOnClose
        visibility={receiverModal}
        closeModal={() => {
          setReceiverModal(false);
          setUpdateObject(null);
        }}
        data={updateObject}
      />

      <Row>
        <Col span={24}>
          <div className="title-stake black-text">Stakeholders Management</div>
          <div className="sub-title-stake light-text">
            Tabel di bawah merupakan ringkasan stakeholders yang sudah Anda
            tambahkan.
          </div>
        </Col>
      </Row>

      <Row style={{ marginBottom: "10px" }}>
        <Col span={24}>
          <div className="title-table-stake black-text">
            Detail <i>Stakeholders</i>
          </div>
        </Col>
        <Col lg={22} md={24}>
          <ConfigProvider renderEmpty={stakeEmpty}>
            <Table
              style={{ marginBottom: "5px" }}
              size="small"
              bordered
              dataSource={data}
              loading={loading}
              columns={stakeColumns}
              pagination={{
                pageSize: 3,
                hideOnSinglePage: true,
                size: "small",
              }}
              rowKey="id"
            />
          </ConfigProvider>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setStakeModal(true);
            }}
          >
            <PlusCircleFilled
              style={{
                color: "#DA3832",
                fontSize: "25px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              Tambahkan nama <i>stakeholder</i>
            </span>
          </div>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "15px",
              color: "#797979",
            }}
          >
            I.U.B.O. : <i>Individual Ultimate Beneficial Owners</i>, (Individu
            Penerima Manfaat dengan kepemilikan saham > 25%)
          </div>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <div className="title-table-stake black-text">Penerima Kuasa</div>
        </Col>
        <Col lg={20} md={24}>
          <ConfigProvider renderEmpty={receiverEmpty}>
            <Table
              style={{ marginBottom: "5px" }}
              size="small"
              bordered
              dataSource={receiverData}
              columns={receiverColumns}
              pagination={false}
            />
          </ConfigProvider>
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setReceiverModal(true);
            }}
          >
            <PlusCircleFilled
              style={{
                color: "#DA3832",
                fontSize: "25px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              Tambahkan nama penerima kuasa
            </span>
          </div>
        </Col>
      </Row>

      <Row justify="space-between" className="container-button-nasabah">
        <Col>
          <Button
            className="button-footer"
            type="primary"
            onClick={() => {
              console.log(123);
            }}
          >
            Kembali
          </Button>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button
            className="button-footer"
            type="primary"
            onClick={() => {
              console.log(432);
            }}
          >
            Selanjutnya
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StakeHolderContainer;
