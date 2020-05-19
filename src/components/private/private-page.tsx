import "./style.scss";
import React, { useEffect } from "react";
import { Layout, Modal } from "antd";
import { useDispatch, connect } from "react-redux";
import PrivateHeader from "./private-header";
import ProfileEditorDrawer from "./profile-editor-drawer";
import AvatarEditorDrawer from "./avatar-editor-drawer";
import { IProfileState } from '../../redux/reducers/profile-editor-reducer';
import { GetPersonDetails } from '../../redux/actions/profile-editor';

const { Content } = Layout;

type Props = {
  profile: IProfileState
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