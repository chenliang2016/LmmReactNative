import React, {
    Component
  } from 'react';
  import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
  } from 'react-native';

const CLTableFootView = ({footText,isLoading}) => {
    return <View
    style={{
        padding: 10,
        backgroundColor:"white",
        borderTopColor: "#eee",
        borderTopWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
    }}>
    {
      isLoading?
      <ActivityIndicator hidesWhenStopped={true} animating={isLoading} />
      :null
    }
    <Text style={{
      color: "gray"
    }}>{isLoading?"正在加载":footText}</Text>
  </View>
}

export default CLTableFootView;