/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './screens/HomeScreen'
import CreatePlanScreen from './screens/CreatePlanScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import AuthScreen from './screens/AuthScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'

const AppStack = createStackNavigator({Home: HomeScreen, New:CreatePlanScreen});
const AuthStack = createStackNavigator({AuthRedirect: AuthScreen, SignUp: SignUpScreen, Login: LoginScreen,});

AppContainer =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
    <AppContainer />
    );
  }
}
