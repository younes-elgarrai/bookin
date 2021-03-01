import React, {useState} from 'react';
import '../App.css';
import { Input, Radio, Button, Form } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';

export default function ConnectionScreen() {
    const [hasAccount, setHasAccount]=useState(false);
    console.log(hasAccount);

    const checkAccountEmail = () => {
        console.log("click");
    }
    const checkLogin = () => {
        console.log("click");
    }

    return (
        <div>
        <Nav/>
        <div className="container">

              <h3>Connexion</h3>
              <p>Connectez-vous pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>

              <p>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com"></Input>

              <p>Avez-vous déjà un compte ?</p>
              <Radio.Group onChange={(e)=> setHasAccount(e.target.value)} value={hasAccount}>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px'}} value={false}>Non, je n'ai pas encore de compte.</Radio>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px'}} value={true}>Oui, j'ai déjà un compte.</Radio>
             </Radio.Group>
            <Button onClick={()=> checkAccountEmail()}>Continuer <RightOutlined/></Button>

            {/* A afficher seulement si le mail est bien vérifié */}
            <p>Saisissez votre mot de passe : </p>
            <Input placeholder="mot de passe"></Input>
            <p>mot de passe oublié ?</p>
            <Button onClick={()=> checkLogin()}>Continuer <RightOutlined/></Button>
            <p>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
        </div>
        </div>
      );
    }