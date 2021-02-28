import React from 'react';
import './App.css';
import {Menu} from 'antd'
import {ReadOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons'
import {Link} from "react-router-dom";


function Navbar() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

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
    </nav>
  );
}


export default Navbar;
