import React from "react";
import viewPaymentRecordStyles from "./ElocutionPaymentRecordsView.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import { Form, Input, Button } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ElocutionPaymentRecordsView = () => {
  return (
    <SystemSideBar>
      <div className={viewPaymentRecordStyles.formContainer}>
        <Form
          layout="verticle"
          className="m-3"
          style={{
            backgroundColor: "white",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className={viewPaymentRecordStyles.formHeader}>
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                flex: "30",
              }}
            >
              Place Student Name With Initials - Payment Record
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
          <div className={viewPaymentRecordStyles.formDetails}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className={viewPaymentRecordStyles.RegFormLabel}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Name with Initials:
              </label>
              <Form.Item name="nameWithInitials" style={{ flex: "2" }}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Address:
              </label>

              <Form.Item name="address" style={{ flex: "2" }}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Mobile Number:
              </label>

              <Form.Item name="mobileNumber" style={{ flex: "2" }}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Birthday:
              </label>
              <Form.Item name="birthday" style={{ flex: "2" }}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                School:
              </label>
              <Form.Item
                name="school"
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Current British English Course:
              </label>
              <Form.Item name="address" style={{ flex: "2" }}>
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Completed British English Courses:
              </label>
              <Form.Item name="address" style={{ flex: "2" }}>
                <TextArea readOnly rows={4} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </SystemSideBar>
  );
};

export default ElocutionPaymentRecordsView;
