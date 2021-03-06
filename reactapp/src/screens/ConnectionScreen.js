import React, {useState} from 'react';
import {Redirect, Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css';
import { Input,  Button} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import reading from '../assets/reading.png';
import {connect} from 'react-redux';

function ConnectionScreen(props) {

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ cookies, setCookie, removeCookie ] = useCookies(['survey','token','avatar', 'library', 'wishlist']);
    const [ userMessage, setUserMessage ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const checkEmailFormat = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email ? re.test(String(email).toLowerCase()) : false;
    }
    const checkPasswordToLogin = async () => {
        if (!checkEmailFormat(email)) {
            setUserMessage('veuillez saisir un email valide.'); 
        } else {
        const response = await fetch('/log-in', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        const dataResponse = await response.json(); // {login: true, userToken: "N9mwAoACDrKevTGj7aV8zZqKbLhRC2Qs"}

        if (dataResponse.login) {
            
            props.onCheckAccountClick({token : dataResponse.userToken, avatar: dataResponse.userAvatar});
            setCookie('survey', JSON.stringify({'Length':dataResponse.userLength, 'Period': dataResponse.userPeriod, 'Styles':dataResponse.userStyles}), {path: '/'});
            setCookie('token', dataResponse.userToken, {path: '/'});

            setCookie('avatar', dataResponse.userAvatar, {path: '/'});
            setCookie('wishlist',JSON.stringify(dataResponse.userWishlist),{path: '/'});
            setCookie('library',JSON.stringify(dataResponse.userLibrary),{path: '/'});
            setIsLoggedIn(true);
        } else {
            setUserMessage(dataResponse.message);
        }
    }       
}




    if (isLoggedIn) {
        return (
            <div>
                {!props.previousLocation
                    ? <Redirect to={{pathname:'/main'}}/>
                    : <Redirect to={{pathname:props.previousLocation.slice(0,props.previousLocation.length - 5), state: { referrer: "account" }}}/>
                }
            </div>
            )
    } else {
    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
              <h3 style={styles.title}>Connexion</h3>
              <p style={styles.label}>En étant membre de la communauté Bookin, vous pouvez sauvegarder des livres dans votre bibliothèque et dans votre liste d'envies.</p>
              <div>
                  <p style={styles.labelInline}>Vous n'avez pas encore de compte ?  </p> 
                  <Button type='link' style={styles.smallBtn}><Link to='/create-account'>Créez un compte</Link></Button>
            </div>   
            <div className="row justify-content-center align-items-center">
            <div className="order-2 order-md-1 col-11 offset-1 col-md-4 offset-md-2">
              <p style={styles.label}>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com" prefix={<MailOutlined className="site-form-item-icon" />} onChange={(e)=>setEmail(e.target.value)} value={email} style={{width:'90%'}}></Input>
              <p style={styles.label}>Saisissez votre mot de passe : </p>
                <Input.Password placeholder="mot de passe" prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e)=> setPassword(e.target.value)} iconRender={visible=>(visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} style={{width:'90%'}}></Input.Password>
  
                <div>
                <Button type='link' style={styles.smallBtn} onClick={()=> console.log("click")}>mot de passe oublié ?</Button>
                </div>
                <p style={styles.userMsg}>{userMessage}</p>
                <Button style={styles.btn} onClick={()=> checkPasswordToLogin()}>Se connecter</Button>
                <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            <div className="order-1 order-md-2 col-4 col-md-6">
            <img src={reading} alt='Illustration by Olha Khomich from Icons8' style={styles.image}  />
            </div>
            </div>
        </div>
        <Footer/>
        </div>
      );
    }}

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
        fontSize: "24px",
        fontWeight: "500",
        paddingBottom:"10px"
    },
    label: {
        color:'#000000',
        fontSize:'14px',
        marginTop:'20px',
        marginBottom:'10px'
    },
    smallLabel:{
        color:'#000000',
        fontSize:'10px',
        marginTop:'40px',
        marginBottom:'10px'
      },
    userMsg: {
        color:"#fca311",
        fontSize:'14px',
        fontWeight:'bold',
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
        color:'#23396c',
        fontSize:'12px',
        padding:0,
        fontWeight:'bold',
        marginTop:'5px',
        marginBottom:'10px',
    },
    labelInline: {
        display:'inline',
        color:'#000000',
        fontSize:'12px',
        marginTop:'20px',
        marginBottom:'10px'
      },  
      image:{
        width:'70%',
      }  
}
function mapDispatchToProps(dispatch) {
    return {
      onCheckAccountClick: function(user) {
          dispatch( {type: 'saveUser', user} )
      }, 
    }
  }
  function mapStateToProps(state) {
    console.log("state", state)
    return { user: state.user, previousLocation: state.previousLocation }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ConnectionScreen);