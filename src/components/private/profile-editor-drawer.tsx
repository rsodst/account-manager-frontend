import "./style.scss";
import React, { useEffect } from "react";
import { Button, Input, Alert } from 'antd';
import { useDispatch } from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { IProfileState } from '../../redux/reducers/profile-editor-reducer';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Drawer, Col, Row } from 'antd';
import { useForm } from "antd/lib/form/util";
import { IPersonDetails } from '../../models/profile-editor';
import { SetPersonDetails, SetProfileEditorVisibilityAction, SavePersonDetails } from '../../redux/actions/profile-editor';

export interface IProfileEditorDrawerProprs {
  profileEditor: IProfileState 
}

const ProfileEditorDrawer: React.FC<IProfileEditorDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const loader = <Loader type="ThreeDots" color={"#1890ff"} height={80} width={80} />

  const [form] = useForm();

  useEffect(() => {

    form.setFieldsValue({
      ...props.profileEditor.personDetails
    });

  });

  return (
    <>
      <Drawer
        placement="left"
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
            <Button onClick={() => {
              dispatch(SetProfileEditorVisibilityAction(false));
            }}
              style={{ marginRight: 8 }}>
              Cancel
              </Button>
            <Button onClick={() => {

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
          </div>
        }>

        <Form layout="vertical" hideRequiredMark form={form}>

        <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}>
                <Input placeholder="Please enter last name" readOnly={props.profileEditor.isLoading}/>
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
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profileEditor: state.profile
  }
};

export default connect(mapStateToProps)(ProfileEditorDrawer);
