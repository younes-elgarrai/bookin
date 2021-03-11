import React from 'react';
import {Card} from 'antd';

import {connect} from 'react-redux';

var width = '';

function Response(props){

    var background = props.isSelected?'#23396C':null;
    var color = props.isSelected?'#E1E1E1':null;
    var weight = props.isSelected?'bold':null;


    const dynamicStyle = {
        width: width,
        textAlign: 'center',
        backgroundColor: background,
        color: color,
        fontWeight: weight
      };


    var handleClick = ()=>{

    !props.isSelected&&props.handleClickAddParent();
     props.isSelected&&props.handleClickRemoveParent();

    }

    return <Card.Grid style={dynamicStyle} onClick={()=>handleClick()} >{props.txt}</Card.Grid>;

}

function SurveyContainer(props){


    // width = props.type!=='Length'?'33%':'100%';

    width="100%";

    var handleClickAdd = (e,typ)=>{
        
        props.add(e,typ)
        props.category==='main'&&props.setCategory(e.subcategory);
    }

    var handleClickRemove = (e,typ)=>{

        props.remove(e,typ)
    }

    const cardStyle = {
        justifyContent: 'center',
    }

    return(
        <div className='survey'>
            <Card  title={<span className="font">{props.question}</span>} style={cardStyle} >
                {props.array.map((elem, index)=>{
                    return <Response key={index} txt={elem} handleClickAddParent={()=>handleClickAdd({category: props.category, subcategory: elem},props.type)}
                                                            handleClickRemoveParent={()=>handleClickRemove({category: props.category, subcategory: elem},props.type)}                
                                                            isSelected={props.category==='main'?Object.keys(props.survey[props.type]).some(e => e === elem)
                                                                                             :props.category==='array'?props.survey[props.type].some(e => e === elem)
                                                                                             :props.survey[props.type][props.category].some(e => e === elem)} />
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
        },
        setCategory: function(e) {
            dispatch({type: 'setCategory', element: e})
        }

    }
}

    function mapStateToProps(state) {

        return {survey: state.survey};
    }


export default connect(mapStateToProps, mapDispatchToProps)(SurveyContainer);
