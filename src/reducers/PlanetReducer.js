import {
    SEARCH_SUCCESS,
    SEARCH_SESSION_STARTED,
    SEARCH_SESSION_STOPPED,
    INCREMENT_SEARCH_COUNT,
    DECREMENT_SEARCH_COUNT,
    DISABLE_SEARCH,
    SET_LAST_SEARCH_RESULT,
    BLANK_LAST_SEARCH_RESULT
} from '../actions/PlanetActions';

const initialState = {
    searchedPlanets : {},
    lastSearchResult : [],
    timeIntervals : [],
    searchCount : 0,
    disableSearch : false
}

const planetDetails = (state = initialState, action) => {
    switch(action.type){
        case SEARCH_SUCCESS:
            return Object.assign({}, state, {
                lastSearchResult : action.newResult,
                searchedPlanets : action.searchedPlanets
            })
        case INCREMENT_SEARCH_COUNT:
            return Object.assign({}, state, {
                searchCount : state.searchCount + 1
            })
        case DECREMENT_SEARCH_COUNT:
            return Object.assign({}, state, {
                searchCount : state.searchCount - 1,
                disableSearch : false,
            })
        case DISABLE_SEARCH:
            return Object.assign({}, state, {
                disableSearch : true
            })
        case SET_LAST_SEARCH_RESULT:
            return Object.assign({}, state, {
                lastSearchResult : action.result
            })
        case BLANK_LAST_SEARCH_RESULT:
            return Object.assign({}, state, {
                lastSearchResult : []
            })
        default :
            return state
    }
}

export default planetDetails;