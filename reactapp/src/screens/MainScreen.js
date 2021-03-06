import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
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
import Skeleton from '@material-ui/lab/Skeleton';
import Background from '../assets/picto.png'

import MyLibrary from '../components/MyLibrary'
import MyWishlist from '../components/MyWishlist'

import '../components/BookHeader'
import '../App.css';

import Nav from '../components/Navbar';
import BookList from '../components/BookList';

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
              
                                    
function MainScreen(props) {

    const classes = useStyles();

    const handleChange = (event, newValue) => {
    props.onTabClick(newValue);
    };

    const [cookies, setCookie] = useCookies(['survey']);
    const [countWL, setCountWL] = useState(0);
    const [countLB, setCountLB] = useState(0);

    const [data, setData] = useState(undefined);
    const [assocData, setAssocData] = useState([]);
    const [wishData, setWishData] = useState([]);

    //Définition de la variable query, qui stocke le sous-objet {Styles} s'il existe, qui résume les résultats de Styles du Survey
    //exemple de query : 
    //{"void": [],
    //"BD & Jeunesse": ["BD, Comics","Manga","Livre jeunesse"],
    //"Littérature & Fiction": ["Fantasy, Science Fiction"],
    //"Savoirs": ["Entreprise, Management"]}

    var query = cookies.survey!==undefined&&cookies.survey.Styles;

    console.log('query?', query);

    if(cookies.token){

        console.log("main> cookies token", cookies.token);
        console.log("main> cookies library", cookies.library);
        console.log("main> cookies", cookies);
       
        var libIds = cookies.library.map((book)=> book.bookid);

        var libTitles = cookies.library.map((book)=> `Parce que vous avez lu  « ${book.title} »...`);
    
        var wishIds = cookies.wishlist.map((book)=> book.bookid);
    
        var wishTitles = cookies.wishlist.map((book)=> `Parce que « ${book.title} » vous intéresse...`);

    }

  useEffect(  ()=>{

    //-------------------------------------------------------------------------------------------------------------------------------

    // Objectif : récupérer les résultats de suggestions en back end, à partir des réponses au survey, stocké dans la variable query.
    // Entrée : variable query
    // Sortie: Objet contenant les résultats structurés dans un objet de la façon suivante:
    // //{"BD & Jeunesse": {
    //    "BD, Comics" : Array(5),
    //    "Manga": Array(5),
    //    "Livre jeunesse" : Array(5)
    //},
    //"Littérature & Fiction": {
    //    "Fantasy, Science Fiction" : Array(5)
    //}}
    //Les résultats de la requêtes google books par sous catégories sont stockées dans un Array
    // ---> La sortie est stockées dans l'état data



            async function dataQuery(){

                const rawResponse = await fetch('/recos', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(query)
                    });

                var response = await rawResponse.json();

                console.log('response?', response);
            
                setData(response.result);

            }

    // ---> La fonction dataQuery n'est lancée que si et seulement si l'utilisateur possède un survey dans ses cookies, il n'est donc pas obligé d'être connecté (et donc avoir un token)

            cookies.survey!==undefined&&dataQuery();

    //-------------------------------------------------------------------------------------------------------------------------------

    // Objectif : récupérer les livres associés (requête /associated de goole books) d'une liste de livre, pour faire des suggestions de type : "Parce que vous avez lu..."
    // Entrée : un Array de livres (wishlist ou library) ---> ["jNJ-BgAAQBAJ","rSVTDwAAQBAJ","w55f46q8cFcC","0othDwAAQBAJ","bsJYDwAAQBAJ","VgmiDwAAQBAJ","USunCgAAQBAJ"]
    // Sortie: un Array d'Array --->[Array(5),Array(10),Array(2),null,Array(1),Array(3),null]
    // ---> La sortie est stockées dans l'état AssocData ou WishData, selon le seteur en entrée

            async function associatedBooks(libraryIds, setState){

                const rawResponse = await fetch('/associated-reads', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(libraryIds)
                    });
    
                var response = await rawResponse.json();

                console.log('input fetch', libraryIds);
    
                console.log('response fetch', response);
             
                setState(response.result);

            }

    // ---> La fonction associatedBooks n'est lancée que si et seulement si l'utilisateur est connecté et donc possède un token)


            cookies.token!==undefined&&associatedBooks(libIds, setAssocData);

            cookies.token!==undefined&&associatedBooks(wishIds, setWishData);

    //-------------------------------------------------------------------------------------------------------------------------------

  },[]);

  useEffect(()=>{
      setCountWL(props.wishlist.length);
      setCountLB(props.library.length);
  },[props.library, props.wishlist])


    const suggest = []

    

    for (const cat in data) {
        var bloc = [];
        for (const subcat in data[cat]){
            bloc.push(
            <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                <BookList skeleton={false} bookListTitle={data[cat][subcat].map(e=>subcat)} data={data[cat][subcat]} />
            </Grid>
            )
        }
        suggest.push(
                <Grid item xs={12} className='font'>
                    <h3 style={styles.h3}>{cat}</h3>
                </Grid>
            )
        suggest.push(bloc);
    }

    function BookSkeleton (){
        return(
            <div>
            <Grid xs={12} container>
                <Grid item xs={12}>
                    <Skeleton variant="text" style={{width:"200px", marginLeft:"50px"}} />
                </Grid>
                <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                    <BookList skeleton={true} data={[]}/>
                </Grid>
            </Grid>
            <Grid xs={12} container>
                <Grid item xs={12}>
                    <Skeleton variant="text" style={{width:"200px", marginLeft:"50px"}} />
                </Grid>
                <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                    <BookList skeleton={true} data={[]}/>
                </Grid>
            </Grid>
            </div>
            
        );
    }

     
  return (

    <div>
        <Nav />
        <Grid container spacing={0}   direction="column" justify="center" alignItems="center" style={styles.container} className='font'>
        {cookies.token?<Grid container xs={12} style={{width:'80%', 
                                            backgroundColor:'#23396C', 
                                            borderTopRightRadius:"10px",
                                            borderTopLeftRadius:"10px", 
                                            backgroundImage: `url(${Background})`, 
                                            backgroundSize: '15%',
                                            backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right bottom',}}>
                    <Grid container xs={2} direction="column" justify="center" alignItems="center">
                        <img style={styles.images} width={120} height={120} src={cookies.token?cookies.avatar:Background} alt={'bookpicture'}/> 
                    </Grid>
                    <Grid container xs={4} width="100%" direction="column" justify="center" alignItems="flex-start">
                        <Grid container xs={6} direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <h2 style={styles.note}>Livres à lire</h2>
                            </Grid>
                            <Grid item>
                                <h2 style={styles.h2}>{countWL}</h2>
                            </Grid>
                            <Grid item>
                                <h2 style={styles.note}>Livres dans la biliothèque</h2>
                            </Grid>
                            <Grid item>
                                <h2 style={styles.h2}>{countLB}</h2>
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>:null}
            <Grid item xs={12} style={{width:'80%'}}>
                <Paper elevation={0} className={classes.root}>
                        <Tabs
                            value={props.value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label={<span className='font' style={{textTransform:'capitalize', fontSize:"18px"}}>Suggestions</span>} {...a11yProps(0)} />
                            <Tab label={<span className='font' style={{textTransform:'capitalize', fontSize:"18px"}}>Bibliothèque</span>}  {...a11yProps(1)} />
                            <Tab label={<span className='font' style={{textTransform:'capitalize', fontSize:"18px"}}>Liste d'envies</span>} {...a11yProps(2)} />
                        </Tabs>
                </Paper>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={props.value} index={0}>
                        <div style={styles.libraryBloc}>
                            {data?suggest:<BookSkeleton />}
                        </div>
                        <div style={styles.libraryBloc}>
                            <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                                {libTitles===undefined?null:<BookList skeleton={false} bookListTitle={(libTitles||[])} data={assocData} />}
                            </Grid>
                        </div>
                        <div style={styles.libraryBloc}>
                            <Grid item xs={12} style={{width:'100%' , display:'flex', justifyContent:'center'}}>
                                {wishTitles===undefined?null:<BookList skeleton={false} bookListTitle={(wishTitles||0)} data={wishData} />}
                            </Grid>
                        </div>    
                </TabPanel>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={props.value} index={1}>
                    <MyLibrary />
                    {cookies.token?null:<Redirect to="/create-account" />}
                </TabPanel>
            </Grid>
            <Grid item xs={12} direction="column" justify="center" alignItems="center" style={{width:'80%', backgroundColor:"white"}}>
                <TabPanel value={props.value} index={2}>
                    <MyWishlist />
                    {cookies.token?null:<Redirect to="/create-account" />}
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
        paddingTop: '10px',
        paddingBottom: '50px',
    },

    libraryBloc: {
        backgroundColor: 'white',
    },


    h3: {
        color:"#23396C",
        fontSize: "16px",
        fontWeight: "500",
        margin: "0px",
        paddingBottom:"10px",
        paddingTop:"10px",
        marginLeft:"50px"
      },

    images: {
        borderRadius:100,
        boxShadow: "1px 1px 1px #e1e1e1",
        marginTop: "20px",
        marginBottom: "20px",
      },

    
    h1: {
        color:'white',
        fontSize: '22px',
        fontWeight: '700',
        margin: '0px',
        paddingTop:'10px',
        paddingBottom:'10px',
    },

    h2: {
        color:'#ffffff',
        fontSize: '16px',
        fontWeight: '400',
        margin: '0px',
        paddingBottom:'10px',
    },

    note: {
        color:'#ffffff',
        fontSize: '12px',
        fontWeight: '200',
    }
}


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));


function mapStateToProps(state) {
    return { value: state.mainTab, user: state.user, wishlist: state.wishlist, library: state.library }
  }

  function mapDispatchToProps(dispatch) {
    return {
      onTabClick: function(value) {
        dispatch( {type:'setTab', value} )
    }
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(MainScreen);
