import React from 'react';
import { Platform , View} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import theme from '../config/theme'

// import TabBarIcon from '../component/TabBarIcon';

import Home from '../page/home'

const HomeStack = createStackNavigator({
  Home: Home,
},{
  initialRouteName: 'Home',
  /* The header config from HomeScreen is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: theme.maincolor,
    },
    headerBackTitle:null,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  
  return  {
    tabBarVisible,
    tabBarLabel: '首页',
    tabBarOptions: {
      activeTintColor: theme.maincolor,
    },
    // tabBarIcon: ({ focused }) => (
    //   <TabBarIcon
    //     focused={focused}
    //     normalImage ={require('../image/homed.png')}
    //     fouceImage ={require('../image/home.png')}
    //     name={
    //       Platform.OS === 'ios'
    //         ? `ios-information-circle${focused ? '' : '-outline'}`
    //         : 'md-information-circle'
    //     }
    //   />
    // ),
  };
};

export default createBottomTabNavigator({
  HomeStack,
});
