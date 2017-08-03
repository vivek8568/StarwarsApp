import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions/LoginActions';
import LoginReducer from '../reducers/LoginReducer';

describe('Login reducer testing', () => {
  let initialState = {
      loginAttempted : false,
      username : '',
      isLoggedIn : false,
      loginFailed : false
  }

  it('should return the initial state as expected', () => {
    expect(LoginReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ATTEMPT_LOGIN as expected', () => {
    expect(LoginReducer(initialState, {type: ATTEMPT_LOGIN})).toEqual({
      loginAttempted : true,
      username : '',
      isLoggedIn : false,
      loginFailed : false
    })
  })

  it('should handle LOGIN_SUCCESS as expected', () => {
    initialState['loginFailed'] = true;
    initialState['loginAttempted'] = true;
    expect(LoginReducer(initialState, {type: LOGIN_SUCCESS, username: 'Luke Skywalker'})).toEqual({
      loginAttempted : true,
      username : 'Luke Skywalker',
      isLoggedIn : true,
      loginFailed : false
    })
  })

  it('should handle LOGIN_FAILURE as expected', () => {
    initialState['username'] = 'Luke Skywalker';
    initialState['loginAttempted'] = true;
    initialState['isLoggedIn'] = true;
    expect(LoginReducer(initialState, {type: LOGIN_FAILURE})).toEqual({
      loginAttempted : true,
      username : '',
      isLoggedIn : false,
      loginFailed : true
    })
  })
})
