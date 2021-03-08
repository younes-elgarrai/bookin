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
    <Card style={{ width: '50%' }}>
    <Meta
      avatar={props.user ? <Avatar src={props.user.avatar} /> : <Avatar className="menu-nav-avatar" icon={<UserOutlined/>}/>}
      title={<Link to='/library'>user name</Link>}
      description={<div><p><Rating /></p><p>review bla bla</p></div>}
    />
  </Card>
)
}
function mapStateToProps(state) {
    return { user: state.user}
  }
export default connect(mapStateToProps, null)(ReviewCard);
