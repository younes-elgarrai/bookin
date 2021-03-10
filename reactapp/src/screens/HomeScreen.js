import React from 'react';
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom';
import '../App.css';
import '../components/Navbar.css'
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import { Button } from 'antd';
import library from '../assets/library.png';
import account from '../assets/account.png';
import reading from '../assets/reading.png';
import review from '../assets/review.png';

import { BulbFilled, HeartFilled,  BookFilled } from '@ant-design/icons';

function HomeScreen(props) {

  console.log('HomeScreen > props.token', props.token);
  const [cookies, setCookie] = useCookies(['survey']);
  console.log('cookie survey', cookies.survey);
  

  return (
    <div className="font">
      <Nav/>
      <div style={styles.container}>
        <div className="row pt-2 pr-5 pl-5">
          <div className="order-2 order-md-1 col-12 col-md-6">
            <h3 style={styles.title}>bookin trouve vos prochains livres préférés et vous permet de gérer votre bibliothèque.</h3>
            <Button style={styles.btn}><Link to={cookies.survey ? '/main' : '/survey'}>Commencer</Link></Button>
            <div>
            <p style={styles.labelInline}>Vous avez déjà un compte ? </p> 
            <Button type='link' style={styles.smallBtn}><Link to='/connection/'>Connectez-vous</Link></Button>
            </div>
            <h3 style={styles.titleSmall}>Découvrez toutes les fonctionnalités :</h3>
            <div style={styles.features}>
              <div style={styles.featureSmall}>
                <img src={account} width={100} alt='account' />
                <p style={styles.label}><BookFilled style={{color:'#FCA311', fontSize:'18px'}} /> Ajoutez des livres à votre bibliothèque virtuelle</p>
            </div>
            <div style={styles.featureSmall}>
            <img src={reading} width={100} alt='reading' />
            <p style={styles.label}><BulbFilled style={{color:'#FCA311', fontSize:'18px'}} /> Découvrez des suggestions de lecture personnalisées</p>
            </div>
            <div style={styles.featureSmall}>
            <img src={review} width={100} alt='review'/>
           <p style={styles.label}><HeartFilled style={{color:'#FCA311', fontSize:'18px'}}/> Enregistrez et partagez vos coups de coeur</p>
           </div>
           </div>
           </div>
      <div className="order-1 order-md-2 col-12 col-md-6"><img src={library} alt='library' style={styles.image} /></div>
    </div>
    </div>
    <Footer />
    </div>
  );
}
const styles = {
  container: {
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      width:'100%',
      backgroundColor:'#f3f5f7',
      padding:'20px',
      margin: 'auto',
      },
  title: {
      color:"#23396C",
      fontSize: "36px",
      fontWeight: "500",
      marginTop: "20px",
      paddingBottom:"10px"
  },
  titleSmall: {
    color:"#23396C",
    fontSize: "24px",
    fontWeight: "500",
    marginTop: "20px",
    paddingBottom:"10px"
},
  label: {
      color:'#000000',
      fontSize:'14px',
      marginTop:'20px',
      marginBottom:'10px',
      textAlign:'left'
  },
  labelInline: {
    display:'inline',
    color:'#000000',
    fontSize:'14px',
    marginTop:'20px',
    marginBottom:'10px'
  },
  smallLabel:{
      color:'#000000',
      fontSize:'10px',
      marginTop:'5px',
      marginBottom:'10px'
    },
  btn: {
      marginRight:'10px',
      backgroundColor:'#fca311', 
      fontWeight:'500', 
      color:'#23396c', 
      borderColor:'#fca311', 
      borderRadius:'5px',
  },
  smallBtn:{
      display:'inline',
      color:'#23396c',
      fontSize:'12px',
      fontWeight:'bold',
      marginTop:'5px',
      marginBottom:'10px',
      padding:'5px'
  },
   features:{
     display:'flex',
     flexDirection:'row',
     justifyContent:'flex-start',
     alignItems:'center'
   },
   featureSmall:{
     width:'25%',
     marginRight:'40px'
   },
   image:{
     width:'100%',
   }
}
function mapStateToProps(state) {
  return { token: state.token }
}
export default connect(mapStateToProps, null)(HomeScreen);