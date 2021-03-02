import React, {useState, useEffect} from 'react';
import { Card, Menu, Dropdown, Input, Row, Col, Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import '../App.css'

// pagination / lazy loading
// image pas dispo
// composant vignette
// tri nouveautés icone clic
// mettre en loader sur le chargement de l'API


const { Search } = Input;
const { Meta } = Card;

export default function SearchScreen() {

    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const [count, setCount] = useState(0);

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">Pertinence</Menu.Item>
          <Menu.Item key="2">Date de publication</Menu.Item>
        </Menu>
      );

    var handleSearch = (q) => {
        var bookSearchApi = async() => {
            const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
            const body = await data.json();
            setResult(body.items);
            console.log(body.items);
        };
        bookSearchApi();
    };


    function handleMenuClick(e) {
        if (e.key === "2") {
            var bookSearchApi2 = async() => {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=newest&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
                const body = await data.json();
                setResult(body.items);
                console.log(body.items);
            };
            bookSearchApi2();
        } else { 
            var bookSearchApi3 = async() => {
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=relevance&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
                const body = await data.json();
                setResult(body.items);
                console.log(body.items);
            };
            bookSearchApi3();
        }
    };

return (
<div className="font">
    <Nav/>
    <div style={{ width:"90%", margin:"auto"}}>
        <Row className="searchInput"  align="middle" justify="center">
            <Col xs={24} md={6} style={styles.textAlign}>
                <div >Votre Recherche</div>
            </Col>
            <Col xs={24} md={12} >
                <Search size="large" placeholder="Chercher un auteur, titre, ISBN, ..." onSearch={(q) => {handleSearch(q); setQuery(q); setCount(+1)}} />
            </Col>
        </Row>

        {count === 0 ? null : 
        <div>
        
        {query === ""  ? <div style={{textAlign:"center", marginTop:30}}> Aucun résultat :( essayer de formuler votre recherche </div> : 
        <div> 
            
        {result.length === 0 ? null : <div> 
            <Row align="middle" justify="space-between" style={{marginTop:30}}>
                <div>{result.length} Livres trouvés</div>
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
                                        src={!book.volumeInfo.imageLinks ? "../logo192.png" : book.volumeInfo.imageLinks.thumbnail} 
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
                ))}
            </div>
        </div>}
        </div> }
    </div>
</div>
)}

let styles ={ 
    textAlign: {
        textAlign: "right",
        padding:"10px"
    }
}