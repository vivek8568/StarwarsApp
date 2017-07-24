import fetch from 'isomorphic-fetch';

export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_SESSION_STARTED = "SEARCH_SESSION_STARTED";
export const SEARCH_SESSION_STOPPED = "SEARCH_SESSION_STOPPED";
export const INCREMENT_SEARCH_COUNT = "INCREMENT_SEARCH_COUNT";
export const DECREMENT_SEARCH_COUNT = "DECREMENT_SEARCH_COUNT";
export const DISABLE_SEARCH = "DISABLE_SEARCH";
export const SET_LAST_SEARCH_RESULT = "SET_LAST_SEARCH_RESULT";
export const BLANK_LAST_SEARCH_RESULT = "BLANK_LAST_SEARCH_RESULT";

export const searchSuccess = (result, keyword) => {
    return (dispatch, getState) => {
        let newResult = [];
        let searchedPlanets = getState().planetsDetail.searchedPlanets;

        if(result.length > 0){
            newResult = result.sort((a,b) => {
                return (a.population != 'unknown') ? b.population - a.population : 1;
            })
        }

        searchedPlanets[keyword] = newResult;

        dispatch({type: SEARCH_SUCCESS, newResult, searchedPlanets});
    }
}

export const authoriseUser = (keyword) => {
    return (dispatch, getState) => {
        const planetsDetail = getState().planetsDetail;

        dispatch({type : INCREMENT_SEARCH_COUNT})
        setTimeout(() => {
            dispatch({type : DECREMENT_SEARCH_COUNT})
        }, 60000);

        if(planetsDetail.searchCount >= 14){
            dispatch({type: DISABLE_SEARCH})
        }
    }
}

export const searchPlanet = (keyword) => {
    return (dispatch, getState) => {

          const userDetails = getState().userDetails;
          const planetsDetail = getState().planetsDetail;

          if(userDetails.username != "Luke Skywalker"){
            dispatch(authoriseUser(keyword));
          }

          if(planetsDetail.searchedPlanets[keyword]){
                dispatch(setLastSearchResult(planetsDetail.searchedPlanets[keyword]));
          }else{
                return fetch('http://swapi.co/api/planets/?search='+keyword)
                     .then(
                         response => response.json(),
                         error => console.log('An error occured while planet search.', error)
                     )
                     .then(json => {
                             dispatch(searchSuccess(json.results, keyword))
                        }
                     )
          }
    }
}

export const blankSearchResult = () => {
    return ({type : BLANK_LAST_SEARCH_RESULT})
}

export const setLastSearchResult = (result) => {
    return {type: SET_LAST_SEARCH_RESULT, result}
}