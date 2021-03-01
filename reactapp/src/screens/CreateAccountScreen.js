// To do : voir si ce même écran peut servir à modifier son compte en figeant le mail.

import React, {useState} from 'react';
import '../App.css';
import { Input, Button, Avatar, Form } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';

export default function CreateAccountScreen() {
    const [userLibraryName, setUserLibraryName]= useState('');
    const [userEmail, setUserEmail]= useState('');
    const [userPassword, setUserPassword]= useState('');
    const [token, setToken] = useState(false);
    return (
        <div>
        <Nav/>
        <div className="container">
            {token ?
            <h3>Modifiez votre compte</h3>
            :
            <h3>Créez votre compte bookin</h3>
            }
              <Avatar/>
              {/* Passer pas un form antdesign ?  */}
            <Form layout="vertical">
                <Form.Item required tooltip="Ce champ est obligatoire" label="Choisissez le nom de votre bibliothèque">
                  <Input placeholder="Bibliothèque de Céline" />
                </Form.Item>
        
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre adresse email :">
                    <Input placeholder="victor@hugo.com" />
                </Form.Item>
                <Form.Item required tooltip="Ce champ est obligatoire" label="Saisissez votre mot de passe :">
                    <Input placeholder="mot de passe" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary">Créer compte</Button>
                </Form.Item>
            </Form>

            <p>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
        </div>
        </div>
      );
    }
