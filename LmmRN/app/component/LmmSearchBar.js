import * as React from 'react';
import { View, StyleSheet,TextInput,Text,TouchableOpacity } from 'react-native';

import theme from '../config/theme';

export default class LmmSearchBar extends React.Component {

    state = {
        value:"",
    }

    render(){
        return(
        <View style={styles.container}>
            <TextInput
                ref = "searchRef"
                placeholder = {this.props.placeholder}
                style={styles.textInput}
                value = {this.state.value}
                multiline={false}
                onChangeText={(text) => this.setState({value:text})}
                onSubmitEditing={() => {this.props.onSearch(this.state.value)}}
                underlineColorAndroid={'transparent'}
            />
           <TouchableOpacity onPress = {() => {
                this.refs.searchRef.blur()
                this.setState({value:""})
                if (this.props.onCancle){
                    this.props.onCancle();
                }
               }}>
            <Text style={styles.text}>
                取消
            </Text>
          </TouchableOpacity> 
        </View>)
    }

}

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      justifyContent: 'flex-start',
      alignItems:'center',
    },
    textInput: {
        flex:1,
        marginLeft:10,
        paddingLeft:10,
        backgroundColor:theme.lightGray,
        height:30,
    },
    text:{
        marginLeft:10,
        color:theme.maincolor,
        fontSize:theme.normalSize,
    }
});
  

