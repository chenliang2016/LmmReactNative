import React, {Component} from 'react';

import { Text, View, StyleSheet } from 'react-native';

import themeStyle from '../config/themeStyle'
import LmmActionSheet from './LmmActionSheet'

import {photo} from '../utils/NativeUtil'

// 获取组件的名字
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const CreateUpload = (itemOption) => (WrappedComponent) => {

    class UploadComponent extends Component {

        constructor(props){
            super(props)
            this.state = {
                modalVisible: false,
                images:[],
            }

            this.newProps = {
                upload:() => this._upload(),
                deleteImage:this._deleteImage
            }
        }

        _upload = () => {
            this.setState({modalVisible:true})
        }

        _addImage = (data) => {
            let images = this.state.images;
            images.push(data);
            this.setState({images:images})
        }

        _deleteImage = (item) => {
            var index = this.indexOf(item); 
            if (index > -1) { 
                let images =  this.state.images.splice(item, 1); 
                this.setState({images:images})
            } 
        }

        render() {
            return (<View>
                <WrappedComponent {...this.props} images={this.state.images} {...this.newProps}/>
                <LmmActionSheet 
                    modalVisible = {this.state.modalVisible}
                    onPress = {(item) => {
                        this.setState({modalVisible:false})
                        if (item.key == 1){
                            photo("takephoto",{tag:""},(data) => {
                                this._addImage(data);
                            })
                        }else{
                            photo("pick",{tag:""},(data) => {
                                this._addImage(data);
                            })
                        }
                    }}
                    cancle = {() => {
                        this.setState({modalVisible:false})
                    }}
                    items = {
                    [{
                        key:1,
                        title:"拍照"
                    },{
                        key:2,
                        title:"图片选择"
                    }]
                    }
            />
        </View>)
        }
    }
    UploadComponent.displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    return UploadComponent
}

export default CreateUpload