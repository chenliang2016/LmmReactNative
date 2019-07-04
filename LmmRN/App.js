import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './app/index';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount(){
    SplashScreen.hide()
  }

  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
