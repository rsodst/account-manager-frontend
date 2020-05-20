import React from 'react';
import { Card, Input } from 'antd';
import { connect } from 'react-redux';
import { IAccountsState } from '../../redux/reducers/accounts-reducer';

type Props = {
  accounts: IAccountsState
}

const TotalBalance: React.FC<Props> = (props) => {
  return (
    <Card title="Total balance" style={{ width: 600 }}>
      <Input readOnly={true} placeholder="160000$" value={`${props.accounts.accounts.reduce((amount : number,account)=>{
        amount += parseFloat(account.balance);
        return amount;
      },0.0)}`} />
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
};

export default connect(mapStateToProps)(TotalBalance);