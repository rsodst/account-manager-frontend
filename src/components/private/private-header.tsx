import "./style.scss";
import React from "react";
import moment from "moment";
import { Layout, Button, Input, DatePicker, Modal } from "antd";
import { AccountBookOutlined, UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { SetSignOutState } from "../../redux/actions/signout-action";
import { GetPersonDetails } from '../../redux/actions/get-person-details';
import { IPersonDetails } from '../../redux/actions/set-person-details';

const { confirm } = Modal;
const { Header } = Layout;

interface IPrivateHeaderProps {
  personDetails : IPersonDetails
}

const PrivateHeader: React.FC<IPrivateHeaderProps> = (prop) => {

  var history = useHistory();
  var dispatch = useDispatch();


  return (
    <Header className="header">
      <div className="header__container">
        <div className="title"><b>Account</b> manager</div>
        <div className="userdetails">
          <div className="user-info">
            <Button className="menu-button" type="primary" shape="circle" size="large" icon={<SettingOutlined />} onClick={
              () => {
                dispatch(GetPersonDetails());
                prop.openProfileEditorCallback();
              }
            } />
            <Button className="menu-button" type="primary" shape="circle" size="large" icon={<AccountBookOutlined />} onClick={
              () => {
                prop.openAvatarEditorCallback();
            }} />
            <Button danger className="menu-button" type="primary" shape="circle" size="large" icon={<LogoutOutlined />} onClick={() => {
              return confirm({
                title: "Do you want to exit?",
                icon: <ExclamationCircleOutlined />,
                content: "If you click OK you will leave the application",
                onOk() {
                  dispatch(SetSignOutState());
                },
                onCancel() { },
              })
            }} />
          </div>
          <div className="user-info">
            <Input size="middle" placeholder="user info" value={`${localStorage.getItem('fullName') ?? 'username'}`} prefix={<UserOutlined />} readOnly />
          </div>
          <div className="user-info">
            <DatePicker disabled defaultValue={moment((new Date().toISOString().split("T")[0]).replace("-", "/").replace("-", "/"), "YYYY/MM/DD")} format={"YYYY/MM/DD"} />
          </div>
        </div>
      </div>
    </Header>
  );
}

export default PrivateHeader