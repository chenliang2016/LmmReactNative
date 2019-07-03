import React, {Component} from 'react';
import {
    View,Text
} from 'react-native';

import themeconfig from '../config/theme'

export default class LmmPanel extends React.Component {
  render() {
    return <View style = {[{backgroundColor:'white'},this.props.style]}>
        <Text style={{color:themeconfig.blackColor,marginTop:10,marginLeft:10,fontSize:themeconfig.titleSize}}>{this.props.title}</Text>
        {this.props.children}
    </View>;
  }
}