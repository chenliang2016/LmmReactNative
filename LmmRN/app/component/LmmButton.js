import * as React from 'react';
import {
    View,Image,Text,TouchableOpacity
  } from 'react-native';

export default class LmmButton extends React.Component {
    render(){
        let icon = this.props.icon;
        return <TouchableOpacity onPress={this.props.onPress}><View style={{padding:10}}>
            {icon != undefined ?
            <Image source={icon} style={[{width:24,height:24},this.props.style]}/>
           : <Text style={[{fontSize:16,color:"white"},this.props.style]}>{this.props.title}</Text> }
        </View></TouchableOpacity>
    }
}