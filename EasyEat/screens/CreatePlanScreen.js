import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Image, StyleSheet, TouchableOpacity, Alert, TextInput, Platform} from 'react-native';
import { AccessToken } from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import TagInput from 'react-native-tag-input';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({

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
        flex: 1,
    },
});

const inputProps = {
    keyboardType: 'default',
    placeholder: 'FB Name',
    autoFocus: true,
    style: {
        fontSize: 14,
        marginVertical: Platform.OS == 'ios' ? 10 : -2,
    },
};


export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tags: [],
            text: "",
            location: "",
            amount_payed: "",
            date: "",
            fbID: "",
            accessToken: "",
        };
    }

    componentDidMount = () => {
        this.getData();
    }

    onChangeTags = (tags) => {
        this.setState({ tags });
    }

    onChangeText = (text) => {
        this.setState({ text });

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [',', ' ', ';', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.text],
                text: "",
            });
        }
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@AccessToken');
            if(value !== null) {
                this.setState({accessToken: value})
            }
            this._getData();
        } catch(e) {
            console.log(e);
            // error reading value
        }
    }

    _getData = () => {
        fetch(`https://graph.facebook.com/me?access_token=${this.state.accessToken}`)
        .then((response) => response.json())
        .then((res) => {
            this.setState({
                fbID: res.id,
            });
            console.log(res.id);
            console.log(this.state.accessToken);
        })
        .catch((err) => console.log('error occurred', err.message));
    }

    submitPage = () => {
        console.log(this.state.fbID)
        console.log(this.state.location)
        console.log(this.state.date)
        console.log(this.state.amount_payed)
        console.log(this.state.tags)
        fetch('https://lit-mountain-47024.herokuapp.com/plans', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                facebook_id: this.state.fbID,
                location_name: this.state.location,
                date: this.state.date,
                amount_payed: this.state.amount_payed,
                friends: this.state.tags,
            }),
        }).then(() => {
            this.props.navigation.navigate('Home');
        });
    }

    labelExtractor = (tag) => tag;

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column'}}>

            <View style={{ margin: 10, marginTop: 30 }}>
            <Text style={{marginVertical: 10, fontSize: 24, textAlign: 'center', color: '#41B3A3'}}>People</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray'}}>
            <TagInput
            value={this.state.tags}
            onChange={this.onChangeTags}
            labelExtractor={this.labelExtractor}
            text={this.state.text}
            onChangeText={this.onChangeText}
            tagColor="blue"
            tagTextColor="white"
            inputProps={inputProps}
            maxHeight={75}
            />
            </View>
            </View>

            <View style={{  margin: 10, marginTop: 30 }}>
            <Text style={{marginVertical: 10, fontSize: 24, textAlign: 'center', color: '#41B3A3'}}>Location</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray'}}>
            <TextInput
            style={{height: 40}}
            placeholder="Name of location"
            onChangeText={(location) => this.setState({location})}
            />
            </View>
            </View>
            <View style={{ margin: 10, marginTop: 30 }}>
            <Text style={{marginVertical: 10, fontSize: 24, textAlign: 'center', color: '#41B3A3'}}>Amount Payed</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray'}}>
            <TextInput
            style={{height: 40}}
            placeholder="Amount payed"
            onChangeText={(amount_payed) => this.setState({amount_payed})}
            keyboardType={'numeric'}
            />
            </View>
            </View>
            <View style={{alignItems: 'center'}}>
            <Text style={{marginVertical: 10, fontSize: 24, textAlign: 'center', color: '#41B3A3'}}>Date</Text>
            <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            minDate="2019-05-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
            />
            </View>
            <View style={styles.footer}>
            <Icon.Button name="arrow-right" style={styles.plusIcon} onPress={() => {this.submitPage()}}/>
            </View>
            </View>
        );
    }
}
