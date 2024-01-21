/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import RecordStyles from "./Record.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, Button, DatePicker, message } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
const { TextArea } = Input;

const Record = () => {
  const location = useLocation();
  const [fullNameValue, setFullNameValue] = useState("");
  const [indexNumberValue, setIndexNumberValue] = useState("");
  const [nameWithInitial, setNameWithInitial] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [school, setSchool] = useState("");
  const [birthday, setBirthday] = useState("");

  const [formValues, setFormValues] = useState({
    fullName: "",
    indexNumber: "",
    nameWithInitials: "",
    address: "",
    mobileNumber: "",
    school: "",
    birthday: "",
  });
const [loading, setLoading] = useState(true);

const getOneUserRecords = async () => {
  try {
    const id = location.state.id;

    const response = await axios.post(
      "http://localhost:8080/api/v1/registration/get-only-one-user-details",
      { id: id }
    );
    console.log(response.data.details);

    const date = new Date(response.data.details.birthday);
    const formattedDate = date.toISOString().split("T")[0];

    setFormValues({
      fullName: response.data.details.fullName,
      indexNumber: response.data.details.indexNumber,
      nameWithInitials: response.data.details.nameWithInitials,
      mobileNumber: response.data.details.mobileNumber,
      school: response.data.details.school,
      address: response.data.details.address,
      birthday: formattedDate, // Use formattedDate here
    });

    setLoading(false); // Add this line
  } catch (error) {
    message.error("Student Data fetched unsuccessfull.please Try again later.");
    setLoading(false); // Add this line
  }
};

useEffect(() => {
  getOneUserRecords();
}, []);

if (loading) {
  return <div>Loading...</div>;
}
  return (
    <div>
      <SystemSideBar>
        <div className={RecordStyles.formContainer}>
          <Form
            layout="verticle"
            className="m-3"
            style={{
              backgroundColor: "white",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
            initialValues={formValues}
          >
            <div className={RecordStyles.formHeader}>
              <p
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  flex: "30",
                }}
              >
                Place Student Name With Initials
              </p>
              <a
                href="/records"
                style={{
                  display: "flex",
                  flex: "2",
                }}
              >
                <CloseSquareOutlined
                  style={{
                    color: "#ff7875",
                    fontSize: "20px",
                  }}
                />
              </a>
            </div>
            <div className={RecordStyles.formDetails}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>
                  Index Number:
                </label>

                <Form.Item name="indexNumber" style={{ flex: "2" }}>
                  <Input />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Full Name:</label>
                <Form.Item name="fullName" style={{ flex: "2" }}>
                  <Input value={fullNameValue} readOnly />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>
                  Name with Initials:
                </label>
                <Form.Item name="nameWithInitials" style={{ flex: "2" }}>
                  <Input value={nameWithInitial} readOnly />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Address:</label>

                <Form.Item name="address" style={{ flex: "2" }}>
                  <TextArea rows={4} value={address} readOnly />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>
                  Mobile Number:
                </label>

                <Form.Item name="mobileNumber" style={{ flex: "2" }}>
                  <Input value={mobileNumber} readOnly />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Birthday:</label>
                <Form.Item name="birthday" style={{ flex: "2" }}>
                  <Input value={birthday} readOnly />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>School:</label>
                <Form.Item
                  name="school"
                  style={{
                    flex: "2",
                  }}
                >
                  <Input readOnly/>
                </Form.Item>
              </div>
              <div className={RecordStyles.buttonGroup}>
                <Button
                  type="submit"
                  onClick={() => {}}
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "150px",
                  }}
                >
                  Update Record
                </Button>
                <Button
                  type="submit"
                  danger
                  onClick={() => {}}
                  style={{
                    color: "#ff7875",
                    border: "1px solid #ff7875",
                    width: "150px",
                  }}
                >
                  Delete Record
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </SystemSideBar>
    </div>
  );
};

export default Record;
