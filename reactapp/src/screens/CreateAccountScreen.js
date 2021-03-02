// To do : voir si ce même écran peut servir à modifier son compte en figeant le mail.

import React, {useState} from 'react';
import '../App.css';
import { Input, Button, Avatar, Form } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import AvatarUpload from '../components/AvatarUpload';

export default function CreateAccountScreen() {
    const [userLibraryName, setUserLibraryName]= useState('');
    const [userEmail, setUserEmail]= useState('');
    const [userPassword, setUserPassword]= useState('');
    const [token, setToken] = useState(false);
    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
            {token ?
            <h3 style={styles.title}>Modifiez votre compte</h3>
            :
            <h3 style={styles.title}>Créez votre compte bookin</h3>
            }
              <AvatarUpload />
              <p style={styles.smallLabel}>Choisissez votre avatar (png / jpg)</p>
            <Form layout="vertical">
                <Form.Item required tooltip="Ce champ est obligatoire" label="Choisissez le nom de votre bibliothèque">
                  <Input placeholder="Bibliothèque de Victor" />
                </Form.Item>
        
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre adresse email :">
                    <Input placeholder="victor@hugo.com" />
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre mot de passe :">
                    <Input placeholder="Fantine123" />
                </Form.Item>
                <Form.Item>
                    <Button style={styles.btn} type="primary">Créer compte</Button>
                </Form.Item>
            </Form>

            <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
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