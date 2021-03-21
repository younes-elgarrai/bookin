import React, {useState} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CardContent from '@material-ui/core/CardContent';
  
import subjects from '../assets/subjects'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);

  function SubResponse(properties){

    var handleClick = ()=>{

        !properties.isSelected&&properties.handleClickAddParent();
         properties.isSelected&&properties.handleClickRemoveParent();
    
        }

    const classes = useStyles();

    var background = properties.isSelected?'#23396C':null;
    var color = properties.isSelected?'#E1E1E1':null;
    var weight = properties.isSelected?'bold':null;


    const dynamicStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: background,
        color: color,
        fontWeight: weight
      };

      const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '16px'
      };


    return(
      <Card  variant="outlined" style={dynamicStyle} onClick={()=>handleClick()}>
        <CardContent style={cardStyle}>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                  <span style={dynamicStyle} className='font' >{properties.txt}</span>
              </Typography>
        </CardContent>
      </Card>);

}

function Response(properties){

  const classes = useStyles();

  console.log('response survey >>>',properties.survey);

  console.log('type >>>',properties.type);

  var responses = properties.type!=='Styles'?<Grid container xs={12} direction="row" justify="center" alignItems="start">
                                          {properties.data.map((elem,index)=>{
                                              return (
                                                  <Grid item xs={12}>
                                                      <SubResponse txt={elem} key={index} handleClickAddParent={()=>properties.handleParentClickAdd({category: 'array', subcategory: elem},properties.type)}
                                                                              handleClickRemoveParent={()=>properties.handleParentClickRemove({category: 'array', subcategory: elem},properties.type)} 
                                                                              isSelected={properties.survey[properties.type]?properties.survey[properties.type].some(e => e === elem):false} />
                                                  </Grid>
                                              );
                                          })}
                                      </Grid>:
                                      <Accordion square expanded={properties.expanded === `panel${properties.index}`} onChange={properties.handleParentChange(`panel${properties.index}`)}>
                                      <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${properties.index}d-content`}
                                      id={`panel${properties.index}d-header`}
                                      >
                                      <Typography className={classes.heading}><span className='font'>{properties.txt}</span></Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                          <Grid container xs={12} direction="row" justify="center" alignItems="start">
                                              {properties.data.map((elem,index)=>{
                                                  return (
                                                      <Grid item xs={6}>
                                                          <SubResponse txt={elem} key={index} handleClickAddParent={()=>properties.handleParentClickAdd({category: properties.txt, subcategory: elem},properties.type)}
                                                                                  handleClickRemoveParent={()=>properties.handleClickParentRemove({category: properties.txt, subcategory: elem},properties.type)} 
                                                                                  isSelected={properties.survey[properties.type][properties.txt]?properties.survey[properties.type][properties.txt].some(e => e === elem):false} />
                                                      </Grid>
                                                  );
                                              })}
                                          </Grid>
                                      </AccordionDetails>
                                  </Accordion>;

return ( responses );

}


function SurveyContainer(props){

    const [expanded, setExpanded] = useState('panel10');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    var handleClickAdd = (e,typ)=>{
      props.add(e,typ)
  }

  var handleClickRemove = (e,typ)=>{
      props.remove(e,typ)
  }

    return(
            <Paper elevation={3} >    
                <Typography><span className='font' style={{display:'flex', justifyContent:'center', color:'#fca311', padding:'20px'}}>{props.question}</span></Typography>
                {props.type==='Styles'?props.array.map((elem, index)=>{
                    return <Response key={index} index={index} handleParentClickAdd={handleClickAdd} handleParentClickRemove={handleClickRemove} handleParentChange={handleChange} txt={elem} type={props.type} survey={props.survey} expanded={expanded} data={Object.keys(subjects[elem])} />
                    }):
                    <Response type={props.type} handleParentClickAdd={handleClickAdd} handleParentClickRemove={handleClickRemove} handleParentChange={handleChange} data={props.array} survey={props.survey} />}

            </Paper>

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
