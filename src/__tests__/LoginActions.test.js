import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  loginSuccess,
  LOGIN_FAILURE,
  loginFailure,
  attemptLogin
} from '../actions/LoginActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login action creaters testing', () => {
  afterEach(() => {
    nock.cleanAll();
  })

  it('loginSuccess action should work as expected', () => {
    const username = "Luke Skywalker";
    const expectedAction = {
      type : LOGIN_SUCCESS,
      username
    }
    expect(loginSuccess(username)).toEqual(expectedAction);
  })

  it('loginFailure action should work as expected', () => {
    const expectedAction = {
      type : LOGIN_FAILURE,
    }
    expect(loginFailure()).toEqual(expectedAction);
  })

  it('attemptLogin action should work as expected when credentials are wrong', () => {
    const username = 'Luke Skywalker';
    const password = '10BBY';
    nock('http://swapi.co/api/')
      .get('/people/')
      .query({search : username})
      .reply('200',{results: [{"name": "Luke Skywalker", "birth_year": "19BBY"}]})

    const expectedActions = [
      {type : ATTEMPT_LOGIN},
      {type : LOGIN_FAILURE}
    ]
    const store = mockStore();

    return store.dispatch(attemptLogin(username, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  it('attemptLogin action should work as expected when credentials are correct', () => {
    const username = 'Luke Skywalker';
    const password = '19BBY';
    nock('http://swapi.co/api/')
      .get('/people/')
      .query({search : username})
      .reply('200',{results: [{"name": "Luke Skywalker", "birth_year": "19BBY"}]})

    const expectedActions = [
      {type : ATTEMPT_LOGIN},
      {type : LOGIN_SUCCESS, username}
    ]
    const store = mockStore();

    return store.dispatch(attemptLogin(username, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })
})
