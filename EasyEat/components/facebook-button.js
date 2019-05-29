import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props);
        this.state({
            auth: this.props.auth
        })
    }

    registerUser = () => {
        
    }

    storeId = () => {

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
                        this.storeId();
                    } else if (this.props.auth == 'signup'){
                        this.registerUser();
                        this.storeId();
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
