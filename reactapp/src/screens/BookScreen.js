import React , {useState, useEffect}  from 'react';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';

import Cover from '../assets/cover.jpg'

import {useParams} from "react-router-dom";

import Nav from '../components/Navbar';
import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo'
import Review from '../components/Review'
import BookList from '../components/BookList'

const { Content } = Layout;

var bookArray = [{
        "id":"RgiMzQEACAAJ",
        "title": "Batman La Légende - Neal Adams - Tome 3",
        "authors": [
          "Denis O'Neil",
          "Collectif",
          "Neal Adams"
        ],
        "publisher": "Urban Comics",
        "publishedDate": "2020-10-05",
        "description": "Le Joker, Double-Face, Man-Bat, le Professeur Milo... Batman a combattu les plus dangereux criminels de Gotham mais il n'a jamais rencontré un adversaire aussi implacable que Ra's al Ghul, le seigneur du crime et leader de l'organisation du Démon. Ce dernier tient à ce que le Chevalier Noir rejoigne sa croisade et prenne sa fille, la séduisante Talia, pour épouse ! (Contient Detective #410, Batman #232, 234, 237, 243-245, 251, 255)",
        "industryIdentifiers": [
          {
            "type": "ISBN_13",
            "identifier": "9791026845805"
          }
        ],
        "readingModes": {
          "text": true,
          "image": true
        },
        "printType": "BOOK",
        "categories": [
          "Comics & Graphic Novels"
        ],
        "maturityRating": "NOT_MATURE",
        "allowAnonLogging": false,
        "contentVersion": "preview-1.0.0",
        "panelizationSummary": {
          "containsEpubBubbles": true,
          "containsImageBubbles": true,
          "epubBubbleVersion": "c0b9a3661d71b229_A",
          "imageBubbleVersion": "c0b9a3661d71b229_A"
        },
        "imageLinks": {
          "smallThumbnail": "http://books.google.com/books/content?id=4fX_DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          "thumbnail": "http://books.google.com/books/content?id=4fX_DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        "language": "fr",
        "previewLink": "http://books.google.fr/books?id=4fX_DwAAQBAJ&printsec=frontcover&dq=o&hl=&cd=1&source=gbs_api",
        "infoLink": "https://play.google.com/store/books/details?id=4fX_DwAAQBAJ&source=gbs_api",
        "canonicalVolumeLink": "https://play.google.com/store/books/details?id=4fX_DwAAQBAJ",
        "seriesInfo": {
          "kind": "books#volume_series_info",
          "bookDisplayNumber": "3",
          "volumeSeries": [
            {
              "seriesId": "zcorGwAAABDn0M",
              "seriesBookType": "COLLECTED_EDITION",
              "orderNumber": 3
            }
          ]
        } 
}]

function BookScreen() {
    const [dataBook, setDataBook] = useState ([]);
    const [isbn, setIsbn] = useState();
    let {bookid} = useParams();

    console.log('Typebookid', typeof bookid);
    console.log('bookid', bookid)
    
    useEffect(() => {
        if (bookid)
            {
            const findBook = async() => {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes/${bookid}`)
                const datajson = await data.json();
                    if (datajson.totalItems!==0){
                        setDataBook(datajson.volumeInfo);
                        if (datajson.volumeInfo.industryIdentifiers) {
                            setIsbn(datajson.volumeInfo.industryIdentifiers[0].identifier);
                        } else {
                            setIsbn('nc')
                        }

                    } else {
                        const findBook2 = async() => {
                            alert('Livre inconnu, nous vous recommandons cette lecture');
                            const data = await fetch(`https://books.googleapis.com/books/v1/volumes/GlrPDwAAQBAJ`);
                            const datajson = await data.json();
                            setDataBook(datajson.volumeInfo);
                            setIsbn(datajson.volumeInfo.industryIdentifiers[0].identifier);
                          }
                          findBook2();
                    }
              }
              findBook()    
        } else {
            const findBook2 = async() => {
                alert('Livre inconnu, nous vous recommandons cette lecture');
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes/GlrPDwAAQBAJ`);
                const datajson = await data.json();
                setDataBook(datajson.volumeInfo);
                setIsbn(datajson.volumeInfo.industryIdentifiers[0].identifier);
              }
              findBook2();
        }

      },[bookid])

    console.log(dataBook);

    // Si la cover du livre n'existe pas alors => Afficher l'image par défaut
    var coverImg;
        if (dataBook.imageLinks===undefined) {
            var coverImg = Cover
        } else {
            coverImg=dataBook.imageLinks.thumbnail
        }

  return (

    <div className='font'>
        <Nav/>
        <Content style={styles.container}  >
                <BookHeader bookTitle={dataBook.title} bookAuthor={dataBook.authors} 
                bookCover={coverImg} bookCat={dataBook.categories} bookIsbn={isbn}/>

                <BookInfo bookTitle={dataBook.title} bookDesc={dataBook.description} publishedDate={dataBook.publishedDate}
                bookPublisher={dataBook.publisher} bookPageCount={dataBook.pageCount} bookIsbn={isbn}/>

                {/* Bloc librairies avec le même livre */}
            <div style={styles.libraryBloc}>
                <Row>
                <Col xs={24}>
                    <h3 style={styles.h3}>Ils ont ajouté "{dataBook.title}" à leur bibliothèque </h3>
                </Col>
                </Row>
                <Row>
                {/* xs={24} sm={12} md={8} lg={6} xl={4} */}
                <Col style={{marginBottom:'5px'}}xs={12} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
                <Col style={{marginBottom:'5px'}}xs={12} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
                <Col style={{marginBottom:'5px'}}xs={12} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
                <Col style={{marginBottom:'5px'}}xs={12} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
                </Row>
            </div>
            <BookList bookListTitle="Nos recommandations" data={bookArray}/>
        
            <Review/>
    </Content>
    </div>
);
}

let styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100vw',
        backgroundColor:'#f3f5f7',
        paddingTop:'10px',
    },

    libraryBloc: {
        width:'80%',
        backgroundColor: 'white',
        padding:'30px',
    },

    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px"
      },


}

export default BookScreen;
