import "./style.scss";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input, DatePicker, Modal } from "antd";
import { useDispatch } from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { IProfileState } from '../../redux/reducers/profile-reducer';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { GetPersonDetails } from "../../redux/actions/get-person-details";
import { Form } from 'antd';
import { Drawer, Col, Row, Select } from 'antd';
import { IPersonDetails, SetPersonDetails } from '../../redux/actions/set-person-details';
import { SavePersonDetails } from '../../redux/actions/save-person-details';
import { useForm } from "antd/lib/form/util";

const { Option } = Select;

export interface IProfileEditorDrawerProprs {
  visible: boolean,
  profileState: IProfileState
}

const ProfileEditorDrawer: React.FC<IProfileEditorDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const [form] = useForm();

  const [personDetails, setPersonDetails] = useState<IPersonDetails>(props.profileState.personDetails);

  const loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

  useEffect(() => {
    setPersonDetails(props.profileState.personDetails);

    form.setFieldsValue({
      ...personDetails
    });
    
  }, [props.profileState.personDetails]);

  return (
    <>
      <Drawer
        afterVisibleChange={()=>{
          form.setFieldsValue({
            ...personDetails
          });
        }}
        title="Edit profile details"
        width={400}
        onClose={() => { props.hideProfileEditorCallback(false); }}
        visible={props.checkIsvisibleCallback()}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => {
               form.setFieldsValue({
                ...personDetails
              });

              props.hideProfileEditorCallback(false);
            }} style={{ marginRight: 8 }}>
              Cancel
              </Button>
            <Button onClick={() => {
              dispatch(SetPersonDetails(personDetails));
              dispatch(SavePersonDetails(personDetails.id ? true : false));
            }} type="primary">
              Save
              </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}>
                <Input placeholder="Please enter first name"
                  onChange={(e) => {
                    setPersonDetails({
                      ...personDetails,
                      firstName: e.target.value
                    });

                    setPersonDetails({
                      ...personDetails,
                      firstName: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}>
                <Input placeholder="Please enter last name"
                  onChange={(e) => {
                    setPersonDetails({
                      ...personDetails,
                      lastName: e.target.value
                    });

                    setPersonDetails({
                      ...personDetails,
                      lastName: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="middleName"
                label="Middle Name"
                rules={[{ required: true, message: 'Please enter middle name' }]}>
                <Input placeholder="Please enter middle name"
                  onChange={(e) => {
                    setPersonDetails({
                      ...personDetails,
                      middleName: e.target.value
                    });

                    setPersonDetails({
                      ...personDetails,
                      middleName: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              {props.profileState.isLoading ? loader : <></>}
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    profileState: state.profile
  }
};

export default connect(mapStateToProps)(ProfileEditorDrawer);