export default function libraryReducer(library = [], action) {
    if(action.type === 'addToLibrary'){
    var libraryCopy = [...library];        
    var findBook = false;          
        for(let i=0;i<libraryCopy.length;i++){             
                if(libraryCopy[i].bookId === action.bookId){                 
                    findBook = true             
                };         
        }          
        if(!findBook){             
            libraryCopy.push(action.bookId)         
        }                  
        return libraryCopy
    } 
    else if (action.type === 'DeleteToLibrary') {
        var libraryCopy2 = [...library];
            libraryCopy.splice(action.index,1)     
        return libraryCopy2
    } else if (action.type === 'setLibrary') {
        return action.library
    }
    else {
        return library
    } 
}

