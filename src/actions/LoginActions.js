import fetch from 'isomorphic-fetch';

export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const loginSuccess = (username) => {
    return {type : LOGIN_SUCCESS, username}
}

const loginFailure = () => {
    return {type : LOGIN_FAILURE}
}

export const attemptLogin = (username, password) => {
  return dispatch => {
        dispatch({type : ATTEMPT_LOGIN});

       return fetch('http://swapi.co/api/people/?search='+username)
            .then(
                response => response.json(),
                error => console.log('An error occured while login.', error)
            )
            .then(json => {
                    if(json.results.length != 0 && json.results[0].birth_year === password){
                        dispatch(loginSuccess(json.results[0].name))
                    }else{
                        dispatch(loginFailure())
                    }
               }
            )
  }
}
