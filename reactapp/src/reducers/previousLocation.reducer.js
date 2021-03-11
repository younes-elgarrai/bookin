export default  function previousLocationReducer(previousLocation = null, action) {
    
    if(action.type==='beforeLogin'){

        return action.previousLocation ;

    }else{
        return previousLocation;
    }





}