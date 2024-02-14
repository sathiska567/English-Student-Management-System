/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import markPaymentRecordStyles from "./GeneralPaymentRecordsMark.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Col,
  Row,
  message,
} from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const GeneralPaymentRecordsMark = () => {
  const [form] = Form.useForm();
  const [paidMonth , setPaidMonth] = useState([]);
  const location = useLocation();
  const [Paidyear, setPaidYear] = useState(null)
  const [userDetails, setUserDetails] = useState([]);
  const navigation = useNavigate();
  
  console.log(location);

  const checkboxValues = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setPaidMonth(checkedValues)
  };

      //  get one user details || post
const getUserDetails = async () => {
  try {
    const id = location.state.id;
    const response = await axios.post("http://localhost:8080/api/v1/registration/get-only-one-user-details", { id: id });
    console.log(response.data.details);
    setUserDetails(response.data.details);

  } catch (error) {
    message.error(error.message);
  }

}


const handleUpdate = async()=>{
  console.log(location.state.id);
  const updatedId = location.state.id;
  console.log(paidMonth,Paidyear);

try {

   const response = await axios.post("http://localhost:8080/api/v1/update/update-payment-general",{updatedId,Paidyear,paidMonth})
   console.log(response);

   if(response.data.success){
     message.success(response.data.message);
     navigation("/GeneralPayments")
    //  window.location.reload();
   }
   else{
     message.error(response.data.message);
   }
   
  } catch (error) {
     message.error(error.message);
  }

}


useEffect(()=>{
  getUserDetails();
 },[])


  return (
    <SystemSideBar>
      <div className={markPaymentRecordStyles.formContainer}>
        <Form
          form={form}
          layout="vertical"
          className="m-3"
          style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className={markPaymentRecordStyles.formHeader}>
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                flex: "30",
              }}
            >
              Place Student Name With Initials - Payment Register
            </p>
            <a
              href="/GeneralPayments"
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
          <div className={markPaymentRecordStyles.formDetails}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Year:
              </label>

              <Form.Item
                name="year"
                style={{ flex: "2" }}
                rules={[
                  {
                    required: true,
                    message: "Please select a year",
                  },
                ]}
              >
                <DatePicker picker="year" onChange={(date, dateString) => setPaidYear(dateString)} />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Index Number:
              </label>

              <Form.Item name="indexNumber" style={{ flex: "2" }}>
                <Input readOnly placeholder={userDetails._id} />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Full Name:
              </label>
              <Form.Item name="fullName" style={{ flex: "2" }}>
                <Input readOnly placeholder={userDetails.fullName}  />
              </Form.Item>
            </div>
           
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Course Title:
              </label>
              <Form.Item
                name="courseTitle"
                style={{
                  flex: "2",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select a course title",
                  },
                ]}
              >
                <Input readOnly />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Course Level:
              </label>
              <Form.Item
                name="courseLevel"
                style={{
                  flex: "2",
                }}
                rules={[
                  {
                    required: true,
                    message: "Please select a course level",
                  },
                ]}
              >
                <Input readOnly />
              </Form.Item>
            </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={markPaymentRecordStyles.RegFormLabel}>
                Mark Payments:
              </label>
              <Form.Item
                name="markPayment"
                style={{
                  flex: "2",
                }}
              >
                <Checkbox.Group
                  style={{
                    width: "100%",
                  }}
                  onChange={onChange}
                >
                  <Row>
                    {checkboxValues.map((value, index) => (
                      <Col span={8} key={value}>
                        <Checkbox value={value} disabled={index > currentMonth}>
                          {value}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
            <div className={markPaymentRecordStyles.buttonGroup}>
              <Button
                type="ghost"
                htmlType="submit"
                style={{
                  color: "#73d13d",
                  border: "1px solid #73d13d",
                  width: "200px",
                }}
                onClick={handleUpdate}
              >
                Update Payment Record
              </Button>
              <Button
                type="submit"
                danger
                style={{
                  color: "#ff7875",
                  border: "1px solid #ff7875",
                  width: "200px",
                }}
              >
                Delete Payment Record
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </SystemSideBar>
  );
};

export default GeneralPaymentRecordsMark;
