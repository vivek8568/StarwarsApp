import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import update from 'immutability-helper';

import Login from '../components/presentational/Login';

describe('Login component rendering testing', () => {
  let userDetails = {isLoggedIn : false };

  it('Component should render when user is not logged in', () => {
    const component = shallow(<Login userDetails={userDetails} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  })

  it('Component should render when user successfully logged in', () => {
    const component = shallow(<Login userDetails={userDetails} />);
    component.setProps({userDetails: update(userDetails, {isLoggedIn: {$set : true}})});
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  })
})

describe('Login component lifecycle methods or custom methods testing', () => {
  let userDetails = {isLoggedIn : false, loginFailed: false};
  let doLogin = jest.fn();

  it('handleFormSubmit should work as expected on form submitting', () => {
    const component = mount(<Login userDetails={userDetails} doLogin={doLogin} />);
    const preventDefault = function() {};
    component.find('form').simulate('submit', { preventDefault });
    expect(component.instance().props.doLogin).toBeCalled();
  })

  it('handleInputChange should work as expected while user input some text', () => {
    const target = {
      name : 'username',
      value : 'vivek'
    }
    const component = mount(<Login userDetails={userDetails} doLogin={doLogin} />);
    component.find('input[name="username"]').simulate('change', {target});
    expect(component.state()[target.name]).toBe(target.value);
  })

  it("componentWillUpdate should work as expected when login failed", () => {
    const component = mount(<Login userDetails={userDetails} doLogin={doLogin} />);
    component.setProps({userDetails: update(userDetails, {loginFailed: {$set : true}})});
    expect(component.state().loginError).toBe(true);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  })
})
