/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import paymentStyles from "./CambridgePaymentRecords.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";

// const data = [
//   {
//     key: "1",
//     studentID: "S001",
//     studentName: "John Doe",
//     actions: "Edit",
//   },
//   {
//     key: "2",
//     studentID: "S002",
//     studentName: "Jane Smith",
//     actions: "Edit",
//   },
//   // Add more objects for more rows
// ];

const CambridgePaymentRecords = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [userDetails, setUserDetails] = useState([]);

  const getAllUsersDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/registration/get-student-details"
      );
      console.log(response.data.AllRegistereddetails);
      setUserDetails(response.data.AllRegistereddetails);
    } catch (error) {
      message.error("Error fetching data");
    }
  };

  useEffect(() => {
    getAllUsersDetails();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              if (clearFilters && confirm) {
                handleReset(clearFilters, confirm);
              }
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
      width: "30%",
      ...getColumnSearchProps("studentID"),
      render: (text, record) => <span>{record.indexNumber}</span>,
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      width: "40%",
      ...getColumnSearchProps("studentName"),
      render: (text, record) => <span>{record.fullName}</span>,
    },
    // {
    //   title: "Student Name",
    //   dataIndex: "studentName",
    //   key: "studentName",
    //   width: "40%",
    //   ...getColumnSearchProps("studentName"),

    // },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "20%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{
              borderColor: "#ffc53d",
              color: "#ffc53d",
            }}
            type="ghost"
            href="/CambridgePaymentRecordsMark"
          >
            Mark Payments
          </Button>
          <Button
            style={{
              borderColor: "#73d13d",
              color: "#73d13d",
            }}
            type="ghost"
            href="/CambridgePaymentRecordsView"
          >
            View Payments
          </Button>
          <Button danger>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <SystemSideBar>
      <Table columns={columns} dataSource={userDetails} />;
    </SystemSideBar>
  );
};
export default CambridgePaymentRecords;
