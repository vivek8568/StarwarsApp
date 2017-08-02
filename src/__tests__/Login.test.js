import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Login from '../components/presentational/Login';

let props = { isLoggedIn : false, doLogin : () =>{} };

test('Component should render when user is not logged in', () => {
  const component = shallow(<Login userDetails={props} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
})

test("Component should render when user's credentials are wrong", () => {
  const component = shallow(<Login userDetails={props} />);
  component.setState({
    loginError : true
  });
  expect(component.find('span.error').text()).toBe('Invalid username or password.');
})

test('Component should render when user successfully logged in', () => {
  props.isLoggedIn = true;
  const component = shallow(<Login userDetails={props} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
})
