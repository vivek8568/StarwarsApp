import { connect } from 'react-redux';

import { attemptLogin } from '../../actions/LoginActions';
import Login from '../presentational/Login';

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

export default connect(mapStateToProps,mapDispatchToProps)(Login);
