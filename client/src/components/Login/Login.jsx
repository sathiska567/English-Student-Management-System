import React from "react";
import loginStyles from "./Login.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

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
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
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
