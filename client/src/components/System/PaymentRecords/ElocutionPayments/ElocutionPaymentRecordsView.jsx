/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import viewPaymentRecordStyles from "./ElocutionPayments.module.css";
import SystemSideBar from "../../SystemSideBar/SystemSideBar";
import { Form, Input, Checkbox, Col, Row, Button, message } from "antd";
import { CloseSquareOutlined, DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../logo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../BaseUrl/BaseUrl";

const ElocutionPaymentRecordsView = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState([]);
  const [paymentMonth, setPaymentMonth] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  // console.log(location.state.id);

  const monthNames = [
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
    // console.log("checked = ", checkedValues);
    setPaymentHistory(
      paymentHistory.map((record) =>
        checkedValues.includes(record.Month)
          ? { ...record, Payment_Status: "Paid" }
          : { ...record, Payment_Status: "Unpaid" }
      )
    );
  };

  const handleCheckboxChange = (e, month) => {
    if (e.target.checked) {
      setCheckedList((prevState) => [...prevState, month]);
    } else {
      setCheckedList((prevState) => prevState.filter((m) => m !== month));
    }
  };

  const downloadPaymentHistory = () => {
    // Update payment status in paymentHistory based on checkedList
    const updatedPaymentHistory = paymentHistory.map((record) => ({
      ...record,
      Payment_Status: checkedList.includes(record.Month) ? "Paid" : "Unpaid",
    }));

    const fullName = userDetails ? userDetails.fullName : "";
    const indexNumber =
      userDetails && userDetails.PaidyearCambrige
        ? userDetails.PaidyearCambrige.toString()
        : "";
    const year = userDetails ? userDetails.PaidyearElocution : "";
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

    // Add user details
    doc.setFontSize(10);
    doc.text("Name", 15, 70);
    doc.text(":", 50, 70);
    doc.text(fullName, 55, 70);

    doc.text("Year", 15, 77);
    doc.text(":", 50, 77);
    doc.text(year.toString(), 55, 77);

    // Add Payment History heading
    doc.setFontSize(20);
    let text = "Payment History";
    let textSize = doc.getTextWidth(text);
    let pageCenter = 100;
    doc.text(text, pageCenter - textSize / 2, 113);

    // Define the table columns
    const columns = ["Month", "Payment_Status"];
    // Map the data to match the columns
    const data = updatedPaymentHistory.map(({ Month, Payment_Status }) => [
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

  // GET ONE USER DETAILS
  const getUserAllDetails = async () => {
    try {
      const id = location.state.id;
      const response = await axios.post(
        `${baseUrl}/api/v1/registration/get-only-one-user-details`,
        { id: id }
      );

      if (response.data.success) {
        // message.success(response.data.message);
        setUserDetails(response.data.details);
      }

      // console.log(userDetails);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUserAllDetails();
    if (userDetails && userDetails.markPaymentElocution) {
      // Convert the markPaymentCambrige array to an array of month names
      const checkedMonths = userDetails.markPaymentElocution.reduce(
        (months, isPaid, index) => {
          // If the month is paid, add its name to the months array
          if (isPaid) {
            months.push(monthNames[index]); // monthNames is an array of month names
          }

          return months;
        },
        []
      );

      setCheckedList(checkedMonths);
    }
  }, [userDetails]);

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
          onFinish={(values) =>
            downloadPaymentHistory(
              values.fullName,
              values.indexNumber,
              values.year
            )
          }
        >
          <div className={viewPaymentRecordStyles.formHeader}>
            <p
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                flex: "30",
              }}
            >
               {userDetails.fullName} - Payment Register
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
                Year:
              </label>
              <Form.Item style={{ flex: "2" }}>
                <Input
                  readOnly
                  value={userDetails ? userDetails.PaidyearElocution : ""}
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Full Name:
              </label>
              <Form.Item style={{ flex: "2" }}>
                <Input
                  readOnly
                  value={userDetails ? userDetails.fullName : ""}
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
              <label className={viewPaymentRecordStyles.RegFormLabel}>
                Mark Payments:
              </label>
              <Form.Item
                name="markPayment"
                style={{
                  flex: "2",
                }}
              >
                <Checkbox.Group
                  key={checkedList.toString()}
                  style={{ width: "100%" }}
                  onChange={onChange}
                  value={checkedList}
                >
                  <Row>
                    {paymentHistory.map((record, index) => {
                      const isChecked = checkedList.includes(record.Month);
                      // console.log(
                      //   "Checkbox:",
                      //   record.Month,
                      //   "Is Checked:",
                      //   isChecked
                      // );

                      return (
                        <Col span={8} key={record.Month}>
                          <label className="ant-checkbox-wrapper">
                            <span
                              className={`ant-checkbox ${
                                isChecked ? "ant-checkbox-checked" : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                className="ant-checkbox-input"
                                value={record.Month}
                                checked={isChecked} // Set the checked prop
                                disabled={index > currentMonth + 1}
                                onChange={(e) =>
                                  handleCheckboxChange(e, record.Month)
                                } // Add this line
                              />
                              <span className="ant-checkbox-inner"></span>
                            </span>
                            <span>{record.Month}</span>
                          </label>
                        </Col>
                      );
                    })}
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

export default ElocutionPaymentRecordsView;
