/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SideBarStyles from "./SystemSideBar.module.css";
import { useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DollarOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const SystemSideBar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  return (
    <Layout className={SideBarStyles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        width={210}
      >
        <div className={SideBarStyles.welcome} style={{ color: "white" }}>
          Hi{!collapsed && <span>, Admin</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[location.pathname]}
        >
          {/* <Menu.Item key="/register" icon={<UserOutlined />}>
            <Link to="/register">Student Registration</Link>
          </Menu.Item> */}
          <Menu.Item key="/records" icon={<DatabaseOutlined />}>
            <Link to="/records">Student Records</Link>
          </Menu.Item>
          <Menu.Item key="/CambridgePaymentRecords" icon={<DollarOutlined />}>
            <Link to="/CambridgePaymentRecords">Cambridge Payments</Link>
          </Menu.Item>
          <Menu.Item key="/ElocutionPayments" icon={<DollarOutlined />}>
            <Link to="/ElocutionPayments">Elocution Payments</Link>
          </Menu.Item>
          <Menu.Item key="/GeneralPayments" icon={<DollarOutlined />}>
            <Link to="/GeneralPayments">General Payments</Link>
          </Menu.Item>
          <Menu.Item
            className="logout-button"
            style={{ position: "absolute", bottom: 0 }}
            key="/"
            icon={<LogoutOutlined />}
          >
            <Link to="/">Log out</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#001529",
              marginLeft: "16px",
            }}
          >
            G U Language Centre - Student Management System
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default SystemSideBar;
