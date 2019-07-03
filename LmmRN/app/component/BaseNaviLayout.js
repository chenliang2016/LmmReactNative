import React from 'react';
import { connect } from 'react-redux';
import {
    View,
} from 'react-native';

import backIcon from '../image/back.png'
import NavigationBar from './NavBarCommon'

class BaseNaviLayout extends React.Component {

  render = () => (
      <View style={{backgroundColor: '#e1e8eb',flex: 1}}>
            <NavigationBar 
            title={this.props.title} 
            leftImage={ backIcon } 
            leftAction={this.props.leftAction}
            rightImage={this.props.rightImg}
            rightTitle={this.props.rightTitle}
            rightAction={this.props.rightAction} />
            <View style={{flex: 1}}>
                {this.props.children}
            </View>
      </View>      
  )
}

export default BaseNaviLayout;
