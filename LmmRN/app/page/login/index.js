import React from 'react';
import {View,Text} from 'react-native'

class Login extends React.Component {

  static navigationOptions = ({ screenProps }) => {
    return {
      header: null,
    };
  };

  render = () => {
    return (
      <View><Text>LmmRn 登录</Text></View>
    )
  }
   
}

export default Login;
