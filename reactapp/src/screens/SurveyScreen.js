import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { Progress, Button, Row, Col, Modal} from 'antd';
import '../App.css';

import {connect} from 'react-redux';

import SurveyContainer from '../components/SurveyContainer';

import subjects from '../assets/subjects'

function SurveyScreen(props) {

const [cookies, setCookie] = useCookies(['survey','token']);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

var data = step===1?props.category==='main'?mainSubjects:Object.keys(subjects[props.category])
                   :step===2?size:period

var type = step===1?'Styles':step===2?'Length':'Period'


var handleNextClick = ()=>{
    setStep(step+1);
    props.setCategory('array');
}

var handleBackClick = ()=>{
    setStep(step-1);
    step-1===1&&props.setCategory('main');
}   

var handleConfirmClick = ()=>{
  props.setCategory('main');
}

var handleFinishClick = ()=>{
  setCookie('survey', JSON.stringify(props.survey), {path: '/'})
  console.log("survey avant sauvegarde",props.survey)
  console.log('token?',cookies.token);
  cookies.token&&updateSurvey(cookies.survey)
  setFinished(true);
}


const containerStyle = {
  alignItems:'center',
  width:'100%',
  height: '100vh',
  backgroundColor:'#f3f5f7',
  
}

const surveyStyle = {
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  width:'100%',
  backgroundColor:'#f3f5f7',
}

  return (
        <div style={containerStyle}>
          <Row justify='center'>
            <Col span={8} >
              <Progress percent={(step-1)*50} status="active" trailColor="#eeeeee"/>
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10}>
              <h2>Recevez des suggestions de lecture ({step}/3)</h2>
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10}>
              <SurveyContainer style={surveyStyle} type={type} category={props.category} question={questions[step-1]} array={data} />
            </Col>
          </Row>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Col span={10}>
              <SurveyContainer style={surveyStyle} type={type} category={props.category} question={questions[step-1]} array={data} />
            </Col>
          </Modal>
          <Row justify='center'>
            <Col span={10} flex={1}>
            {step!==1?<Button onClick={()=>handleBackClick()} type="primary">Précédent</Button>:null}
            {['main','array'].indexOf(props.category)!==-1?(step!==3?<Button onClick={()=>handleNextClick()} type="primary">Suivant</Button>:<Button onClick={()=>handleFinishClick()} type="primary" danger>Terminer</Button>)
                                                          :<Button onClick={()=>handleConfirmClick()} type="primary">Confirmer</Button>}
            </Col>
            {finished&&<Redirect to="/main" />}
          </Row>                 
        </div> 
);
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



