import React from 'react';
import {Row, Col} from 'antd';
import '../App.css'
import BookCard from '../components/BookCard'
import { useCookies } from 'react-cookie';

function BookList(props) {


return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>{props.bookListTitle}</h3>
        </Col>
    </Row>
    <Row>
        {props.data.map((book, index)=>{
            return <BookCard  bookId={book.id} bookTitle={book.title} bookCover={book.imageLinks.thumbnail}/>;
        })}
    </Row>

</div>
);
}

let styles = {
    libraryBloc: {
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
