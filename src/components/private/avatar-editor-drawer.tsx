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
import { PlusOutlined } from '@ant-design/icons';
import { IAvatarEditorState } from '../../redux/reducers/avatar-editor-reducer';
import { SetAvatarEditorVisibilityAction } from '../../redux/actions/avatar-editor';
import { Upload, message } from 'antd';
const { Option } = Select;
import { LoadingOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export interface IProfileEditorDrawerProprs {
  avatarEditor: IAvatarEditorState
}

const AvatarEditorDrawer: React.FC<IProfileEditorDrawerProprs> = (props) => {

  const dispatch = useDispatch();

  const loader = <Loader type="ThreeDots" color="#1890ff" height={80} width={80} />

  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png");

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
      <Drawer
        title="Edit profile avatar"
        width={200}
        onClose={() => { dispatch(SetAvatarEditorVisibilityAction(false)); }}
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
          </div>}>

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={(file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

            if (!isJpgOrPng) {
              message.error('You can only upload JPG/PNG file!');
            }

            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
              message.error('Image must smaller than 2MB!');
            }

            return isJpgOrPng && isLt2M;
          }}
          onChange={(info) => {
            if (info.file.status === 'uploading') {
              setLoading(true);
              return;
            }

            if (info.file.status === 'done') {
              // Get this url from response in real world.

              getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false);
                setImageUrl(imageUrl);
              });
            }

          }}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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