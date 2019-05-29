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
        });
    }
    componentDidMount = () => {
        if (this.props.auth == 'signup') {
            this._registerUser();
        }
        this._getUserInfo();
    }

    _getUserInfo = async () => {
        AccessToken.getCurrentAccessToken().then(
        (data) => {
            this.setState({accessToken: data.accessToken.toString()})
        }).then(() => {
            AsyncStorage.setItem('@AccessToken', this.state.accessToken).then(() => {
                console.log("stored access token");
                console.log(this.state.accessToken);
            });
        });// end getCurrentAccessToken
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
                        // alert("Login was successful with permissions: " + result.grantedPermissions);
                        this.props.nav.navigate('App');
                    }
                }
            }
            onLogoutFinished={() => alert("User logged out")}/>
            </View>
        );
    }
};

module.exports = FBLoginButton;
