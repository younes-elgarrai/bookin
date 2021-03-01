import React from 'react';
import { Menu, Image, Avatar } from 'antd';
import logo from '../assets/bookin.png';
import './Navbar.css';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LoginOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function Navbar(props) {
  // Menus les uns sous les autres, à rendre dynamique quand on aura un user toggle.
  // Manque navigation vers les pages.
  // Manque alignement en 2 blocs : logo à gauche et le reste à droite.

  return (
    // Menu large, utilisateur connecté
  //   <Menu key="menu" mode="horizontal" className="menu-nav">
  //   <Menu.Item key="logo"><Image src={logo} alt="logo Bookin" width={90}/></Menu.Item>
  //   <Menu.Item key="search" icon={<SearchOutlined />}>Rechercher</Menu.Item>
  //   <Menu.Item key="suggestions" icon={<BulbOutlined />}>Suggestions</Menu.Item>
  //   <Menu.Item key="library" icon={<BookOutlined />}>Bibliothèque</Menu.Item>
  //   <Menu.Item key="wishlist" icon={<HeartOutlined />}>A lire</Menu.Item>
  //   <SubMenu key="SubMenu" title={<Avatar icon={<UserOutlined/>}/>}>
  //       <Menu.Item key="setting:1">Modifier mon compte</Menu.Item>
  //       <Menu.Item key="setting:2">Me déconnecter</Menu.Item>
  //   </SubMenu>
  // </Menu>
  // Menu large, utilisateur non connecté
  <Menu key="menu" mode="horizontal" className="menu-nav">
    <Image src={logo} alt="logo Bookin" width={90}/>
    <Menu.Item key="search" icon={<SearchOutlined />}>Rechercher</Menu.Item>
    <Menu.Item key="suggestions" icon={<BulbOutlined />}>Suggestions</Menu.Item>
    <Menu.Item key="library" icon={<LoginOutlined />}>Log In / Sign Up</Menu.Item>
  </Menu>



  );
}
export default Navbar;

