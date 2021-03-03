export default function tokenReducer(token = '', action) {
    if(action.type==='saveToken'){
        console.log('action.token in reducer', action.token);
        return action.token ;
    } else if (action.type==='deleteToken'){
        return token;
    } else {
        return token;
    }
}