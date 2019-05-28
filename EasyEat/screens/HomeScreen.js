import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, FlatList, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



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
  navbar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  mainNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    alignItems: 'center',
    marginBottom: 20
  },
  pageHeader: {
    fontSize: 34,
    color: '#41B3A3',
    flex: 1,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  tabHeader: {
    flex: 1,
    alignItems: 'center',
  },
  filler: {
    flex: 1,
  },
  menuIcon: {
    flex: 1,
  },
  tabText: {
    color: '#41B3A3',
    textTransform: 'uppercase',
    fontSize: 24,
  }

});


export default class FirstPage extends Component {
  static navigationOptions = {
    header: null
  };



  render() {
    return (
    <View>
      <View style={styles.navbar}>
        <Icon.Button
          name="bars"
          backgroundColor="#3b5998"
          >Hello
        </Icon.Button>

        <View style={styles.mainNav}>
          <View style={styles.menuIcon}>
          </View>

          <Text style={styles.pageHeader}>Home</Text>

          <View style={styles.filler}>
          </View>
        </View>

        <View style={styles.tab}>
          <View style={styles.tabHeader}>
            <Text style={styles.tabText}>Me</Text>
          </View>
          <View style={styles.tabHeader}>
            <Text style={styles.tabText}>Friends</Text>
          </View>
        </View>

      </View>
      <View style={styles.pageContainer}>
      </View>
    </View>
    );
  }
}
