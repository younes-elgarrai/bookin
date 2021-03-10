export default  function mainReducer(value = 0, action) {
    
    if(action.type==='setTab'){

        return action.value ;

    }else{
        return value;
    }
}