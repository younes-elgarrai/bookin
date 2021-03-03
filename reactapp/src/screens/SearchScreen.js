import React, {useState} from 'react';
import { Card, Menu, Dropdown, Input, Row, Col, Button} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
// import Navbar from '../components/Navbar.js'
// cas 0
// image pas dispo
// pagination
// titre
// tri nouveautés

const { Search } = Input;
const { Meta } = Card;

export default function SearchScreen() {


    const [result, setResult] = useState([]);
    const [sortingMethod, setSortingMethod] = useState("relevance");

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1">Pertinence</Menu.Item>
          <Menu.Item key="2">Date de publication</Menu.Item>
        </Menu>
      );

    function handleMenuClick(e) {
        if (e.key === "2") {
            setSortingMethod("newest");
            bookSearchApi();
        }
      }

    const bookSearchApi = async(query) => {
        const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&langRestrict=fr&orderBy=${sortingMethod}&apiKey=AIzaSyBDzd4vX9LAeML4Hsway4y63xn2ReLuPOc`)
        const body = await data.json();
        setResult(body.items);
        console.log(body.items);
      };  

return (
<div style={{ width:"80%", margin:"auto"}}>
    <Row className="searchInput"  align="middle" justify="center">
        <Col xs={24} md={6} style={styles.textAlign}>
            <div >Votre Recherche</div>
        </Col>
        <Col xs={24} md={12} >
            <Search size="large" placeholder="Chercher un auteur, titre, ISBN, ..." onSearch={(e) => bookSearchApi(e)} />
        </Col>
    </Row>
    <Row align="middle" justify="space-between" style={{marginTop:20}}>
        <div>{result.length} Livres trouvés</div>
        <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
                Trier par <DownOutlined  />
            </Button>
        </Dropdown>
    </Row>
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
</div>

)}

let styles ={ 
    textAlign: {
        textAlign: "right",
        padding:"10px"
    }
}