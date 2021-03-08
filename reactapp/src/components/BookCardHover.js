import React from 'react';
import {Col, Card, Badge, Tooltip} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'
import { HeartOutlined, HeartFilled, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

function BookCardHover(props) {
    const { Meta } = Card;

    function titleCut (desc) {
        if (desc.length > 25){
            return desc.substring(0,22)+"..."
          } else {
              return desc
          };
    };

    const handleClickWLDelete = async () => {
        if (props.token!==null) {
          const dataDelete = await fetch(`/library/delete/${props.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();
    
          if (bodyDelete.result===true) {
            props.DeleteToWishList(props.bookId);
          }
        }
      };

return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display:'flex', flexDirection:'column', justifyContent: "flex-end", alignItems:'center', padding:'10px'}} >
            <Link to={{pathname:"/book/"+props.bookId}}><img width={150} src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <p style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(props.bookTitle)} </p>
            <Badge onClick={() => handleClickWLDelete()} offset={[71, -10]}  count={<HeartFilled style={{ color: '#23396c', fontSize:"12px", cursor:"pointer" }}  />}>
            </Badge>
         </Col>
        
);
}

function mapDispatchToProps(dispatch) {
    return {
      DeleteToWishList: function(bookId) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId} )
      }
    };
  };


function mapStateToProps(state) {
    console.log('state', state);
    return { token: state.token, wishlist: state.wishlist }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookCardHover);