import './style.scss';
import React from 'react';
import { Input, Button, Form } from 'antd';

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

const SignUpForm: React.FC = () => {
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
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{
           required: true,
           message: 'Please input password!' 
           }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirmation"
        name="confirmation"
        rules={[{
           required: true,
           type: "integer",
           message: 'Please input confirmation code' 
           }]}>
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">Continue</Button>
        <Button type="dashed" className="button" htmlType="submit">Resend</Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;