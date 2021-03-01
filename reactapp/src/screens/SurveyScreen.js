import React, {useState} from 'react';
import { Progress, Avatar, Button, Comment, Row, Col, Image, Rate, Layout} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';

import {connect} from 'react-redux';

import SurveyContainer from '../components/SurveyContainer';

function SurveyScreen(props) {

const [step, setStep] = useState(1);


var subjects = ['Roman', 'Histoire', 'BD', 'Santé', 'Politique', 'Jeunesse'];

var size = ["J'aime les lectures courtes et rapides",
            "Je préfère les livres ni trop long, ni trop courts",
            "Je n'ai pas peur des pavés!",
            "Je n'ai pas de préférence, tant que le livre est bon"];

var period = ["Classiques", "Nouveautés", 'Les deux'];

var questions = ['Quel style ?', 'Quelle serait votre longueur de livre idéale ?','Etes-vous plutôt ?']

var data = step===1?subjects:step===2?size:period

var type = step===1?'Styles':step===2?'Length':'Period'

var handleNextClick = ()=>{
    setStep(step+1);
}

var handleBackClick = ()=>{
    setStep(step-1);
}

console.log(props.survey);


  return (
        <div className='container'>
            <Progress style={{width: '33%'}} percent={(step-1)*50} status="active" />
            <h1>Recevez des suggestions de lecture ({step}/3)</h1>
            <SurveyContainer type={type} question={questions[step-1]} array={data} />
            {step!==1?<Button onClick={()=>handleBackClick()} type="primary">Précédent</Button>:null}
            {step!==3?<Button onClick={()=>handleNextClick()} type="primary">Suivant</Button>
                     :<Button type="primary" danger>Terminer</Button>}
        </div> 
);
}


function mapStateToProps(state) {

    return {survey: state.survey};
  }

export default connect(mapStateToProps, null)(SurveyScreen);



