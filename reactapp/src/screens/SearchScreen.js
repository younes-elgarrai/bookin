import React, {useState, useEffect} from 'react';
import { Card, Menu, Dropdown, Input, Row, Col, Button, Pagination, Spin} from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import '../App.css';
import Background from '../assets/picto.png';
import Unavailable from '../assets/cover_nondispo.jpg'

// composant vignette avec lien vers page livre
// insérer module dernièers nouveautés lorsque pas de recherche encore faite
// placement loader
// fallback si API ne fonctionne pas => try again a faire sur tous les calls

// conserver précédentes recherches en cookies
// autosuggest
// réponses partial



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

 
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    const spin = (
    <Spin style={{ position: "fixed", top: "50%", left:"0", zIndex:"999", backgroundColor:"#F3F5F3", opacity:"0.8", width:"100%", height:"100%" }} indicator={antIcon} tip="Recherche en cours" size="large" />
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
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
            const body = await data.json();
            setIsFetching(false);
            setResult(body.items);
            console.log(body.items);
            var limitControl;
            if (body.totalItems > 200) {limitControl = Math.floor(body.totalItems/3)}
            setTotalElementsCount(limitControl);
            setPagesCount(Math.ceil(body.totalItems / elementsPerPage));
        }
        catch(error) {
            setError(true);
          }};
        bookSearchApi();
    };


    function handleMenuClick(e) {
        if (e.key === "2") {
            var bookSearchApi2 = async() => {
                setIsFetching(true);
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=newest&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                setResult(body.items);
                setSelectedMenu("2");
                console.log(body.items);
            };
            bookSearchApi2();
        } else { 
            var bookSearchApi3 = async() => {
                setIsFetching(true);
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                setResult(body.items);
                setSelectedMenu("1");
                console.log(body.items);
            };
            bookSearchApi3();
        }
    };


    var handlePageClick = (pageNumber) => {
        const currentPage = pageNumber - 1;
        offset = currentPage * elementsPerPage;
        var bookSearchApi4 = async() => {
            setIsFetching(true);
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&startIndex=${offset}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
            const body = await data.json();
            setIsFetching(false);
            setResult(body.items);
            console.log(body.items);
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
            <h1 style={styles.h1}>Recherche de livres</h1>
            <Search size="large" placeholder="Chercher un auteur, titre, ISBN, ..." onSearch={(q) => {handleSearch(q); setQuery(q); setCount(+1)}} />
        </Col>
    </Row>

    <div style={{ width:"80%", margin:"auto", border:1}}>
    {
        error && <div style={{textAlign:"center", marginTop:30}}>Problème de recherche, essayer à nouveau</div>
      }
        {count === 0 ? null : 
        <div>
        
        {query === ""  ? <div style={{textAlign:"center", marginTop:30}}> Aucun résultat :( essayer de formuler votre recherche </div> : 
        <div> 
        
        {result.length === 0 ? null : <div> 
            <Row align="middle" justify="space-between" style={{marginTop:30}}>
                <div>{totalElementsCount} Livres trouvés</div>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        Trier par <DownOutlined  />
                    </Button>
                </Dropdown>
            </Row>
            </div>}
            <div style={{display:'flex', flexWrap:"wrap" ,justifyContent: "center"}}>
                    
                {result.map((book,i) => (
                
                    <div key={i} style={{display:'flex',justifyContent:'center'}}>
                            <Card 
                                style={{ 
                                    width: 100,
                                    margin:'15px', 
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
                    
                        <div>

                    </div>
                    
                    </div>
                ))}
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
        </div>}
        </div> }
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
        marginTop:"20px",
        padding:'40px',
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