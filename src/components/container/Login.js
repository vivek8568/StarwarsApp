import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { attemptLogin } from '../../actions/LoginActions';

const mapStateToProps = (state) => {
    return{
        userDetails : state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        doLogin : (username, password) => {
            dispatch(attemptLogin(username, password))
        }
    }
}

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            username : '',
            password : '',
            loginError : false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillUpdate(nextProps){
        if(nextProps.userDetails.loginFailed && nextProps.userDetails.loginFailed !== this.props.userDetails.loginFailed) {
            this.setState({loginError : true})
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.doLogin(this.state.username, this.state.password)
    }

    render(){

        const { from } =  { from  : { pathname : '/planets'} };

        if(this.props.userDetails.isLoggedIn){
            return (
                <Redirect to={from} />
            )
        }

        return(
            <div className = "center">
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="form_field">
                        <label className= "fieldHeading">
                            Username:
                        </label>
                        <span >
                            <input
                                type="text"
                                name = "username"
                                placeholder="Enter your username"
                                value = {this.state.username}
                                onChange = {this.handleInputChange}
                                required
                            />
                        </span>
                    </div><br />

                    <div className="form_field">
                        <label className= "fieldHeading">
                            Password:
                        </label>
                        <span >
                            <input
                                type="password"
                                name = "password"
                                placeholder="Enter your password"
                                value = {this.state.password}
                                onChange = {this.handleInputChange}
                                required
                            />
                     </span>
                     </div><br />
                     {
                        this.state.loginError &&
                        <span className="error">Invalid username or password.</span>
                     }
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

Login.propTypes = {
    userDetails : PropTypes.object.isRequired,
    doLogin : PropTypes.func.isRequired
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);