import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';


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
    marginTop: 65,
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
  loginButton: {
    borderColor: '#FFF',
  },
  signUpButton: {
    marginBottom: 50,
    backgroundColor: '#DC493A',
    borderColor: '#DC493A',
  },
  buttonText: {
    fontSize: 28,
    color: '#FFF',
  },
});

export default class FirstPage extends Component {

  static navigationOptions = {
    header: null,
  }; // removes navigation header that comes with react navigation

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Easy Eat</Text>
          <Image source={require('./../assets/table.png')} style={styles.logo} />
          <TouchableOpacity
            style={[styles.loginButton, styles.button]}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.loginButton, styles.button]}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
