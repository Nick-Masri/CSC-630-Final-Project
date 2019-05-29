import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props);
        this.state({
            auth: this.props.auth,
            accessToken: "",
            fbID: "",
            name: "",
        })
    }

    getUserInfo = () => {
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                fetch(`https://graph.facebook.com/me?access_token=${data.accessToken.toString()}`)
                .then((response) => response.json())
                .then((res) => {
                    var socialOptions = {
                        name: res.name,
                        accessToken: data.accessToken.toString(),
                        fbID: res.id,
                    }
                })
                .catch((err) => console.log('error occurred', err.message));

            }) // end getCurrentAccessToken
        }

        registerUser = () => {
            fetch('localhost/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    facebook_id: this.state.fbId,
                    name: this.state.name,
                }),
            }).then(() => {
                this.storeInfo();
            });
        }

        storeInfo = async () => {
            this.getUserInfo().then(() => {
                try {
                    await AsyncStorage.setItem('@AccessToken', this.state.accessToken);
                    await AsyncStorage.setItem('@name', this.state.name);
                    await AsyncStorage.setItem('@fbID', this.state.fbID);
                } catch (e) {
                    // saving error
                }
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
                            this.props.navigation.navigate('App');
                            alert("Login was successful with permissions: " + result.grantedPermissions);
                            if (this.props.auth == 'login'){
                                this.storeInfo();
                            } else if (this.props.auth == 'signup'){
                                this.registerUser();
                            }
                        }
                    }
                }
                onLogoutFinished={() => alert("User logged out")}/>
                </View>
            );
        }
    };

    module.exports = FBLoginButton;
