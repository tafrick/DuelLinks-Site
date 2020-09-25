import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import * as actions from '../../store/actions/index';

const CLIENT_ID = '279997987803-f2h36h062o54qrsivs9se064kns1bai8.apps.googleusercontent.com';

class GoogleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            accessToken: '',
            username: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {
        if (response.accessToken) {
            this.setState({
                isLogined: true,
                accessToken: response.accessToken
            });
            axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + response.accessToken)
                .then(response => {
                    console.log(response)
                    this.props.onAuth(this.state.accessToken, response.data.email, response.data.given_name)
                    this.setState({ username: response.data.given_name })
                })
                .catch(error => {
                    console.error({ message: error.message })
                })
        }
    }

    logout(response) {
        this.setState({
            isLogined: false,
            accessToken: ''
        });
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }

    render() {
        return (
            <div>
                {this.state.isLogined ?
                    <GoogleLogout
                        clientId={CLIENT_ID}
                        buttonText='Logout'
                        onLogoutSuccess={this.logout}
                        onFailure={this.handleLogoutFailure} />
                    : <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText='Login'
                        onSuccess={this.login}
                        onFailure={this.handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
                {this.state.accessToken ? <h3>Welcome: {this.state.username}!</h3> : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (token, email, uname) => dispatch(actions.auth(token, email, uname))
    };
};

export default connect(null, mapDispatchToProps)(GoogleBtn);