import React, { useEffect, useState } from "react";
import StuRegFormStyles from "./StudentRegistrationForm.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, DatePicker, Select, Tag, Button, message } from "antd";
import axios from 'axios';

const onChange = (e) => {
  console.log(e.target.value);
};

const levels = [
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 6",
];
const britishColors = ["red", "orange", "yellow", "green", "blue", "purple"];
const generalColors = ["pink", "cyan", "lime", "violet", "indigo", "maroon"];

const britishOptions = levels.map((level, index) => ({
  value: level,
  color: britishColors[index],
}));

const generalOptions = levels.map((level, index) => ({
  value: level,
  color: generalColors[index],
}));

const tagRender = (props, options) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const color = options.find((option) => option.value === value).color;
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};
const StudentRegistrationForm = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentBritishLevel, setCurrentBritishLevel] = useState(null);
  const [completedBritishLevels, setCompletedBritishLevels] = useState([]);
  const [currentGeneralLevel, setCurrentGeneralLevel] = useState(null);
  const [completedGeneralLevels, setCompletedGeneralLevels] = useState([]);

  const handleCurrentBritishLevelChange = (value) => {
    setCurrentBritishLevel(value[value.length - 1]);
  };

  const handleCompletedBritishLevelsChange = (value) => {
    setCompletedBritishLevels(value);
  };

  const handleCurrentGeneralLevelChange = (value) => {
    setCurrentGeneralLevel(value[value.length - 1]);
  };

  const handleCompletedGeneralLevelsChange = (value) => {
    setCompletedGeneralLevels(value);
    
  };

  const currentBritishOptions = britishOptions.filter(
    (option) => !completedBritishLevels.includes(option.value)
  );
  const completedBritishOptions = britishOptions.filter(
    (option) => option.value !== currentBritishLevel
  );
  const currentGeneralOptions = generalOptions.filter(
    (option) => !completedGeneralLevels.includes(option.value)
  );
  const completedGeneralOptions = generalOptions.filter(
    (option) => option.value !== currentGeneralLevel
  );

// Handle backend response and get all input values
const handleFinish = async(values) => {
  console.log("Success:", values); 
    
  try {
    const response = await axios.post('http://localhost:8080/api/v1/registration/student-registration', values);
    console.log(response.data);
    message.success("Student Registration Successfull")
    window.location.reload();

  } catch (error) {
      message.error("Student Registration Unsuccessfull")
  }

};

const handleFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
  form.validateFields();
};


  return (
    <div>
      <SystemSideBar>
        <div className={StuRegFormStyles.formContainer}>
          <Form
            form={form}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            layout="verticle"
            className="m-3"
            style={{
              backgroundColor: "white",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className={StuRegFormStyles.formHeader}>
              <p>Student Registration Form</p>
            </div>
            <div className={StuRegFormStyles.formDetails}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>
                  Index Number:
                </label>

                <Form.Item
                  name="indexNumber"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Index Number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Index Number" allowClear />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>
                  Full Name of Student:
                </label>
                <Form.Item
                  name="fullName"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Name!",
                    },
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input placeholder="Enter Full Name" allowClear />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>
                  Name with Initials:
                </label>
                <Form.Item
                  name="nameWithInitials"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name with Initials!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Name with Initials"
                    allowClear
                    onChange={onChange}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Address:
                </label>
                <Form.Item
                  name="address"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Address!",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Enter Address"
                    allowClear
                    onChange={onChange}
                    autoSize={{ minRows: 3, maxRows: 6 }}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Mobile Number:
                </label>
                <Form.Item
                  name="mobileNumber"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile Number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Mobile Number"
                    allowClear
                    value={mobileNumber}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (value.length > 10) {
                        value = value.slice(0, 10);
                      }
                      if (value.length === 1 && value[0] !== "0") {
                        value = "0" + value;
                      }
                      setMobileNumber(value);
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={10}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Birthday:
                </label>
                <Form.Item
                  name="birthday"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please select your Birthday!",
                    },
                  ]}
                >
                  <DatePicker placeholder="Select birthday" />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>School:</label>
                <Form.Item
                  name="school"
                  style={{
                    flex: "2",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Enter Student's School!",
                    },
                  ]}
                >
                  <Input placeholder="Enter  School" allowClear />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>
                  Current British English Level:
                </label>
                <Form.Item
                  style={{ flex: "2" }}
                  name="currentBritishLevel"
                >
                  <Select
                    placeholder="Select Only One Current British English Level"
                    mode="multiple"
                    tagRender={(props) => tagRender(props, britishOptions)}
                    options={currentBritishOptions}
                    value={currentBritishLevel ? [currentBritishLevel] : []}
                    onChange={(value) => {
                      handleCurrentBritishLevelChange(value);
                    }}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Completed British English Level:
                </label>
                <Form.Item
                  style={{ flex: "2" }}
                  name="completedBritishLevels"
                >
                  <Select
                    placeholder="Select Completed British English Levels"
                    mode="multiple"
                    tagRender={(props) => tagRender(props, britishOptions)}
                    options={completedBritishOptions.filter(
                      (option) => option !== currentBritishLevel
                    )}
                    value={completedBritishLevels}
                    onChange={(value) => {
                      handleCompletedBritishLevelsChange(value);
                    }}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Current General English Level:
                </label>
                <Form.Item
                  style={{ flex: "2" }}
                  name="currentGeneralLevel"
                >
                  <Select
                    placeholder="Select Only One Current General English Level"
                    mode="multiple"
                    tagRender={(props) => tagRender(props, generalOptions)}
                    options={currentGeneralOptions}
                    value={currentGeneralLevel ? [currentGeneralLevel] : []}
                    onChange={(value) => {
                      handleCurrentGeneralLevelChange(value);
                    }}
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
                <label className={StuRegFormStyles.RegFormLabel}>
                  Completed General English Level:
                </label>
                <Form.Item
                  style={{ flex: "2" }}
                  name="completedGeneralLevels"
                >
                  <Select
                    placeholder="Select Completed General English Levels"
                    mode="multiple"
                    tagRender={(props) => tagRender(props, generalOptions)}
                    options={completedGeneralOptions.filter(
                      (option) => option !== currentGeneralLevel
                    )}
                    value={completedGeneralLevels}
                    onChange={(value) => {
                      handleCompletedGeneralLevelsChange(value);
                    }}
                  />
                </Form.Item>
              </div>
              <div className={StuRegFormStyles.buttonGroup}>
                {/* <Button
                  type="submit"
                  onClick={() => {
                    form.validateFields();
                  }}
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "200px",
                  }}
                >
                  Create Student Record
                </Button> */}

                <button 

                type = "submit"
                style={{
                  color: "#73d13d",
                  border: "1px solid #73d13d",
                  width: "200px",
                  padding:"10px",
                  cursor:"pointer",
                }}

                >
                   Create Student Record                  
                </button>

              </div>
            </div>
          </Form>
        </div>
      </SystemSideBar>
    </div>
  );
};

export default StudentRegistrationForm;
