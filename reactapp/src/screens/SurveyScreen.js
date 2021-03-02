import React, {useState} from 'react';
import { Progress, Button, Row, Col} from 'antd';
import '../App.css';

import {connect} from 'react-redux';

import SurveyContainer from '../components/SurveyContainer';

function SurveyScreen(props) {

const [step, setStep] = useState(1);


var subjects = {'BD & Jeunesse': {
                                  'BD, Comics, Manga' : 'subject:"Comics & Graphic Novels"',
                                  'Humour' : 'subject:"Humour"',
                                  'Livre jeunesse' : 'subject:"Juvenile Fiction" OR subject:"Juvenile non fiction"',
                                  'Livre Ados / Young Adults' : 'subject:"Young Adults Fiction" OR subject:"Young Adults nonfiction"'
                                  }, 
                'Littérature & Fiction': { 
                                  'Roman' : 'subject:"Fiction" OR subkject:"LITERARY COLLECTIONS"',
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
            "Je n'ai pas de préférence, tant que le livre est bon"];

var period = ["Classiques", "Nouveautés", 'Les deux'];

var questions = ['Quel style ?', 'Quelle serait votre longueur de livre idéale ?','Etes-vous plutôt ?']

var data = step===1?mainSubjects:step===2?size:period

var type = step===1?'Styles':step===2?'Length':'Period'

var category = step===1?'main':step===2?'array':'array'



var handleNextClick = ()=>{
    setStep(step+1);
}

var handleBackClick = ()=>{
    setStep(step-1);
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
              <h1>Recevez des suggestions de lecture ({step}/3)</h1>
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10}>
              <SurveyContainer style={surveyStyle} type={type} category={category} subjects={subjects} question={questions[step-1]} array={data} />
            </Col>
          </Row>
          <Row justify='center'>
            <Col span={10} flex={1}>
            {step!==1?<Button onClick={()=>handleBackClick()} type="primary">Précédent</Button>:null}
            {step!==3?<Button onClick={()=>handleNextClick()} type="primary">Suivant</Button>
                     :<Button type="primary" danger>Terminer</Button>}
            </Col>

          </Row>

            
            
        </div> 
);
}


function mapStateToProps(state) {

    return {survey: state.survey};
  }

export default connect(mapStateToProps, null)(SurveyScreen);



