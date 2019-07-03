import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

import themeStyle from '../config/themeStyle'
import theme from '../config/theme'

export default class LmmText extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       value:"",
    }
  }

  render() {

    let containerStyles = {}

    if (this.props.underLine){
        containerStyles = styles.normalLine;
    }

    return (
      <View style={[styles.container,containerStyles]}>
        {
          this.props.icon?<Image 
            source={this.props.icon}
            style={{width:24 , height:24 }}
          />:null
        }
        {
          (this.props.title!= undefined && this.props.title != "")?
          <Text style={[themeStyle.formTitleStyle,{width:this.props.titleWidth}]}>
            {this.props.title}
          </Text>:null
        }
        <Text style={styles.textContent}>
            {this.props.content != undefined ?
                this.props.content:null
            }
        </Text>
        {this.props.subTitle != null?
          <Text style={styles.text}>
            {this.props.subTitle}
          </Text>
          :null
        }
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:"center",
    padding: 10,
  },
  fouceLine:{
    borderBottomColor:theme.maincolor,
    borderBottomWidth:1,
  },
  normalLine:{
    borderBottomColor:'#f2f2f2',
    borderBottomWidth:1,
  },
  textContent: {
    flex:1,
    marginLeft:10
  },
});
