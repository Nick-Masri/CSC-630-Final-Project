import FirstPage from './screens/FirstPage'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'


// Takes multiple JS files and puts them into one with support for navigation between them
const AppNavigator = createStackNavigator({
  Redirect : {
    screen: FirstPage,
  },
  LoginScreen : {
    screen: LoginScreen,
  },
  SignUpScreen : {
    screen: SignUpScreen,
  },
  Home: {
    screen: HomePage,
  }
  {initialRouteName: "Redirect"}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render(){
    return(
      <AppContainer />
    )
  }
}
