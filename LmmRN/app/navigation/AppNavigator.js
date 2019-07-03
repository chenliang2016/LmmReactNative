import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LmmStore from '../component/LmmStore'
import MainTabNavigator from './MainTabNavigator';
import Login from '../page/login';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let token =  await LmmStore.getConfig("token");
    if (token != undefined && token != ""){
      this.props.navigation.navigate('Main');
    }else{
      this.props.navigation.navigate('Login');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(createSwitchNavigator({
  Login: Login,
  Main: MainTabNavigator,
  AuthLoading: AuthLoadingScreen,
},{
  initialRouteName:"AuthLoading"
}));

