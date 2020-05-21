import "./style.scss";
import React from "react";
import moment from "moment";
import { Layout, Button, Input, DatePicker, Modal } from "antd";
import { AccountBookOutlined, UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import { SetSignOutState } from '../../redux/actions/authentication';
import { IPersonDetails } from '../../models/profile-editor';
import { GetPersonDetails, SetPersonDetails, SetProfileEditorVisibilityAction } from '../../redux/actions/profile-editor';
import { IAppState } from '../../redux/root-reducer';
import { SetAvatarEditorVisibilityAction } from '../../redux/actions/avatar-editor';

const { confirm } = Modal;
const { Header } = Layout;

interface IPrivateHeaderProps {
  personDetails: IPersonDetails
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
            <Button className="menu-button" type="primary" shape="circle" size="large" icon={<SettingOutlined translate={""} />} onClick={
              () => { dispatch(SetProfileEditorVisibilityAction(true)); }
            } />
            <Button className="menu-button" type="primary" shape="circle" size="large" icon={<AccountBookOutlined translate={""} />} onClick={
              () => { dispatch(SetAvatarEditorVisibilityAction(true)); }
            } />
            <Button danger className="menu-button" type="primary" shape="circle" size="large" icon={<LogoutOutlined translate={""} />} onClick={() => {
              return confirm({
                title: "Do you want to exit?",
                icon: <ExclamationCircleOutlined translate={""} />,
                content: "If you click OK you will leave the application",
                onOk() {
                  dispatch(SetSignOutState());
                }
              })
            }} />
          </div>
          <div className="user-info">
            <Input size="middle" placeholder="user info" value={`${prop.personDetails.lastName ?? ''} ${prop.personDetails.firstName ?? ''} ${prop.personDetails.middleName ?? ''}`} prefix={<UserOutlined translate={""} />} readOnly />
          </div>
          <div className="user-info">
            <DatePicker disabled defaultValue={moment((new Date().toISOString().split("T")[0]).replace("-", "/").replace("-", "/"), "YYYY/MM/DD")} format={"YYYY/MM/DD"} />
          </div>
        </div>
      </div>
    </Header>
  );
}


const mapStateToProps = (state) => {
  return {
    personDetails: state.profileEditor.personDetails
  }
};

export default connect(mapStateToProps)(PrivateHeader);