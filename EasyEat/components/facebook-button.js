import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { AccessToken } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props);
        this.state = ({
            auth: this.props.auth,
            accessToken: "",
            loading: false
        });
    }

    appInfo = () => {
        console.log(this.props.auth)
        if (this.props.auth == 'signup') {
            this._registerUser();
        }
        this._getUserInfo();
        return "registered users";
    }

    _getUserInfo = async () => {
        AccessToken.getCurrentAccessToken()
        .then((data) => {
            this.setState({accessToken: data.accessToken.toString()})
        })
        .then(() => {
            this._getData();
            AsyncStorage.setItem('@AccessToken', this.state.accessToken).then(() => {
                this.props.nav.navigate('App');
                console.log("stored access token");
                console.log(this.state.accessToken);
            });
        });// end getCurrentAccessToken
    }

    _getData = () => {

        fetch(`https://graph.facebook.com/me?access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                fbID: res.id,
            });
            console.log(res.id);
            console.log(this.state.accessToken);
        })
        .catch((err) => console.log('error occurred', err.message));
    }

    _registerUser = () => {
        fetch('https://lit-mountain-47024.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                facebook_id: this.state.fbId,
                name: this.state.name,
            }),
        }).then(() => {
            console.log("registered user in database")
        });
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
                        this.appInfo();
                    }
                }
            }
            onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;
