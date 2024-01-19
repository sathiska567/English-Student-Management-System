/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import RecordStyles from "./Record.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, Button, DatePicker } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const Record = () => {
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
                <label className={RecordStyles.RegFormLabel}>Full Name:</label>
                <Form.Item
                  name="fullName"
                  style={{
                    flex: "2",
                  }}
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
                <label className={RecordStyles.RegFormLabel}>
                  Name with Initials:
                </label>
                <Form.Item
                  name="nameWithInitials"
                  style={{
                    flex: "2",
                  }}
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
                <label className={RecordStyles.RegFormLabel}>Address:</label>
                <Form.Item
                  name="address"
                  style={{
                    flex: "2",
                  }}
                >
                  <TextArea rows={4} readOnly />
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
                  <Input readOnly />
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
