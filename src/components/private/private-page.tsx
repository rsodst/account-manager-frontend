import "./style.scss";
import React from "react";
import { Layout, Button, Input, DatePicker, Modal } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { SetSignOutState } from "../../redux/actions/signout-action";
import PrivateHeader from "./private-header";
import CollectionCreateForm from "./profile-editor-drawer";
import ProfileEditorDrawer from "./profile-editor-drawer";
import { useState } from 'react';
import AvatarEditorDrawer from "./avatar-editor-drawer";

const { confirm } = Modal;
const { Header, Content } = Layout;

const AccountPage: React.FC = () => {

  var dispatch = useDispatch();

  const [profileEditorVisiblity, setProfileEditorVisibility] = useState(false);
  const [avatarEditorVisibility, setAvatarEditorVisibility] = useState(false);

  return (
    <Layout className="layout">
      <PrivateHeader

        openProfileEditorCallback={() => {
          setProfileEditorVisibility(true);
        }}

        openAvatarEditorCallback={() => {
          setAvatarEditorVisibility(true);
        }}
      ></PrivateHeader>
      <Content className="content">
        <ProfileEditorDrawer
          checkIsvisibleCallback={() => {
            return profileEditorVisiblity;
          }}

          hideProfileEditorCallback={() => {
            setProfileEditorVisibility(false);
          }}
        ></ProfileEditorDrawer>

        <AvatarEditorDrawer
          checkIsvisibleCallback={() => {
            return avatarEditorVisibility;
          }}

          hideAvatarEditorCallback={() => {
            setAvatarEditorVisibility(false);
          }}
        ></AvatarEditorDrawer>

      </Content>
    </Layout>
  );
}

export default AccountPage;