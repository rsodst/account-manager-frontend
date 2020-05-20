import React from 'react';
import { List, Button, Space, DatePicker } from 'antd';
import moment from 'moment';
import Fragment from 'react';

const AccountHistory: React.FC = () => {
  return (
    <>
      <Space style={{display:'flex', justifyContent:'center', paddingBottom:'5px'}}>
        <div>Account history for</div>
        <DatePicker />
        <DatePicker />
      </Space>

      <div className="demo-infinite-container">

        <List
          renderItem={item => (
            <List.Item key={"123"}>
              <List.Item.Meta
                title={<a href="https://ant.design">{"123"}</a>}
                description={"123"}
              />
              <div>Content</div>
            </List.Item>
          )}>
{/* 
          <List.Item key={"123"}>
            <List.Item.Meta
              title={<a href="https://ant.design">{"123"}</a>}
              description={"123"}
            />
            <div>Content</div>
          </List.Item>

          <List.Item key={"123"}>
            <List.Item.Meta
              title={<a href="https://ant.design">{"123"}</a>}
              description={"123"}
            />
            <div>Content</div>
          </List.Item>

          <List.Item key={"123"}>
            <List.Item.Meta
              title={<a href="https://ant.design">{"123"}</a>}
              description={"123"}
            />
            <div>Content</div>
          </List.Item>

          <List.Item key={"123"}>
            <List.Item.Meta
              title={<a href="https://ant.design">{"123"}</a>}
              description={"123"}
            />
            <div>Content</div>
          </List.Item> */}

        </List>
      </div>
    </>
  );
}

export default AccountHistory;