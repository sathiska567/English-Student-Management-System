/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import StuRecStyles from "./StudentRecords.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message,Popconfirm, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../BaseUrl/BaseUrl";

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
      // console.log(response);


      setRegisteredStudentDetails(response.data.AllRegistereddetails);
      // console.log(registeredStudentDtails);

      // response.data.AllRegistereddetails.forEach((record) => {
      //   record.completedCourseTitleSearch = [
      //     ...record.completedBritishLevels,
      //     ...record.completedGeneralLevels,
      //   ];
      // });

    } catch (error) {
      message.error("Data fetched Unsuccessfull");
    }
  };


  const handleView = async (id) => {
    try {

      // console.log(id);
      message.success("Record Page Navigate Successfull")
      navigate("/record", { state: { id: id } })

    } catch (error) {
      message.error("Record Page Navigate Unsuccessfull")
    }
  }


  const confirm = (e) => {
    console.log(e);
    // handleDeleteStudentRecords(e._id)
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const confirmed = await new Promise((resolve, reject) => {
  //       Modal.confirm({
  //         title: 'Are you sure you want to delete this member record?',
  //         okText: 'Yes',
  //         okType: 'danger',
  //         onOk: () => resolve(true),
  //         onCancel: () => resolve(false) 
  //       });
  //     });

  //     if (confirmed) {
  //       console.log(id);
  //       const response = await axios.post("/delete", { id: id });


  //       if (response.data.success) {
  //         message.success("Deletion is successful");
  //         window.location.reload();
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error deleting member:", error);

  //     message.error("An error occurred while deleting the member");
  //   }
  // };

  const handleDeleteStudentRecords = async (id) => {
    // console.log(id);

    try {
      const confirmed = await new Promise((resolve, reject) => {
              Modal.confirm({
                title: 'Are you sure you want to delete this member record?',
                okText: 'Yes',
                okType: 'danger',
                onOk: () => resolve(true),
                onCancel: () => resolve(false) 
              });
            });
      
            if (confirmed) {
              const response = await axios.post(`${baseUrl}/api/v1/registration/delete-student-record`, { id: id })       
              if (response.data.success) {
                message.success(response.data.message);
                window.location.reload();
              }
            }

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
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
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
              confirm();
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
        ? Array.isArray(record[dataIndex]) // Check if the record[dataIndex] is an array
          ? value
            .toLowerCase()
            .split(",")
            .every(
              (
                val // Split the search value into an array and check if every value
              ) =>
                record[dataIndex].some((item) =>
                  item.toLowerCase().includes(val.trim())
                ) // is included in any item in the array
            )
          : record[dataIndex]
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
    // {
    //   title: "Student ID",
    //   dataIndex: "indexNumber",
    //   key: "indexNumber",
    //   width: "10%",
    //   ...getColumnSearchProps("indexNumber"),
    //   render: (text, record) => {
    //     const renderFunction = getColumnSearchProps("indexNumber").render;
    //     return (
    //       <span>
    //         {renderFunction ? renderFunction(text, record) : record.indexNumber}
    //       </span>
    //     );
    //   },
    // },
    {
      title: "Student Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "14%",
      ...getColumnSearchProps("fullName"),
      render: (text, record) => {
        const renderFunction = getColumnSearchProps("fullName").render;
        return (
          <div>
            <span>
              {renderFunction ? renderFunction(text, record) : record.fullName}
            </span>
          </div>
        );
      },
    },


    {
      title: "Cambrige Examination",
      dataIndex: "examination",
      key: "examination",
      width: "14%",
      ...getColumnSearchProps("currentCourseTitleSearch"),
      render: (text, record) => {
        // Ensure currentBritishLevel and currentGeneralLevel are arrays
        if (!Array.isArray(record.cambrige || record.general)) {
          record.cambrige = [record.cambrige];

        }
        if (!Array.isArray(record.general)) {
          record.currentGeneralLevel = [record.currentGeneralLevel];
        }

        // Combine cambrige and currentGeneralLevel into a single string
        record.currentCourseTitleSearch = [
          ...record.cambrige,
          ...record.currentGeneralLevel,
        ].join(" , ");

        return (
          <div>
            <span>

              <b>
                <Highlighter
                  highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={record.cambrige.join(" , ")}
                />
              </b>
            </span>
            <br />
            <br />

          </div>
        );
      },
    },


    // {
    //   title: "Current Level",
    //   dataIndex: "currentCourseLevel",
    //   key: "currentCourseLevel",
    //   width: "14%",
    //   ...getColumnSearchProps("currentCourseLevel"),
    // },

    {
      title: "General Examination",
      dataIndex: "geberalExamination",
      key: "geberalExamination",
      width: "14%",
      ...getColumnSearchProps("currentCourseTitleSearch"),
      render: (text, record) => {
        // Ensure completedBritishLevels and completedGeneralLevels are arrays
        if (!Array.isArray(record.general)) {
          record.general = [record.general];
        }
        if (!Array.isArray(record.completedGeneralLevels)) {
          record.completedGeneralLevels = [record.completedGeneralLevels];
        }

        // Combine general and completedGeneralLevels into a single string
        record.currentCourseTitleSearch = [
          ...record.general,
          ...record.completedGeneralLevels,
        ].join(" , ");

        return (
          <div>
            <span>

              <b>
                <Highlighter
                  highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={record.general.join(" , ")}
                />
              </b>
            </span>
            <br />
            <br />

          </div>
        );
      },
    },


    {
      title: "Elocution",
      dataIndex: "elocution",
      key: "elocution",
      width: "14%",
      ...getColumnSearchProps("currentCourseTitleSearch"),
      render: (text, record) => {
        // Ensure completedBritishLevels and completedGeneralLevels are arrays
        if (!Array.isArray(record.elocution)) {
          record.elocution = [record.elocution];
        }
        if (!Array.isArray(record.completedGeneralLevels)) {
          record.completedGeneralLevels = [record.completedGeneralLevels];
        }

        // Combine general and completedGeneralLevels into a single string
        record.currentCourseTitleSearch = [
          ...record.elocution,
          ...record.completedGeneralLevels,
        ].join(" , ");

        return (
          <div>
            <span>

              <b>
                <Highlighter
                  highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                  searchWords={[searchText]}
                  autoEscape
                  textToHighlight={record.elocution.join(" , ")}
                />
              </b>
            </span>
            <br />
            <br />

          </div>
        );
      },
    },

    // {
    //   title: "Completed Levels",
    //   dataIndex: "completedCourseLevels",
    //   key: "completedCourseLevels",
    //   width: "14%",
    //   ...getColumnSearchProps("completedCourseLevels"),
    // },
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
           <Button danger onClick={() => handleDeleteStudentRecords(record._id)}>   {/*onClick={() => handleDeleteStudentRecords(record._id)} */}
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
          pagination={{ pageSize: 6 }}
        />
      </SystemSideBar>
    </div>
  );
};

export default StudentRecords;
