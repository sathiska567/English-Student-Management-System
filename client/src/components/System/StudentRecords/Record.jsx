/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import RecordStyles from "./Record.module.css";
import SystemSideBar from "../SystemSideBar/SystemSideBar";
import { Form, Input, Button, Checkbox, message } from "antd";
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
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [grade, setGrade] = useState("");
  const [cambrige, setCambrige] = useState("");
  const [elocution, setElocution] = useState("");
  const [general, setGeneral] = useState("");
  const [nameOfFather, setNameOfFather] = useState("");
  const [fathersOccupation, setFathersOccupation] = useState("");
  const [fathersContactNumber, setFathersContactNumber] = useState("");
  const [fathersEmail, setFathersEmail] = useState("");
  const [nameOfMother, setNameOfMother] = useState("");
  const [mothersOccupation, setMothersOccupation] = useState("");
  const [mothersContactNumber, setMothersContactNumber] = useState("");
  const [mothersEmail, setMothersEmail] = useState("");
  const [nameOfGuardian, setNameOfGuardian] = useState("");
  const [GuardianOccupation, setGuardianOccupation] = useState("");
  const [GuardianContactNumber, setGuardianContactNumber] = useState("");
  const [Guardian, setGuardian] = useState("");
  

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userDetails,setUserDetails] = useState([]);
  const [birthDay,setBirthDay] = useState("");

  console.log(location);

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
      console.log(id);
      const response = await axios.post(
        "http://localhost:8080/api/v1/registration/get-only-one-user-details",
        { id: id }
      );
      console.log(response);
      setUserDetails(response.data.details)

      const date = new Date(response.data.details.birthDay);     
      const formattedDate = date.toISOString().split("T")[0];
      // console.log(formattedDate);
      setBirthDay(formattedDate)

      // setFormValues({
      //   fullName: response.data.details.fullName,
      //   indexNumber: response.data.details.indexNumber,
      //   nameWithInitials: response.data.details.nameWithInitials,
      //   mobileNumber: response.data.details.mobileNumber,
      //   school: response.data.details.school,
      //   address: response.data.details.address,
      //   birthday: formattedDate, // Use formattedDate here

      // });

      setLoading(false); // Add this line
    } catch (error) {
      message.error(
        "Student Data fetched unsuccessfull.please Try again later."
      );
      setLoading(false); // Add this line
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete the data?")) {
        console.log(id);
        const response = await axios.post(
          "http://localhost:8080/api/v1/delete/delete-route",
          { id }
        );
        console.log(response.data);

        if (response.data.success) {
          message.success("Data deleted successfully");
          window.location.reload();
        }
      } else {
        message.info("Deletion canceled by user");
      }
    } catch (error) {
      message.error("Error deleting data");
    }
  };

