import './style.scss';
import React, { useContext, useState, Fragment } from 'react';
import { Input, Button, Form } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { IAuthenticationState } from '../../redux/reducers/authentication-reducer';
import { ISignInModel } from '../../models/authentication';
import { SignInRequest } from '../../redux/actions/authentication';

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
  authentication : IAuthenticationState
}

const SignInForm: React.FC<Props> = (props) => {

  let dispatch = useDispatch();

  let [signin, setsignin] = useState<ISignInModel>({
    email: null,
    password: null
  });

  return (
    <Fragment>
      <Form className="form" {...layout} onFinish={() => {
        dispatch(SignInRequest(signin));
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
          <Input disabled={props?.authentication?.isLoading} onChange={(e) => {
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
          <Input.Password disabled={props?.authentication?.isLoading} onChange={(e) => {
            setsignin({
              ...signin,
              password: e.target.value
            });
          }} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={props?.authentication?.isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  authentication: state?.authentication
});

export default connect(mapStateToProps)(SignInForm);