import React from 'react';
import { useCookies } from 'react-cookie';
import '../App.css';
import Nav from '../components/Navbar';
import {connect} from 'react-redux';
import {Button} from 'antd';


function HomeScreen(props) {

  console.log('HomeScreen > props.token', props.token);
  const [cookies, setCookie] = useCookies(['survey']);
  console.log('cookie survey', cookies.survey);
  

  return (
    <div className="App">
      <Nav/>
      <div>
        <h3>Bookin vous trouve vos prochains livres à lire et vous permet de gérer votre bibliothèque</h3>
        <Button>Commencer</Button>
        <p>Vous avez déjà un compte ? </p> <Button>Connectez-vous</Button>
        <h3>Découvrez toutes les fonctionnalités</h3>
        <p>Ajoutez des livres à votre bibliothèque virtuelle</p>
        <p>Notez vos pro</p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}
export default connect(mapStateToProps, null)(HomeScreen);