/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import viewPaymentRecordStyles from "./CambridgePaymentRecordsView.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import { Form, Input, Checkbox, Col, Row, Button } from "antd";
import { CloseSquareOutlined, DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../logo.png";

const CambridgePaymentRecordsView = () => {
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
  const [paymentHistory, setPaymentHistory] = useState(
    checkboxValues.map((month) => ({ Month: month, Payment_Status: "Unpaid" }))
  );
  const currentMonth = new Date().getMonth();
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setPaymentHistory(
      paymentHistory.map((record) =>
        checkedValues.includes(record.Month)
          ? { ...record, Payment_Status: "Paid" }
          : { ...record, Payment_Status: "Unpaid" }
      )
    );
  };

  const downloadPaymentHistory = (values) => {
    const doc = new jsPDF();
    // Add a Logo
    doc.addImage(logo, "PNG", 165, 10, 30, 30);

    // Add a heading
    doc.setFontSize(14);
    doc.text("G U Language Center", 15, 15);
    doc.setFontSize(10);
    doc.text("Gayaniukwattalc@gmail.com", 15, 24);
    doc.text("www.gulcentre.com", 15, 30);
    doc.text("0750101296", 15, 37);

    doc.line(15, 55, 195, 55);

    doc.setFontSize(10);
    const labels = ["Name", "Index", "Course Title", "Course Level", "Year"];
    const dynamicTexts = [
      values.fullName,
      values.indexNumber,
      values.courseTitle,
      values.courseLevel,
      values.year,
    ];

    labels.forEach((label, index) => {
      const row = Math.floor(index / 2); // 0 for first row, 1 for second row
      const col = index % 2; // 0 for first column, 1 for second column

      const x = 15 + 100 * col; // for adjust horizontal spacing
      const y = 70 + 7 * row; // for adjust  vertical spacing

      doc.text(label, x, y);
      doc.text(":", x + 35, y);
      doc.text(dynamicTexts[index], x + 40, y);
    });

    doc.setFontSize(20);
    let text = "Payment History";
    let textSize = doc.getTextWidth(text);
    let pageCenter = 100;
    doc.text(text, pageCenter - textSize / 2, 113);

    // Define the table columns
    const columns = ["Month", "Payment_Status"];
    // Map the data to match the columns
    const data = paymentHistory.map(({ Month, Payment_Status }) => [
      Month,
      Payment_Status,
    ]);

    const pageWidth = doc.internal.pageSize.getWidth();
    const tableWidth = pageWidth * 0.86;
    const columnWidth = tableWidth / columns.length;

    // Add the table to the PDF
    doc.autoTable({
      head: [columns],
      body: data,
      startY: 135,
      styles: {
        fontSize: 10,
        cellPadding: 1,
        align: "center",
      },
      headStyles: {
        fillColor: [16, 35, 158],
        textColor: [255, 255, 255],
        fontSize: 12,
      },
      columnStyles: {
        0: { cellWidth: columnWidth }, // width for the first column
        1: { cellWidth: columnWidth }, // width for the second column
      },
    });

    doc.line(15, 285, 195, 285);

    doc.setFontSize(6);
    const urlText = "gulcentre.com.";
    const url = "http://gulcentre.com/";
    const text1 =
      "      This Transcript was generated by GU Language Centre Student Management System. For more information and to explore further details about our academy, please visit ";
    doc.text(text1, 15, 290);
    doc.text(urlText, 16.5 + doc.getTextWidth(text1), 290);
    doc.link(
      15 + doc.getTextWidth(text1),
      290,
      doc.getTextWidth(urlText),
      doc.getFontSize(),
      { url }
    );
    // Save the PDF
    doc.save("payment-history.pdf");
  };

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
          onFinish={downloadPaymentHistory}
        >
          <div className={viewPaymentRecordStyles.formHeader}>
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                flex: "30",
              }}
            >
              Place Student Name With Initials - Payment History
            </p>
            <a
              href="/CambridgePaymentRecords"
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
                Year:
              </label>

              <Form.Item name="year" style={{ flex: "2" }}>
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
                Course Title:
              </label>
              <Form.Item name="courseTitle" style={{ flex: "2" }}>
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
                Course Level:
              </label>
              <Form.Item name="courseLevel" style={{ flex: "2" }}>
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
                Mark Payments:
              </label>
              <Form.Item
                name="markPayment"
                style={{
                  flex: "2",
                }}
              >
                <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                  <Row>
                    {paymentHistory.map((record, index) => (
                      <Col span={8} key={record.Month}>
                        <Checkbox
                          value={record.Month}
                          disabled={index > currentMonth}
                          checked={record.Payment_Status === "Paid"}
                        >
                          {record.Month}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
            <div className={viewPaymentRecordStyles.buttonGroup}>
              <Button
                type="ghost"
                htmlType="submit"
                style={{
                  color: "#13c2c2",
                  border: "1px solid #13c2c2",
                  width: "200px",
                }}
                onClick={downloadPaymentHistory}
              >
                <DownloadOutlined />
                Download Transcript
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </SystemSideBar>
  );
};

export default CambridgePaymentRecordsView;
