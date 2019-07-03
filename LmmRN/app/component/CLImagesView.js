import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
let {width, height} = Dimensions.get('window')

import Swiper from 'react-native-swiper';
import themeconfig from '../config/theme'

const CLImagesView = ({images,size,addImage,deleteImage}) => {
    return <Swiper autoplay={true} 
    dot={<View 
      style={{backgroundColor: "white", width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} 
      />}
    activeDot={<View 
    style={{backgroundColor: themeconfig.maincolor, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} 
    />}
    style={{
      height: (width * 6/15),
    }} >
        {images
            .map((item, i) => {
                return <View
                    key={i}
                    style={[{
                    backgroundColor: 'white',
                    size
                }]}>
                    <ImageBackground
                        source={{
                        uri: item
                    }}
                        style={size}>
                        <View style={{ flex:1, justifyContent: 'space-between',
                        flexDirection: 'column',}}>
                            <TouchableOpacity onPress={() => {deleteImage(i)}}>
                                <View style={{width:width,flexDirection: 'row',height:40,justifyContent:"flex-end"}}>
                                    <Image style={{width:40,height:40}} source={require('../image/close.png')}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {addImage()}}>
                                <View style={{width:width,flexDirection: 'row',height:40,justifyContent:"flex-start"}}>
                                    <Image style={{width:40,height:40}} source={require('../image/takephoto.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>    
                </View>
            })}
    </Swiper>
}

export default CLImagesView;
