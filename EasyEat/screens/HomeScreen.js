import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, FlatList, View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    widthContainer: {
        width: 400,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    navbar: {
        height: 75,
        flexDirection: 'column',
        backgroundColor: '#41B3A3',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    mainNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    pageHeader: {
        fontSize: 34,
        color: '#FFF',
        flex: 1,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },
    tabHeader: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 15,
    },
    filler: {
        flex: 1,
    },
    menuIcon: {
        flex: 1,
        fontSize: 44,
        color: '#FFF',
        paddingLeft: 15
    },
    tabText: {
        color: '#FFF',
        textTransform: 'uppercase',
        fontSize: 24,
    },
    page: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1,
    },
    plusIcon: {
        fontSize: 30,
        color: '#FFF',
        backgroundColor: "#41B3A3",
        paddingVertical: 20,
        paddingHorizontal: 22,
        borderRadius: 100,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 10,
        bottom: 20,
    },
    highlight: {
        borderColor: '#DC493A',
        borderBottomWidth: 5,
    },
    listMainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listHeader: {
        color: "#DC493A",
        fontSize: 28,
    },
    star: {
        fontSize: 28,
        color: '#F2B01E'
    },
    staro: {
        fontSize: 28,
        color: 'black',
    },
    friends: {
        fontSize: 14,
        color: '#41B3A3'
    },
    listItem: {
        borderRadius: 15,
        borderColor: '#41B3A3',
        borderWidth: 2,
        flex: 1,
        marginBottom: 20,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    list: {
        flex: 0,
        width: 380,
    },
    listInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listInfoText: {
        color: '#41B3A3',
        fontSize: 24,
    }
});

export default class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            accessToken: '',
            fbID:'',
            name: '',
            data: [],
        }

    }

    componentDidMount = () => {
        this._getData();
    }

    _getData = () => {
        AsyncStorage.getItem('@accessToken').then((result) => {
            this.setState({accessToken: result});
        }).then(() => {
            fetch(`https://graph.facebook.com/me?access_token=${this.state.accessToken}`)
            .then((response) => response.json())
            .then((res) => {
                this.setState({
                    name: res.name,
                    fbID: res.id,
                });
                console.log(res.name);
                console.log(res.id);
                console.log(this.state.accessToken);
            })
            .catch((err) => console.log('error occurred', err.message));
        });
      }


    getMeals = () => {
        fetch(`localhost?id=${this.state.fbID}`)
        .then((response) => response.json())
        .then((res) => {

            if (res.data.length !== 0){
                this.setState({
                    data: res.data,
                })
            }
        });
    }

    static navigationOptions = {
        header: null
    };

    renderItem = (data) => {

        return (
            <View style={styles.listItem}>
            <View style={styles.listMainRow}>
            <Text style={styles.listHeader}>{data.item.listHeader}</Text>
            </View>
            <View>
            <Text style={styles.friends}>With: {data.item.friends}</Text>
            </View>
            <View style={styles.listInfo}>
            <Text style={styles.listInfoText}>You paid ${data.item.cost}</Text>
            <Text style={styles.listInfoText}>{data.item.date}</Text>
            </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.page}>

            <View style={styles.navbar}>

            <View style={styles.mainNav}>
            {    //<Icon name="bars" style={styles.menuIcon}/>
        }
        <Text style={styles.pageHeader}>History</Text>
        </View>

        {
            //     <View style={styles.tab}>
            //     <View style={[styles.tabHeader, styles.highlight]}>
            //         <Text style={styles.tabText}>Me</Text>
            //     </View>
            //     <View style={styles.tabHeader}>
            //         <Text style={styles.tabText}>Friends</Text>
            //     </View>
            // </View>
        }
        </View>

        <View style={styles.pageContainer}>
        <View style={styles.widthContainer}>
        <FlatList
        contentContainerStyle={styles.list}
        data={this.state.data}
        extraData={this.state}
        renderItem={this.renderItem}
        />
        <View style={styles.footer}>
        <Icon name="plus" style={styles.plusIcon} onPress={() => {this.props.navigation.navigate('New')}}/>
        </View>
        </View>
        </View>

        </View>
    );
}
}
