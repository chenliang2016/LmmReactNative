import React, {
    Component
  } from 'react';
  import {
    View,
    Text,
    Image,
    ActivityIndicator,
    StyleSheet,
  } from 'react-native';

const CLStateView = ({isEmpty,children}) => {

    return <View
    style={{
        flex:1,
    }}>
    
    {isEmpty?
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: "center",
        }}>
           <Image style={{width:80,height:80,margin:10}} source={require('../image/empty.png')} />
           <Text style={{
            color: "gray"
          }}>暂无数据</Text>
        </View>
        :
        <View style={{
            flex: 1,
          }}>
            {children}
        </View>
    }
  </View>
}

export default CLStateView;