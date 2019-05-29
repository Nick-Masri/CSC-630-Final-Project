import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';
import TagInput from 'react-native-tag-input';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'FB Name',
  autoFocus: true,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2,
  },
};


export default class TagInputExample extends Component {
  state = {
    tags: [],
    text: "",
  };

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

  labelExtractor = (tag) => tag;

  render() {
    return (
      <View style={{ flex: 1, margin: 10, marginTop: 30 }}>

        <Text style={{marginVertical: 10, fontSize: 24, textAlign: 'center', color: '#41B3A3'}}>People</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'lightgray'}}>
          <Text style={{paddingLeft: 2}}>To: </Text>
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
    );
  }
}
