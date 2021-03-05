export default function tokenReducer(token = null, action) {
    if(action.type==='saveToken'){
        console.log('action.token in reducer', action.token);
        return action.token ;
    } else if (action.type==='deleteToken'){
        const logOutToken = null;
        console.log('action.token in delete reducer', logOutToken);
        return logOutToken;
    } else {
        return token;
    }
}