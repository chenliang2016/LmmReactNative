import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

import themeStyle from '../config/themeStyle'
import theme from '../config/theme'

export default class LmmInput extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       fouce:false,
    }
  }

  onChange = (text) => {
      this.props.onChange(text);
  }

  render() {

    let othenProps = {}

    if (this.props.password){
      othenProps = {
        password:true,
        secureTextEntry:true,
      }
    }

    if(this.props.editable != undefined && !this.props.editable){
      othenProps.editable = false;
    }

    let containerProps = {}

    if (this.props.needUnderLineChange){
      if (this.state.fouce){
        containerProps.style = [styles.container,styles.fouceLine]
      }else{
        containerProps.style = [styles.container,styles.normalLine]
      }
    }

    return (
      <View style={styles.container} {...containerProps}>
        {
          this.props.icon?<Image 
            source={this.props.icon}
            style={{width:24 , height:24 }}
          />:null
        }
        {
          (this.props.title!= undefined && this.props.title != "")?
          <Text style={[themeStyle.formTitleStyle,this.props.titleStyle]}>
            {this.props.title}
          </Text>:null
        }
        <TextInput
          placeholder = {this.props.placeholder}
          style={styles.textInput}
          keyboardType={this.props.keyboardType}
          value={this.props.value}
          onChangeText={(text) => this.onChange(text)}
          underlineColorAndroid={'transparent'}
          // defaultValue={this.props.defaultValue}
          onBlur={() => {this.setState({fouce:false})}}
          onFocus={() => {this.setState({fouce:true})}}
          {...othenProps}
        />
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
  textInput: {
    flex:1,
    marginLeft:10
  },
});
