import './style.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Layout, Menu, Alert } from 'antd';
import React, { createContext, Fragment } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { IAuthenticationState } from '../../redux/reducers/authentication-reducer';

const { Header, Content } = Layout;
const AuthenticationLayoutContext = createContext<IAuthenticationState>(null);

const AuthenticationLayout: React.FC<IAuthenticationState> = (prop) => {

  let history = useHistory();
  let location = useLocation();

  let loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

  return (
    <Layout className="layout">
      <Header>
        <div className="title"><b>Account</b> manager</div>
        <Menu className="menu" theme="dark" mode="horizontal" defaultSelectedKeys={
          location.pathname == '/signin' ? ["1"] : ["2"]
        }>
          <Menu.Item key="1" icon={<LoginOutlined />} onClick={() => {
            history.push('signin');
          }}>Sign In</Menu.Item>
          <Menu.Item key="2" icon={<UserAddOutlined />} onClick={() => {
            history.push('signup');
          }}>Sign Up</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <div className="wrapper">
          <AuthenticationLayoutContext.Provider value={prop}>
            <div className="form__title">Welcome</div>
            {prop.children}
            {prop.isLoading ? loader : <></>}
            {prop.responseError ?
              <div>
                <Alert className="error-message" message={`${
                  prop.responseError.errors ? prop.responseError.errors : prop.responseError.message
                  }`} type="error" />
              </div>
              : <></>}
          </AuthenticationLayoutContext.Provider>
        </div>
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return state.authentication;
};

export default connect(mapStateToProps)(AuthenticationLayout);
export { AuthenticationLayoutContext };