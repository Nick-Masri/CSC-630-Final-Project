import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import { AccessToken } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props);
        this.state = ({
            auth: this.props.auth,
        });
    }

    handleLogin = async () => {
        if (this.props.auth == 'signup') {
            await this._registerUser()
        }
        this.props.nav.navigate('AuthLoading');
    }

    _registerUser = async () => {
        const token = await this._getAccessToken();
        const data = await this._getID(token);
        fetch('https://lit-mountain-47024.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                facebook_id: data.id,
                name: data.name,
            }),
        }).then(() => {
            console.log("registered user in database");
        });
    }

    _getAccessToken = () => {
        AccessToken.getCurrentAccessToken().then((res) => {
            return res.accessToken.toString()
        });
    }

    _getID = (token) => {
        fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then((response) => response.json())
        .then((res) => {
            return ({id: res.id, name:res.name});
        })
        .catch((err) => console.log('error occurred', err.message));
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
