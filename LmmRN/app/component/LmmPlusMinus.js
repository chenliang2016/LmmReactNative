import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class LmmPlusMinus extends React.Component {


    render(){
        return <View style={styles.container}>
            <TouchableOpacity onPress = {() => {
                let value = this.props.value;
                if (parseInt(value) < 1){
                    return ;
                }
                value =  parseInt(value) - 1;
                this.props.onChange(value)
            }}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>-</Text>
            </View>
            </TouchableOpacity>
            <View  style={styles.textContentContainer}>
                <Text style={styles.text}>{this.props.value}</Text>
            </View>
            <TouchableOpacity onPress = {() => {
                let value = this.props.value;
                value =  parseInt(value) + 1;
                this.props.onChange(value)
            }}> 
            <View  style={styles.textContainer}>
                <Text style={styles.text}>+</Text>
            </View>
            </TouchableOpacity>
        </View>
    }

}

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      justifyContent: 'flex-start',
      alignItems:'center',
      borderWidth:1,
      borderColor:"#eee"
    },
    textContainer:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:'center',
        width:40,
        height:40,
        backgroundColor:"#eee",
    },
    textContentContainer:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:'center',
        width:80,
        height:40,
        backgroundColor:"white",
    },
    text: {
       fontSize:20
    },
});
