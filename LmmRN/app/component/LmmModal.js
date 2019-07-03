
import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Modal,
} from 'react-native';
 
export default class LmmModal extends Component {
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
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(178,178,178,0.8)'}}>
                    <View style={{width: this.props.width, height: this.props.height, alignItems: 'center'}}>
                        {this.props.children}    
                    </View>
                </View>
            </Modal>
        );
    }
}
