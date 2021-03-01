import React from 'react';
import {Card} from 'antd';



function SurveyContainer(props){

    return(
        <div className='survey'>
            <Card title={props.question}>
                {props.array.map((elem, index)=>{
                    return <Card.Grid key={index} style={gridStyle}>{elem}</Card.Grid>
                    })}
            </Card>
        </div>


    );
}

const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

export default SurveyContainer;