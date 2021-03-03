import React, {useState, useEffect} from 'react';
import { Card, Menu, Dropdown, Input, Row, Col, Button, Pagination, Spin} from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import '../App.css';
import Background from '../assets/picto.png';
import Unavailable from '../assets/cover_nondispo.jpg'

// composant vignette avec lien vers page livre
// insérer module dernières nouveautés lorsque pas de recherche encore faite


const { Search } = Input;
const { Meta } = Card;

export default function SearchScreen() {

    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const [count, setCount] = useState(0);
    var offset = 0;
    const elementsPerPage  = 40;
    const [pagesCount, setPagesCount] = useState(1);
    const [totalElementsCount, setTotalElementsCount] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState("1");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false); 
    const [totalItems, setTotalItems] = useState(0);   

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    const spin = (
    <div style={{ position: "fixed", top: "9%", left:"0", zIndex:"998", backgroundColor:"#F3F5F3", opacity:"0.8", width:"100%", height:"100%" }}>
    <Spin style={{ position: "fixed", top: "50%", zIndex:"999", width:"100%", height:"100%" }} indicator={antIcon} tip="Recherche en cours" size="large" />
    </div>
    );

    const menu = (
        <Menu onClick={handleMenuClick} selectedKeys={selectedMenu} defaultSelectedKeys="1" >
          <Menu.Item key="1">Pertinence</Menu.Item>
          <Menu.Item key="2" >Date de publication</Menu.Item>
        </Menu>
      );

    var handleSearch = (q) => {
        var bookSearchApi = async() => {
            setIsFetching(true);
            setError(false);
        try {
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=40&langRestrict=fr&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
            const body = await data.json();
            setIsFetching(false);
            setQuery(q)
            setCount(count+1)
            if (body.totalItems !== 0) {
            setResult(body.items);
            } else {
            setResult([])
            };
            setTotalItems(body.totalItems);
            console.log(body);
            var limitControl = body.totalItems;
            if (body.totalItems > 200) {limitControl = Math.floor(body.totalItems/3)}
            setTotalElementsCount(limitControl);
            setPagesCount(Math.ceil(body.totalItems / elementsPerPage));
        }
        catch(error) {
            setIsFetching(false);
            setError(true);
          }};
        bookSearchApi();
    };


    function handleMenuClick(e) {
        if (e.key === "2") {
            var bookSearchApi2 = async() => {
                setIsFetching(true);
            try {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=newest&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                if (body.totalItems !== 0) {
                    setResult(body.items);
                    } else {
                    setResult([])
                    };
                setSelectedMenu("2");
                console.log(body);
            }
            catch(error) {
                setError(true);
              };
            };
            bookSearchApi2();
        } else { 
            var bookSearchApi3 = async() => {
                setIsFetching(true);
            try {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                if (body.totalItems !== 0) {
                    setResult(body.items);
                    } else {
                    setResult([])
                    };
                setSelectedMenu("1");
                console.log(body);
            }
            catch(error) {
                setError(true);
                };
            };
            bookSearchApi3();
        }
    };

    var handlePageClick = (pageNumber) => {
        const currentPage = pageNumber - 1;
        offset = currentPage * elementsPerPage;
        var bookSearchApi4 = async() => {
            setIsFetching(true);
        try {
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&startIndex=${offset}&maxResults=40&langRestrict=fr&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
            const body = await data.json();
            setIsFetching(false);
            if (body.totalItems !== 0) {
                setResult(body.items);
                } else {
                setResult([])
                };
            console.log(body);
        }
        catch(error) {
            setError(true);
            };
        };
        bookSearchApi4();
    }

return (
<div className="font">
    <Nav/>
    {isFetching ? spin : null }
    <div style={styles.container} >
        <Row style={styles.bookBloc} >
            <Col xs={24} md={12} >
                <h1 style={styles.h1}>Rechercher votre prochain livre</h1>
                <Search size="large" placeholder="Chercher un auteur, titre, ISBN, ..." onSearch={(q) => {handleSearch(q)}} />
            </Col>
        </Row>

        <div style={{ width:"80%", margin:"auto", border:1}}>

            {error && <div style={{textAlign:"center", marginTop:30}}>Problème de recherche, essayer à nouveau</div>}

            {count !== 0 && 

                <div>

                    {(query === "" || totalItems === 0)  
                        ? <div style={{textAlign:"center", marginTop:30}}> Aucun livre ne correspond à votre recherche :( essayer de reformuler votre recherche </div> 
                        : <div> 
                                <Row align="middle" justify="space-between" style={{marginTop:10}}>
                                    <div>{totalElementsCount} Livres trouvés</div>
                                    <Dropdown overlay={menu}>
                                        <Button style={{ marginLeft: 8 }}>
                                            Trier par <DownOutlined  />
                                        </Button>
                                    </Dropdown>
                                </Row>

                                <div style={{display:'flex', flexWrap:"wrap" ,justifyContent: "center"}}>
                                        
                                    {
                                        result.map((book,i) => (
                                            <div key={i} style={{display:'flex',justifyContent:'center'}}>
                                                    <Card 
                                                        style={{ 
                                                            width: 150,
                                                            margin:'10px', 
                                                            display:'flex',
                                                            flexDirection: 'column',
                                                            justifyContent:'space-between'    
                                                        }} 
                                                        bodyStyle={{ padding: 0 }}
                                                        cover={
                                                            <img
                                                                alt={book.volumeInfo.title}
                                                                src={!book.volumeInfo.imageLinks ? Unavailable : book.volumeInfo.imageLinks.thumbnail} 
                                                            />
                                                            }
                                                        // actions={}
                                                    
                                                    >
                                                        <Meta
                                                            title={book.volumeInfo.title}
                                                            style={{fontSize:12}}
                                                        />
                                                    </Card>                                        
                                            </div>
                                        ))
                                    }
                                </div>
                            {
                                pagesCount > 1 &&
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <Pagination
                                            defaultCurrent={1}
                                            onChange={(e) => handlePageClick(e)}
                                            size="large"
                                            total={totalElementsCount}
                                            pageSize={elementsPerPage}
                                            showSizeChanger={false}
                                        />
                                    </div>
                            }
                        </div>
                    }
                </div> 
            }
        </div>
    </div>
</div>
)}


let styles = {
    
    textAlign: {
        textAlign: "right",
        padding:"10px"
    },

    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        backgroundColor:'#F3F5F3',
      },

    bookBloc: {
        width:'80%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#23396C',
        borderTopRightRadius:"10px",
        borderTopLeftRadius:"10px",
        marginTop:"10px",
        padding:'50px',
        backgroundImage: `url(${Background})`,
        backgroundSize: '15%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
    },

    h1: {
        color:'white',
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '10px',
        textAlign:"center",
    },

    h2: {
        color:'#ffffff',
        fontSize: '16px',
        fontWeight: '400',
        margin: '0px',
    },

  }