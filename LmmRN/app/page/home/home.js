import React from 'react';
import {View,Text} from 'react-native'

class home extends React.Component {

  static navigationOptions = ({ screenProps }) => {
    return {
      header: null,
    };
  };

  render = () => {
    return (
      <View><Text>LmmRn home</Text></View>
    )
  }
   
}

export default home;
