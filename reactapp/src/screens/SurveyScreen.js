import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { Progress, Button, Row, Col} from 'antd';
import '../App.css';

import {connect} from 'react-redux';

import SurveyContainer from '../components/SurveyContainer';

function SurveyScreen(props) {

const [cookies, setCookie] = useCookies(['survey']);

const [step, setStep] = useState(1);

const [finished, setFinished] = useState(false);


var subjects = {'BD & Jeunesse': {
                                  'BD, Comics, Manga' : 'subject:"Comics & Graphic Novels"',
                                  'Humour' : 'subject:"Humour"',
                                  'Livre jeunesse' : 'subject:"Juvenile Fiction" OR subject:"Juvenile non fiction"',
                                  'Livre Ados / Young Adults' : 'subject:"Young Adults Fiction" OR subject:"Young Adults nonfiction"'
                                  }, 
                'Littérature & Fiction': { 
                                  'Roman' : 'subject:"Fiction" OR subject:"LITERARY COLLECTIONS"',
                                  'Poésie & théatre' : 'subject:"Poetry" OR subject:"Drama"',
                                  'Thriller, Roman Policier' : 'subject:"Thriller" OR subject:"Roman policier"',
                                  'Fantasy, Science Fiction' : 'subject:"Fantasy" OR subject:"science fiction"'

                                  },
                'Vie Pratique':{
                                  'Cuisine': 'subject:"Cooking" OR subject:"Cuisine"',
                                  'Self Help' : 'subject:"Self Help"',
                                  'Santé, Bien être' : 'subject:"HEALTH & FITNESS" OR subject:"BODY, MIND & SPIRIT" OR subject:"FAMILY & RELATIONSHIPS"', 
                                  'Loisirs Créatifs': 'subject:"CRAFTS AND HOBBIES"'
                                  }, 
                'Art, Culture & Société':{
                                  'Actualités Politique, Economie, Société' : 'subject:"BUSINESS & ECONOMICS" OR subject:"POLITICAL SCIENCE" OR subject;"SOCIAL SCIENCE"', 
                                  'Art, Cinema, Musique': 'subject:"ART" OR subject:"LANGUAGE ARTS & DISCIPLINES" OR subject:"PERFORMING ARTS" OR subject:"PHOTOGRAPHY" OR subject:"MUSIC"',
                                  'Biographie, Autobiographie' : 'subject:"BIOGRAPHY & AUTOBIOGRAPHY"',
                                  'Histoire' : 'subject:"HISTORY"',
                                  'Religion & Spiritualité' : 'subject:"RELIGION"',
                                  'Sciences Humaines' : 'subject:"SOCIAL SCIENCE" OR subject:"PSYCHOLOGY" OR subject:"PHILOSOPHY"'
                                  }, 
                'Nature & Loisirs':{
                                  'Nature, Animaux, Jardin' : 'subject:"NATURE" OR subject:"PETS" OR subject:"GARDENING"',
                                  'Sport, Loisirs, Transport': 'subject:"SPORTS & RECREATION" OR subject:"TRANSPORTATION"',
                                  'Tourisme & Voyage' : 'subject:"TRAVEL"',
                                  }, 
                'Savoirs':{
                                  'Droit' : 'subject:"Law"', 
                                  'Entreprise, Management' : 'subject:"Business & Economics"',
                                  'Livres informatique' : 'subject:"Computers"',
                                  'Science & Médecine' : 'subject:"Science" OR subject:"Medical"'
                }};

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
  console.log(cookies.survey);
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

    return {survey: state.survey, category: state.category};
  }

export default connect(mapStateToProps, mapDispatchToProps)(SurveyScreen);



