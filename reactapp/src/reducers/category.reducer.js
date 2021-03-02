export default  function categoryReducer(category = 'main', action) {
    
    if(action.type==='setCategory'){

        return action.element ;

    }else{
        return category;
    }





}