import React, {Component} from 'react';
import {
    Image,
    Platform,
} from 'react-native';

import FastImage from 'react-native-fast-image'

const LmmImageView = ({source,style}) => {
    if (source.uri == undefined || source.uri == ""){
        return <View></View>
    }else{
        if (Platform.OS == "ios"){
            return <FastImage
            style={style}
            source={{uri:source.uri,defaultImage:"default.png"}}
            resizeMode={FastImage.resizeMode.cover} />
        }else{
            return <Image style={style}
            source={source} />
        }
    }
}

export default LmmImageView;
