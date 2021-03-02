// To do : 
// Gérer l'affichage du burger : fait descendre tout le site en s'ouvrant
// mettre à jour les liens de navigation une fois tous les écrans créés
// Importer le user token, son nom, sa photo pour l'avatar
// Gérer le log out

import React, { useState } from 'react';
import logo from '../assets/bookin.png';
import './Navbar.css';

// ReactStrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
// Ant Design
import { Image, Avatar } from 'antd';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

function NavigationBar(props) {
  // Large menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // Small menu
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  // user token
  // passer en true et en false pour voir les différents cas
  // (à modifier une fois stocké dans redux)
  const [token, setToken] = useState(true);

  return(
    <div>
    {/* Large Menu */}
    <div className="d-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand href="/"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
            <NavItem><NavLink href="/search" className="menu-nav-item"><SearchOutlined className="menu-nav-icon" /> Rechercher</NavLink></NavItem>
            <NavItem ><NavLink href="/result" className="menu-nav-item"><BulbOutlined className="menu-nav-icon"/> Suggestions</NavLink></NavItem>
            <NavItem ><NavLink href="/library" className="menu-nav-item"><BookOutlined className="menu-nav-icon"/> Bibliothèque</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><HeartOutlined className="menu-nav-icon"/> A lire</NavLink></NavItem>
            { token ? 
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <Avatar className="menu-nav-avatar" icon={<UserOutlined/>}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href='/' className="menu-nav-item">Modifier compte</DropdownItem>
                <DropdownItem href='/' className="menu-nav-item">Déconnexion</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            :
            <NavItem><NavLink href="/search" className="menu-nav-item"><LoginOutlined className="menu-nav-icon" /> Connexion</NavLink></NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    {/* Small Menu */}  
    <div className="d-md-none ">
      <Navbar light>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <NavbarBrand href="/" className="mr-auto"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
      <Navbar light className="menu-nav-header-xs">
      <NavbarBrand href="/search"><SearchOutlined className="mr-auto menu-nav-header-icon-xs"/></NavbarBrand>
      <NavbarBrand href="/"><UserOutlined className="mr-auto menu-nav-header-icon-xs"/></NavbarBrand>
      </Navbar>
      <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="left-menu-xs">
            <NavItem><NavLink href="/result" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</NavLink></NavItem>
            <NavItem><NavLink href="/library" className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</NavLink></NavItem>
            {token ? 
            <div>
             <NavItem><NavLink href="/" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier compte</NavLink></NavItem>
             <NavItem><NavLink href="/" className="menu-nav-item-xs"><LogoutOutlined className="menu-nav-icon-xs" /> Déconnexion</NavLink></NavItem>
            </div>
            :
            <div></div>
            }
           
          </Nav>
      </Collapse>
      </Navbar>
    </div>
    </div>
);
}
export default NavigationBar;

