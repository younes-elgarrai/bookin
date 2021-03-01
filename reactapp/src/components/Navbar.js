import React from 'react';
import { Menu } from 'antd';
import '../App.css';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, MenuOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default function Navbar() {
  return (
    <Menu key="menu" mode="horizontal" className="menu-nav">
    <Menu.Item key="logo">Logo Bookin</Menu.Item>
    <Menu.Item key="search" icon={<SearchOutlined />}>Rechercher</Menu.Item>
    <Menu.Item key="suggestions" icon={<BulbOutlined />}>Suggestions</Menu.Item>
    <Menu.Item key="library" icon={<BookOutlined />}>Bibliothèque</Menu.Item>
    <Menu.Item key="wishlist" icon={<HeartOutlined />}>A lire</Menu.Item>
    <Menu.Item key="account">Log in / Sign Up</Menu.Item>
    <SubMenu key="SubMenu" title="Mon profil">
        <Menu.Item key="setting:1">Modifier mon compte</Menu.Item>
        <Menu.Item key="setting:2">Me déconnecter</Menu.Item>
    </SubMenu>
  </Menu>

  );
}

