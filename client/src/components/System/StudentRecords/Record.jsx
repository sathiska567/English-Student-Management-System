/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import RecordStyles from "./Record.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, Button, DatePicker, message, Select } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [newFullNameValue, setNewFullNameValue] = useState("");
  const [newIndexNumberValue, setNewIndexNumberValue] = useState("");
  const [newNameWithInitial, setNewNameWithInitial] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newMobileNumber, setNewMobileNumber] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const [form] = Form.useForm();
  const navigate = useNavigate();

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



const handleDelete = async()=>{
  try {
    const id = location.state.id;
    const response = await axios.post("http://localhost:8080/api/v1/registration/delete-student-record",{id:id})
    message.success("Student Deleted Successfully.");
    navigate("/records")
    
  } catch (error) {
     message.error("Student Deleted Unsuccessfull.please Try again later.");
  }
}


const handleUpdate = async(values)=>{
   try {
// update-student-record
    const id = location.state.id;
    console.log(values);

   const response = await axios.post("http://localhost:8080/api/v1/registration/update-student-record",{id:id,values})
   navigate("/records")
   message.success("Student Updated Successfully.");
   } 

   catch (error) {
    message.error("Student Updated Unsuccessful.please Try again later.");
   }
}


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
            form={form}
            className="m-3"
            style={{
              backgroundColor: "white",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
            onFinish={handleUpdate}
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
                {formValues.indexNumber} - {formValues.nameWithInitials}
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
                  <Input
                    onChange={(e) => setNewIndexNumberValue(e.target.value)}
                  />
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
                  <Input
                    value={fullNameValue}
                    onChange={(e) =>
                      setNewFullNameValue(e.target.value || fullNameValue)
                    }
                  />
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
                  <Input
                    value={nameWithInitial}
                    onChange={(e) =>
                      setNewNameWithInitial(e.target.value || nameWithInitial)
                    }
                  />
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
                  <TextArea
                    rows={4}
                    value={address}
                    onChange={(e) => setNewAddress(e.target.value || address)}
                  />
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
                  <Input
                    value={mobileNumber}
                    onChange={(e) =>
                      setNewMobileNumber(e.target.value || mobileNumber)
                    }
                  />
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
                  <Input
                    value={birthday}
                    onChange={(e) => setNewBirthday(e.target.value || birthday)}
                  />
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
                  <Input
                    onChange={(e) => setNewSchool(e.target.value || school)}
                  />
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
                  Current British English Course:
                </label>
                <Form.Item name="address" style={{ flex: "2" }}>
                  <TextArea
                    rows={4}
                    value={address}
                    onChange={(e) => setNewAddress(e.target.value || address)}
                  />
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
                  Completed British English Courses:
                </label>
                <Form.Item name="address" style={{ flex: "2" }}>
                  <TextArea
                    rows={4}
                    value={address}
                    onChange={(e) => setNewAddress(e.target.value || address)}
                  />
                </Form.Item>
              </div>
              <div className={RecordStyles.buttonGroup}>
                {/* <Button
                  type="submit"
                  onClick={() => handleUpdate(formValues)}
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "150px",
                  }}
                >
                  Update Record
                </Button> */}
                <Button
                  type="ghost"
                  htmlType="submit"
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "150px",
                  }}
                >
                  Update Record
                </Button>
                {/* <button
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "150px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Update Records
                </button> */}

                <Button
                  type="submit"
                  danger
                  onClick={() => handleDelete()}
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
