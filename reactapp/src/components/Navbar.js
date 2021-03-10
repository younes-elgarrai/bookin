import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/bookin-transparent.png';
import './Navbar.css';
import {connect} from 'react-redux';
import { useCookies } from 'react-cookie';

// ReactStrap
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
   UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
  // Ant Design
import { Avatar, Badge } from 'antd';
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LoginOutlined, LogoutOutlined, SettingOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';

function NavigationBar(props) {
  console.log('NavBar > props.user', props.user);

  const [ cookies, setCookie, removeCookie ] = useCookies(['survey','token','avatar']);
  // Large menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [countWL, setCountWL] = useState(0);
  const [countLB, setCountLB] = useState(0);

  useEffect(() => {
    if (props.user!==null) {
        var CheckWishList = async () => {
            const data = await fetch(`/wishlist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.user.token}`
            });
            const body = await data.json();
            if (body.result===true && body.wishlist.length >0) {
                setCountWL(body.wishlist.length);
            } else if (body.result===true && body.wishlist.length === 0)
            {
                setCountWL(0);}
        };
        CheckWishList();

        var CheckLibrary = async () => {
          const data = await fetch(`/library`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.user.token}`
          });
          const body = await data.json();
          if (body.result===true && body.library.length >0) {
              setCountLB(body.library.length);
          } else if (body.result===true && body.library.length === 0)
          {
              setCountLB(0);}
      };
      CheckLibrary();
      

      
    }
},[props.wishlist, props.library]);

  return(
    <div>
    {/* Large Menu */}
    <div className="d-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand href='/'><img src={logo} alt="logo Bookin" width={90}/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
              
            <NavItem><Link to="/search" className="menu-nav-item"><SearchOutlined className="menu-nav-icon" /> Rechercher</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(0)} ><Link to="/main" className="menu-nav-item"><BulbOutlined className="menu-nav-icon"/> Suggestions</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(1)}><Link to={props.user ? "/main" : "/create-account"} className="menu-nav-item"><Badge className="menu-nav-badge" style={{marginRight:"-5px", backgroundColor:"#23396c"}} size="small" count={countLB}><BookOutlined className="menu-nav-icon"/></Badge> Bibliothèque</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(2)}><Link to={props.user ? "/main" : "/create-account"} className="menu-nav-item"><Badge className="menu-nav-badge" style={{marginRight:"5px", backgroundColor:"#23396c"}} size="small" count={countWL}><HeartOutlined style={{marginRight:"10px", marginLeft:"10px"}} className="menu-nav-icon"/></Badge> A lire</Link></NavItem> 
            {props.user ? 
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                {props.user.avatar ? 
                <Avatar size="large" className="menu-nav-avatar" src={props.user.avatar}/>
                :
                <Avatar size="large" className="menu-nav-avatar" icon={<UserOutlined/>}/>}
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
                  <DropdownToggle tag="a" className="menu-header-xs-item"><MenuOutlined/><img src={logo} alt="logo Bookin" width={90}/></DropdownToggle> 
                  <NavbarBrand href="/search" className="menu-header-xs-item"><SearchOutlined /></NavbarBrand>
                  <NavbarBrand href="/connection" className="menu-header-xs-item"><UserOutlined /></NavbarBrand>
              </Navbar>
          <DropdownMenu>
            <DropdownItem><Link to="/main" className="menu-nav-item-xs"><BulbOutlined className="menu-nav-icon-xs"/> Suggestions</Link></DropdownItem>
            <DropdownItem><Link to={props.user ? "/library" : "/create-account"}  className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</Link></DropdownItem>
            <DropdownItem><Link to={props.user ? "/library" : "/create-account"}  className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</Link></DropdownItem>
            {props.user ? 
            <div>
             <DropdownItem href="/update-account" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier compte</DropdownItem>
             <DropdownItem href="/" className="menu-nav-item-xs" onClick={()=>{cookies.remove("token");props.onLogoutClick(props.user);}}><LogoutOutlined className="menu-nav-icon-xs" /> Déconnexion</DropdownItem>
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
    onLogoutClick: function(user) {
        dispatch( {type:'deleteUser', user} )
    } ,
    onTabClick: function(value) {
      dispatch( {type:'setTab', value} )
  }
  }
}
function mapStateToProps(state) {
  return { user: state.user, wishlist: state.wishlist, library: state.library }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);