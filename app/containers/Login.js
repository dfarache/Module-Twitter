import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TwitterLogin from 'react-twitter-auth';
import { loginSuccess, loginFailed } from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSuccess(response) {
      console.log('success  ', response);
        const token = response.headers.get('x-auth-token');
        response.json().then(user => {
            this.props.onLoginSuccess(token, user);
        });
    }

    onFailed(error) {
      console.log('error  ', error);
        this.props.onLoginError(error);
    }

    render() {
        return this.props.isLogged
            ? <Redirect to={{ pathname: '/profile' }} />
            : (
                <TwitterLogin loginUrl="http://localhost:8080/auth/twitter"
                    requestTokenUrl="http://localhost:8080/auth/twitter/callback"
                    onFailure={this.onFailed} onSuccess={this.onSuccess} />
                );
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return { ...state };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (token, user) => dispatch(loginSuccess(token, user)),
        onLoginError: (err) => dispatch(loginFailed(err.message))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
