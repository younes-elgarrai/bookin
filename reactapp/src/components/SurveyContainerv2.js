import React from 'react';
import {Card} from 'antd';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



var width = '';

function Response(props){

    const classes = useStyles();

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
    return (<Accordion style={dynamicStyle} onClick={()=>handleClick()}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography className={classes.heading}>{props.txt}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
        </Typography>
        </AccordionDetails>
    </Accordion>);

}

function SubResponse(props){

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

    const classes = useStyles();

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
