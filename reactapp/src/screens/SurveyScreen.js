import React, {useState} from 'react';
import { Progress, Avatar, Button, Comment, Row, Col, Image, Rate, Layout} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../App.css';

import SurveyContainer from '../components/SurveyContainer';

function SurveyScreen() {

const [step, setStep] = useState(1);

var subjects = ['Roman', 'Histoire', 'BD', 'Santé', 'Politique', 'Jeunesse'];


  return (
        <div className='container'>
            <Progress style={{width: '33%'}} percent={50} status="active" />
            <h1>Recevez des suggestions de lecture ({step}/3)</h1>
            <SurveyContainer question='Quel style?' array={subjects} />
            <Button type="primary">Suivant</Button>
        </div> 
);
}

export default SurveyScreen;


