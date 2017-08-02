import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PlanetList from '../components/presentational/PlanetList';

test('PlanetList component should render as expected', () => {
  const planetList = [{"name": "Yavin IV", "population": "1000"}];

  const component = shallow(<PlanetList planetList = { planetList } />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
})

test('PlanetList component should render as expected for multiple entry', () => {
  const planetList = [{"name": "Yavin IV","population": "1000"}, {"name": "Coruscant", "population": "1000000000000"}];

  const component = shallow(<PlanetList planetList = { planetList } />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
})
