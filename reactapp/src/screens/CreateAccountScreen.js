// To do : voir si ce même écran peut servir à modifier son compte en figeant le mail.

import React, {useState} from 'react';
import { useCookies } from 'react-cookie';
import '../App.css';
import { Input, Button, Form, Image } from 'antd';
import Nav from '../components/Navbar';
import account from '../assets/account.png';
import AvatarUpload from '../components/AvatarUpload';

export default function CreateAccountScreen() {

    const [cookies, setCookie] = useCookies(['survey']);

    console.log(cookies.survey);

    const [userLibraryName, setUserLibraryName]= useState('');
    console.log(userLibraryName);
    const [userEmail, setUserEmail]= useState('');
    console.log(userEmail);
    const [userPassword, setUserPassword]= useState('');
    console.log(userPassword);
    const [token, setToken] = useState(false);

    const checkEmailFormat = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email ? re.test(String(email).toLowerCase()) : false;
    }

    const createUserAccount = async () => {
      if (!checkEmailFormat(userEmail)) {
        console.log('veuillez saisir un email valide.');
        // gérer ici aussi les autres cas d'erreurs ou en backend ?
    } else {
      const response = await fetch('/sign-up', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `name=${userLibraryName}&email=${userEmail}&password=${userPassword}`
    });
    const dataResponse = await response.json();
    if (dataResponse.userToken) {setToken(true);}
    console.log('dataResponse',dataResponse); // {result: true, userToken: "N9mwAoACDrKevTGj7aV8zZqKbLhRC2Qs"}
    }
    }


    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
            {token ?
            <h3 style={styles.title}>Modifiez votre compte</h3>
            :
            <h3 style={styles.title}>Créez votre compte bookin</h3>
            }
            <div styles={styles.signUp} className="row d-flex justify-content-center align-items-center">
            <div style={styles.signUpForm} className="col-6">
              <AvatarUpload />
              <p style={styles.smallLabel}>Choisissez votre avatar (png / jpg)</p>
            <Form layout="vertical">
                <Form.Item required tooltip="Ce champ est obligatoire" label="Choisissez le nom de votre bibliothèque :">
                  <Input placeholder="Bibliothèque de Victor" onChange={(e)=> setUserLibraryName(e.target.value)} value={userLibraryName} />
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre adresse email :">
                    <Input placeholder="victor@hugo.com" onChange={(e)=> setUserEmail(e.target.value)} value={userEmail}/>
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre mot de passe :">
                    <Input placeholder="Fantine123" onChange={(e)=> setUserPassword(e.target.value)} value={userPassword} />
                </Form.Item>
                <Form.Item>
                    <Button style={styles.btn} onClick={()=> createUserAccount()} >Créer compte</Button>
                </Form.Item>
            </Form>
            <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            <div className="col-6">
            <Image src={account} alt='Illustration by Olha Khomich from Icons8' height={400} width={400}></Image>
            </div>
        </div>
        </div>
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
          padding:'20px'
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
      btn: {
          marginRight:'10px',
          backgroundColor:'#fca311', 
          fontWeight:'500', 
          color:'#23396c', 
          borderColor:'#fca311', 
          borderRadius:'5px',
      }   
  }   