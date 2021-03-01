export default  function surveyReducer(survey = {favoriteBookStyles:[], 
                                                 favoriteBookPeriod:[],
                                                favoriteBookLength:[]}, action) {

   if(action.type === 'addStyles') {

      var surveyCopy = {...survey}

      var surveyStyles = [...survey.favoriteBookStyles, action.element];

      surveyCopy.favoriteBookStyles = surveyStyles;

      return surveyCopy;
  
    } else if(action.type === 'removeStyles'){

        var surveyCopy2 = {...survey};

        var surveyStyles2 = [...survey.favoriteBookStyles];

        surveyStyles2 = surveyStyles2.filter( e => e!==action.element);

        surveyCopy2.favoriteBookStyles = surveyStyles2;

        return surveyCopy2;

    }else if(action.type === 'addLength') {

      var surveyCopy3 = {...survey}

      var surveyLength3 = [...survey.favoriteBookLength, action.element];

      surveyCopy3.favoriteBookLength = surveyLength3;

      return surveyCopy3;

    }else if(action.type === 'removeLength'){

        var surveyCopy4 = {...survey};

        var surveyLength4 = [...survey.favoriteBookLength];

        surveyLength4 = surveyLength4.filter( e => e!==action.element);

        surveyCopy4.favoriteBookLength = surveyLength4;

        return surveyCopy4;
    

    }else if(action.type === 'addPeriod'){

        var surveyCopy5 = {...survey}

        var surveyPeriod5 = [...survey.favoriteBookPeriod, action.element];
  
        surveyCopy5.favoriteBookPeriod = surveyPeriod5;
  
        return surveyCopy5;

    }else if(action.type === 'removePeriod'){

        var surveyCopy6 = {...survey};

        var surveyPeriod6 = [...survey.favoriteBookPeriod];

        surveyPeriod6 = surveyPeriod6.filter( e => e!==action.element);

        surveyCopy6.favoriteBookPeriod = surveyPeriod6;

        return surveyCopy6;

    }else{

      return survey;

    }
    
   }