import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar} from 'react-native';
import { AccessToken } from 'react-native-fbsdk';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.redirect();
  }

  redirect = async () => {
    const accessToken = await AccessToken.getCurrentAccessToken();
    const isLoggedIn = accessToken != null && accessToken.getExpires();

    if (isLoggedIn){
        const data = await this._getData(accessToken);
        console.log(accessToken);
        data.token = accessToken.toString();
        this.props.navigation.navigate('App', data);
    } else {
        this.props.navigation.navigate('Auth');
    }
  }

  _getData = (token) => {
      fetch(`https://graph.facebook.com/me?access_token=${token}`)
      .then((response) => response.json())
      .then((res) => {
          return {id: res.id, name:res.name}
      })
      .catch((err) => console.log('error occurred', err.message));
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
