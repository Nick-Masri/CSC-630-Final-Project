import React, { Component } from 'react';
import { View, ActivityIndicator, StatusBar} from 'react-native';
import { AccessToken } from 'react-native-fbsdk';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.redirect();
  }

  // componentDidMount = () => {
  //
  // }

  redirect = () => {
    AccessToken.getCurrentAccessToken().then((accessToken) => {
        isLoggedIn = accessToken != null && accessToken.getExpires();
        if (isLoggedIn){
            token = accessToken.accessToken.toString();
            fetch(`https://graph.facebook.com/me?access_token=${token}`)
            .then((response) => response.json())
            .then((res) => {
                data = {id:res.id, name:res.name, token:token}
                console.log(data);
                this.props.navigation.navigate('Home', data);
            });
        } else {
            this.props.navigation.navigate('Auth');
        }
    })
    .catch((err) => {
        console.log(err);
    });
  }

  getData = (token) => {
      fetch(`https://graph.facebook.com/me?access_token=${token}`)
      .then((response) => response.json())
      .then((res) => {
          data = {id: res.id, name:res.name}
          return data
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
