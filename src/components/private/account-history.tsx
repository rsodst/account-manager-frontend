import React from 'react';
import { List, Space, DatePicker } from 'antd';
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
          {props.accounts.history.map((p, i) => {
            return <List.Item key={i}>
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
