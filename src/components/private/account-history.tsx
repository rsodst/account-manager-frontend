import React from 'react';
import { List, Button, Space, DatePicker } from 'antd';
import moment from 'moment';
import Fragment from 'react';
import { connect } from 'react-redux';
import { IAccountsState } from '../../redux/reducers/accounts-reducer';
import { AccountActionType } from '../../models/accounts';

type Props = {
  accounts: IAccountsState
}

const AccountHistory: React.FC<Props> = (props) => {

  return (
    <>
      <Space style={{ display: 'flex', justifyContent: 'center', paddingBottom: '5px' }}>
        <div>Account history for №{props.accounts?.selectedAccount?.number}</div>
        <DatePicker />
        <DatePicker />
      </Space>

      <div className="demo-infinite-container">

      {props.accounts.history.length ? <List>
          {props.accounts.history.map(p => {
            return <List.Item key={"123"}>
              <List.Item.Meta
                title={`Action ${AccountActionType[p.type]}`}
              />
              <div>{p.creationDate}</div>
            </List.Item>
          })}
        </List> : 
        <List>
      </List>}

        
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
};

export default connect(mapStateToProps)(AccountHistory);
