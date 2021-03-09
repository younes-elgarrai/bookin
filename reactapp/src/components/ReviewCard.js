import React from 'react';
import { Card, Avatar } from 'antd';
import '../App.css';
import Rating from './Rating';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ReviewCard(props) {
  console.log("props data", props.data);
  // {_id: "604731c0bb9af0070df05bc5", userLibraryName: "Bibliothèque de Nicolas", avatar: "http://res.cloudinary.com/deyw4czpf/image/upload/v1615207763/wqhjyzjqmg8fi63rcpoh.jpg", rating: 2, comment: "Vraiment déçu.", …}

return(
    <Card style={{ width: '100%', border:'none' }}>
    <Meta
      avatar={props.data ? <Avatar src={props.data.avatar} /> : <Avatar className="menu-nav-avatar" icon={<UserOutlined/>}/>}
      title={<Link to='/library' style={{color:'#23396C'}}>{props.data.userLibraryName}</Link>}
      description={<div><p><Rating rate={props.data.rating} /></p><p>{props.data.comment}</p></div>}
    />
  </Card>
)
}
function mapStateToProps(state) {
    return { user: state.user}
  }
export default connect(mapStateToProps, null)(ReviewCard);
