/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SideBarStyles from "./SystemSideBar.module.css";
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

const SystemSideBar = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={SideBarStyles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={SideBarStyles.welcome} style={{ color: "white" }}>
          Hi{!collapsed && <span>, Admin</span>}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Student Registration
          </Menu.Item>
          <Menu.Item key="2" icon={<DatabaseOutlined />}>
            Student Records
          </Menu.Item>
          <Menu.Item key="3" icon={<DollarOutlined />}>
            Payment Records
          </Menu.Item>
          <Menu.Item
            className="logout-button"
            style={{ position: "absolute", bottom: 0 }}
            key="4"
            icon={<LogoutOutlined />}
          >
            Log out
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
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#001529",
              marginLeft: "16px",
            }}
          >
            Student Management System
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
