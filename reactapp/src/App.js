import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import BookScreen from './screens/BookScreen';
import ResultScreen from './screens/ResultScreen';
import SearchScreen from './screens/SearchScreen';
import SurveyScreen from './screens/SurveyScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import MainScreen from './screens/MainScreen'

import surveyReducer from './reducers/survey.reducer';
import avatarReducer from './reducers/avatar.reducer';
import userReducer from './reducers/user.reducer';
import categoryReducer from './reducers/category.reducer';
import wishListReducer from './reducers/wishlist.reducer';
import libraryReducer from './reducers/library.reducer';

import { CookiesProvider } from 'react-cookie';

import {Provider} from 'react-redux';

import {createStore, combineReducers}  from 'redux';
import mainReducer from './reducers/main.reducer';

const store = createStore(combineReducers({survey: surveyReducer, avatar: avatarReducer, user: userReducer , category: categoryReducer, wishlist:wishListReducer, library:libraryReducer, mainTab: mainReducer }));



function App() {


  return (
    <CookiesProvider>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/library" component={LibraryScreen} />
          <Route path="/main" component={MainScreen} />
          <Route path="/book/:bookid" component={BookScreen} />
          <Route exact path="/book/" component={BookScreen} />
          <Route path="/result" component={ResultScreen} />
          <Route path="/search" component={SearchScreen} />
          <Route path="/survey" component={SurveyScreen} />
          <Route path="/create-account" component={CreateAccountScreen} />
          <Route path="/update-account" component={UpdateAccountScreen} />
          <Route path="/connection" component={ConnectionScreen} />
        </Switch>
      </Router>  
    </Provider>
    </CookiesProvider>

  );
}

export default App;

