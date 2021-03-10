import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import '../components/BookHeader'
import '../App.css';

import Nav from '../components/Navbar';
import Review from '../components/Reviews';
import BookList from '../components/BookList';

import subjects from '../assets/subjects';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      width: '100%',
      color: theme.palette.text.secondary,
    },
  }));
  


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


            function TabPanel(props) {
                const { children, value, index, ...other } = props;
              
                return (
                  <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`simple-tabpanel-${index}`}
                    aria-labelledby={`simple-tab-${index}`}
                    {...other}
                  >
                    {value === index && (
                      <Box p={3}>
                        {children}
                      </Box>
                    )}
                  </div>
                );
              }
              
              TabPanel.propTypes = {
                children: PropTypes.node,
                index: PropTypes.any.isRequired,
                value: PropTypes.any.isRequired,
              };


              function a11yProps(index) {
                return {
                  id: `simple-tab-${index}`,
                  'aria-controls': `simple-tabpanel-${index}`,
                };
              }
              
                                    

function MainScreen() {


    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

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


    const suggest = []

    for (const cat in data) {
        var bloc = [];
        for (const subcat in data[cat]){
            bloc.push(
            <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                <BookList bookListTitle={subcat} data={data[cat][subcat]} />
            </Grid>
            )
        }
        suggest.push(
                <Grid item xs={12}>
                    <h3 style={styles.h3}>{cat}</h3>
                </Grid>
            )
        suggest.push(bloc);
    }
     
  return (

    <div>
        <Nav />
        <Grid container spacing={0}   direction="column" justify="center" alignItems="center" style={styles.container}>
            <Grid item xs={12} style={{width:'80%'}}>
                <Paper elevation={0} className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Recos" {...a11yProps(0)} />
                            <Tab label="Bibliothèque" {...a11yProps(1)} />
                            <Tab label="Wishlist" {...a11yProps(2)} />
                        </Tabs>
                </Paper>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={value} index={0}>
                        <div style={styles.libraryBloc}>
                            {suggest}
                        </div> 
                </TabPanel>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Grid>
        </Grid>
        <Footer/>
        {cookies.survey===undefined&&<Redirect to="/survey" />}
    </div>

    );
}

let styles = {
    container: {
        backgroundColor:'#f3f5f7',
    },

    libraryBloc: {
        backgroundColor: 'white',
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
