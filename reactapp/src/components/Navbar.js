import React from 'react';
import './App.css';
import {Menu} from 'antd'
import {ReadOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";


function Navbar() {

  return (
      <Menu mode="horizontal">

        <Menu.Item key="mail">
          <HomeOutlined />
          <Link to="/">Rechercher</Link>
        </Menu.Item>

        <Menu.Item key="test">
        <ReadOutlined />
          <Link to='/'>Ma Bibliothèque</Link>
        </Menu.Item>

        <Menu.Item key="app">
        <LogoutOutlined />
          <Link  to='/'>Ma wishlist</Link>
        </Menu.Item>

      </Menu>
  );
}


export default Navbar;
