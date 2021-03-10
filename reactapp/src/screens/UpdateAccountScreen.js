import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import '../App.css';
import { Input, Button, Form , Avatar} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined, BookOutlined} from '@ant-design/icons';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import account from '../assets/account.png';
import AvatarUpload from '../components/AvatarUpload';
import {connect} from 'react-redux';

function UpdateAccountScreen(props) {

    const [cookies, setCookie] = useCookies(['survey']);
    console.log('cookies survey', cookies.survey);

    const [ userLibraryName, setUserLibraryName]= useState('');
    const [ userEmail, setUserEmail ] = useState('');
    const [ userPassword, setUserPassword]= useState('');
    const [ userMessage, setUserMessage ] = useState('');

    useEffect(() => {
      async function loadEmailFromDatabase() {
        var rawResponse = await fetch(`/users/${props.user.token}`);
        var response = await rawResponse.json();
        setUserEmail(response.userEmail);
        setUserLibraryName(response.userLibraryName);
       }
       loadEmailFromDatabase();
    }, [props.token]);

    const updateAccount = async () => {
      const style = JSON.stringify(cookies.survey.Styles);
      const length = cookies.survey.Length;
      const period = cookies.survey.Period;
      const response = await fetch('/update', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${props.user.token}&name=${userLibraryName}&password=${userPassword}&styles=${style}&length=${length}&period=${period}`
      });
      const dataResponse = await response.json();
      console.log('dataResponse',dataResponse); 
      if (dataResponse.userToken) {
        props.onCreateAccountClick(dataResponse.userToken);
      }
      if (dataResponse.result === false) {
        setUserMessage(dataResponse.message);
      }
      }


    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
            <h3 style={styles.title}>Modifiez votre compte</h3>

            <div className="row justify-content-center">
            <div className="order-2 order-md-1 col-11 offset-1 col-md-4 offset-md-2" >
              {props.user ?
              <Avatar src={props.user.avatar} size={100} style={{marginBottom:'20px'}} />
              :
              <div>
              <AvatarUpload />
              <p style={styles.smallAvatar}>Modifiez votre avatar (png / jpg)</p>
              </div>}
            <Form layout="vertical">
                <Form.Item required tooltip="Ce champ est obligatoire" label="Modifiez le nom de votre bibliothèque :">
                  <Input  prefix={<BookOutlined className="site-form-item-icon" />}  onChange={(e)=> setUserLibraryName(e.target.value)} value={userLibraryName} style={{width:'90%'}}/>
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire et ne peut pas être modifié" label="Votre adresse email :">
                    <Input disabled placeholder={userEmail} prefix={<MailOutlined className="site-form-item-icon" />} value={userEmail} style={{width:'90%'}}/>
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Modifiez votre mot de passe :">
                    <Input.Password placeholder="Fantine123" prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e)=> setUserPassword(e.target.value)} value={userPassword} iconRender={visible=>(visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} style={{width:'90%'}}/>
                </Form.Item>
                <Form.Item>
                    <Button style={styles.btn} onClick={()=> updateAccount()} >Modifier compte</Button>
                    <span style={styles.userMsg}>{userMessage}</span>
                </Form.Item>
            </Form>
            <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            <div className="order-1 order-md-2 col-4 col-md-6">
            <img src={account} alt='Illustration by Olha Khomich from Icons8' style={styles.image}/>
            </div>
        </div>
        </div>
        <Footer/>
        </div>
      )
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
      smallAvatar:{
        color:'#000000',
        fontSize:'10px',
        marginBottom:'40px'
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
      image:{
        width:'100%'
      }   
  }   


  function mapStateToProps(state) {
    return { user: state.user }
  }
  export default connect(mapStateToProps, null)(UpdateAccountScreen);