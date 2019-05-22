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
    justifyContent: 'flex-start',
  },
  logo: {
    width: 250,
    height: 320,
    alignItems: 'center',
    margin: 'auto',
    marginTop: 0,
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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isEmail: false,
      warningText: '',
      invalidReason: ''
    };
  }

  login = () => {
    if (this.state.isEmail) {

      // Format into acceptable body type: https://stackoverflow.com/questions/35325370/post-a-x-www-form-urlencoded-request-from-react-native
      // not sure if needed

      var details = {
        'email': this.state.email,
        'password': this.state.password
      };

      const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&'); // Putting json into acceptable format to be read
      fetch('https://csc630-project-2.herokuapp.com/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.page == "HomeScreen"){
           this.props.navigation.navigate('Search');
        } else {
          this.setState({invalidReason: responseJson.error}, () => {
            this.invalidAuthentication();
          });
        }
      });
    } else {
      if (this.state.email + this.state.password == '') {
        this.setState({invalidReason: 'You need to enter a username and password'}, () => {
          this.invalidAuthentication();
        });

      } else {
        this.setState({invalidReason: 'Please enter a valid andover.edu email address'}, () => {
          this.invalidAuthentication();
        });
      }
    }
  }

  // invalidAuthentication = () => {
  //   Alert.alert(
  //     'Invalid',
  //     this.state.invalidReason,
  //     [
  //       {text: 'Ok'},
  //     ],
  //     {cancelable: false},
  //   );
  // }
  //
  // invalidEmail = () => {
  //   this.setState({
  //     warningText: "Please enter a valid Andover.edu Email Address"
  //   })
  // }


  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
          <Text style={styles.appName}>Login</Text>
          <Image source={require('./../assets/table.png')} style={styles.logo} />
          <Text>Login with</Text>
          <FBLoginButton styles={styles.button, styles.facebook} />
        </View>
      </View>
    );
  }
}
