import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { AccessToken } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props);

    }

    handleLogin = async () => {
        if (this.props.auth == 'signup') {
            await this._registerUser()
        }
        this.props.nav.navigate('AuthLoading');
    }

    _registerUser = async () => {
        AccessToken.getCurrentAccessToken().then((accessToken) => {
            token = accessToken.accessToken.toString();
            fetch(`https://graph.facebook.com/me?access_token=${token}`)
            .then((response) => response.json())
            .then((res) => {

                fetch('https://lit-mountain-47024.herokuapp.com/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        facebook_id: res.id,
                        name: res.name,
                    }),
                }).then(() => {
                    console.log("registered user in database");
                });
            })
        })
    }

    render() {
        return (
            <View>
            <LoginButton
            onLoginFinished={
                (error, result) => {
                    if (error) {
                        alert("Login failed with error: " + error.message);
                    } else if (result.isCancelled) {
                        alert("Login was cancelled");
                    } else {
                        this.handleLogin();
                    }
                }
            }
            onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;
