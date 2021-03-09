import React from 'react';
import {Col, Card} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'


function BookCard(props) {
    const { Meta } = Card;

    function titleCut (desc) {
        if (desc.length > 25){
            return desc.substring(0,22)+"..."
          } else {
              return desc
          };
    };

return (
 
        <Col xs={24} sm={12} md={8} lg={6} xl={4} style={{width:"150px", display:'flex', flexDirection:'column', flex: "1 50%", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}} >
            <Link to={{pathname:"/book/"+props.bookId}}><img width="100%" height="100%" src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle}/></Link>
            <p style={{color:"#333", width:"80%", textAlign:'center', fontSize:"12px", fontWeight:"400", paddingRight:"10px", marginBottom:'10px'}}> {titleCut(props.bookTitle)} </p>   
         </Col>



);
}

export default BookCard;
