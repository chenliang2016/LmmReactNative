import React, {PureComponent} from 'react';

import {TextInput,StyleSheet,View} from 'react-native'

import getFieldDecorator from './getFieldDecorator'

class LmmFormItem extends PureComponent {

  onChange = (text) => {
    this.props.onChange(text);
  }

	render() {
		return (<View>
              {this.props.children}
            </View>
		   )
	}
}

let item = getFieldDecorator({
    title:"测试"
})(LmmFormItem)

export default item;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems:"center",
      padding: 10,
    },
    textInput: {
      flex:1,
      marginLeft:10
    },
});