import React from 'react';
import { Select, Card, Space, Button } from 'antd';

const { Option } = Select;

const AccountSelector: React.FC = () => {
  return (
    <Card title="Select account" style={{ width: 600 }}>
      <Space>
        <Select defaultValue="№ 4056787969" style={{ width: 300 }} onChange={() => { }}>
          <Option>№ 4056787969</Option>
          <Option value="№ 4056787969">№ 4056787969</Option>
          <Option value="Yiminghe">№ 4056787969</Option>
        </Select>
        <Button type="primary">Create new</Button>
      </Space>
    </Card>
  );
}

export default AccountSelector;