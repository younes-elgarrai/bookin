import React , {useState, useEffect}  from 'react';
import { Avatar, Layout, Row, Col, Image} from 'antd';

import '../components/BookHeader'
import '../App.css';

import Cover from '../assets/cover.jpg';
import Faces_01 from '../assets/faces_01.jpg';
import Faces_02 from '../assets/faces_02.jpg';
import Faces_03 from '../assets/faces_03.jpg';
import Faces_04 from '../assets/faces_04.jpg';
import Faces_05 from '../assets/faces_05.jpg';
import Faces_06 from '../assets/faces_06.jpg';
import Faces_07 from '../assets/faces_07.png';
import Faces_08 from '../assets/faces_08.png';
import Faces_09 from '../assets/faces_09.png';

import {useParams} from "react-router-dom";

import Nav from '../components/Navbar';
import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo';
import Reviews from '../components/Reviews';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import NewReview from '../components/NewReview';

const { Content } = Layout;

var bookArray = [[{
  "kind": "books#volume",
  "id": "4fX_DwAAQBAJ",
  "etag": "IqrkRgWuA4M",
  "selfLink": "https://books.googleapis.com/books/v1/volumes/4fX_DwAAQBAJ",
  "volumeInfo": {
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
    "previewLink": "http://books.google.fr/books?id=4fX_DwAAQBAJ&printsec=frontcover&dq=Batman+La+L%C3%A9gende+-+Neal+Adams+-+Tome+3&hl=&cd=1&source=gbs_api",
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
  },
  "saleInfo": {
    "country": "FR",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
      "amount": 9.99,
      "currencyCode": "EUR"
    },
    "retailPrice": {
      "amount": 9.99,
      "currencyCode": "EUR"
    },
    "buyLink": "https://play.google.com/store/books/details?id=4fX_DwAAQBAJ&rdid=book-4fX_DwAAQBAJ&rdot=1&source=gbs_api",
    "offers": [
      {
        "finskyOfferType": 1,
        "listPrice": {
          "amountInMicros": 9990000,
          "currencyCode": "EUR"
        },
        "retailPrice": {
          "amountInMicros": 9990000,
          "currencyCode": "EUR"
        },
        "giftable": true
      }
    ]
  },
  "accessInfo": {
    "country": "FR",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
      "isAvailable": true,
      "acsTokenLink": "http://books.google.fr/books/download/Batman_La_L%C3%A9gende_Neal_Adams_Tome_3-sample-epub.acsm?id=4fX_DwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
      "isAvailable": true,
      "acsTokenLink": "http://books.google.fr/books/download/Batman_La_L%C3%A9gende_Neal_Adams_Tome_3-sample-pdf.acsm?id=4fX_DwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://play.google.com/books/reader?id=4fX_DwAAQBAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
  },
  "searchInfo": {
    "textSnippet": "Le Joker, Double-Face, Man-Bat, le Professeur Milo."
  }
}]]

function BookScreen() {
    const [dataBook, setDataBook] = useState ([]);
    const [isbn, setIsbn] = useState();
    const [readerLink, setReaderLink] = useState();
    const [associated, setAssociated]= useState(bookArray);
    const [authorBooks, setAuthorBooks] = useState(bookArray);
    let {bookid} = useParams();

    const [ reviewsList, setReviewsList ] = useState([]);
    
    useEffect(() => {
        if (bookid) {
            console.log(bookid)
            const findBook = async() => {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes/${bookid}`)
                const datajson = await data.json();
                const assoc = await fetch(`https://books.googleapis.com/books/v1/volumes/${bookid}/associated`);
                const assocjson = await assoc.json();
                console.log("datajson",datajson);
                console.log("data",data);
                const author = (await datajson.volumeInfo.authors?datajson.volumeInfo.authors[0]:"")
                const inauthor = await fetch(`https://books.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&maxResults=20&langRestrict=fr&orderBy=newest&fields=items,totalItems&apiKey=AIzaSyCf_Mpql10SDNH98u0oNNYZuS7RzPqJ62k`);
                const inauthorjson = await inauthor.json()
         
                setAssociated(( await [assocjson.items] || bookArray));
                setAuthorBooks((await [inauthorjson.items] || bookArray));
                    if (datajson.totalItems!==0){
                        setDataBook(datajson.volumeInfo);
                        setReaderLink(datajson.accessInfo.webReaderLink);

                        if (datajson.volumeInfo.industryIdentifiers) {
                          var isbnArray = datajson.volumeInfo.industryIdentifiers;
                          var filteredIsbn = [];

                            for (let j = 0; j < isbnArray.length; j++) {
                              var sorted =   isbnArray.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
                                if (sorted[j].type === "ISBN_13") {
                                  filteredIsbn.push(sorted[j].identifier);
                                }
                            };
                            setIsbn(filteredIsbn);
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
                          window.scrollTo(0, 0)
                    }
              }
              findBook()    
              window.scrollTo(0, 0)
        } else {
            const findBook2 = async() => {
                alert('Livre inconnu, nous vous recommandons cette lecture');
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes/GlrPDwAAQBAJ`);
                const datajson = await data.json();
                setDataBook(datajson.volumeInfo);
                setIsbn(datajson.volumeInfo.industryIdentifiers[0].identifier);
              }
              findBook2();
              window.scrollTo(0, 0)
        }
      },[bookid])

      // REVIEWS //
      const loadReviewsData = async () => {
        var rawResponse = await fetch(`/reviews/${bookid}`);
        var response = await rawResponse.json();
        setReviewsList(response.reviews);
      }
      useEffect(() => {
        loadReviewsData();
        }, [bookid]); 

    // Si la cover du livre n'existe pas alors => Afficher l'image par défaut
    var coverImg;
        if (dataBook.imageLinks===undefined) {
            var coverImg = Cover
        } else {
            coverImg=dataBook.imageLinks.thumbnail

        }


  const generateProfileIcons = () => {
    const availableIcons = [ Faces_01, Faces_02, Faces_03, Faces_04, Faces_05, Faces_06, Faces_07, Faces_08, Faces_09];
    for (let i = 0 ; i < 3 ; i++) {
      let index = Math.floor(Math.random() * 9);
      availableIcons.splice(index, 1);
      }
    return availableIcons;
  }      
  const profiles = generateProfileIcons();

  return (

    <div className='font'>
        <Nav/>
        <Content style={styles.container}  >
                <BookHeader bookTitle={dataBook.title} bookAuthor={dataBook.authors} 
                bookCover={coverImg} bookCat={dataBook.categories} bookIsbn={isbn} bookId={bookid}
                bookPage={readerLink}/>

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
                {profiles && profiles.map((profile) => {
                  return(
                    <Col style={{marginBottom:'5px'}}xs={12} md={3}><Avatar size={100} src={profile} /></Col>
                  )
                })
                }
                </Row>
                <Row>
                  {associated[0]===undefined?null:<BookList bookListTitle={["Ouvrages associés..."]} data={associated}/>}
                </Row>
                <Row>
                  {authorBooks[0]===undefined?null:<BookList bookListTitle={["Du même auteur..."]} data={authorBooks}/>}
                </Row>
            </div>


        
            <Reviews list={reviewsList}/>
            <NewReview book={bookid} list={reviewsList} loadReviewsData={()=>loadReviewsData()} />
    </Content>
    <Footer/>
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
