// import "./style.scss";
// import React, { useEffect } from "react";
// import { Layout, Button, Input, DatePicker, Modal } from "antd";
// import { UserOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import moment from "moment";
// import { useDispatch } from "react-redux";
// import { SetSignOutState } from "../../redux/actions/signout-action";
// import PrivateHeader from "./private-header";
// import CollectionCreateForm from "./profile-editor-drawer";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import { IProfileState } from '../../redux/reducers/profile-reducer';
// import Loader from 'react-loader-spinner';
// import { connect } from 'react-redux';
// import { GetPersonDetails } from "../../redux/actions/get-person-details";
// import { Form, Checkbox } from 'antd';
// import { Drawer, Col, Row, Select } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

// const { Option } = Select;
// const { confirm } = Modal;
// const { Header, Content } = Layout;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 12 },
// };

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

// const ProfileEditorDrawer: React.FC<IProfileState> = (props) => {

//   var dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(GetPersonDetails());
//   }, []);

//   if (props.visible)
//   {
//     console.log('visible')
//   }

//   let loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

//   return (
//     <>
//       <Drawer
//         title="Create a new account"
//         width={720}
//         onClose={()=>{}}
//         visible={props.visible}
//         bodyStyle={{ paddingBottom: 80 }}
//         footer={
//           <div
//             style={{
//               textAlign: 'right',
//             }}
//           >
//             <Button onClick={()=>{}} style={{ marginRight: 8 }}>
//               Cancel
//               </Button>
//             <Button onClick={()=>{}} type="primary">
//               Submit
//               </Button>
//           </div>
//         }
//       >
//         <Form layout="vertical" hideRequiredMark>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label="Name"
//                 rules={[{ required: true, message: 'Please enter user name' }]}
//               >
//                 <Input placeholder="Please enter user name" />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="url"
//                 label="Url"
//                 rules={[{ required: true, message: 'Please enter url' }]}
//               >
//                 <Input
//                   style={{ width: '100%' }}
//                   addonBefore="http://"
//                   addonAfter=".com"
//                   placeholder="Please enter url"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="owner"
//                 label="Owner"
//                 rules={[{ required: true, message: 'Please select an owner' }]}
//               >
//                 <Select placeholder="Please select an owner">
//                   <Option value="xiao">Xiaoxiao Fu</Option>
//                   <Option value="mao">Maomao Zhou</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="type"
//                 label="Type"
//                 rules={[{ required: true, message: 'Please choose the type' }]}
//               >
//                 <Select placeholder="Please choose the type">
//                   <Option value="private">Private</Option>
//                   <Option value="public">Public</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="approver"
//                 label="Approver"
//                 rules={[{ required: true, message: 'Please choose the approver' }]}
//               >
//                 <Select placeholder="Please choose the approver">
//                   <Option value="jack">Jack Ma</Option>
//                   <Option value="tom">Tom Liu</Option>
//                 </Select>
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="dateTime"
//                 label="DateTime"
//                 rules={[{ required: true, message: 'Please choose the dateTime' }]}
//               >
//                 <DatePicker.RangePicker
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={24}>
//               <Form.Item
//                 name="description"
//                 label="Description"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'please enter url description',
//                   },
//                 ]}
//               >
//                 <Input.TextArea rows={4} placeholder="please enter url description" />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Drawer>
//     </>

//   );
// }
// // {props.isLoading ? loader : <></>}


// const mapStateToProps = (state) => {
//   return state.profile;
// };

// export default connect(mapStateToProps)(ProfileEditorDrawer);