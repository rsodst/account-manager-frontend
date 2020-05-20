import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Input, Select, DatePicker, Button, Space, Layout, Card, Modal } from 'antd';
import moment from 'moment';
import AccountHistory from './account-history';
import { connect, useDispatch } from 'react-redux';
import { IAccountsState } from '../../redux/reducers/accounts-reducer';
import { useForm } from 'antd/lib/form/util';
import { IRefillAccount, ITransferAccountModel } from '../../models/accounts';
import { RefillAccount, TransferAccount } from '../../redux/actions/accounts';


const { Option } = Select;

type Props = {
  accounts: IAccountsState
}

const AccountDetail: React.FC<Props> = (props) => {

  const dispatch = useDispatch();

  const [form] = useForm();
  const [refillForm] = useForm();
  const [transferForm] = useForm();
  const [paymentForm] = useForm();
  const [refillModal, setRefillModalVisibility] = useState(false);
  const [paymentModal, setPaymentModalVisibility] = useState(false);
  const [transferModal, setTransferModalVisibility] = useState(false);

  useEffect(() => {

    form.setFieldsValue({
      ...props.accounts.selectedAccount,
      number: `№ ${props.accounts?.selectedAccount?.number ?? ''}`,
      creationDate: props.accounts.selectedAccount ?
        moment((new Date(props.accounts.selectedAccount.creationDate).toISOString().split("T")[0]).replace("-", "/").replace("-", "/"), "YYYY/MM/DD") :
        moment((new Date().toISOString().split("T")[0]).replace("-", "/").replace("-", "/"), "YYYY/MM/DD")
    });

  });

  return (
    <Card title="Details" extra={<Button type="dashed">Account statement</Button>} style={{ width: 600 }}>
      <Form layout="horizontal" hideRequiredMark form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="number"
              label="Number"
            >
              <Input readOnly={true} placeholder="№ 4056787969" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="creationDate"
              label="CreationDate"
              rules={[{ required: true }]}
            >
              <DatePicker disabled format={"YYYY/MM/DD"} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="balance"
              label="Balance"
            >
              <Input readOnly={true} placeholder="60000$" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Space size={"large"}>
              <Button type="primary" onClick={() => { setRefillModalVisibility(true) }}>Refill</Button>
              <Button type="primary" onClick={() => { setTransferModalVisibility(true) }}>Transfer</Button>
              <Button type="primary" onClick={() => { setPaymentModalVisibility(true) }}>Payment</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Refill your account"
        visible={refillModal}
        onOk={() => {
          let model: IRefillAccount = {
            id: props.accounts.selectedAccount.id,
            amount: refillForm.getFieldValue("amount")
          }

          dispatch(RefillAccount(model));
          setRefillModalVisibility(false);

        }}
        onCancel={() => { setRefillModalVisibility(false) }}
      >
        <Form layout="horizontal" hideRequiredMark form={refillForm}>
          <Form.Item
            name="amount"
            label="Amount"
          >
            <Input placeholder="Amount" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Transfer amount from your account"
        visible={transferModal}
        onOk={() => {
          let model: ITransferAccountModel = {
            id: props.accounts.selectedAccount.id,
            amount: transferForm.getFieldValue("amount"),
            destinationAccountNumber: transferForm.getFieldValue("destinationNumber"),
            currency:props.accounts.selectedAccount.accountDetail?.currency ?? 1,
          }

          dispatch(TransferAccount(model));
          setTransferModalVisibility(false);

        }}
        onCancel={() => { setTransferModalVisibility(false); }}
      >
        <Form layout="horizontal" hideRequiredMark form={transferForm}>

          <Form.Item
            name="destinationNumber"
            label="Number of destination account"
          >
            <Input placeholder="№ 4010101010..." />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
          >
            <Input placeholder="Amount" />
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        title="Payment from your account"
        visible={paymentModal}
        onOk={() => {
          // let model : IRefillAccount = {
          //   id : props.accounts.selectedAccount.id,
          //   amount : refillForm.getFieldValue("amount")
          // }

          // dispatch(RefillAccount(model));
          setPaymentModalVisibility(false);

        }}
        onCancel={() => { setPaymentModalVisibility(false); }}
      >
        <Form layout="horizontal" hideRequiredMark form={paymentForm}>

          <Form.Item
            name="destinationNumber"
            label="Number of destination account"
          >
            <Input placeholder="№ 4010101010..." />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
          >
            <Input placeholder="Amount" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>


  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
};

export default connect(mapStateToProps)(AccountDetail);