import React from 'react';
import '../App.css';
import { Input } from 'antd';
import Nav from '../components/Navbar';

export default function CreateAccountScreen() {
    return (
        <div className="container" >
          <Nav/>
          <div>
              <h2>Connexion</h2>
              <p>Connectez-vous pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>
          </div>
          <div>
              <p>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com"></Input>
          </div>
          <div>
              <p>Avez-vous déjà un compte ?</p>
              <Input placeholder="victor@hugo.com"></Input>
          </div>

        </div>
      );
    }
