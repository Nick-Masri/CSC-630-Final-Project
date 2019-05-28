import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator, StatusBar} from 'react-native';
import { AccessToken } from 'react-native-fbsdk';


export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.redirect();
  }

  redirect = async () => {
    const accessToken = await AccessToken.getCurrentAccessToken();
    let isLoggedIn = accessToken != null && accessToken.getExpires();

    this.props.navigation.navigate(isLoggedIn ? 'App' : 'Auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
