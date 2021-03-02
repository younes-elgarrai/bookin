import React , {useState, useEffect}  from 'react';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';

import {useParams} from "react-router-dom";
   
import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo'
import Review from '../components/Review'
import BookCard from '../components/BookCard'


const { Content } = Layout;

function BookScreen() {
    const [dataBook, setDataBook] = useState ([]);
    const [dataImg, setDataImg] = useState ();
    let {isbn} = useParams();

    useEffect(() => {
        const findBook = async() => {
          const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${isbn}&maxResults=40&langRestrict=fr&orderBy=newest&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
          const datajson = await data.json()
          console.log(datajson.items[0].volumeInfo);
          setDataBook(datajson.items[0].volumeInfo)
          setDataImg(datajson.items[0].volumeInfo.imageLinks.thumbnail)
        }
        findBook()    
      },[])

  return (
    <Content style={styles.container}  className='font'>
            <BookHeader bookTitle={dataBook.title} bookAuthor={dataBook.authors} bookCover={dataImg}/>
            <BookInfo bookTitle={dataBook.title} bookDesc={dataBook.description} publishedDate={dataBook.publishedDate}
            bookPublisher={dataBook.publisher} bookPageCount={dataBook.pageCount} bookIsbn={isbn}/>
            {/* Bloc librairies avec le même livre */}
        <div style={styles.libraryBloc}>
            <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Ils ont ajouté ce livre à leur bibliothèque </h3>
                {/* <p>Titre : {dataBook.title}</p>
                <p>Editeur: {dataBook.publisher}</p>
                <p>Categories: {dataBook.categories}</p>
                <p>isbn: {dataBook.industryIdentifiers[0].identifier}</p>
                <p>image:{dataBook.imageLinks.thumbnail}</p> */}


            </Col>
            </Row>
            <Row>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={2}><Avatar size={64} icon={<UserOutlined />} /></Col>
            </Row>
        </div>

       
        <BookCard/>
        <Review/>
</Content>
);
}

let styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100vw',
        backgroundColor:'#f3f5f7',
    },

    libraryBloc: {
        width:'80%',
        backgroundColor: 'white',
        paddingLeft:'30px',
        paddingTight:'30px',
        paddingTop: '30px',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      }
}

export default BookScreen;
