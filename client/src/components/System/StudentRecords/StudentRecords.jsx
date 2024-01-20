/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import StuRecStyles from "./StudentRecords.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import axios from "axios";

const data = [
  {
    key: "1",
    studentId: "S001",
    name: "John Brown",
    courseTitle: "British English",
    courseLevels: "Level 1",
  },
  {
    key: "2",
    studentId: "S002",
    name: "Joe Black",
    courseTitle: "British English",
    courseLevels: "Level 2",
  },
  {
    key: "3",
    studentId: "S003",
    name: "Jim Green",
    courseTitle: "General English",
    courseLevels: "Level 1",
  },
  {
    key: "4",
    studentId: "S004",
    name: "Jim Red",
    courseTitle: "General English",
    courseLevels: "Level 3",
  },
];
const StudentRecords = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [registeredStudentDtails,setRegisteredStudentDetails] = useState([])


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
          position: "absolute",
          padding: 8,
          zIndex: 1,
          backgroundColor: "#fff",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
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
            onClick={() => clearFilters && handleReset(clearFilters, confirm)} // Pass confirm here
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
            backgroundColor: "#d3adf7",
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


  const getAllRegisteredStudentData = async()=>{
        try {
          const response = await axios.get('http://localhost:8080/api/v1/registration/get-student-details') 
           console.log(response);
           setRegisteredStudentDetails(response.data.AllRegistereddetails)
           message.success(response.data.message)
        } catch (error) {
           message.error("Data fetched Unsuccessfull")
        }
  }

  useEffect(()=>{
    getAllRegisteredStudentData()
  },[])


  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: "10%",
      ...getColumnSearchProps("studentId"),
      render:((text,record)=>(
        <span>{record.indexNumber}</span>
      ))
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
      render:((text,record)=>(
        <span>{record.fullName}</span>
      )),
    },
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: "20%",
      ...getColumnSearchProps("courseTitle"),
    },
    {
      title: "Course Levels",
      dataIndex: "courseLevels",
      key: "courseLevels",
      width: "20%",
      ...getColumnSearchProps("courseLevels"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{
              borderColor: "#73d13d",
              color: "#73d13d",
            }}
            href="/record"
            type="ghost"
            onClick={() => {
              
            }}
          >
            View Record
          </Button>
          <Button
            danger
            onClick={() => {
              /* Delete action */
            }}
          >
            Delete Record
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SystemSideBar>
        <Table
          columns={columns}
          dataSource={registeredStudentDtails}
          pagination={{ pageSize: 8 }}
        />
      </SystemSideBar>
    </div>
  );
};

export default StudentRecords;
