export default function libraryReducer(library = [], action) {
    if(action.type === 'addToLibrary'){
        var libraryCopy = [...library];        
        !libraryCopy.some(element=>element.bookId===action.bookId)&&libraryCopy.push(action.bookId)                         
        return libraryCopy
    } 
    else if (action.type === 'DeleteToLibrary') {
        var libraryCopy2 = [...library];
            libraryCopy2.splice(action.index,1)     
        return libraryCopy2
    } else if (action.type === 'setLibrary') {
        return action.library
    }
    else {
        return library
    } 
}

