import "./style.scss";
import React, { useEffect } from "react";
import { Layout, Modal } from "antd";
import { useDispatch, connect } from "react-redux";
import PrivateHeader from "./private-header";
import ProfileEditorDrawer from "./profile-editor-drawer";
import AvatarEditorDrawer from "./avatar-editor-drawer";
import { IProfileEditorState } from '../../redux/reducers/profile-editor-reducer';
import { GetPersonDetails } from '../../redux/actions/profile-editor';
import { IAvatarEditorState } from '../../redux/reducers/avatar-editor-reducer';

const { Content } = Layout;

type Props = {
  profileEditor: IProfileEditorState
  avatarEditor:IAvatarEditorState
}

const AccountPage: React.FC<Props> = (props) => {

  var dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPersonDetails());
  }, []);

  return (

    <Layout className="layout">
      <PrivateHeader></PrivateHeader>
      
      <Content className="content">

        <ProfileEditorDrawer></ProfileEditorDrawer>
        <AvatarEditorDrawer></AvatarEditorDrawer>

      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    profileEditor: state.profileEditor,
    avatarEditor: state.avatarEditor
  }
};

export default connect(mapStateToProps)(AccountPage);