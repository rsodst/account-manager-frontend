import './style.scss';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { Layout, Alert } from 'antd';
import React, { ReactNode } from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { IAuthenticationState } from '../../redux/reducers/authentication-reducer';
import PublicHeader from './public-header';

const { Content } = Layout;

type Props = {
  authentication: IAuthenticationState,
  children: ReactNode
}

const AuthenticationLayout: React.FC<Props> = (prop) => {

  let loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

  return (
    <Layout className="public-layout" style={{ height: '100vh' }}>
      <PublicHeader></PublicHeader>
      <Content className="content">
        <div className="wrapper">
          {prop.children}
          {prop.authentication.isLoading ? loader : <></>}
          {prop.authentication.responseError ?
            <div>
              <Alert className="error-message" message={`${
                prop.authentication.responseError.errors ?
                  prop.authentication.responseError.errors : prop.authentication.responseError.message
                }`} type="error" />
            </div>
            : <></>}
        </div>
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(AuthenticationLayout);