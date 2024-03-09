import React, { useEffect, useState } from "react";
import loginStyles from "./Login.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
 const navigate = useNavigate();
 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");
 const [responseEmail,setResponseEmail] = useState("");
 const [responsePassword,setResponsePassword] = useState("");


const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

const GetUserData = async()=>{
  try {
    const response = await axios.get("http://localhost:8080/api/v1/data/get-router")
    console.log(response.data.data[0]);
    setResponseEmail(response.data.data[0].email);
    setResponsePassword(response.data.data[0].password);

  } catch (error) {
     message.error("Error in fetching data");
  }
}

const handleLogin = async()=>{
  try {
    console.log(email,password);

    if(email === responseEmail && password === responsePassword){
         message.success("Login Successful !");
         navigate("/StudentRecords")
    }

    else{
       message.error("Invalid Credentials , please Check your Email and Password !");
    }
    
  } catch (error) {
    message.error("Error in fetching data !");
  }
}

useEffect(()=>{
  GetUserData();
},[])

  return (
    <div className={loginStyles.loginContainer}>
      <div className={loginStyles.loginMainBox}>
        <div className={loginStyles.loginFieldContainer}>
          <div className={loginStyles.loginLeftContainer}>
            <div className={loginStyles.loginFormContainer}>
              <h2>G. U. | Language Centre</h2>
              <h1>Login</h1>
              <p>Welcome back! Please login to your account.</p>

              <Form
                name="normal_login"
                className={loginStyles.login_form}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <label>
                    Email Address <span style={{ color: "red" }}> *</span>
                  </label>
                  <Input
                    className={loginStyles.login_form_input}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <label>
                    Password<span style={{ color: "red" }}> *</span>
                  </label>
                  <Input.Password
                    className={loginStyles.login_form_input}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onClick={handleLogin}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className={loginStyles.loginRightContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
