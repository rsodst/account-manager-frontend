import React from 'react';
import { Card, Input } from 'antd';

const TotalBalance : React.FC = ()=>{
  return (
    <Card title="Total balance" style={{ width: 600 }}>
    <Input readOnly={true} placeholder="160000$" />
  </Card>
  );
}

export default TotalBalance;