import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';

import FBLoginButton from './../components/facebook-button.js'

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#41B3A3',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  widthContainer: {
    width: 350,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    height: 250,
    resizeMode: "contain",
    alignItems: 'center',
    margin: 'auto',
  },
  appName: {
    fontSize: 60,
    color: '#FFF',
    marginBottom: 40,
    // fontFamily: 'Roboto',
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 35,
    borderRadius: 18,
    marginTop: 50,
    width: 350,
    borderWidth: 2,
  },
  button: {
    borderColor: '#FFF',
    fontSize: 24,
  },
  signUpButton: {
    marginBottom: 50,
    backgroundColor: '#97E1E6',
    borderColor: '#97E1E6',
  },
  buttonText: {
    fontSize: 28,
    color: '#FFF',
  },
  formButton: {
    borderBottomWidth: 1,
    width: 350,
    textAlign: 'left',
    textAlignVertical: 'bottom',
    padding: 5,
    fontSize: 20,
    color: '#FFF',
    borderColor: '#FFF',
    marginBottom: 30,
  },
  warningText: {
    color: '#DC493A',
    fontSize: 20,
    margin: 0,
    height: 50,
  },
  google: {
    borderColor: '#DC493A',
  },
  facebook: {
    borderColor: '#0000CC',
  }
});


export default class FirstPage extends Component {

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Sign Up</Text>
          <Image source={require('./../assets/table.png')} style={styles.logo} />
          <Text style={{color: '#FFF'}}>Sign Up with</Text>
          <FBLoginButton styles={styles.button, styles.facebook} />
        </View>
      </View>
    );
  }
}
