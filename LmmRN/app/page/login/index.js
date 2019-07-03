import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native'

import {qrscan} from '../../utils/NativeUtil'

class Login extends React.Component {

  static navigationOptions = ({ screenProps }) => {
    return {
      header: null,
    };
  };

  render = () => {
    return (
      <TouchableOpacity onPress={() => {qrscan((data) => {
        console.log(data)
      })}}><View><Text>LmmRn 登录</Text></View></TouchableOpacity>
    )
  }
   
}

export default Login;
