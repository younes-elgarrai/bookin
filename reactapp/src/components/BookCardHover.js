import React, {useEffect, useState} from 'react';
import {Col, Card, Badge, Tooltip} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'
import { HeartFilled, BookOutlined, BookFilled, HeartOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

function BookCardHover(props) {

    function titleCut (desc) {
        if (desc.length > 25){
            return desc.substring(0,22)+"..."
          } else {
              return desc
          };
    };

    const handleClickWLDelete = async () => {
        if (props.user!==null) {
          const dataDelete = await fetch(`/wishlist/delete/${props.user.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();
          console.log(dataDelete)
          console.log(bodyDelete)
    
          if (bodyDelete.result===true) {
            props.DeleteToWishList(props.bookId);
          }
        }
      };

    const handleClickLBDelete = async () => {
        if (props.user!==null) {
          const dataDelete = await fetch(`/library/delete/${props.user.token}/${props.bookId}`, {
          method: 'DELETE'
          });
          const bodyDelete = await dataDelete.json();
          console.log(dataDelete)
          console.log(bodyDelete)
    
          if (bodyDelete.result===true) {
            props.DeleteToLibrary(props.bookId);
          }
        }
      };

      const handleClickLBAdd = async () => {
        if (props.user!==null) {
          var addLibrary= async () => {
            const data = await fetch(`/library/add/${props.user.token}/${props.bookId}`, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
            });
            const body = await data.json();
            if (body.result===true) {
              props.addToLibrary(props.bookId);
            }
      
          };
          addLibrary();
        }
      };

      const handleClickWLAdd = async () => {
        if (props.user!==null) {
          var addWishList= async () => {
            const data = await fetch(`/wishlist/add/${props.user.token}/${props.bookId}`, {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({"cover":props.bookCover, "title":props.bookTitle})
            });
            const body = await data.json();
            if (body.result===true) {
              props.addToWishList(props.bookId);
            }
      
          };
          addWishList();
        }
      };


    const libraryIconAdd = (
        <BookOutlined style={{ color: '#23396c', fontSize:"12px", cursor:"pointer" }} onClick={() => handleClickLBAdd()}  />
    )

    const libraryIconDelete = (
        <BookFilled style={{ color: '#23396c', fontSize:"12px", cursor:"pointer" }} onClick={() => handleClickLBDelete()}  />
    )

    const wishlistIconAdd = (
        <HeartOutlined style={{ color: '#23396c', fontSize:"12px", cursor:"pointer" }} onClick={() => handleClickWLAdd()}  />
    )

    const wishlistIconDelete = (
        <HeartFilled style={{ color: '#23396c', fontSize:"12px", cursor:"pointer" }} onClick={() => handleClickWLDelete()}  />
    )


return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display:'flex', flexDirection:'column', justifyContent: "flex-end", alignItems:'center', padding:'10px'}} >
            <Link to={{pathname:"/book/"+props.bookId}}><img width={150} src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <p style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(props.bookTitle)} </p>
            {props.bookLibrary ? libraryIconDelete : libraryIconAdd}
            {props.bookWishlist ? wishlistIconDelete : wishlistIconAdd}
         </Col>
        
);
}

function mapDispatchToProps(dispatch) {
    return {
        addToWishList: function(bookId) {
            dispatch( {type: 'addToWishList', bookId:bookId} )
        }, 
      DeleteToWishList: function(bookId) {
        dispatch( {type: 'DeleteToWishList', bookId:bookId} )
      },
      addToLibrary: function(bookId) {
        dispatch( {type: 'addToLibrary', bookId:bookId} )
      }, 
      DeleteToLibrary: function(bookId) {
        dispatch( {type: 'DeleteToLibrary', bookId:bookId} )
      },
    };
  };


function mapStateToProps(state) {
    console.log('state', state);
    return { user: state.user, wishlist: state.wishlist, library: state.library }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BookCardHover);