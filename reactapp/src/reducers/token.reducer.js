export default function tokenReducer(token = null, action) {
    if(action.type==='saveToken'){
        console.log('action.token in reducer', action.token);
        return action.token ;
    } else if (action.type==='deleteToken'){
        console.log('action.token in delete reducer', token);
        return token;
    } else {
        return token;
    }
}