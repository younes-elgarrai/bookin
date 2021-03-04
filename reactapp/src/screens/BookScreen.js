import React , {useState, useEffect}  from 'react';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';

import Cover from '../assets/cover.jpg'

import {useParams} from "react-router-dom";
   
import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo'
import Review from '../components/Review'
import BookList from '../components/BookList'

// - Gestion de plusieurs catégories
// - Gestion de plusieurs auteurs

// - Créer le composant titre avec Carrousel 
// - ToolTips ?
// - Gérer la date format FR
// - Bouton j’achète


const { Content } = Layout;

function BookScreen() {
    const [dataBook, setDataBook] = useState ([]);
    const [dataImg, setDataImg] = useState ();
    const [categories, setCategories] = useState([]);
    let {isbn} = useParams();

    const regex = new RegExp('^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$');
    

    useEffect(() => {
        if (regex.test(isbn)) {
            const findBook = async() => {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${isbn}&maxResults=40&langRestrict=fr&orderBy=newest&langRestrict=fr&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
                const datajson = await data.json()
                    if (datajson.totalItems!==0){
                        setDataBook(datajson.items[0].volumeInfo)
                    } else {
                        const findBook2 = async() => {
                            alert('Livre inconnu, nous vous recommandons cette lecture');
                            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=9782203214095&maxResults=40&langRestrict=fr&orderBy=newest&langRestrict=fr&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`);
                            const datajson = await data.json();
                            setDataBook(datajson.items[0].volumeInfo);
                          }
                          findBook2();
                    }
              }
              findBook()    
        } else {
            const findBook2 = async() => {
                alert('Livre inconnu, nous vous recommandons cette lecture');
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=9782203214095&maxResults=40&langRestrict=fr&orderBy=newest&langRestrict=fr&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`);
                const datajson = await data.json();
                setDataBook(datajson.items[0].volumeInfo);
              }
              findBook2();
        }

      },[isbn])


      var coverImg;
        if (dataBook.imageLinks===undefined) {
            var coverImg = Cover
        } else {
            coverImg=dataBook.imageLinks.thumbnail
        }
      
        console.log(isbn);

    //   console.log('categories',categories)


    //   var categoriesBook = categories.map((item, i) => {
    //     return (<BookHeader categoriesBook={item.category} />)
    //   })

    //   console.log('CB', categoriesBook);

  return (

    <Content style={styles.container}  className='font'>
            <BookHeader bookTitle={dataBook.title} bookAuthor={dataBook.authors} 
            bookCover={coverImg}
            
            
            bookIsbn={isbn}/>
            <BookInfo bookTitle={dataBook.title} bookDesc={dataBook.description} publishedDate={dataBook.publishedDate}
            bookPublisher={dataBook.publisher} bookPageCount={dataBook.pageCount} bookIsbn={isbn}/>
            {/* Bloc librairies avec le même livre */}
        <div style={styles.libraryBloc}>
            <Row>
            <Col xs={24}>
                <h3 style={styles.h3}>Ils ont ajouté {dataBook.title} de {dataBook.authors} à leur bibliothèque </h3>
            </Col>
            </Row>
            <Row>
            <Col style={{marginBottom:'5px'}}xs={8} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
            <Col style={{marginBottom:'5px'}}xs={8} md={3}><Avatar size={100} icon={<UserOutlined />} /></Col>
            </Row>
        </div>
        {/* <BookList bookListTitle="Nos recommandations"/> */}
       
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
