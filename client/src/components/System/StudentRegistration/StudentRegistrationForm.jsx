import React, { useState } from "react";
import StuRegFormStyles from "./StudentRegistrationForm.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, DatePicker, Select, Tag } from "antd";

const onChange = (e) => {
  console.log(e);
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
  const { TextArea } = Input;
  const [mobileNumber, setMobileNumber] = useState("");
  const [indexNumber, setIndexNumber] = useState("");
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

  return (
    <div>
      <SystemSideBar>
        <div className={StuRegFormStyles.formContainer}>
          <Form
            layout="verticle"
            className="m-3"
            style={{
              backgroundColor: "white",
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
            
                <Input
                  style={{
                    flex: "2",
                  }}
                  placeholder="Enter Index Number"
                  allowClear
                  value={indexNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setIndexNumber(value);
                    if (onChange) {
                      onChange(value);
                    }
                  }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your Index Number!",
                    },
                  ]}
                />
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
                <Input
                  style={{
                    flex: "2",
                  }}
                  placeholder="Enter Full Name"
                  allowClear
                  onChange={onChange}
                />
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
                <Input
                  style={{
                    flex: "2",
                  }}
                  placeholder="Enter Name with Initials"
                  allowClear
                  onChange={onChange}
                />
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
                <TextArea
                  style={{
                    flex: "2.09",
                  }}
                  placeholder="Enter Address"
                  allowClear
                  onChange={onChange}
                  autoSize={{ minRows: 3, maxRows: 6 }}
                />
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
                <Input
                  style={{
                    flex: "2",
                  }}
                  placeholder="Enter Mobile Number"
                  allowClear
                  value={mobileNumber}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }
                    if (value && value[0] !== "0") {
                      value = "0" + value;
                    }
                    setMobileNumber(value);
                    if (onChange) {
                      onChange(value);
                    }
                  }}
                />
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
                <DatePicker
                  style={{
                    flex: "2",
                  }}
                  placeholder="Select birthday"
                  onChange={onChange}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={StuRegFormStyles.RegFormLabel}>School:</label>
                <Input
                  style={{
                    flex: "2",
                  }}
                  placeholder="Select Current British English Level"
                  allowClear
                  onChange={onChange}
                />
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
                <Select
                  placeholder="Select Only One Current British English Level"
                  style={{ flex: "2.09" }}
                  mode="multiple"
                  tagRender={(props) => tagRender(props, britishOptions)}
                  options={currentBritishOptions}
                  value={currentBritishLevel ? [currentBritishLevel] : []}
                  onChange={handleCurrentBritishLevelChange}
                />
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
                <Select
                  placeholder="Select Completed British English Levels"
                  style={{ flex: "2.09" }}
                  mode="multiple"
                  tagRender={(props) => tagRender(props, britishOptions)}
                  options={completedBritishOptions}
                  value={completedBritishLevels}
                  onChange={handleCompletedBritishLevelsChange}
                />
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
                <Select
                  placeholder="Select Only One Current General English Level"
                  style={{ flex: "2.09" }}
                  mode="multiple"
                  tagRender={(props) => tagRender(props, generalOptions)}
                  options={currentGeneralOptions}
                  value={currentGeneralLevel ? [currentGeneralLevel] : []}
                  onChange={handleCurrentGeneralLevelChange}
                />
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
                <Select
                  placeholder="Select Completed General English Levels"
                  style={{ flex: "2.09" }}
                  mode="multiple"
                  tagRender={(props) => tagRender(props, generalOptions)}
                  options={completedGeneralOptions}
                  value={completedGeneralLevels}
                  onChange={handleCompletedGeneralLevelsChange}
                />
              </div>
            </div>
          </Form>
        </div>
      </SystemSideBar>
    </div>
  );
};

export default StudentRegistrationForm;
