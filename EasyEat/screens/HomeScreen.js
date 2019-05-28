import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, FlatList, View, Text} from 'react-native';


export default class FirstPage extends Component {
  static navigationOptions = {
    header: null
  };



  render() {
    return (
    <View>

      <View>

        <View>
          <Text>Home</Text>
        </View>

        <View>
          <Text>Me</Text>
          <Text>Friends</Text>
        </View>

      </View>

      <View>
        <Text>Hello</Text>
      </View>

    </View>
    );
  }
}
