import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/bookin.png';
import './Navbar.css';
import {connect} from 'react-redux';

// ReactStrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
  // Ant Design
import { Image, Avatar } from 'antd';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';

function NavigationBar(props) {
  console.log('NavBar > props.token', props.token);
  // Large menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // Small menu
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  // Small menu dropdown test


  return(
    <div>
    {/* Large Menu */}
    <div className="d-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand href="/"><img src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
            <NavItem><Link to="/search" className="menu-nav-item"><SearchOutlined className="menu-nav-icon" /> Rechercher</Link></NavItem> 
            <NavItem><Link to="/result" className="menu-nav-item"><BulbOutlined className="menu-nav-icon"/> Suggestions</Link></NavItem> 
            <NavItem><Link to="/library" className="menu-nav-item"><BookOutlined className="menu-nav-icon"/> Bibliothèque</Link></NavItem> 
            <NavItem><Link to="/library" className="menu-nav-item"><HeartOutlined className="menu-nav-icon"/> A lire</Link></NavItem> 
            {props.token ? 
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <Avatar className="menu-nav-avatar" icon={<UserOutlined/>}/>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link to='/update-account' className="menu-nav-item-dropdown">Modifier compte</Link></DropdownItem>
                <DropdownItem><Link to='/' className="menu-nav-item-dropdown" onClick={()=>props.onLogoutClick(props.token)}>Déconnexion</Link></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            :
            <NavItem><Link to="/connection" className="menu-nav-item"><LoginOutlined className="menu-nav-icon"/> Connexion</Link></NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
      </div>
    {/* Small Menu */} 
        <div className="d-md-none ">
        <Navbar expand="md" className="menu-nav">
              <Nav navbar className="menu-nav-header">
              <UncontrolledDropdown setActiveFromChild>
              <Navbar light className="menu-nav-header-xs">
                  <DropdownToggle tag="a" className="menu-header-xs-item"><MenuOutlined/><Image src={logo} alt="logo Bookin" width={90}/></DropdownToggle> 
                  <NavbarBrand href="/search" className="menu-header-xs-item"><SearchOutlined /></NavbarBrand>
                  <NavbarBrand href="/connection" className="menu-header-xs-item"><UserOutlined /></NavbarBrand>
              </Navbar>
          <DropdownMenu>
            <DropdownItem><Link to="/result" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</Link></DropdownItem>
            <DropdownItem><Link to="/library" className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</Link></DropdownItem>
            <DropdownItem><Link to="/library" className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</Link></DropdownItem>
            {props.token ? 
            <div>
             <DropdownItem href="/update-account" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier compte</DropdownItem>
             <DropdownItem href="/" className="menu-nav-item-xs" onClick={()=>props.onLogoutClick(props.token)}><LogoutOutlined className="menu-nav-icon-xs" /> Déconnexion</DropdownItem>
            </div>
            :
            <DropdownItem href="/connection" className="menu-nav-item-xs"><LoginOutlined className="menu-nav-icon-xs"/> Connexion</DropdownItem>
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>



            </div>
    </div>
);
}
function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: function(token) {
        dispatch( {type:'deleteToken', token} )
    } 
  }
}
function mapStateToProps(state) {
  return { token: state.token }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);

