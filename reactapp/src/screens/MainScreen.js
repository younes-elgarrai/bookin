import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';
import Nav from '../components/Navbar';

import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo';
import Review from '../components/Review';
import BookList from '../components/BookList';

import subjects from '../assets/subjects';


const {Content} = Layout;


var voidSubj = {'BD & Jeunesse': {
                    'BD, Comics, Manga' : [],
                    'Humour' : [],
                    'Livre jeunesse' : []
},
                'Littérature & Fiction': { 
                    'Roman' : [],
                    'Poésie & théatre' : [],
                    'Thriller, Roman Policier' : [],
                    'Fantasy, Science Fiction' : []

                    },
                'Vie Pratique':{
                    'Cuisine': [],
                    'Self Help' : [], 
                    'Santé, Bien être' : [], 
                    'Loisirs Créatifs': []
                    }, 
                'Art, Culture & Société':{
                    'Actualités Politique, Economie, Société' : [], 
                    'Art, Cinema, Musique': [],
                    'Biographie, Autobiographie' : [],
                    'Histoire' : [],
                    'Religion & Spiritualité' : [],
                    'Sciences Humaines' : []
                    }, 
                'Nature & Loisirs':{
                    'Nature, Animaux, Jardin' : [],
                    'Sport, Loisirs, Transport': [],
                    'Tourisme & Voyage' : [],
                    }, 
                'Savoirs':{
                    'Droit' : [], 
                    'Entreprise, Management' : [],
                    'Livres informatique' : [],
                    'Science & Médecine' : []
                }};



var catQueryMaker = (cat, styles)=>{
  
            var r = {};
            styles[cat].forEach( (subcat)=>{
                r[subcat] = subjects[cat][subcat];
                 });
            return r;

};

var queryMaker = (styles) => {

            var cats = Object.keys(styles).filter(e=>e!=='void');

            var queries = cats.map( cat => {
                return catQueryMaker(cat, styles);
            })

            var r = {}
            for (var i = 0; i < cats.length; i++) {
                r[cats[i]] = queries[i];}
            
            return r; };
                                    



var handleSearch = async (q) => {

    try {
        const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=5&langRestrict=fr&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyCf_Mpql10SDNH98u0oNNYZuS7RzPqJ62k`)
        const body = await data.json();
        const volumeInfos = await body.items.map((elem, index)=>{
            return elem.volumeInfo;
        })               
        return volumeInfos ;
    }
    catch(error) {
        console.log(error)
      }};






function MainScreen() {

    

    const [cookies, setCookie] = useCookies(['survey']);

    const [data, setData] = useState(voidSubj);

    var query = queryMaker(cookies.survey.Styles);


  useEffect(  ()=>{


            async function dataQuery(){

            const rawResponse = await fetch('/recos', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(query)
                });

            var response = await rawResponse.json();

            console.log(response);
         
            setData(response.result);

        }

            dataQuery();
   
  },[]);


    console.log(data);

    const suggest = []

    for (const cat in data) {

        var bloc = [];

        for (const subcat in data[cat]){
            bloc.push(
            <Row>
                <BookList bookListTitle={subcat} data={data[cat][subcat]} />
            </Row>
            )
        }
    
        suggest.push(
            <Row>
                <Col xs={24}>
                    <h3 style={styles.h3}>{cat}</h3>
                </Col>
            </Row>
            )

        suggest.push(bloc);
    }
  
    
  return (

    <div>
        <Nav />
        <Content style={styles.container}>
            <div style={styles.libraryBloc}>
                {suggest}
            </div>      
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
        width:'100%',
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

export default MainScreen;
