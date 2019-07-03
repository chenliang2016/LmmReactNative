
import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Modal,
    Text,
    Dimensions,
} from 'react-native';

const {width}  = Dimensions.get("screen");
 
export default class LmmActionSheet extends Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end',backgroundColor: 'rgba(178,178,178,0.2)'}}>
                    <View style={{backgroundColor:"white",width:width, alignItems: 'center'}}>
                        {this.props.items.map(item => {
                            return <TouchableOpacity key={item.key}  onPress={() => this.props.onPress(item)}>
                                    <View style={{height:50,width:width, alignItems: 'center',justifyContent: 'center',borderBottomColor:"#eee",borderBottomWidth:1}} key={item.key}>
                                        <Text style={{fontSize:18}}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            })}
                         <TouchableOpacity key="cancle" onPress={() => this.props.cancle()}>
                            <View style={{height:50,width:width, justifyContent: 'center', alignItems: 'center'}} >
                                <Text style={{fontSize:18,color:"orange"}}>取消</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
