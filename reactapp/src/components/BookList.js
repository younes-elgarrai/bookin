import React from 'react';
import {Row, Col} from 'antd';
import '../App.css'
import BookCard from '../components/BookCard'

function BookList(props) {


return (
<div style={styles.libraryBloc}  className='font'>
    <Row>
        <Col xs={24}>
            <h3 style={styles.h3}>{props.bookListTitle}</h3>
        </Col>
    </Row>

    <Row>
        <BookCard isbn="9782377291359" bookTitle="titre du livre dede ed eedzd titre du livre dede ed eedzd titre du livre dede ed eedzd" bookCover="https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg"/>
        <BookCard isbn="9782091934907" bookTitle="titre du livre de" bookCover="https://static.fnac-static.com/multimedia/Images/FR/NR/2d/4f/26/2510637/1540-1/tsp20190228115423/T-choupi-chez-le-docteur.jpg"/>
        <BookCard isbn="9782091934884" bookTitle="titre du livre fr" bookCover="https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg"/>
        <BookCard isbn="9782017086314" bookTitle="titre du livre de" bookCover="https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg"/>
        <BookCard isbn="9791030101867" bookTitle="titre du livre cc" bookCover="https://static.fnac-static.com/multimedia/Images/FR/NR/43/61/c1/12673347/1507-1/tsp20210202071101/Le-parfum-des-fleurs-la-nuit.jpg"/>
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
