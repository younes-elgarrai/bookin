export default  function surveyReducer(survey = {Styles:[], Period:[], Length:[]}, action) {

   if(action.type === 'addStyles') {

      var surveyCopy = {...survey}

      var surveyStyles = [...survey.Styles, action.element];

      surveyCopy.Styles = surveyStyles;

      return surveyCopy;
  
    } else if(action.type === 'removeStyles'){

        var surveyCopy2 = {...survey};

        var surveyStyles2 = [...survey.Styles];

        surveyStyles2 = surveyStyles2.filter( e => e!==action.element);

        surveyCopy2.Styles = surveyStyles2;

        return surveyCopy2;

    }else if(action.type === 'addLength') {

      var surveyCopy3 = {...survey}

      surveyCopy3.Length = [action.element];

      return surveyCopy3;

    }else if(action.type === 'removeLength'){

        var surveyCopy4 = {...survey};

        var surveyLength4 = [...survey.Length];

        surveyLength4 = surveyLength4.filter( e => e!==action.element);

        surveyCopy4.Length = surveyLength4;

        return surveyCopy4;
    

    }else if(action.type === 'addPeriod'){

        var surveyCopy5 = {...survey}
  
        surveyCopy5.Period = [action.element];
  
        return surveyCopy5;

    }else if(action.type === 'removePeriod'){

        var surveyCopy6 = {...survey};

        var surveyPeriod6 = [...survey.Period];

        surveyPeriod6 = surveyPeriod6.filter( e => e!==action.element);

        surveyCopy6.Period = surveyPeriod6;

        return surveyCopy6;

    }else{

      return survey;

    }
    
   }