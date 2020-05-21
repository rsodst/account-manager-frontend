import "./style.scss";
import React, { useEffect, useState } from "react";
import { Button, Input, Alert, Space, notification, Modal } from 'antd';
import { useDispatch } from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Drawer, Col, Row } from 'antd';
import { useForm } from "antd/lib/form/util";
import { IPersonDetails } from '../../models/profile-editor';
import { SetPersonDetails, SetProfileEditorVisibilityAction, SavePersonDetails } from '../../redux/actions/profile-editor';
import { IProfileEditorState } from '../../redux/reducers/profile-editor-reducer';
import { IAuthenticationState } from '../../redux/reducers/authentication-reducer';
import { SetUserPassword, SetUserEmail, DeleteUser, SetSignOutState } from '../../redux/actions/authentication';

const { confirm } = Modal;

export interface IProfileEditorDrawerProprs {
  profileEditor: IProfileEditorState,
  authentication: IAuthenticationState
}

const ProfileEditorDrawer: React.FC<IProfileEditorDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const loader = <Loader type="ThreeDots" color={"#1890ff"} height={80} width={80} />

  const [emailChangeDrawerVisibility, setEmailChangeDrawerVisibility] = useState(false);
  const [passwordChangeDrawerVisibility, setPasswordChangeDrawerVisibility] = useState(false);

  const [form] = useForm();

  const [passwordChangerForm] = useForm();
  const [emailChangerForm] = useForm();

  useEffect(() => {

    form.setFieldsValue({
      ...props.profileEditor.personDetails
    });

    emailChangerForm.setFieldsValue({
      email: props.authentication.credential.email
    });

  });

  return (
    <>
      <Drawer
        title="Edit profile details"
        width={400}
        onClose={() => { dispatch(SetProfileEditorVisibilityAction(false)) }}
        visible={props.profileEditor.isEditorOpen}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Space>
              <Button onClick={() => {
                return confirm({
                  title: "Do you want to delete your profile?",
                  content: "If you click OK you will leave the application and your profile has been deleted",
                  onOk() {
                    dispatch(DeleteUser());
                    dispatch(SetSignOutState());
                  }
                });
              }} type="primary" danger>
                Delete profile
            </Button>

              <Button onClick={() => {

                if (!form.getFieldValue('firstName')) {
                  notification.open({
                    message: 'Validation error',
                    description: 'Set your firstname',
                    placement: "topLeft",
                  });
                }

                if (!form.getFieldValue('lastName')) {
                  notification.open({
                    message: 'Validation error',
                    description: 'Set your lastName',
                    placement: "topLeft",
                  });
                }

                if (!form.getFieldValue('middleName')) {
                  notification.open({
                    message: 'Validation error',
                    description: 'Set your middleName',
                    placement: "topLeft",
                  });
                }

                let personDetails: IPersonDetails = {
                  ...props.profileEditor.personDetails,
                  firstName: form.getFieldValue('firstName'),
                  lastName: form.getFieldValue('lastName'),
                  middleName: form.getFieldValue('middleName')
                }

                dispatch(SetPersonDetails(personDetails));
                dispatch(SavePersonDetails(personDetails.id ? true : false));
                dispatch(SetProfileEditorVisibilityAction(false));
              }} type="primary">
                Save
              </Button>
            </Space>
          </div>
        }>

        <Form layout="vertical" form={form}>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}>
                <Input placeholder="Please enter last name" readOnly={props.profileEditor.isLoading} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}>
                <Input placeholder="Please enter first name" readOnly={props.profileEditor.isLoading} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="middleName"
                label="Middle Name"
                rules={[{ required: true, message: 'Please enter middle name' }]}>
                <Input placeholder="Please enter middle name" value='123' readOnly={props.profileEditor.isLoading} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item>
                <Button type="primary" onClick={() => { setPasswordChangeDrawerVisibility(true) }}>Change password</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item>
                <Button type="primary" onClick={() => { setEmailChangeDrawerVisibility(true) }}>Change email</Button>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              {props.profileEditor.isLoading ? loader : <></>}
              {(props.profileEditor && props.profileEditor.responseError) ?
                <div>
                  <Alert className="error-message" message={`${
                    props.profileEditor.responseError.errors ?
                      props.profileEditor.responseError.errors : props.profileEditor.responseError.message
                    }`} type="error" />
                </div>
                : <></>}
            </Col>
          </Row>
        </Form>

        <Drawer
          title="Change password"
          width={400}
          onClose={() => { setPasswordChangeDrawerVisibility(false) }}
          visible={passwordChangeDrawerVisibility}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Space>

                <Button onClick={() => {
                  if (passwordChangerForm.getFieldValue('newPassword')
                    != passwordChangerForm.getFieldValue('passwordConfirm')) {
                    notification.open({
                      message: 'Validation error',
                      description: 'passwords mismatch',
                      placement: "topLeft",
                    });
                    return;
                  }

                  dispatch(SetUserPassword({
                    currentPassword: passwordChangerForm.getFieldValue('currentPassword'),
                    newPassword: passwordChangerForm.getFieldValue('newPassword')
                  }));

                }} type="primary">
                  Save
              </Button>
              </Space>
            </div>
          }>

          <Form layout="vertical" form={passwordChangerForm}>


            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="currentPassword"
                  label="Current password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your current password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="newPassword"
                  label="New password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  name="passwordConfirm"
                  label="Confirm new password"
                  dependencies={['password']}
                  hasFeedback>
                  <Input.Password />
                </Form.Item>
              </Col></Row>
          </Form>
        </Drawer>

        <Drawer
          title="Change email"
          width={400}
          onClose={() => { setEmailChangeDrawerVisibility(false) }}
          visible={emailChangeDrawerVisibility}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Space>

                <Button onClick={() => {
                  if (!emailChangerForm.getFieldValue('email')) {
                    notification.open({
                      message: 'Validation error',
                      description: 'set correct email',
                      placement: "topLeft",
                    });
                  }

                  return;

                  dispatch(SetUserEmail(emailChangerForm.getFieldValue('email')));
                }} type="primary">
                  Save
              </Button>
              </Space>
            </div>
          }>

          <Form layout="vertical" form={emailChangerForm}>

            <Row gutter={16}>
              <Col span={20}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{
                    type: "email",
                    required: true,
                    message: 'Please input your email!'
                  }]}>
                  <Input disabled={props.authentication.isLoading} />
                </Form.Item>
              </Col></Row>
          </Form>
        </Drawer>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profileEditor: state.profileEditor,
    authentication: state.authentication
  }
};

export default connect(mapStateToProps)(ProfileEditorDrawer);
