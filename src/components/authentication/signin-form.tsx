import './style.scss';
import React, { useContext } from 'react';
import { Input, Button, Form } from 'antd';
import { useDispatch, connect } from 'react-redux';
import { IAuthenticationState } from './authentication-reducer';
import { AuthenticationLayoutContext } from './authentication-layout';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const marginTopRule : React.CSSProperties = {
  marginTop : '30px'
}

const SignInForm: React.FC = () => {

  let dispatch = useDispatch();
  let context = useContext(AuthenticationLayoutContext);

  return (
    <Form className="form" {...layout}>
      <Form.Item
        label="Email"
        name="email"
        style={marginTopRule}
        rules={[{
          type: "email",
          required: true,
          message: 'Please input your email!'
        }]}>
        <Input disabled={context.waitResponse}/>
      </Form.Item>

      <Form.Item 
        label="Password"
        name="password"
        rules={[{
           required: true,
           message: 'Please input your username!',
           }]}>
        <Input.Password disabled={context.waitResponse} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={()=>{
          dispatch({
          });
        }} disabled={context.waitResponse}>
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