const handleUpdate = async (values) => {
    try {
      // update-student-record
      const id = location.state.id;
      console.log(values);

      // const response = await axios.post(
      //   "http://localhost:8080/api/v1/registration/update-student-record",
      //   { id: id, values }
      // );
      // navigate("/records");
      // message.success("Student Updated Successfully.");
    } catch (error) {
      message.error("Student Updated Unsuccessful.please Try again later.");
    }
  };

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
                    placeholder={userDetails.fullName}
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
                    placeholder={userDetails.nameWithInitials}
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
                    placeholder={userDetails.address}
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
                    placeholder={userDetails.mobileNumber}
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
                  WhatsApp Number:
                </label>

                <Form.Item name="whatsAppNumber" style={{ flex: "2" }}>
                  <Input
                    value={whatsAppNumber}
                    onChange={(e) =>
                      setWhatsAppNumber(e.target.value || whatsAppNumber)
                    }
                    placeholder={userDetails.mobileNumber}
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
                  Date of Birth:
                </label>
                <Form.Item name="birthday" style={{ flex: "2" }}>
                  <Input
                    value={birthday}
                    onChange={(e) => setNewBirthday(e.target.value || birthday)}
                    placeholder={birthDay}
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
                    placeholder={userDetails.school}
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
                <label className={RecordStyles.RegFormLabel}>Grade:</label>

                <Form.Item name="grade" style={{ flex: "2" }}>
                  <Input
                    value={grade}
                    onChange={(e) => setGrade(e.target.value || grade)}
                    placeholder={userDetails.grade || "Not Selected"} 
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
                  Examination:
                </label>

                <Form.Item name="examination" style={{ flex: "2" }}>
                  <Checkbox.Group
                    className={`${RecordStyles.Special} ${RecordStyles.SpecialAreaFix}`}
                    name="examination"
                    id="examination"
                  >
                    <Checkbox
                      className="myCheckbox"
                      value="Cambridge Assessment"
                      onChange={(e) => setCambrige(e.target.value)}
                    >
                      Cambridge Assessments
                    </Checkbox>
                    <Checkbox
                      className="myCheckbox"
                      value="Elocution Exams"
                      onChange={(e) => setElocution(e.target.value)}
                    >
                      Elocution Exams
                    </Checkbox>
                    <Checkbox
                      className="myCheckbox"
                      value="General English"
                      onChange={(e) => setGeneral(e.target.value)}
                    >
                      General English
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>

              <div className={RecordStyles.RegHeadersTop}>
                {"Enter Parents' / Guardian's Details:"}
              </div>

              <div className={RecordStyles.RegHeaders}>
                {"Details of the Father"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Name:</label>

                <Form.Item name="nameOfFather" style={{ flex: "2" }}>
                  <Input
                    value={nameOfFather}
                    onChange={(e) => setNameOfFather(e.target.value || grade)}
                    placeholder={userDetails.fartherName}
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
                <label className={RecordStyles.RegFormLabel}>Occupation:</label>

                <Form.Item name="fathersOccupation" style={{ flex: "2" }}>
                  <Input
                    value={fathersOccupation}
                    onChange={(e) =>
                      setFathersOccupation(e.target.value || grade)
                    }
                    placeholder={userDetails.fartherOccupation}
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
                  Contact Number:
                </label>

                <Form.Item name="fathersContactNumber" style={{ flex: "2" }}>
                  <Input
                    value={fathersContactNumber}
                    onChange={(e) =>
                      setFathersContactNumber(e.target.value || grade)
                    }
                    placeholder={userDetails.fathersMobileNumber}
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
                <label className={RecordStyles.RegFormLabel}>Email:</label>

                <Form.Item name="fathersEmail" style={{ flex: "2" }}>
                  <Input
                    value={fathersEmail}
                    onChange={(e) => setFathersEmail(e.target.value || grade)}
                    placeholder={userDetails.fartherEmail}
                  />
                </Form.Item>
              </div>

              <div className={RecordStyles.RegHeaders}>
                {"Details of the Mother"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Name:</label>

                <Form.Item name="nameOfMother" style={{ flex: "2" }}>
                  <Input
                    value={nameOfMother}
                    onChange={(e) => setNameOfMother(e.target.value || grade)}
                    placeholder={userDetails.motherName}
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
                <label className={RecordStyles.RegFormLabel}>Occupation:</label>

                <Form.Item name="mothersOccupation" style={{ flex: "2" }}>
                  <Input
                    value={mothersOccupation}
                    onChange={(e) =>
                      setMothersOccupation(e.target.value || grade)
                    }
                    placeholder={userDetails.motherOccupation}
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
                  Contact Number:
                </label>

                <Form.Item name="mothersContactNumber" style={{ flex: "2" }}>
                  <Input
                    value={mothersContactNumber}
                    onChange={(e) =>
                      setMothersContactNumber(e.target.value || grade)
                    }
                    placeholder={userDetails.mothersMobileNumber || "not selected"}
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
                <label className={RecordStyles.RegFormLabel}>Email:</label>

                <Form.Item name="mothersEmail" style={{ flex: "2" }}>
                  <Input
                    value={mothersEmail}
                    onChange={(e) => setMothersEmail(e.target.value || grade)}
                    placeholder={userDetails.mothersEmail || "not selected"}
                  />
                </Form.Item>
              </div>

              <div className={RecordStyles.RegHeaders}>
                {"Details of the Guardian"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <label className={RecordStyles.RegFormLabel}>Name:</label>

                <Form.Item name="nameOfGuardian" style={{ flex: "2" }}>
                  <Input
                    value={nameOfGuardian}
                    onChange={(e) => setNameOfGuardian(e.target.value || grade)}
                    placeholder={userDetails.nameOfGuardian || "not selected"}
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
                <label className={RecordStyles.RegFormLabel}>Occupation:</label>

                <Form.Item name="GuardianOccupation" style={{ flex: "2" }}>
                  <Input
                    value={GuardianOccupation}
                    onChange={(e) =>
                      setGuardianOccupation(e.target.value || grade)
                    }
                    placeholder={userDetails.GuardianOccupation}
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
                  Contact Number:
                </label>

                <Form.Item name="GuardianContactNumber" style={{ flex: "2" }}>
                  <Input
                    value={GuardianContactNumber}
                    onChange={(e) =>
                      setGuardianContactNumber(e.target.value || grade)
                    }
                    placeholder={userDetails.GuardianMobileNumber || "not selected"}
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
                <label className={RecordStyles.RegFormLabel}>Email:</label>

                <Form.Item name="Guardian" style={{ flex: "2" }}>
                  <Input
                    value={Guardian}
                    onChange={(e) => setGuardian(e.target.value || grade)}
                    placeholder={userDetails.GuardianEmail || "not selected"}
                  />
                </Form.Item>
              </div>

              <div className={RecordStyles.buttonGroup}>
                <Button
                  type="ghost"
                  htmlType="submit"
                  style={{
                    color: "#73d13d",
                    border: "1px solid #73d13d",
                    width: "150px",
                  }}
                  onClick={handleUpdate}
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
