export default  function surveyReducer(survey = {Styles:{void:[]}, Period:[], Length:[]}, action) {

   if(action.type === 'addStyles') {

      var surveyCopy = {...survey}

      var surveyStylesCopy = {...survey.Styles}

      if(surveyStylesCopy[action.element.category]){

        var arrayCopy = surveyStylesCopy[action.element.category];

        surveyStylesCopy[action.element.category] = [...arrayCopy, action.element.subcategory]
  
        surveyCopy.Styles = surveyStylesCopy;
  
        return surveyCopy;


      }else{

        surveyStylesCopy[action.element.category] = [];

        var arrayCopy2 = surveyStylesCopy[action.element.category];

        surveyStylesCopy[action.element.category] = [...arrayCopy2, action.element.subcategory]
  
        surveyCopy.Styles = surveyStylesCopy;
  
        return surveyCopy;

      }

  
    } else if(action.type === 'removeStyles'){


      var surveyCopy2 = {...survey};

      var surveyStyles2 = {...survey.Styles};

        surveyStyles2[action.element.category] = surveyStyles2[action.element.category].filter( e => e!==action.element.subcategory);


        if(surveyStyles2[action.element.category]==[]){

          delete surveyStyles2[action.element.category];
  
  
        }

        surveyCopy2.Styles = surveyStyles2;


        return surveyCopy2;
  
    }else if(action.type === 'addLength') {

      var surveyCopy3 = {...survey}

      surveyCopy3.Length = [action.element.subcategory];

      return surveyCopy3;

    }else if(action.type === 'removeLength'){

        var surveyCopy4 = {...survey};

        var surveyLength4 = [...survey.Length];

        surveyLength4 = surveyLength4.filter( e => e!==action.element.subcategory);

        surveyCopy4.Length = surveyLength4;

        return surveyCopy4;
    

    }else if(action.type === 'addPeriod'){

        var surveyCopy5 = {...survey}
  
        surveyCopy5.Period = [action.element.subcategory];
  
        return surveyCopy5;

    }else if(action.type === 'removePeriod'){

        var surveyCopy6 = {...survey};

        var surveyPeriod6 = [...survey.Period];

        surveyPeriod6 = surveyPeriod6.filter( e => e!==action.element.subcategory);

        surveyCopy6.Period = surveyPeriod6;

        return surveyCopy6;

    }else{

      return survey;

    }
    
   }