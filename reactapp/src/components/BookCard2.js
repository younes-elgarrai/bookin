import React from 'react';
import {Col, Card, Layout, Avatar, Menu, Dropdown, Button} from 'antd';
import '../App.css'
import {Link} from 'react-router-dom';
import Unavailable from '../assets/cover_nondispo.jpg'
import { BookOutlined, HeartOutlined} from '@ant-design/icons';

function BookCard(props) {
    const { Meta } = Card;
    const { Content } = Layout;

    function titleCut (desc) {
        if (desc.length > 27){
            return desc.substring(0,27)+"..."
          } else {
              return desc
          };
    };

return (

    <Card
    style={{ width: 150, margin:5}}
    cover={
      <img style={styles.images}
        alt={props.bookTitle}
        src={!props.bookCover ? Unavailable : props.bookCover}
      />
    }
    actions={[
      <BookOutlined style={{color: '#23396c'}} key="Ajout à la biliothèque" />,
      <HeartOutlined style={{color: 'red'}}  key="Ajout à ma wishlist" />,
    ]}
  >

    <Meta
      // description={titleCut(props.bookTitle)} 
    />
  </Card>

  // <div>
  //     <Link to={{pathname:"/book/"+props.bookId}}><img style={styles.images} width={150} src={!props.bookCover ? Unavailable : props.bookCover} alt={props.bookTitle} /></Link>

  // </div>



  );
}

let styles = {
    images: {
      width:150,
      borderRadius:5,
      boxShadow: "1px 2px 1px #e1e1e1"
    },

  }

export default BookCard;
