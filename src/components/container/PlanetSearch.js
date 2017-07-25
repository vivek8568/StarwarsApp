import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PlanetList from '../presentational/PlanetList';
import {searchPlanet, blankSearchResult} from '../../actions/PlanetActions';

const mapStateToProps = (state) => {
    return {
        username : state.userDetails.username,
        planetList : state.planetsDetail.lastSearchResult,
        disableSearch : state.planetsDetail.disableSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchPlanet : (keyword) => {
            dispatch(searchPlanet(keyword));
        },
        blankSearchResult : () => {
            dispatch(blankSearchResult())
        }
    }
}

class PlanetSearch extends Component{
    constructor(props){
        super(props);
    }

    handleInputChange(event) {
        const value = event.target.value;

        if(value){
            this.props.searchPlanet(value);
        }else{
            this.props.blankSearchResult()
        }
    }

    render(){
        return(
            <div>
                <span className="welcomeText" >Welcome {this.props.username}!</span>
                <input
                    type="text"
                    name = "searchKeyword"
                    placeholder="Search planets"
                    onChange = {this.handleInputChange.bind(this)}
                    disabled = {this.props.disableSearch}
                />
                {this.props.disableSearch &&
                    <span className="error">Your search for this interval has been completed. Please try again later!</span>
                }
                <PlanetList planetList = {this.props.planetList} />
            </div>
        )
    }
}

PlanetSearch.propTypes = {
    username : PropTypes.string.isRequired,
    planetList : PropTypes.array.isRequired,
    disableSearch : PropTypes.bool.isRequired,
    searchPlanet : PropTypes.func.isRequired,
    blankSearchResult : PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanetSearch);