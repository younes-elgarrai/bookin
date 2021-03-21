export default  function previousLocationReducer(previousLocation = "/main", action) {
    
    if(action.type==='beforeLogin'){

        return action.previousLocation ;

    }else{
        return previousLocation;
    }





}