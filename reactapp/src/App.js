import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './';

import HomeScreen from './screens/BookScreen';
import LibraryScreen from './screens/LibraryScreen';
import BookScreen from './screens/BookScreen';
import ResultScreen from './screens/ResultScreen';
import SearchScreen from './screens/SearchScreen';
import SurveyScreen from './screens/SurveyScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ConnectionScreen from './screens/ConnectionScreen';


function App() {


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/library" component={LibraryScreen} />
        <Route path="/book/:isbn" component={BookScreen} />
        <Route path="/result" component={ResultScreen} />
        <Route path="/search" component={SearchScreen} />
        <Route path="/survey" component={SurveyScreen} />
        <Route path="/create-account" component={CreateAccountScreen} />
        <Route path="/connection" component={ConnectionScreen} />
      </Switch>
    </Router>  
  );
}



export default App;

