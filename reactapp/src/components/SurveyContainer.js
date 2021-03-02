import React from 'react';
import {Card} from 'antd';

import {connect} from 'react-redux';


function Response(props){

    var background = props.isSelected?'red':null;

    const dynamicStyle = {
        width: '35%',
        textAlign: 'center',
        backgroundColor: background
      };


    var handleClick = ()=>{

    !props.isSelected&&props.handleClickAddParent();
     props.isSelected&&props.handleClickRemoveParent();

    }

    return <Card.Grid style={dynamicStyle} onClick={()=>handleClick()} >{props.txt}</Card.Grid>;

}

function SurveyContainer(props){

    var handleClickAdd = (e,typ)=>{

        props.add(e,typ)
    }

    var handleClickRemove = (e,typ)=>{

        props.remove(e,typ)
    }

    return(
        <div className='survey'>
            <Card title={props.question}>
                {props.array.map((elem, index)=>{
                    return <Response key={index} txt={elem} handleClickAddParent={()=>handleClickAdd(elem,props.type)}
                                                            handleClickRemoveParent={()=>handleClickRemove(elem,props.type)}                
                                                            isSelected={props.survey[props.type].some(e => e === elem)} />
                    })}
            </Card>
        </div>


    );
}


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

    function mapStateToProps(state) {

        return {survey: state.survey};
    }


export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
