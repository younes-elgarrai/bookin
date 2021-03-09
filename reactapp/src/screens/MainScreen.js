import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { Layout, Row, Col} from 'antd';

import '../components/BookHeader'
import '../App.css';

import Nav from '../components/Navbar';
import Review from '../components/Reviews';
import BookList from '../components/BookList';

import subjects from '../assets/subjects';


const {Content} = Layout;


var voidSubj = {'BD & Jeunesse': {
                    'BD, Comics': [],
                    'Manga':[],
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
                                    

function MainScreen() {

    

    const [cookies, setCookie] = useCookies(['survey']);

    const [data, setData] = useState(voidSubj);

    var query = cookies.survey!==undefined&&queryMaker(cookies.survey.Styles);


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

        cookies.survey!==undefined&&dataQuery();
   
  },[]);


    console.log(data);

    const suggest = []

    for (const cat in data) {

        var bloc = [];

        for (const subcat in data[cat]){
            bloc.push(
            <Row style={{width:'100%' , display:'flex', justifyContent:'center'}}>
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
        {cookies.survey===undefined&&<Redirect to="/survey" />}
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
