// https://books.googleapis.com/books/v1/volumes?q=andr%C3%A9%20compte-sponville&maxResults=40&orderBy=relevance&key=[YOUR_API_KEY]
// API_key: "AIzaSyAIdljyRBhHojVGur6_xhEi1fdSKyb-rUE"

import React, {useState, useEffect} from 'react';
import { Card, Icon, Modal, Input} from 'antd';
// import Navbar from './components/Navbar.js'
import {connect} from 'react-redux';


export default function SearchScreen(props) {

    const onSearch = value => console.log(value);

<View>
<Text>Votre Recherche</Text>
<Input placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />

</View>
}