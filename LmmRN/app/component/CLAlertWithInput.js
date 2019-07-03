import React, {
  Component
} from 'react';
import {
  Modal,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
	blackFont: {
		color: 'black',
		fontSize: 16,
    },
    whiteFont: {
		color: 'white',
		fontSize: 16,
	},
	grayFont: {
		color: 'gray',
		fontSize: 14,
	},
    modalBackground:{
        backgroundColor:'rgba(0,0,0,0.5)',
        flex: 1, 
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },
    modalContainer:{
        borderRadius: 5, flexDirection: 'column',
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',
        width: width(90), height: 200,
    },
    modalItemContainer:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-end',
    },
    modalInputText :{
        width: width(80), 
        height: 40,
        borderWidth: 1,
        borderColor:"#eee",
        padding:5,
    },
    modalButtonGroup:{
        height:50,
        flexDirection: 'row',
        alignItems: 'center', 
    },
    modalButtonLeft:{
        flex:1,
        height:50,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor:"#eee"
        
    },
    modalButtonRight:{
        flex:1,
        height:50,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor:"#0A9D35"
    }
});


class CLAlertWithInput extends React.Component {

    submitEdit = () => {
        this.refs.inputWR.blur();  
    }

    render() {
        return <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {this.props.modalClose}}
            >
            <View 
            style = {styles.modalBackground}
            >
            <View style={styles.modalContainer}>
                <View style={styles.modalItemContainer} >
                <TextInput
                    ref="inputWR"  
                    placeholder="请输入物流单号"
                    editable={true}
                    underlineColorAndroid={'transparent'}
                    style={styles.modalInputText}
                    onSubmitEditing={()=>{this.submitEdit()}}  
                    onChangeText={(text) => this.props.onChangeText(text)}
                        />
                </View>        
                <View style={styles.modalItemContainer} >
                <View style={styles.modalButtonGroup}>
                <TouchableHighlight
                        underlayColor='rgba(255,255,255,0)'
                        style={{flex: 1}} 
                        onPress={() => this.props.cancle()}>
                        <View  style={styles.modalButtonLeft}>            
                        <Text style={styles.grayFont}>取消</Text>
                        </View>
                </TouchableHighlight>
                <TouchableHighlight
                        underlayColor='rgba(255,255,255,0)'
                        style={{flex: 1}} 
                        onPress={() => this.props.submit()}>
                                    <View  style={styles.modalButtonRight}>     
                        <Text style={styles.whiteFont}>确定</Text>
                        </View>
                </TouchableHighlight>
                </View>
                </View>  
            </View>
            </View>
    </Modal>
    }
}

export default CLAlertWithInput;