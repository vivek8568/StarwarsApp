import { ATTEMPT_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/LoginActions';

const initialState = {
    loginAttempted : false,
    username : '',
    isLoggedIn : false,
    loginFailed : false
}

const LoginReducer = (state = initialState ,action) => {
    switch(action.type){
        case ATTEMPT_LOGIN :
            return Object.assign({}, state, {
                loginAttempted : true
            });
        case LOGIN_SUCCESS :
            return Object.assign({}, state, {
                username : action.username,
                isLoggedIn : true,
                loginFailed : false
            });
        case LOGIN_FAILURE :
            return Object.assign({}, state, {
                loginFailed : true,
                isLoggedIn : false,
                username : ""
            });
         default :
            return state
    }
}

export default LoginReducer;