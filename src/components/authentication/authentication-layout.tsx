import './style.scss';
import React, { useState, useEffect, createContext } from 'react'
import { Layout, Menu, Row } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner';
import { IAuthenticationState } from './authentication-reducer';

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
          <Menu.Item key="1" onClick={() => {
            history.push('signin');
          }}>Sign In</Menu.Item>
          <Menu.Item key="2" onClick={() => {
            history.push('signup');
          }}>Sign Up</Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <div className="wrapper">
          <AuthenticationLayoutContext.Provider value={prop}>
            {prop.children}
            {prop.waitResponse ? loader : <></>}
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