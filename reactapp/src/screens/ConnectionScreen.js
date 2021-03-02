import React, {useState} from 'react';
import '../App.css';
import { Input, Radio, Button} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';

export default function ConnectionScreen() {
    const [ hasAccount, setHasAccount ]=useState(false);
    const [ email, setEmail ] = useState();
    const [ emailCheckedFromBack, setEmailCheckedFromBack ] = useState(false);
    const [ password, setPassword ] = useState();

    const checkAccountEmail = async () => {
        if (!checkEmailFormat(email)) {
            console.log('veuillez saisir un email valide.'); // afficher message et pas de redirection
        } else {
            const response = await fetch('/check-email', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `email=${email}`
            });
            const dataResponse = await response.json();
            console.log('dataResponse',dataResponse); // {result:false} ou {result:true}
            if (dataResponse.result) {
                setEmailCheckedFromBack(true);
                setHasAccount(true);
            } else {
                setHasAccount(false);
            }
        } 
    }
    const checkEmailFormat = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email ? re.test(String(email).toLowerCase()) : false;
    }

    const checkPasswordToLogin = async () => {
        const response = await fetch('/log-in', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        const dataResponse = await response.json();
        console.log('dataResponse password to login',dataResponse); // {login: true, userToken: "N9mwAoACDrKevTGj7aV8zZqKbLhRC2Qs"}
    }

    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
              <h3 style={styles.title}>Connexion</h3>
              <p style={styles.label}>Connectez-vous pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>
            
            <div className="form">
              <p style={styles.label}>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com" onChange={(e)=>setEmail(e.target.value)} value={email}></Input>

              <p style={styles.label}>Avez-vous déjà un compte ?</p>
              <Radio.Group style={{display:'block', marginBottom:'20px'}} onChange={(e)=> setHasAccount(e.target.value)} value={hasAccount}>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px', fontSize:'12px'}} value={false}>Non, je n'ai pas encore de compte.</Radio>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px',fontSize:'12px'}} value={true}>Oui, j'ai déjà un compte.</Radio>
             </Radio.Group>
             {(emailCheckedFromBack===false) &&
                <Button style={styles.btn} onClick={()=> checkAccountEmail()}>Continuer <RightOutlined/></Button>
            }
           
            {emailCheckedFromBack && 
            <div>
                <p style={styles.label}>Saisissez votre mot de passe : </p>
                <Input placeholder="mot de passe" onChange={(e)=> setPassword(e.target.value)}></Input>
                <p style={styles.smallLabel}>mot de passe oublié ?</p>
                <Button style={styles.btn} onClick={()=> checkPasswordToLogin()}>Continuer <RightOutlined/></Button>
                <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            }
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