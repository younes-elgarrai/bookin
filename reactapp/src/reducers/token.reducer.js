export default function tokenReducer(token = null, action) {
    if(action.type==='saveToken'){
        return action.token ;
    } else if (action.type==='deleteToken'){
        const logOutToken = null;
        return logOutToken;
    } else {
        return token;
    }
}