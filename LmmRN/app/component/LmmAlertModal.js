import * as React from 'react';
import { Modal, View, ActivityIndicator,Text,TouchableOpacity } from 'react-native';

import theme from '../config/theme'

export default class LmmAlertModal extends React.Component {


    render(){
        return <Modal
                style = {{flex:1,backgroundColor:"#222"}}
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {
                    if (this.props.onClose!= undefined){
                        this.props.onClose();
                    }
                }} 
            >
            <View
                style = {{flex:1,
                    flexDirection:"column",
                    justifyContent:"center",
                    paddingLeft:20,
                    paddingRight:20,
                    alignItem:"center",
                    backgroundColor:"rgba(178,178,178,0.5)"}}
                >
                <View style={{backgroundColor:"white",flexDirection:"column",justifyContent:"space-between",}}>
                    <View>

                    {this.props.type != undefined && this.props.type  == "alert"?
                    <View style={{padding:10,flexDirection:"column"}}>
                        <View style={{padding:10,paddingTop:0,flexDirection:"column",alignItems:"center",borderBottomColor:"#eee",borderBottomWidth:1}}>
                        <Text>
                            提示
                        </Text>  
                        </View>
                        <View style={{margin:10,marginTop:20}}>
                            <Text>
                            {this.props.msg}
                            </Text>  
                        </View>    
                    </View>
                    :null}

                    {this.props.children}
                    </View>    
                    {this.props.loading?
                        <View style={{flexDirection:"row",height:40,backgroundColor:theme.lightBlue,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator color='white' hidesWhenStopped={true} animating={this.props.loading} /><Text style={{color:'white',marginLeft:10}}>加载中</Text>
                        </View>
                    :
                    <View style={{flexDirection:"row",height:40}}>
                         <TouchableOpacity onPress={() => {
                            if (this.props.onCancle != undefined){
                                this.props.onCancle()
                            }
                            }} style={{flex:1}}>
                        <View style={{height:40,flex:1,backgroundColor:theme.orange,justifyContent:"center",alignItems:'center'}}>
                        <Text style={{color:"white",fontSize:15}}>取消</Text> 
                        </View>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (this.props.onConfirm != undefined){
                                this.props.onConfirm()
                            }
                        }} style={{flex:1}}>
                        <View style={{height:40,flex:1,backgroundColor:theme.maincolor,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"white",fontSize:15}}>确定</Text>
                        </View>    
                        </TouchableOpacity>  
                    </View>
                }
                       

                </View>
            </View>   
    </Modal>
    }
}

            