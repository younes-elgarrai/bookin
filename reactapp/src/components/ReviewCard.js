import React from 'react';
import { Card, Avatar } from 'antd';
import '../App.css';
import Rating from './Rating';
import {Link} from 'react-router-dom'; 
import {connect} from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

function ReviewCard(props) {

return(
    <Card style={{ width: '80%', border:'none' }}>
    <Meta
      avatar={props.data ? <Avatar src={props.data.avatar} /> : <Avatar className="menu-nav-avatar" icon={<UserOutlined/>}/>}
      title={<Link to='/library' style={{color:'#23396C'}}>{props.data.userLibraryName}</Link>}
      description={<div><p><Rating rate={props.data.rating} /></p><p style={{textAlign:'justify'}}>{props.data.comment}</p></div>}
    />
  </Card>
)
}
function mapStateToProps(state) {
    return { user: state.user}
  }
export default connect(mapStateToProps, null)(ReviewCard);
