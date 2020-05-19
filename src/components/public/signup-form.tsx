import './style.scss';
import { Input, Button, Form } from 'antd';
import { useDispatch, connect } from 'react-redux';
import React, { useState } from 'react';
import { IAuthenticationState } from '../../redux/reducers/authentication-reducer';
import { ISignUpModel } from '../../models/authentication';
import { SignUpRequest } from '../../redux/actions/authentication';

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

type Props = {
  authentication: IAuthenticationState
}

const SignUpForm: React.FC<Props> = (props) => {

  let dispatch = useDispatch();

  let [signup, setsignup] = useState<ISignUpModel>({
    email: null,
    password: null
  });

  return (
    <Form className="form" {...layout} onFinish={() => {
      dispatch(SignUpRequest(signup));
    }}>
      <div className="form__title">Welcome</div>
      <Form.Item
        label="Email"
        name="email"
        style={marginTopRule}
        rules={[{
          type: "email",
          required: true,
          message: 'Please input your email!'
        }]}>
        <Input disabled={props.authentication.isLoading} onChange={(e) => {
          setsignup({
            ...signup,
            email: e.target.value
          });
        }} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password onChange={(e) => {
          setsignup({
            ...signup,
            password: e.target.value
          });
        }} />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={props.authentication.isLoading}>
          Sign Up
          </Button>
      </Form.Item>
    </Form>
  );
}

const mapStateToProps = (state) => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(SignUpForm);