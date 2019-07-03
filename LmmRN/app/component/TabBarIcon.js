import React from 'react';
import { Image } from 'react-native';

// Colors.tabIconSelected : Colors.tabIconDefault

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Image
        name={this.props.name}
        source={this.props.focused ? this.props.fouceImage : this.props.normalImage  }
        fadeDuration={0}
        style={{width: 24, height: 24, marginBottom: -3}}
      />
    );
  }
}