import React from "react";
import markPaymentRecordStyles from "./ElocutionPaymentRecordsMark.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import {
  Form,
  Input,
  Button,
  Dropdown,
  Space,
  DatePicker,
  Checkbox,
  Col,
  Row,
} from "antd";
import { CloseSquareOutlined, DownOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1-1",
    label: "British English",
    children: [
      { key: "1-1-1", label: "Starter Level" },
      { key: "1-1-2", label: "Movers Level" },
      { key: "1-1-3", label: "Flyers Level" },
      { key: "1-1-4", label: "CET Level" },
      { key: "1-1-5", label: "PET Level" },
      { key: "1-1-6", label: "FET Level" },
    ],
  },
  {
    key: "1-2",
    label: "General English",
    children: [
      { key: "1-2-1", label: "Level 1" },
      { key: "1-2-2", label: "Level 2" },
      { key: "1-2-3", label: "Level 3" },
      { key: "1-2-4", label: "Level 4" },
      { key: "1-2-5", label: "Level 5" },
      { key: "1-2-6", label: "Level 6" },
      { key: "1-2-7", label: "Level 7" },
      { key: "1-2-8", label: "Level 8" },
      { key: "1-2-9", label: "Level 9" },
      { key: "1-2-10", label: "Level 10" },
    ],
  },
];

const ElocutionPaymentRecordsMark = () => {
  const [form] = Form.useForm();
  const handleMenuClick = ({ key }) => {
    let selectedCourse, selectedLevel;
    for (let item of items) {
      const foundCourse = item.children.find((child) => child.key === key);
      if (foundCourse) {
        selectedCourse = item;
        selectedLevel = foundCourse;
        break;
      }
    }
    if (selectedCourse && selectedLevel) {
      form.setFieldsValue({
        courseTitle: selectedCourse.label,
        courseLevel: selectedLevel.label,
      });
    }
  };

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
  };

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
              href="/ElocutionPayments"
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
                <DatePicker picker="year" />
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
                Full Name:
              </label>
              <Form.Item name="fullName" style={{ flex: "2" }}>
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
              <label className={markPaymentRecordStyles.RegFormLabel}></label>
              <Form.Item
                name="fullName"
                style={{
                  flex: "2",
                }}
              >
                <Dropdown
                  menu={{
                    items,
                    onClick: handleMenuClick,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Select Course and Level
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
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
            </div>
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

export default ElocutionPaymentRecordsMark;
