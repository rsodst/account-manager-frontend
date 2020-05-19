import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { UserAddOutlined, LoginOutlined } from "@ant-design/icons";

const { Header } = Layout;

const PublicHeader: React.FC = () => {

  const history = useHistory();

  return (
    <Header>
      <div className="title"><b>Account</b> manager</div>
      <Menu className="menu" theme="dark" mode="horizontal" defaultSelectedKeys={
        location.pathname == "/signin" ? ["1"] : ["2"]
      }>
        <Menu.Item key="1" icon={<LoginOutlined translate={""} />} onClick={() => {
          history.push("signin");
        }}>Sign In</Menu.Item>
        <Menu.Item key="2" icon={<UserAddOutlined translate={""} />} onClick={() => {
          history.push("signup");
        }}>Sign Up</Menu.Item>
      </Menu>
    </Header>
  );
}

export default PublicHeader;