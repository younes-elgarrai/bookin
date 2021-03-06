import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Input, Row, Col, Button, Pagination, Spin, AutoComplete} from 'antd';
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import '../App.css';
import Background from '../assets/picto.png';
import Unavailable from '../assets/cover_nondispo.jpg';
import BookCard from '../components/BookCard';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import review from '../assets/review.png';


function SearchScreen(props) {

    const { Search } = Input;
    const history = useHistory();
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
    const [cookies, setCookie] = useCookies(['searchQuery']);
    const [value, setValue] = useState(null);
    const [suggestData, setSuggestData] = useState([]);
    const [open, setOpen] = useState(false);

    // Spinner en attendant chargement API Google Books
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    
    const spin = (
    <div style={{ position: "fixed", top: "9%", left:"0", zIndex:"998", backgroundColor:"#F3F5F3", opacity:"0.8", width:"100%", height:"100%" }}>
    <Spin style={{ position: "fixed", top: "50%", zIndex:"999", width:"100%", height:"100%" }} indicator={antIcon} tip="Recherche en cours" size="large" />
    </div>
    );

    // recherche de base 
    var handleSearch = (q) => {
        var bookSearchApi = async() => {
            setIsFetching(true);
            setError(false);
        try {
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
            const body = await data.json();
            setIsFetching(false);
            setQuery(q);
            console.log(q);
            setCookie('searchQuery', q, {path: '/'});
            setCount(count+1);
            if (body.totalItems !== 0) {
            var filtered = body.items.filter(book => book.volumeInfo.industryIdentifiers !== undefined);
            var filtered2 = [];
            for (let i = 0; i < filtered.length; i++) {
                for (let j = 0; j < filtered[i].volumeInfo.industryIdentifiers.length; j++) {
                var sorted =  filtered[i].volumeInfo.industryIdentifiers.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
                    if (sorted[j].type === "ISBN_13") {
                        filtered2.push(filtered[i])
                    }
                }
            };
            setResult(body.items);
            } else {
            setResult([])
            };
            setTotalItems(body.totalItems);
            console.log(body);
            var limitControl = body.totalItems;
            if (body.totalItems > 200) {limitControl = Math.floor(body.totalItems/4)}
            setTotalElementsCount(limitControl);
            setPagesCount(Math.ceil(body.totalItems / elementsPerPage));
        }
        catch(error) {
            setIsFetching(false);
            setError(true);
            console.log(error)
        }};
        bookSearchApi();
    };


    // Recherche d'un auteur sur google Books Api en récupérant info depuis la page livre dans props.location.state
    useEffect(() => {
        if (props.location !== undefined && props.location.state !== undefined) {
            if (props.location.state.author !== undefined) {
                var bookSearchAuthor = async() => {
                    setIsFetching(true);
                try {
                    const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${props.location.state.author}&maxResults=40&langRestrict=fr&orderBy=relevance&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                    const body = await data.json();
                    setIsFetching(false);
                    console.log(body);
                    console.log("data",data);
                    
                    if (body.totalItems !== 0) {
                        setResult(body.items);
                        setTotalItems(body.totalItems);
                        if (props.location.state.author !== undefined) {
                        setCount(count+1);
                        setQuery(props.location.state.author);
                        setValue(props.location.state.author)
                        console.log(props.location.state.author);
                        };
                        setTotalItems(body.totalItems);
                        console.log(body);
                        var limitControl = body.totalItems;
                        if (body.totalItems > 200) {limitControl = Math.floor(body.totalItems/4)}
                        setTotalElementsCount(limitControl);
                        setPagesCount(Math.ceil(body.totalItems / elementsPerPage));
                        } else {
                        setResult([])
                        };
                }
                catch(error) {
                    setError(true);
                    };
                };
                bookSearchAuthor();
            };
        };   
    }, [])


// Recherche sur Google Books API de la recherche précédente en cas de back navigateur
    useEffect(() => {
          if (history.action === "POP") {
            var bookSearchApi5 = async() => {
                setIsFetching(true);
            try {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${cookies.searchQuery}&maxResults=40&langRestrict=fr&orderBy=relevance&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                console.log(body);
                console.log("data",data);
                
                if (body.totalItems !== 0) {
                    setResult(body.items);
                    setTotalItems(body.totalItems);
                    if (cookies.searchQuery !== undefined) {
                    setCount(count+1);
                    setQuery(cookies.searchQuery);
                    setValue(cookies.searchQuery)
                    console.log(cookies.searchQuery);
                    };
                    setTotalItems(body.totalItems);
                    console.log(body);
                    var limitControl = body.totalItems;
                    if (body.totalItems > 200) {limitControl = Math.floor(body.totalItems/4)}
                    setTotalElementsCount(limitControl);
                    setPagesCount(Math.ceil(body.totalItems / elementsPerPage));
                    } else {
                    setResult([])
                    };
            }
            catch(error) {
                setError(true);
              };
            };
            bookSearchApi5();
          };
      }, [])


// Gestion du tri nouveautés et pertinence
    const menu = (
        <Menu onClick={handleMenuClick} selectedKeys={selectedMenu} defaultSelectedKeys="1" >
          <Menu.Item key="1">Pertinence</Menu.Item>
          <Menu.Item key="2" >Date de publication</Menu.Item>
        </Menu>
      );

    function handleMenuClick(e) {
        if (e.key === "2") {
            var bookSearchApi2 = async() => {
                setIsFetching(true);
            try {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=newest&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                if (body.totalItems !== 0) {
                    var filtered = body.items.filter(book => book.volumeInfo.industryIdentifiers !== undefined);
                    var filtered2 = [];
                    for (let i = 0; i < filtered.length; i++) {
                        for (let j = 0; j < filtered[i].volumeInfo.industryIdentifiers.length; j++) {
                          var sorted =  filtered[i].volumeInfo.industryIdentifiers.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
                            if (sorted[j].type === "ISBN_13") {
        
                                filtered2.push(filtered[i])
                            }
                        }
                    };
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
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=frorderBy=relevance&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                setIsFetching(false);
                if (body.totalItems !== 0) {
                    var filtered = body.items.filter(book => book.volumeInfo.industryIdentifiers !== undefined);
                    var filtered2 = [];
                    for (let i = 0; i < filtered.length; i++) {
                        for (let j = 0; j < filtered[i].volumeInfo.industryIdentifiers.length; j++) {
                          var sorted =  filtered[i].volumeInfo.industryIdentifiers.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
                            if (sorted[j].type === "ISBN_13") {
        
                                filtered2.push(filtered[i])
                            }
                        }
                    };
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



// Gestion de la pagination
    var handlePageClick = (pageNumber) => {
        const currentPage = pageNumber - 1;
        offset = currentPage * elementsPerPage;
        var bookSearchApi4 = async() => {
            setIsFetching(true);
        try {
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&fields=items(id,volumeInfo/title,volumeInfo/imageLinks),totalItems&startIndex=${offset}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)     
            const body = await data.json();
            setIsFetching(false);
            if (body.totalItems !== 0) {
                var filtered = body.items.filter(book => book.volumeInfo.industryIdentifiers !== undefined);
                var filtered2 = [];
                for (let i = 0; i < filtered.length; i++) {
                    for (let j = 0; j < filtered[i].volumeInfo.industryIdentifiers.length; j++) {
                      var sorted =  filtered[i].volumeInfo.industryIdentifiers.sort((a,b) => (a.type < b.type) ? 1 : ((b.type < a.type) ? -1 : 0));
                        if (sorted[j].type === "ISBN_13") {
    
                            filtered2.push(filtered[i])
                        }
                    }
                };
                setResult(body.items);
                } else {
                setResult([])
                };
            console.log(data);
            console.log(body);
        }
        catch(error) {
            setError(true);
            };
        };
        bookSearchApi4();
    }


// Gestion de l'autocomplete
    var handleInputChange = (value) => {
        setValue(value);
        if (value && value.length > 2) {
            if (value.length % 2 === 0) {
                setOpen(true)
                var searchSuggest = async() => {
                    try {
                        const data = await fetch(`https://corsanywhere.herokuapp.com/https://google.com/complete/search?output=toolbar&hl=fr&ds=bo&client=chrome&gl=fr&q=${value}`)
                        const body = await data.json();
                        var res = body[1].map(item => ({'value':item, 'label':item}));
                        setSuggestData(res);

                        console.log("suggest",body[1])
                    } catch(error) {
                        setError(true);
                        };
                };
                searchSuggest();
            }
        };
                    
    }

return (
<div className="font">
    <Nav/>
        <div style={styles.container} >
        <Row style={styles.bookBloc} >
            <Col xs={24} md={12} >
                <h1 style={styles.h1}>Rechercher votre prochain livre</h1>
                <AutoComplete  options={suggestData} style={{ width: "100%" }}open={open}>
                <Search size="large" placeholder={value ? value :"Chercher un auteur, titre, ISBN, ..."} onChange={(e) => handleInputChange(e.target.value)} onSearch={(q) => {handleSearch(q); setOpen(false)}} value={value}  />
                </AutoComplete>
            </Col>
        </Row>

        <div style={{ width:"80%", margin:"auto", border:1}}>
        {isFetching ? spin : null }
        {count === 0 && 
            <div style={{display:'flex', justifyContent:'center', paddingTop:'50px',paddingBottom:'50px'}}>
                <img src={review} alt='Illustration by Olha Khomich from Icons8' style={{height:'300px'}}/>
            </div>
        }

            {count !== 0  && 
                <div>

                    {(query === "" || totalItems === 0 || error)  
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

                                <div style={{display:'flex', flexWrap:"wrap" ,justifyContent: "center", marginTop:"10px"}}>
                                        
                                    {
                                        result.map((book,i) => (

                                            <BookCard bookId={book.id} bookTitle={book.volumeInfo.title} bookCover={!book.volumeInfo.imageLinks ? Unavailable : book.volumeInfo.imageLinks.thumbnail}/>
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
                                            style={{marginBottom:"30px"}}
                                        />
                                    </div>
                            }
                        </div>
                    }
                </div> 
            }
        </div>
    </div>
    <Footer/>
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
        borderRadius:"10px",
        marginTop:"10px",
        padding:'20px',
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
  function mapStateToProps(state) {
    return { user: state.user }
  }
  export default connect(mapStateToProps, null)(SearchScreen);