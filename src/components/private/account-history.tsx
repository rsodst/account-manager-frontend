import React from 'react';
import { List } from "antd";

const AccountHistory: React.FC = () => {
  return (
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
        )}
      >

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
        </List.Item>

      </List>
    </div>
  );
}

export default AccountHistory;