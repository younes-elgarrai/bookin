import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../App.css';
import { Input, Button, Form, Image } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, BookOutlined} from '@ant-design/icons';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import account from '../assets/account.png';
import AvatarUpload from '../components/AvatarUpload';
import {connect} from 'react-redux';

function CreateAccountScreen(props) {
  console.log('CreateAccountScreen > props.token', props.token);

    const [cookies, setCookie] = useCookies(['survey']);
    console.log('cookies survey', cookies.survey);

    const [userLibraryName, setUserLibraryName]= useState('');
    const [userEmail, setUserEmail]= useState('');
    const [userPassword, setUserPassword]= useState('');
    const [ userMessage, setUserMessage ] = useState('');
    const [ isSignedUp, setIsSignedUp ] = useState(false);
    const [ alreadyHasAccount, setAlreadyHasAccount ] = useState(false);

    const checkEmailFormat = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email ? re.test(String(email).toLowerCase()) : false;
    }

    const createUserAccount = async () => {
    // Voir avec Younes : if (!cookie) message: 'refaire le questionnaire' + redirect ?
      if (!checkEmailFormat(userEmail)) {
        setUserMessage('veuillez saisir un email valide.');
    } else {
      const style = encodeURIComponent(JSON.stringify(cookies.survey.Styles));
      const length = encodeURIComponent(cookies.survey.Length);
      const period = encodeURIComponent(cookies.survey.Period);
      const response = await fetch('/sign-up', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${userLibraryName}&email=${userEmail}&password=${userPassword}&styles=${style}&length=${length}&period=${period}`
      });
      const dataResponse = await response.json();
      console.log('dataResponse',dataResponse);  // {result: true, userToken: "N9mwAoACDrKevTGj7aV8zZqKbLhRC2Qs"}
      if (dataResponse.userToken) {
        props.onCreateAccountClick(dataResponse.userToken);
        setIsSignedUp(true);
      }
      if (dataResponse.result === false) {
        setUserMessage(dataResponse.message);
        if (dataResponse.message === "Il existe déjà un compte associé à cet email.") {
          setAlreadyHasAccount(true);
        }
      }
      }
    }

    if (isSignedUp) {
      return(
        <Redirect to='/library'/>
      )
    } else if (alreadyHasAccount) {
      // fonctionne mais pas le temps de voir le message contextuel donc un peu abrupt...
      return(
        <Redirect to='/connection'/>
      )
    } else {
    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
            <h3 style={styles.title}>Créez votre compte</h3>
            <p style={styles.label}>Créez un compte pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>
            <div className="row justify-content-center">
            <div className="order-2 order-md-1 col-12 col-md-6">
              <AvatarUpload />
              <p style={styles.smallLabel}>Choisissez votre avatar (png / jpg)</p>
            <Form layout="vertical">
                <Form.Item required tooltip="Ce champ est obligatoire" label="Choisissez le nom de votre bibliothèque :">
                  <Input placeholder="Bibliothèque de Victor" prefix={<BookOutlined className="site-form-item-icon" />}  onChange={(e)=> setUserLibraryName(e.target.value)} value={userLibraryName} />
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre adresse email :">
                    <Input placeholder="victor@hugo.com" prefix={<MailOutlined className="site-form-item-icon" />} onChange={(e)=> setUserEmail(e.target.value)} value={userEmail}/>
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre mot de passe :">
                    <Input.Password placeholder="Fantine123" prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e)=> setUserPassword(e.target.value)} value={userPassword} iconRender={visible=>(visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>
                <Form.Item>
                    <Button style={styles.btn} onClick={()=> createUserAccount()} >Créer compte</Button>
                    <span style={styles.userMsg}>{userMessage}</span>
                </Form.Item>
            </Form>
            <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            <div className="order-1 order-md-2 col-4 col-md-6">
            <Image src={account} alt='Illustration by Olha Khomich from Icons8'></Image>
            </div>
        </div>
        </div>
        <Footer/>
        </div>
      );
    }    
  }

const styles = {
      container: {
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          width:'100%',
          backgroundColor:'#f3f5f7',
          padding:'20px',
          margin:'auto'
          },
      title: {
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
          marginBottom:'10px'
      },
      smallLabel:{
        color:'#000000',
        fontSize:'10px',
        marginTop:'5px',
        marginBottom:'10px'
      },
      userMsg: {
        color:"#23396C",
        fontSize:'12px',
        fontWeight:'bold',
      },
      btn: {
          marginRight:'10px',
          backgroundColor:'#fca311', 
          fontWeight:'500', 
          color:'#23396c', 
          borderColor:'#fca311', 
          borderRadius:'5px',
      }   
  }   

  function mapDispatchToProps(dispatch) {
    return {
      onCreateAccountClick: function(token) {
          dispatch( {type: 'saveToken', token} )
      } 
    }
  }
  function mapStateToProps(state) {
    return { token: state.token }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen);
