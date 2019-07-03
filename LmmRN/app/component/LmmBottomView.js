import * as React from 'react';
import {View,Dimensions } from 'react-native';

let {width} = Dimensions.get('window')

export default class LmmBottomView extends React.Component {

    render(){
        return <View style={{width:width,position:"absolute",flexDirection:"row", bottom:0,height:50,backgroundColor:"white"}}>
            {this.props.children}
        </View>
    }

}
