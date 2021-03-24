export default function wishlistReducer(wishList = [], action) {
    if(action.type === 'addToWishList'){
        var wishListCopy = [...wishList];        
        !wishListCopy.some(element=>element.bookId===action.bookId)&&wishListCopy.push(action.bookId)              
        return wishListCopy
    } else if (action.type === 'DeleteToWishList') {
        var wishListCopy2 = [...wishList];
        wishListCopy2.splice(action.index,1)     
        return wishListCopy2
    } else if (action.type === 'setWishlist') {
        return action.wishlist   
    } else {
        return wishList
    } 
}

