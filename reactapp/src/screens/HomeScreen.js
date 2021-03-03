import React from 'react';
import { useCookies } from 'react-cookie';
import '../App.css';
import Nav from '../components/Navbar';


function HomeScreen() {


  const [cookies, setCookie] = useCookies(['survey']);

  console.log(cookies.survey);
  

  return (
    <div className="App">
      <Nav/>
    </div>
  );
}

export default HomeScreen;