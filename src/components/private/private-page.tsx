import "./style.scss";
import React, { useEffect } from "react";
import { Layout, Modal, Space, Input, Card, Button, Form, Row, Col, DatePicker } from 'antd';
import { useDispatch, connect } from "react-redux";
import PrivateHeader from "./private-header";
import ProfileEditorDrawer from "./profile-editor-drawer";
import AvatarEditorDrawer from "./avatar-editor-drawer";
import { IProfileEditorState } from '../../redux/reducers/profile-editor-reducer';
import { GetPersonDetails, CreateProfileConfirmation } from '../../redux/actions/profile-editor';
import { IAvatarEditorState } from '../../redux/reducers/avatar-editor-reducer';
import { GetUserAvatar } from '../../redux/actions/avatar-editor';
import AccountDetail from "./account-detail";
import moment from "moment";
import AccountHistory from './account-history';
import AccountSelector from './account-selector';
import TotalBalance from './total-balance';
import { GetAccountsList } from '../../redux/actions/accounts';

const { Content } = Layout;

type Props = {
  profileEditor: IProfileEditorState
  avatarEditor: IAvatarEditorState
}

const AccountPage: React.FC<Props> = (props) => {

  var dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPersonDetails());
    dispatch(GetUserAvatar());
    dispatch(GetAccountsList({ skip: 0, take: 10 }));
  }, []);

  return (
    <Layout className="layout">

      <PrivateHeader></PrivateHeader>

      <Content className="content">

        <ProfileEditorDrawer></ProfileEditorDrawer>
        <AvatarEditorDrawer></AvatarEditorDrawer>



        <Space size={"large"} style={
          {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
            boxShadow: '17px 13px 80px 2px rgba(166, 166, 171, 1)',
            padding: '20px'

          }
        }>
          <Card title="Your accounts" style={{ width: 650 }}>
            <TotalBalance></TotalBalance>
            <br></br>
            <AccountDetail></AccountDetail>
          </Card>

          <Card title="" style={{ width: 650 }}>
            <AccountSelector></AccountSelector>
            <br></br>
            <AccountHistory></AccountHistory>
          </Card>
        </Space>

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