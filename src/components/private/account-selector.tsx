import React from 'react';
import { Select, Card, Space, Button, Alert } from 'antd';
import { IAccountsState } from '../../redux/reducers/accounts-reducer';
import Loader from 'react-loader-spinner';
import { connect, useDispatch } from 'react-redux';
import CreateAccountDrawer from './create-account-drawer';
import { SetAccountCreateVisibility, SelectAccount } from '../../redux/actions/accounts';

const { Option } = Select;

type Props = {
  accounts: IAccountsState
}

const AccountSelector: React.FC<Props> = (props) => {

  const dispatch = useDispatch();
  const loader = <Loader type="ThreeDots" color={"#1890ff"} height={30} width={80} />

  return (
    <Card title="Select account" extra={<div style={{height:'30px'}}>
       {props.accounts.isLoading ? loader : <></>}
      {(props.accounts && props.accounts.responseError) ?
        <div>
          <Alert className="error-message" message={`${
            props.accounts.responseError.errors ?
              props.accounts.responseError.errors : props.accounts.responseError.message
            }`} type="error" />
        </div>
        : <></>}
    </div>} style={{ width: 600 }}>
      <Space>
        <Select value={props?.accounts?.selectedAccount?.id ?? 'create your first account!'} style={{ width: 300 }} onChange={(e) => {
           dispatch(SelectAccount(e));
         }}>
          {props.accounts.accounts.map((p,i)=> {
            return <Option  key={p.id} value={p.id}>№ {p.number}</Option>
          })}
        </Select>
        <Button onClick={()=>{dispatch(SetAccountCreateVisibility(true));}} type="primary">Create new</Button>
      </Space>
      <CreateAccountDrawer></CreateAccountDrawer>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
};

export default connect(mapStateToProps)(AccountSelector);