import React, {useState} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {connect} from 'react-redux';

function AvatarUpload(props) {
    
    const [ avatarData, setAvatarData ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState();
    
  function beforeUpload(file) {
    console.log('file',file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file.');
      };
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      };
      setAvatarData(file);
        return isJpgOrPng && isLt2M;
      };

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
        setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      var data = new FormData();
      data.append('avatar', avatarData);
      const response = await fetch("/upload", {
        method: 'post',
        body: data
       })
      const dataResponse = await response.json();
      console.log("upload url response", dataResponse);
      if (dataResponse.url) {
        setImageUrl(dataResponse.url);
        props.onUploadAvatarClick(dataResponse.url);
        setLoading(false);
      } 
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8}}>Sélectionnez</div>
    </div>
  );

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        action="data:image/jpeg;base64,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"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onUploadAvatarClick: function(avatar) {
        dispatch( {type: 'saveAvatar', avatar} )
    } 
  }
};
export default connect(null, mapDispatchToProps)(AvatarUpload);
