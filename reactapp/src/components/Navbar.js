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
    <div className="d-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand href="/"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
            <NavItem><NavLink href="/" className="menu-nav-item"><SearchOutlined className="menu-nav-icon" /> Rechercher</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><BulbOutlined className="menu-nav-icon"/> Suggestions</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><BookOutlined className="menu-nav-icon"/> Bibliothèque</NavLink></NavItem>
            <NavItem ><NavLink href="/" className="menu-nav-item"><HeartOutlined className="menu-nav-icon"/> A lire</NavLink></NavItem>
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
        <NavbarBrand href="/" className="mr-auto"><SearchOutlined /></NavbarBrand>
        <NavbarBrand href="/" className="mr-auto"><UserOutlined/></NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="left-menu-xs">
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier mon compte</NavLink></NavItem>
            <NavItem><NavLink href="/" className="menu-nav-item-xs"><LogoutOutlined className="menu-nav-icon-xs" /> Me déconnecter</NavLink></NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    </div>);
}
export default NavigationBar;

