import React from 'react'
import { Form, Row, Col, Input, Select, DatePicker, Button, Space, Layout, Card } from 'antd';
import moment from 'moment';
import AccountHistory from './account-history';

const { Option } = Select;

const AccountDetail: React.FC = () => {
  return (
    <Card title="Details" extra={<Button type="dashed">Account statement</Button>} style={{ width: 600 }}>
    <Form layout="horizontal" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Account Number"
            label="Number"
          >
            <Input readOnly={true} placeholder="№ 4056787969" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="Creation date"
            label="CreationDate"
            rules={[{ required: true }]}
          >
            <DatePicker disabled defaultValue={moment((new Date().toISOString().split("T")[0]).replace("-", "/").replace("-", "/"), "YYYY/MM/DD")} format={"YYYY/MM/DD"} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="Balance"
            label="Balance"
          >
            <Input readOnly={true} placeholder="60000$" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Space size={"large"}>
            <Button type="primary">Refill</Button>
            <Button type="primary">Transfer</Button>
            <Button type="primary">Payment</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  </Card>
  );
}

export default AccountDetail;