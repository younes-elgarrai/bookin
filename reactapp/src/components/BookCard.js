import React from 'react';
import {Col} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'


function BookCard(props) {

    function titleCut (desc) {
        if (desc.length > 25){
            return desc.substring(0,21)+"..."
          } else {
              return desc
          };
    };

    return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{display:'flex', flexDirection:'column', justifyContent: "flex-end", alignItems:'center', padding:'5px'}} >
            <Link to={{pathname:"/book/"+props.bookId}}><img width={130} height={210} src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>
            <p style={{color:"#333", fontSize:"12px", fontWeight:"400", paddingRight:"5px", marginBottom:'10px'}}> {titleCut(props.bookTitle)} </p>   
         </Col>



    );
}

export default BookCard;
