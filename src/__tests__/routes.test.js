import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import Routes from '../configs/routes';
import LoginContainer from '../components/container/Login';
import LoginComponent from '../components/presentational/Login';
import PlanetSearch from '../components/container/PlanetSearch';
import PrivateRoute from '../components/container/PrivateRoute';

const middlewares = [];
const mockStore = configureMockStore(middlewares);

describe('react router test suites', () => {
  let getState;
  let store;

  beforeEach(() => {
    // initial state of the store
   getState = {
      userDetails : {isLoggedIn : false, username: ''},
      planetsDetail : {lastSearchResult : [], disableSearch: false}
    };
   store = mockStore(getState);
  })

  it('should render Login component when visiting / with isLoggedIn false' , () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Routes />
        </MemoryRouter>
      </Provider>
    )

    expect(component.find(LoginContainer).length).toBe(1);
    expect(component.find(LoginComponent).length).toBe(1);
  })

  it('should render PlanetSearch component when visiting / with isLoggedIn true' , () => {
    store.getState()['userDetails']['isLoggedIn'] = true;
    const component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Routes />
        </MemoryRouter>
      </Provider>
    )

    expect(component.find(PrivateRoute).length).toBe(1);
    expect(component.find(PlanetSearch).length).toBe(1);
  })

  it('should render Login component when visiting /planets with isLoggedIn false' , () => {
    const component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/planets']} initialIndex={0}>
          <Routes />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find(LoginContainer).length).toBe(1);
    expect(component.find(LoginComponent).length).toBe(1);
  })

  it('should render PlanetSearch component when visiting /planets with isLoggedIn true' , () => {
    store.getState()['userDetails']['isLoggedIn'] = true;
    const component = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/planets']} initialIndex={0}>
          <Routes />
        </MemoryRouter>
      </Provider>
    )
    expect(component.find(PrivateRoute).length).toBe(1);
    expect(component.find(PlanetSearch).length).toBe(1);
  })
})
