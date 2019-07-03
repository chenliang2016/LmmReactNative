import React from 'react';
import {
    View,Button,Text,TouchableOpacity,StyleSheet
} from 'react-native';

import theme from '../config/theme';

const TabButtonItem = ({item,isFocus,onPress}) => (
    <View  style = {styles.itemContainer}>
        <TouchableOpacity onPress={() => onPress(item)}>
        <View style={isFocus?styles.itemButtonFouceContainer:styles.itemButtonNormalContainer}>
            <Text style={isFocus?styles.textFouce:styles.textNormal}>{item.title}</Text>    
        </View>
        </TouchableOpacity>
    </View>    
)

export default class LmmTabButton extends React.Component {
  render() {
    return (
        <View style={styles.container}>
            {this.props.items.map((item) => {
                if (this.props.value == item.value){
                    return <TabButtonItem key={item.value} isFocus={true} item={item} onPress = {(item) => this.props.onChange(item.value)} />
                }
                return <TabButtonItem key={item.value} isFocus={false} item={item} onPress = {(item) => this.props.onChange(item.value)} />
            })}
        </View>    
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row' , 
        backgroundColor:'white',
    },
    itemContainer: {
        height:50,
        flex:1,
        flexDirection:'column' , 
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth:1,
        borderColor:'#f2f2f2'
    },
    itemButtonFouceContainer:{
        height:50,
        borderBottomWidth:2,
        borderColor:theme.maincolor,
        flexDirection:"row",
        alignItems:"center"
    },
    itemButtonNormalContainer:{
        height:50,
        flexDirection:"row",
        alignItems:"center"
    },
    textFouce:{
        color:theme.maincolor,
        fontSize:theme.h1,
        fontWeight: "bold"
    },
    textNormal:{
        color:theme.grayColor,
        fontSize:theme.h1
    }
  })