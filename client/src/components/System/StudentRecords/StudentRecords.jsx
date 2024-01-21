/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import StuRecStyles from "./StudentRecords.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRecords = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [registeredStudentDtails, setRegisteredStudentDetails] = useState([]);
  const navigate = useNavigate();

const getAllRegisteredStudentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/registration/get-student-details"
      );
      console.log(response);
      setRegisteredStudentDetails(response.data.AllRegistereddetails);
      message.success("Data fetched Successfull");
    } catch (error) {
      message.error("Data fetched Unsuccessfull");
    }
  };


const handleView = async(id)=>{
    try {

      console.log(id);
      message.success("Record Page Navigate Successfull")
      navigate("/record",{state:{id:id}})
      
    } catch (error) {
       message.error("Record Page Navigate Unsuccessfull")
    }
}


const handleDeleteStudentRecords = async(id)=>{
   console.log(id);

   try {
    const respone = await axios.post("http://localhost:8080/api/v1/registration/delete-student-record",{id:id})
    message.success("Record Delete Successfull");
    window.location.reload();
    
   } catch (error) {
     message.error("Record Delete Unsuccessfull");
   }
}

  useEffect(() => {
    getAllRegisteredStudentData().then(() => setLoading(false));
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    if (!loading) {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    }
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
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text, record) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={record[dataIndex] ? record[dataIndex].toString() : ""}
      />
    ),
  });

  const columns = [
    {
      title: "Student ID",
      dataIndex: "indexNumber",
      key: "indexNumber",
      width: "10%",
      ...getColumnSearchProps("indexNumber"),
      render: (text, record) => {
        const renderFunction = getColumnSearchProps("indexNumber").render;
        return (
          <span>
            {renderFunction ? renderFunction(text, record) : record.indexNumber}
          </span>
        );
      },
    },
    {
      title: "Student Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "14%",
      ...getColumnSearchProps("fullName"),
      render: (text, record) => {
        const renderFunction = getColumnSearchProps("fullName").render;
        return (
          <span>
            {renderFunction ? renderFunction(text, record) : record.fullName}
          </span>
        );
      },
    },
    {
      title: "Current Course",
      dataIndex: "currentCourseTitle",
      key: "currentCourseTitle",
      width: "14%",
      ...getColumnSearchProps("courseTitle"),
    },
    {
      title: "Current Level",
      dataIndex: "currentCourseLevel",
      key: "currentCourseLevel",
      width: "14%",
      ...getColumnSearchProps("currentCourseLevel"),
    },
    {
      title: "Completed Course",
      dataIndex: "completedCourseTitle",
      key: "completedCourseTitle",
      width: "14%",
      ...getColumnSearchProps("completedCourseTitle"),
    },
    {
      title: "Completed Levels",
      dataIndex: "completedCourseLevels",
      key: "completedCourseLevels",
      width: "14%",
      ...getColumnSearchProps("completedCourseLevels"),
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{
              borderColor: "#73d13d",
              color: "#73d13d",
            }}
            // href="/record"
            type="ghost"
            onClick={() => handleView(record._id)}
          >
            View
          </Button>
          <Button
            danger
            onClick={() => handleDeleteStudentRecords(record._id)}
          >
            Delete
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
