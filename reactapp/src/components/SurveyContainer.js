import React, {useState} from 'react';
import {Card} from 'antd';

import {connect} from 'react-redux';




function SurveyContainer(props){

    const [active, setActive] = useState(false);

    var toggle = (e,typ)=>{

        setActive(!active);

        var func = active?props.remove:props.add;

        func(e,typ);

    }

    const background = active?'red':null;

    return(
        <div className='survey'>
            <Card title={props.question}>
                {props.array.map((elem, index)=>{
                    return <Card.Grid key={index} style={{...gridStyle, backgroundColor: background}} onClick={()=>toggle(elem, props.type)}>{elem}</Card.Grid>
                    })}
            </Card>
        </div>


    );
}

const gridStyle = {
    width: '35%',
    textAlign: 'center',
  };



  function mapDispatchToProps(dispatch) {

    return {
        add: function (e, typ) {
            dispatch({type: 'add'+typ, element: e })
        },
        remove: function (e, typ) {
            dispatch({type: 'remove'+typ, element: e })
        }

    }
}


export default connect(null, mapDispatchToProps)(SurveyContainer);
