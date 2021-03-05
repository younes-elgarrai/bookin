import React from 'react';
import {Row, Col} from 'antd';
import '../App.css'
import BookCard from '../components/BookCard'
import Unavailable from '../assets/cover_nondispo.jpg';
import { PicCenterOutlined } from '@ant-design/icons';


function BookList(props) {


return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>{props.bookListTitle}</h3>
        </Col>
    </Row>
    <Row>
        <div style={{display:'flex', flexWrap:"wrap", justifyContent: "center", marginTop:"10px"}}>

            {props.data.slice(0,6).map((book, index)=>{
                return <BookCard  bookId={book.id} bookTitle={book.volumeInfo.title} bookCover={!book.volumeInfo.imageLinks ? Unavailable : book.volumeInfo.imageLinks.thumbnail}/>;
            })}
        </div>
    </Row>


</div>
);
}

let styles = {
    libraryBloc: {
        justifyContent: 'center',
        width:'80%',
        backgroundColor: 'white',
        paddingTop:'30px',
        paddingLeft:'30px',
        paddingRight:'30px',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      },

}

export default BookList;
