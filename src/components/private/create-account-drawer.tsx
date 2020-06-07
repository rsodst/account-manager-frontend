import "./style.scss";
import React, { useEffect } from "react";
import { Button, Input, Alert, Space, Select, notification } from 'antd';
import { useDispatch } from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Drawer, Col, Row } from 'antd';
import { useForm } from "antd/lib/form/util";
import { IPersonDetails } from '../../models/profile-editor';
import { SetPersonDetails, SetProfileEditorVisibilityAction, SavePersonDetails } from '../../redux/actions/profile-editor';
import { IAccountsState } from '../../redux/reducers/accounts-reducer';
import { SetAccountCreateVisibility, CreateAccount } from '../../redux/actions/accounts';
import { ICreateAccountModel } from '../../models/accounts';

export interface IAccountCreateDrawerProprs {
  accounts: IAccountsState
}

const { Option } = Select;

const CreateAccountDrawer: React.FC<IAccountCreateDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const loader = <Loader type="ThreeDots" color={"#1890ff"} height={80} width={80} />

  const [form] = useForm();

  useEffect(() => {

    form.setFieldsValue({
      LimitByOperation: '20000'
    });

  });

  return (
    <>
      <Drawer
        title="Create new account"
        width={400}
        onClose={() => { dispatch(SetAccountCreateVisibility(false)) }}
        visible={props.accounts.createAccountVisibility}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button htmlType="submit" onClick={() => {

              if (!form.getFieldValue('limitByOperation')) {
                notification.open({
                  message: 'Validation error',
                  description:'For create new account you need to set base limit by operaions',
                  placement:"topLeft",
                  onClick: () => { console.log('Notification Clicked!');}
                });
                return;
              }

              let model: ICreateAccountModel = {
                limitByOperation: form.getFieldValue('limitByOperation'),
                description: form.getFieldValue('description'),
                currency: form.getFieldValue('currency'),
              }

              dispatch(CreateAccount(model));

              dispatch(SetAccountCreateVisibility(false));
            }} type="primary">
              Create
              </Button>
          </div>
        }>

        <Form layout="vertical" hideRequiredMark form={form}>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="limitByOperation"
                label="Limit by Operation"
                rules={[{ required: true, message: 'Please enter transaction limit' }]}>
                <Input placeholder="" readOnly={props.accounts.isLoading} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="currency"
                label="Currency"
                rules={[{ required: false }]}>
                <Select defaultValue={0} style={{ width: 290 }} disabled={props.accounts.isLoading} >
                  <Option value={0}>RUB</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: 'please enter account description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter account description" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={20}>
              {props.accounts.isLoading ? loader : <></>}
              {(props.accounts && props.accounts.responseError) ?
                <div>
                  <Alert className="error-message" message={`${
                    props.accounts.responseError.errors ?
                      props.accounts.responseError.errors : props.accounts.responseError.message
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
    accounts: state.accounts
  }
};

export default connect(mapStateToProps)(CreateAccountDrawer);
