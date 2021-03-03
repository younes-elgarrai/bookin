import React, {useState} from 'react';
import '../App.css';
import { Input, Radio, Button, Image} from 'antd';
import { RightOutlined, EyeInvisibleOutlined, EyeTwoTone, MailOutlined, LockOutlined } from '@ant-design/icons';
import Nav from '../components/Navbar';
import reading from '../assets/reading.png';
import {connect} from 'react-redux';

function ConnectionScreen(props) {
    console.log('ConnectionScreen > props.token', props.token);
    const [ hasAccount, setHasAccount ]=useState(false);
    const [ email, setEmail ] = useState();
    const [ emailCheckedFromBack, setEmailCheckedFromBack ] = useState(false);
    const [ password, setPassword ] = useState();
    const [ userMessage, setUserMessage ] = useState('');

    const checkAccountEmail = async () => {
        if (!checkEmailFormat(email)) {
            setUserMessage('veuillez saisir un email valide.'); 
        } else {
            const response = await fetch('/check-email', {
                method: 'POST',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `email=${email}`
            });
            const dataResponse = await response.json(); 
            console.log('dataResponse',dataResponse); // {result:false} ou {result:true}
            if (dataResponse.result) {
                if (!hasAccount) {
                    setUserMessage('Nous avons trouvé un compte associé à cette adresse email. Vous pouvez vous identifier en entrant votre mot de passe.');
                }
                setEmailCheckedFromBack(true);
                setHasAccount(true);
            } else {
                setHasAccount(false);
            }
        } 
    }
    const checkEmailFormat = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email ? re.test(String(email).toLowerCase()) : false;
    }

    const checkPasswordToLogin = async () => {
        const response = await fetch('/log-in', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `email=${email}&password=${password}`
        });
        const dataResponse = await response.json(); // {login: true, userToken: "N9mwAoACDrKevTGj7aV8zZqKbLhRC2Qs"}
        props.onCheckAccountClick(dataResponse.userToken);
    }

    return (
        <div className='font'>
        <Nav/>
        <div style={styles.container}>
              <h3 style={styles.title}>Connexion</h3>
              <p style={styles.label}>Connectez-vous pour ajouter des livres à votre bibliothèque et à votre liste d'envies.</p>
            <div className="row">
            <div className="order-2 order-md-1 col-12 col-md-6">
              <p style={styles.label}>Saisissez votre adresse email : </p>
              <Input placeholder="victor@hugo.com" prefix={<MailOutlined className="site-form-item-icon" />} onChange={(e)=>setEmail(e.target.value)} value={email}></Input>

              <p style={styles.label}>Avez-vous déjà un compte ?</p>
              <Radio.Group style={{display:'block', marginBottom:'20px'}} onChange={(e)=> setHasAccount(e.target.value)} value={hasAccount}>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px', fontSize:'12px'}} value={false}>Non, je n'ai pas encore de compte.</Radio>
                <Radio style={{display:'block', height:'30px', lineHeight:'30px',fontSize:'12px'}} value={true}>Oui, j'ai déjà un compte.</Radio>
             </Radio.Group>
             <span style={styles.userMsg}>{userMessage}</span>
             {(emailCheckedFromBack===false) &&
                <Button style={styles.btn} onClick={()=> checkAccountEmail()}>Continuer <RightOutlined/></Button>
            }
           
            {emailCheckedFromBack && 
            <div>
                <p style={styles.label}>Saisissez votre mot de passe : </p>
                <Input.Password placeholder="mot de passe" prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e)=> setPassword(e.target.value)} iconRender={visible=>(visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                <Button type='link' style={styles.smallBtn} onClick={()=> console.log("click")}>mot de passe oublié ?</Button>
                <Button style={styles.btn} onClick={()=> checkPasswordToLogin()}>Continuer <RightOutlined/></Button>
                <p style={styles.smallLabel}>En vous connectant et en commandant sur notre site, vous acceptez nos Conditions Générales de Vente et notre politique de protection de données personnelles.</p>
            </div>
            }
            </div>
            <div className="order-1 order-md-2 col-12 col-md-6">
            <Image src={reading} alt='Illustration by Olha Khomich from Icons8'></Image>
            </div>
            </div>
        </div>
        </div>
      );
    }

const styles = {
    container: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#f3f5f7',
        padding:'20px',
        margin: 'auto',
        },
    title: {
        color:"#23396C",
        fontSize: "24px",
        fontWeight: "500",
        marginTop: "20px",
        paddingBottom:"10px"
    },
    label: {
        color:'#000000',
        fontSize:'14px',
        marginTop:'20px',
        marginBottom:'10px'
    },
    smallLabel:{
        color:'#000000',
        fontSize:'10px',
        marginTop:'5px',
        marginBottom:'10px'
      },
    userMsg: {
        color:"#23396C",
        fontSize:'12px',
        fontWeight:'bold',
      },
    btn: {
        marginRight:'10px',
        backgroundColor:'#fca311', 
        fontWeight:'500', 
        color:'#23396c', 
        borderColor:'#fca311', 
        borderRadius:'5px',

    },
    smallBtn:{
        color:'#23396c',
        fontSize:'12px',
        fontWeight:'bold',
        marginTop:'5px',
        marginBottom:'10px'
    }    
}
function mapDispatchToProps(dispatch) {
    return {
      onCheckAccountClick: function(token) {
          dispatch( {type: 'saveToken', token} )
      } 
    }
  }
  function mapStateToProps(state) {
    return { token: state.token }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ConnectionScreen);