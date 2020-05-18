import './style.scss';
import React, { useContext, useState, Fragment } from 'react';
import { Input, Button, Form } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { AuthenticationLayoutContext } from './authentication-layout';
import ISignInModel from '../../redux/actions/signin-request-action';
import { SignInRequest } from '../../redux/actions/signin-request-action';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const marginTopRule: React.CSSProperties = {
  marginTop: '30px'
}

const SignInForm: React.FC = () => {

  let dispatch = useDispatch();
  let context = useContext(AuthenticationLayoutContext);

  let [signin, setsignin] = useState<ISignInModel>({
    email: null,
    password: null
  });

  return (
    <Fragment>
      <Form className="form" {...layout} onFinish={() => {
        dispatch(SignInRequest(signin));
      }}>
        <Form.Item
          label="Email"
          name="email"
          style={marginTopRule}
          rules={[{
            type: "email",
            required: true,
            message: 'Please input your email!'
          }]}>
          <Input disabled={context.isLoading} onChange={(e) => {
            setsignin({
              ...signin,
              email: e.target.value
            });
          }} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{
            required: true,
            message: 'Please input your password!',
          }]}>
          <Input.Password disabled={context.isLoading} onChange={(e) => {
            setsignin({
              ...signin,
              password: e.target.value
            });
          }} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={context.isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return state.authentication;
};

export default connect(mapStateToProps)(SignInForm);