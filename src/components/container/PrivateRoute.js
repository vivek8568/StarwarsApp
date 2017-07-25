import React, {Component} from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
    return{
        isLoggedIn : state.userDetails.isLoggedIn
    }
}

const PrivateRoute = ({ component: Component, isLoggedIn, path }) => (
    <Route path = {path} render = {props => (
        isLoggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname : '/',
                state : { from : props.loaction }
            }} />
        )
    )} />
)

PrivateRoute.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(PrivateRoute);