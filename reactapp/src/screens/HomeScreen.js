import React from 'react';
import { useCookies } from 'react-cookie';
import '../App.css';
import Nav from '../components/Navbar';
import {connect} from 'react-redux';


function HomeScreen(props) {

  console.log('HomeScreen > props.token', props.token);
  const [cookies, setCookie] = useCookies(['survey']);
  console.log('cookie survey', cookies.survey);
  

  return (
    <div className="App">
      <Nav/>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token }
}
export default connect(mapStateToProps, null)(HomeScreen);