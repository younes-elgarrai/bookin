import React from 'react';
import {Col, Card} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'


function BookCard(props) {
    const { Meta } = Card;

    function titleCut (desc) {
        if (desc.length > 22){
            return desc.substring(0,20)+"..."
          } else {
              return desc
          };
    };

return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display:'flex', flexDirection:'column', justifyContent: "flex-end", alignItems:'center', padding:'10px'}} >
            <Link to={{pathname:"/book/"+props.bookId}}><img width={128} height={210} src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <p style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(props.bookTitle)} </p>   
         </Col>



);
}

export default BookCard;
