/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  const [nameWithInitial,setNameWithInitial] = useState("")
  const [address,setAddress] = useState("")
  const [mobileNumber,setMobileNumber] = useState("")
  const [school,setSchool] = useState("")



const getOneUserRecords = async()=>{
    try {
       const id = location.state.id;
       const response = await axios.post("http://localhost:8080/api/v1/registration/get-only-one-user-details",{id:id})
       console.log(response.data.details);

      setFullNameValue(response.data.details.fullName)
      setIndexNumberValue(response.data.details.indexNumber)
      setNameWithInitial(response.data.details.nameWithInitials)
      setMobileNumber(response.data.details.mobileNumber)
      setSchool(response.data.details.school)
      setAddress(response.data.details.address)

       console.log(fullNameValue);

    } catch (error) {
       message.error("Student Data fetched unsuccessfull.please Try again later.")
    }
  }

 useEffect(()=>{   
  getOneUserRecords()
 },[])

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
          >
            <div className={RecordStyles.formHeader}>
              <p style={{
                marginLeft: "auto",
                marginRight: "auto",
                flex : "30",

              }}>Place Student Name With Initials</p> 
                <a 
                    href="/records"
                    style={{
                        display: "flex",
                        flex : "2",
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
                <Form.Item
                  name="indexNumber"
                  style={{
                    flex: "2",
                  }}
                >
                  <Input placeholder={indexNumberValue} />
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
                <Form.Item
                  
                  name="fullName"
                  style={{
                    flex: "2",
                  }}
                  
                >
                  <Input placeholder={fullNameValue}/>

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
                <Form.Item
                  name="nameWithInitials"
                  style={{
                    flex: "2",
                  }}
                >
                  <Input placeholder={nameWithInitial} />
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
                <Form.Item
                  name="address"
                  style={{
                    flex: "2",
                  }}
                >
                  <TextArea rows={4} placeholder={address} />
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
                <Form.Item
                  name="mobileNumber"
                  style={{
                    flex: "2",
                  }}
                >
                  <Input placeholder={mobileNumber} />
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
                <Form.Item
                  name="birthDay"
                  style={{
                    flex: "2",
                  }}
                >
                  <DatePicker />
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
                  <Input placeholder={school} />
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
