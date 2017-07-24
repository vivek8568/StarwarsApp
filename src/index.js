import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './components/Login';
import PlanetSearch from './components/PlanetSearch';
import Routes from './routes';
import store from './store';

require('./styles/style.css')

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if(module.hot){
    module.hot.accept();
}