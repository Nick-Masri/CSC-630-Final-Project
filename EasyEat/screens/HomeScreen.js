import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, FlatList, View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

export default class FirstPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            params: {},
            data: [],
        }
    }

    componentDidMount = () => {
        this._getData();
    }


    _getData = () => {
        data = this.props.navigation.state.params;
        fetch(`https://lit-mountain-47024.herokuapp.com/plans?id=${data.id}`)
        .then((response) => response.json())
        .then((res) => {
            if (res.data.length !== 0){
                this.setState({
                    data: res.data,
                    params: data,
                });
            }
        });
    }

    static navigationOptions = {
        header: null
    };

    renderItem = (data) => {
        let filtered = data.item.friends.split(/[{\,}\"]+/);
        let friends = ""
        filtered.forEach(function(item, index) {
            if (item !== "") {
                if (index == filtered.length - 2) {
                    friends += item;
                } else {
                    friends += item + ', ';
                }
            }
        })


        console.log(friends);

        return (
            <View style={styles.listItem}>
            <View style={styles.listMainRow}>
            <Text style={styles.listHeader}>{data.item.location_name}</Text>
            </View>
            <View>
            <Text style={styles.friends}>With: {friends}</Text>
            </View>
            <View style={styles.listInfo}>
            <Text style={styles.listInfoText}>You paid ${data.item.amount_payed}</Text>
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
            keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.footer}>
            <Icon name="plus" style={styles.plusIcon} onPress={() => {this.props.navigation.navigate('New', this.state.params)}}/>
            </View>
            </View>
            </View>

            </View>
        );
    }
}

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
