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
import { BulbOutlined, HeartOutlined, SearchOutlined, BookOutlined, LogoutOutlined, SettingOutlined, UserOutlined, MenuOutlined, HomeOutlined } from '@ant-design/icons';

function NavigationBar(props) {

  const [ cookies, setCookie, removeCookie ] = useCookies(['survey','token','avatar', 'library', 'wishlist']);

  // Large menu
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [countWL, setCountWL] = useState(0);
  const [countLB, setCountLB] = useState(0);

  useEffect(()=>{

    setCountWL(props.wishlist.length);
    setCountLB(props.library.length);


  },[props.wishlist, props.library])

  useEffect(() => {
    cookies.token&&props.onLoad({token: cookies.token, avatar: cookies.avatar})
    if (cookies.token!==undefined) {
        var CheckWishList = async () => {
            const data = await fetch(`/wishlist`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${cookies.token}`
            });
            const body = await data.json();
            if (body.result===true && body.wishlist.length >0) {
                props.setWishlist(body.wishlist);
                setCookie('wishlist', JSON.stringify(body.wishlist), {path:"/"});
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
          body: `token=${cookies.token}`
          });
          const body = await data.json();
          if (body.result===true && body.library.length >0) {
              props.setLibrary(body.library);
              setCookie('library', JSON.stringify(body.library), {path:"/"});
              setCountLB(body.library.length);
          } else if (body.result===true && body.library.length === 0)
          {
              setCountLB(0);}
      };
      CheckLibrary();
    }
},[cookies.token]);

  const onLogOut = ()=>{
    removeCookie('token');
    removeCookie('avatar');
    removeCookie('survey');
    removeCookie('library');
    removeCookie('wishlist');
    props.onLogoutClick(props.user);
    props.setLibrary([]);
    props.setWishlist([]);
    props.beforeLogin(null)
  }

  return(
    <div>
    {/* Large Menu */}
    <div className="d-none d-sm-none d-md-inline">
      <Navbar expand="md" className="menu-nav">
        <NavbarBrand><Link to='/'><img src={logo} alt="logo Bookin" width={90}/></Link></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="right-menu">
          <Nav navbar>
            <NavItem><Link to="/search" className="menu-nav-item"><SearchOutlined className="menu-nav-icon" /> Rechercher</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(0)} ><Link to="/main" className="menu-nav-item"><BulbOutlined className="menu-nav-icon"/> Suggestions</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(1)}><Link to={props.user ? "/main" : "/create-account"} className="menu-nav-item"><Badge className="menu-nav-badge" style={{marginRight:"-5px", backgroundColor:"#23396c"}} size="small" count={countLB}><BookOutlined className="menu-nav-icon"/></Badge> Bibliothèque</Link></NavItem> 
            <NavItem onClick={()=>props.onTabClick(2)}><Link to={props.user ? "/main" : "/create-account"} className="menu-nav-item"><Badge className="menu-nav-badge" style={{marginRight:"5px", backgroundColor:"#23396c"}} size="small" count={countWL}><HeartOutlined style={{marginRight:"10px", marginLeft:"10px"}} className="menu-nav-icon"/></Badge> A lire</Link></NavItem> 
            {props.user ? 
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav className="menu-nav-drop" >
                {props.user.avatar ? 
                <Avatar className="menu-nav-avatar" src={props.user.avatar}/>
                :
                <Avatar size="large" className="menu-nav-avatar" icon={<UserOutlined/>}/>}
              </DropdownToggle>
              <DropdownMenu right>
                <Link to='/update-account' className="menu-nav-item-dropdown"><DropdownItem>Modifier compte</DropdownItem></Link>
                <Link to='/' className="menu-nav-item-dropdown" onClick={()=>onLogOut()}><DropdownItem>Déconnexion</DropdownItem></Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            :
            <NavItem><Link to="/connection" className="menu-nav-item"><HomeOutlined className="menu-nav-icon"/> Mon Compte</Link></NavItem>
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
            <DropdownItem><Link to={props.user ? "/main" : "/create-account"}  className="menu-nav-item-xs"><BookOutlined className="menu-nav-icon-xs" /> Bibliothèque</Link></DropdownItem>
            <DropdownItem><Link to={props.user ? "/library" : "/create-account"}  className="menu-nav-item-xs"><HeartOutlined className="menu-nav-icon-xs" /> A lire</Link></DropdownItem>
            {props.user ? 
            <div>
             <DropdownItem href="/update-account" className="menu-nav-item-xs"><SettingOutlined className="menu-nav-icon-xs" /> Modifier compte</DropdownItem>
             <DropdownItem href="/" className="menu-nav-item-xs" onClick={onLogOut}><LogoutOutlined className="menu-nav-icon-xs" /> Déconnexion</DropdownItem>
            </div>
            :
            <DropdownItem href="/connection" className="menu-nav-item-xs"><HomeOutlined className="menu-nav-icon-xs"/> Mon compte</DropdownItem>
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
    },
    onLoad : function(user) {
      dispatch( {type:'saveUser', user} )
    },
    setLibrary: function(library) {
      dispatch( {type: 'setLibrary', library:library} )
    },
    setWishlist: function(wishlist) {
      dispatch( {type: 'setWishlist', wishlist:wishlist} )
    },
   beforeLogin: function(previousLocation) {
    dispatch( {type: 'beforeLogin', previousLocation:previousLocation} )
    },
  }
}
function mapStateToProps(state) {
  return { user: state.user, wishlist: state.wishlist, library: state.library }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);