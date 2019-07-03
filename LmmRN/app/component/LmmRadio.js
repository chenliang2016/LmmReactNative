import * as React from 'react';
import {
    View,Text
} from 'react-native';
import CheckBox from 'react-native-checkbox';

export default class LmmRadio extends React.Component {

    render(){
        return <View style={{flexDirection:"row"}}>
            {this.props.items.map( item => {
                let v = false;
                if (this.props.value == item.value){
                    v = true;
                }
                return <View key={item.value} style={{marginRight:10}}><CheckBox
                    label={item.title}
                    checked={v}
                    checkedImage = {require('../image/checked.png')}
                    uncheckedImage = {require('../image/uncheck.png')}
                    onChange={(checked) => this.props.onChange(item.value,checked)}
                /></View>
            })}

        </View>
        
        

    }
}