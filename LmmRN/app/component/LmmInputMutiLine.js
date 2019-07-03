import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

import themeStyle from '../config/themeStyle'

export default class LmmInputMutiLine extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       value:""
    }
  }

  onChange = (text) => {
      this.setState({value:text});
      this.props.onChange(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={themeStyle.formTitleStyle}>
          {this.props.title}
        </Text>
        <TextInput
          placeholder = "请输入"
          multiline = {true}
          numberOfLines = {4}
          style={styles.textInput}
          onChangeText={(text) => this.onChange(text)}
          underlineColorAndroid={'transparent'}
          defaultValue={this.props.defaultValue}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  textInput: {
    flex:1,
    marginTop:10,
    height:100,
  },
});
