import React, { useState } from 'react';
import logo from '../assets/bookin.png';
import './Navbar.css';

// ReactStrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

// Ant Design
import { Image, Avatar } from 'antd';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';

function NavigationBar(props) {
  // Large menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // Small menu
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return(
  <div>
    {/* Large Menu, User is connected */}
    <div className="d-xs-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand href="/"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
            <NavItem><NavLink href="/" className="menu-nav-item"><SearchOutlined /> Rechercher</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><BulbOutlined /> Suggestions</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><BookOutlined /> Bibliothèque</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><HeartOutlined /> A lire</NavLink></NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
              <Avatar icon={<UserOutlined/>}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem className="menu-nav-item">Modifier mon compte</DropdownItem>
                <DropdownItem className="menu-nav-item">Me déconnecter</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    {/* Small Menu, User is connected */}  
    <div className="d-md-none">
      <Navbar color="faded" light>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="left-menu-xs">
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><BulbOutlined /> Suggestions</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><BookOutlined /> Bibliothèque</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><HeartOutlined /> A lire</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><SettingOutlined /> Modifier mon compte</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><LogoutOutlined /> Me déconnecter</NavLink></NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    </div>);
}
export default NavigationBar;

