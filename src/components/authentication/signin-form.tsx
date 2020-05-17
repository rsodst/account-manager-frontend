import './style.scss';
import React, { useContext, useState } from 'react';
import { Input, Button, Form } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { AuthenticationLayoutContext } from './authentication-layout';
import { SEND_SIGNIN_REQUEST } from './actions';

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

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <Form className="form" {...layout} onFinish={() => {
      dispatch({
        type: SEND_SIGNIN_REQUEST,
        payload: {
          email: `${email}`,
          password: `${password}`,
        }
      });
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
        <Input disabled={context.waitResponse} onChange={(e) => {
          setEmail(e.target.value);
        }} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{
          required: true,
          message: 'Please input your password!',
        }]}>
        <Input.Password disabled={context.waitResponse} onChange={(e) => {
          setPassword(e.target.value);
        }} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={context.waitResponse}>
          Sign In
          </Button>
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return state.authentication;
};

export default connect(mapStateToProps)(SignInForm);