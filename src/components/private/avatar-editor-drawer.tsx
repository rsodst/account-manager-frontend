import "./style.scss";
import React, { useEffect, useState, useRef } from "react";
import { Button, Input, DatePicker, Modal } from "antd";
import { useDispatch } from "react-redux";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { IProfileEditorState } from '../../redux/reducers/profile-editor-reducer';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Drawer, Col, Row, Select } from 'antd';
import { useForm } from "antd/lib/form/util";
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IAvatarEditorState } from '../../redux/reducers/avatar-editor-reducer';
import { SetAvatarEditorVisibilityAction } from '../../redux/actions/avatar-editor';

const { Option } = Select;

export interface IProfileEditorDrawerProprs {
  avatarEditor : IAvatarEditorState
}

const AvatarEditorDrawer: React.FC<IProfileEditorDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

  const [previewVisible, setPreviewVisible] = useState(false);

  //https://localhost:44304/storage/person-photo/default.jpg

  const [previewImage, setPreviewImage] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png");

  return (
    <>
      <Drawer
        title="Edit profile avatar"
        width={200}
        onClose={  () => { dispatch(SetAvatarEditorVisibilityAction(false)); }}
        visible={props.avatarEditor.isEditorOpen}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => {
              () => { dispatch(SetAvatarEditorVisibilityAction(false)); }
            }} style={{ marginRight: 8 }}>
              Cancel
              </Button>
            <Button onClick={() => {
            }} type="primary">
              Save
              </Button>
          </div>
        }
      >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            onPreview={() => { setPreviewVisible(true) }}
            onChange={() => { }}
            fileList={[
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              }
            ]
            }
          >
          </Upload>
        <Modal
          visible={previewVisible}
          title={"Your profile image"}
          footer={null}
          onCancel={() => {
            setPreviewVisible(false);
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Drawer>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
    avatarEditor: state.avatarEditor
  }
};

export default connect(mapStateToProps)(AvatarEditorDrawer);