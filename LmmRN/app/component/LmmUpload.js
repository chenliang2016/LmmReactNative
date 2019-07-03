import React, {Component} from 'react';

import { Text, View, TouchableOpacity,Image,Dimensions,StyleSheet } from 'react-native';

import LmmActionSheet from './LmmActionSheet'

import {photo} from '../utils/NativeUtil'

const {width} = Dimensions.get('window');

const UploadImageView = ({source,style,deleteImage}) => {
    return <View style={style}>
        <Image source={source} style={style}  />
        <TouchableOpacity style={{width:20,height:20,position:"absolute",top:0,right:0}} onPress = {deleteImage}>
        <Image source={require('../image/delete.png')} style={{width:20,height:20}} />
        </TouchableOpacity>
    </View>
}

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
            let images = this.props.images;
            images.push(data);
            this.props.onChange(images);
        }

        _convertData = (item) => {
            let images = {
                id:item.objkey,
                url:item.url,
            }
            return images;
        }

        _deleteImage = (id) => {
            let index = 0;
            let currentImages = this.props.images;
            for (let item of currentImages){
                if (item.id == id){
                    if (index > -1) { 
                        currentImages.splice(index, 1); 
                        this.props.onChange(currentImages);
                    } 
                }
                index ++;
            }
        }

        render() {

            let itemWidth = this.props.width / this.props.numColumns 

            itemWidth = itemWidth - 5*(this.props.numColumns - 1);

            let itemStyle = {
                width:itemWidth,
                height:itemWidth,
            }

            return (<View>
                <View style={styles.container}>
                    {this.props.images.map((item,i) => {
                        return <UploadImageView  
                        key={item.id}
                        source={{uri: item.url}}
                        deleteImage = {() => this._deleteImage(item.id)}
                        style = {[styles.itemContainer,itemStyle]}  />
                    })}
                    <TouchableOpacity  onPress={() => {
                        if (this.props.images.length > 4){
                            global.toast("最多上传5张图片");
                            return;
                        }
                        this._upload()
                    }} >
                        <View style={[styles.itemContainer,itemStyle]}>
                            <Text style={{fontSize:25}}>
                                +
                            </Text>
                        </View>
                    </TouchableOpacity>    
                </View>
                <LmmActionSheet 
                    modalVisible = {this.state.modalVisible}
                    onPress = {(item) => {
                        this.setState({modalVisible:false})
                        if (item.key == 1){
                            photo("takephoto",{tag:this.props.uploadTag},(data) => {
                                console.log(data)
                                this._addImage(this._convertData(data));
                            })
                        }else{
                            photo("pick",{tag:this.props.uploadTag},(data) => {
                                console.log(data)
                                this._addImage(this._convertData(data));
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

const styles = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    itemContainer: {
        margin:5,
        flexDirection:"row",
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});




export default UploadComponent