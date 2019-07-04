import React, {
    Component
  } from 'react';
  import {
    ScrollView,
    Platform,
    KeyboardAvoidingView
  } from 'react-native';

class LmmKeyboardAvoidingView extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        if (Platform.OS == "ios"){
            return <KeyboardAvoidingView style={{flex:1}} 
            behavior='padding' 
            keyboardVerticalOffset={ this.props.keyboardVerticalOffset == undefined ? 64 : this.props.keyboardVerticalOffset } enabled>
                <ScrollView>{this.props.children}</ScrollView>
            </KeyboardAvoidingView>
        }else{
            return <KeyboardAvoidingView style={{flex:1}} 
                keyboardVerticalOffset={this.props.keyboardVerticalOffset == undefined ? 64 : this.props.keyboardVerticalOffset }>
                <ScrollView>{this.props.children}</ScrollView>
            </KeyboardAvoidingView>
        }
    }
}

export default LmmKeyboardAvoidingView;