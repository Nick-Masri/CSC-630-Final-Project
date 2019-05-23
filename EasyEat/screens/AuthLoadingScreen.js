import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { AccessToken } from 'react-native-fbsdk';

export default class FirstPage extends Component {

  const accessData = await AccessToken.getCurrentAccessToken();
  consle.log(accessData.accessToken)

  function ScreenDirect(props) {
    const isLoggedIn = props.isLoggedIn
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

  render() {
    return (
      <ScreenDirect isLoggedIn={false} />
    );
  }
}
