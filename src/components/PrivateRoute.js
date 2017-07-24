import React, {Component} from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import {connect} from 'react-redux';

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

export default connect(mapStateToProps)(PrivateRoute);