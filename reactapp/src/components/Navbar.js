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
    {/* <div className="d-md-none ">
      <Navbar light>
      <NavbarToggler onClick={toggleNavbar} className="mr-2" />
      <NavbarBrand href="/" className="mr-auto"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
      <Navbar light className="menu-nav-header-xs">
      <NavbarBrand href="/search"><SearchOutlined className="mr-auto menu-nav-header-icon-xs"/></NavbarBrand>
      <NavbarBrand href="/connection"><UserOutlined className="mr-auto menu-nav-header-icon-xs"/></NavbarBrand>
      </Navbar>
      <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className="left-menu-xs">
            <NavItem><Link to="/result" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</Link></NavItem>
            <NavItem><Link to="/library" className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</Link></NavItem>
            <NavItem><Link to="/library" className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</Link></NavItem>
            {props.token ? 
            <div>
             <NavItem><Link to="/update-account" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier compte</Link></NavItem>
             <NavItem><Link to="/" className="menu-nav-item-xs" onClick={()=>props.onLogoutClick(props.token)}><LogoutOutlined className="menu-nav-icon-xs" /> Déconnexion</Link></NavItem>
            </div>
            :
            <NavItem><Link to="/connection" className="menu-nav-item-xs"><LoginOutlined className="menu-nav-icon-xs"/> Connexion</Link></NavItem>
            }
           
          </Nav>
      </Collapse>
      </Navbar>
    </div> */}

    {/* Small Menu avec dropdown */} 
        <div className="d-md-none ">
        <Navbar expand="md" className="menu-nav">
              <Nav className="ms-auto" navbar>
              <UncontrolledDropdown setActiveFromChild>
              <Navbar light className="menu-nav-header-xs">
                  <DropdownToggle tag="a" className="nav-link"><MenuOutlined/></DropdownToggle> 
                  <NavbarBrand href="/" className="mr-auto"><Image src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
                  <NavbarBrand href="/search"><SearchOutlined /></NavbarBrand>
                  <NavbarBrand href="/connection"><UserOutlined /></NavbarBrand>
              </Navbar>
          <DropdownMenu>
            <DropdownItem><Link to="/result" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</Link></DropdownItem>
            <DropdownItem href="/library" className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</DropdownItem>
            <DropdownItem href="/library" className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</DropdownItem>
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

