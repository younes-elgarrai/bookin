import React, {useState} from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function AvatarUpload() {
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
      function beforeUpload(file) {
        console.log("before upload file", file);
        // si pas d'erreur, setFile(file); car direct le bon format pour envoyer au back puis à cloudinary
        // File {uid: "rc-upload-1614680539892-5", name: "Planning_batch_capsule.png", lastModified: 1609751206824, lastModifiedDate: Mon Jan 04 2021 10:06:46 GMT+0100 (heure normale d’Europe centrale), webkitRelativePath: "", …}
        // useEffect sur file = dés qu'il change, fetch pour envoyer file au back puis a cloudinary
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file.');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

  const handleChange = info => {
      console.log("info",info);
    // if (info.file.status === 'uploading') {
    //     setLoading(true);
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   // Erreur dans upload d'un fichier de mon ordi : cannot read file of undefined
    //   getBase64(info.file.originFileObj, imageUrl => {
    //     setLoading(false);
    //     setImageUrl(imageUrl);
    //   }
    //   );
    // }
  };
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8}}>Sélectionnez</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={()=> handleChange()}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
}
