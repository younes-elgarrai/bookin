import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { Avatar, Layout, Row, Col} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../components/BookHeader'
import '../App.css';
import Nav from '../components/Navbar';

import BookHeader from '../components/BookHeader';
import BookInfo from '../components/BookInfo'
import Review from '../components/Review'
import BookList from '../components/BookList'



const {Content} = Layout;


var subjects = {'BD & Jeunesse': {
                    'BD, Comics, Manga' : 'subject%3A"Comics+%26+Graphic Novels"',
                    'Humour' : 'subject%3A"Humour"',
                    'Livre jeunesse' : 'subject%3A"Juvenile+Fiction"',
                    'Livre Ados / Young Adults' : 'subject%3A"Young+Adults+Fiction" OR subject%3A"Young+Adults+nonfiction"'
                    }, 
                'Littérature & Fiction': { 
                    'Roman' : 'subject%3A"Fiction" OR subject%3A"LITERARY+COLLECTIONS"',
                    'Poésie & théatre' : 'subject%3A"Poetry" OR subject%3A"Drama"',
                    'Thriller, Roman Policier' : 'subject%3A"Thriller" OR subject%3A"Roman =+policier"',
                    'Fantasy, Science Fiction' : 'subject%3A"Fantasy" OR subject%3A"science+fiction"'

                    },
                'Vie Pratique':{
                    'Cuisine': 'subject%3A"Cooking" OR subject%3A"Cuisine"',
                    'Self Help' : 'subject%3A"Self Help"', 
                    'Santé, Bien être' : 'subject%3A"HEALTH & FITNESS" OR subject%3A"BODY+MIND+%26+SPIRIT" OR subject%3A"FAMILY+%26+RELATIONSHIPS"', 
                    'Loisirs Créatifs': 'subject%3A"CRAFTS+%26+HOBBIES"'
                    }, 
                'Art, Culture & Société':{
                    'Actualités Politique, Economie, Société' : 'subject%3A"BUSINESS+%26+ECONOMICS" OR subject%3A"POLITICAL+SCIENCE" OR subject;"SOCIAL+SCIENCE"', 
                    'Art, Cinema, Musique': 'subject%3A"ART" OR subject%3A"LANGUAGE ARTS+%26+DISCIPLINES" OR subject%3A"PERFORMING+ARTS" OR subject%3A"PHOTOGRAPHY" OR subject%3A"MUSIC"',
                    'Biographie, Autobiographie' : 'subject%3A"BIOGRAPHY+%26+AUTOBIOGRAPHY"',
                    'Histoire' : 'subject%3A"HISTORY"',
                    'Religion & Spiritualité' : 'subject%3A"RELIGION"',
                    'Sciences Humaines' : 'subject%3A"SOCIAL SCIENCE" OR subject%3A"PSYCHOLOGY" OR subject%3A"PHILOSOPHY"'
                    }, 
                'Nature & Loisirs':{
                    'Nature, Animaux, Jardin' : 'subject%3A"NATURE" OR subject%3A"PETS" OR subject%3A"GARDENING"',
                    'Sport, Loisirs, Transport': 'subject%3A"SPORTS+%26+RECREATION" OR subject%3A"TRANSPORTATION"',
                    'Tourisme & Voyage' : 'subject%3A"TRAVEL"',
                    }, 
                'Savoirs':{
                    'Droit' : 'subject%3A"Law"', 
                    'Entreprise, Management' : 'subject%3A"Business+%26+Economics"',
                    'Livres informatique' : 'subject%3A"Computers"',
                    'Science & Médecine' : 'subject%3A"Science" OR subject%3A"Medical"'
                }};


var mainSubjects = Object.keys(subjects);

var mainSubjectsQueries = Object.values(subjects).map((obj, index)=>{
                                                            return Object.values(obj);})
                                                 .map((array,index)=>{
                                                            return array.reduce((a,b)=> {return a+" OR "+b})
                                                 });

var catQueryMaker = (cat, styles)=>{

            return styles[cat].map( (subcat)=>{
                    return subjects[cat][subcat];
            });
};

var queryMaker = (styles) => {

            var cats = Object.keys(styles).filter(e=>e!=='void');

            var queries = cats.map( cat => {
                return catQueryMaker(cat, styles).reduce((a,b)=>{return a +" OR "+b});
            })

            var r = {}
            for (var i = 0; i < cats.length; i++) {
                r[cats[i]] = queries[i];}
            
            return r; };
                                    



var handleSearch = async (q) => {

    try {
        const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${q}&maxResults=5&langRestrict=fr&orderBy=relevance&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
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

    const [data, setData] = useState({});

    var queries = queryMaker(cookies.survey.Styles);

    var handleMultipleSearch = async (queries) => {

        var results = {};

        var cats = Object.keys(queries);

        for (var i = 0; i < cats.length; i++) {

            try {
                console.log(cats[i]);
                const data = await fetch(`https://books.googleapis.com/books/v1/volumes?q=${queries[cats[i]]}&maxResults=10&langRestrict=fr&orderBy=newest&fields=items,totalItems&apiKey=AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE`)
                const body = await data.json();
                const volumeInfos = await body.items.map((elem, index)=>{
                    return elem.volumeInfo;
                })
                results[cats[i]] = await volumeInfos;               
            }
            catch(error) {
                console.log(error)
              }
        };

        console.log(queries);

        return results;
    }



  useEffect(  ()=>{
      
    (async ()=>{setData(await handleMultipleSearch(queries));})()}
    
    ,[]);

    
  return (
    <div>
        <Nav />
        <Content style={styles.container}>
                <BookHeader/>
            <div style={styles.libraryBloc}>
                {Object.keys(data).map((elem,index)=>{
                    console.log(data[elem]);
                    return  <Row>
                                <BookList bookListTitle={elem} data={data[elem]}/>
                            </Row>

                })}
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
