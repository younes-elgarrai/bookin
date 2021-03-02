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
            console.log('veuillez saisir un email valide.');
            // afficher message et pas de redirection
        } else if (!hasAccount && checkEmailFormat(email)) {
            console.log('pas de compte associé à cet email');
            // afficher message et rediriger vers sign up.
        } else if (hasAccount && checkEmailFormat(email)) {
            const response = await fetch('/check-email', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `email=${email}`
            });
            const dataResponse = await response.json();
            console.log('dataResponse',dataResponse); // {result:false} ou {result:true}
            if (dataResponse.result) {
                setEmailCheckedFromBack(true);
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
        console.log('dataResponse',dataResponse);
    }

    return (
        <div>
        <Nav/>
        <div className="container">
              <h3>Connexion</h3>
              <p>Connectez-vous pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>
            
            <div className="form">
              <p>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com" onChange={(e)=>setEmail(e.target.value)} value={email}></Input>

              <p>Avez-vous déjà un compte ?</p>
              <Radio.Group onChange={(e)=> setHasAccount(e.target.value)} value={hasAccount}>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px'}} value={false}>Non, je n'ai pas encore de compte.</Radio>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px'}} value={true}>Oui, j'ai déjà un compte.</Radio>
             </Radio.Group>
             {(emailCheckedFromBack===false) &&
                <Button onClick={()=> checkAccountEmail()}>Continuer <RightOutlined/></Button>
            }
           
            {emailCheckedFromBack && 
            <div>
                <p>Saisissez votre mot de passe : </p>
                <Input placeholder="mot de passe" onChange={(e)=> setPassword(e.target.value)}></Input>
                <p>mot de passe oublié ?</p>
                <Button onClick={()=> checkPasswordToLogin()}>Continuer <RightOutlined/></Button>
                <p>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            }
            </div>
        </div>
        </div>
      );
    }