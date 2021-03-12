import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { Progress, Button, Row, Col} from 'antd';

import '../App.css';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';

import {connect} from 'react-redux';

import SurveyContainer from '../components/SurveyContainerv2';

import subjects from '../assets/subjects'


function SurveyScreen(props) {

const [cookies, setCookie , removeCookie] = useCookies(['survey','token']);


  const updateSurvey = async (surv) => {
      const style = encodeURIComponent(JSON.stringify(surv.Styles));
      const length = encodeURIComponent(surv.Length);
      const period = encodeURIComponent(surv.Period);
      const response = await fetch('/update-survey', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `token=${cookies.token}&styles=${style}&period=&${period}&length=${length}`
      });
      const dataResponse = await response.json();
      
      if (dataResponse.result) {
          console.log('dataResponse',dataResponse); 
      }else {
          console.log('erreur'); 
    
    }
  }


const [step, setStep] = useState(1);

const [finished, setFinished] = useState(false);



var mainSubjects = Object.keys(subjects);

var size = ["J'aime les lectures courtes et rapides",
            "Je préfère les livres ni trop long, ni trop courts",
            "Je n'ai pas peur des pavés!",
            "Je n'ai pas de préférence, tant que le livre est bon"]

var period = ["Classiques", "Nouveautés", "Les deux"]

var questions = ['Quel style de lecture recherchez vous ?', 'Quelle serait votre longueur de livre idéale ?','Etes-vous plutôt ?']

var data = step===1?mainSubjects:step===2?size:period

var type = step===1?'Styles':step===2?'Length':'Period'


var handleNextClick = ()=>{
    setStep(step+1);
    props.setCategory('array');
}

var handleBackClick = ()=>{
    setStep(step-1);
    step-1===1&&props.setCategory('main');
}   

var handleFinishClick = ()=>{
  setCookie('survey', JSON.stringify(props.survey), {path: '/'});
  console.log("survey avant sauvegarde",props.survey);
  cookies.token&&updateSurvey(props.survey);
  setFinished(true);
}


  return (
        <div style={styles.containerStyle} className='font'>
          <Nav />
          <Row justify='center'>
            <Col span={8} >
              <Progress percent={(step-1)*50} status="active" trailColor="#eeeeee" strokeColor='#fca311'/>
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10}>
            <h1 style={styles.h1}>Recevez des suggestions de lecture ({step}/3)</h1>
            </Col>
          </Row>
          
          <Row justify='center'>
            <Col span={10} flex={1} style={styles.blocButtonTop}>
            {step!==1?<Button onClick={()=>handleBackClick()} type="primary" style={styles.btnBack}>Précédent</Button>:null}
            {step!==3?<Button onClick={()=>handleNextClick()} type="primary" style={styles.btnNext}>Suivant</Button>:<Button onClick={()=>handleFinishClick()} type="primary" style={styles.btnOK}>Terminer</Button>}
                                                        
            </Col>
            {finished&&<Redirect to="/main" />}
          </Row>   

          <Row justify='center'>
            <Col span={10}>
              <SurveyContainer style={styles.surveyStyle} type={type} category={props.category} question={questions[step-1]} array={data} />
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10} flex={1} style={styles.blocButton}>
            {step!==1?<Button onClick={()=>handleBackClick()} type="primary" style={styles.btnBack}>Précédent</Button>:null}
            {step!==3?<Button onClick={()=>handleNextClick()} type="primary" style={styles.btnNext}>Suivant</Button>:<Button onClick={()=>handleFinishClick()} type="primary" style={styles.btnOK}>Terminer</Button>}
            </Col>
            {finished&&<Redirect to="/main" />}
          </Row>   
          <Footer />
        </div> 
);
}
const styles = {
  containerStyle: {
    alignItems:'center',
    width:'100%',
    backgroundColor:'#f3f5f7',
  },
  
  // surveyStyle: {
  //   display:'flex',
  //   flexDirection:'column',
  //   alignItems:'center',
  //   width:'100%',
  //   backgroundColor:'red',
  // },

  blocButton: {
    display:'flex', 
    justifyContent:'center', 
    marginBottom:'50px',
    marginTop:'10px',
  },

  blocButtonTop: {
    display:'flex', 
    justifyContent:'center', 
    marginBottom:'10px',
  },

  btnOK: {
    marginRight:'10px',
    backgroundColor:'#fca311', 
    fontWeight:'500', 
    color:'#23396c', 
    borderColor:'#fca311', 
    borderRadius:'5px',
},

btnNext: {
  marginRight:'10px',
  backgroundColor:'#fca311', 
  fontWeight:'500', 
  color:'#23396c', 
  borderColor:'#fca311', 
  borderRadius:'5px',
},

btnBack: {
  marginRight:'10px',
  backgroundColor:'white', 
  fontWeight:'500', 
  color:'#fca311', 
  borderColor:'#fca311', 
  borderRadius:'5px',
},

h1: {
  color:'#23396c',
  textAlign:'center',
  fontSize: '22px',
  fontWeight: '700',
  margin: '0px',
  paddingTop:'20px',
  paddingBottom:'10px',
},

}

function mapDispatchToProps(dispatch) {
  return {
      setCategory: function(e) {
          dispatch({type: 'setCategory', element: e})
      }

  }
}
function mapStateToProps(state) {
    return {survey: state.survey, category: state.category, user: state.user};
  }
export default connect(mapStateToProps, mapDispatchToProps)(SurveyScreen);



