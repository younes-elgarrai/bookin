import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import BookScreen from './screens/BookScreen';
import ResultScreen from './screens/ResultScreen';
import SearchScreen from './screens/SearchScreen';
import SurveyScreen from './screens/SurveyScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ConnectionScreen from './screens/ConnectionScreen';

import surveyReducer from './reducers/survey.reducer';
import tokenReducer from './reducers/token.reducer';


import {Provider} from 'react-redux';

import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({survey: surveyReducer, token: tokenReducer}));



function App() {


  return (
    <Provider store={store}>
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
    </Provider>

  );
}



export default App;

