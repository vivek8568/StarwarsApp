import { combineReducers } from 'redux';

import userDetails from './LoginReducer';
import planetsDetail from './PlanetReducer';

export default combineReducers({
    userDetails,
    planetsDetail
})