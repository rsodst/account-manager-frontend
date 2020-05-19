import "./style.scss";
import React, { useEffect } from "react";
import { Layout, Button, Input, DatePicker, Modal } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, connect } from "react-redux";
import PrivateHeader from "./private-header";
import CollectionCreateForm from "./profile-editor-drawer";
import ProfileEditorDrawer from "./profile-editor-drawer";
import { useState } from 'react';
import AvatarEditorDrawer from "./avatar-editor-drawer";
import { ProgressPlugin } from "webpack";
import { IProfileState } from '../../redux/reducers/profile-editor-reducer';
import { GetPersonDetails } from '../../redux/actions/profile-editor';

const { confirm } = Modal;
const { Header, Content } = Layout;

type Props = {
  profile: IProfileState
}

const AccountPage: React.FC<Props> = (props) => {

  var dispatch = useDispatch();

  // const [profileEditorVisiblity, setProfileEditorVisibility] = useState(false);
  // const [avatarEditorVisibility, setAvatarEditorVisibility] = useState(false);

  useEffect(() => {
    dispatch(GetPersonDetails());
  }, []);

  return (

    <Layout className="layout">
      <PrivateHeader></PrivateHeader>
      
      <Content className="content">

        <div>{props.profile.personDetails.firstName}</div>

        <ProfileEditorDrawer></ProfileEditorDrawer>

        {/* <AvatarEditorDrawer
          checkIsvisibleCallback={() => {
            return avatarEditorVisibility;
          }}

          hideAvatarEditorCallback={() => {
            setAvatarEditorVisibility(false);
          }}
        ></AvatarEditorDrawer> */}

      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
};

export default connect(mapStateToProps)(AccountPage);