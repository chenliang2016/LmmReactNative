import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

import themeStyle from '../config/themeStyle'

// 获取组件的名字
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default (itemOption) => (WrappedComponent) => {

    class NewComponent extends Component {

        constructor(props){
            super(props)
            this.state = {
                value: '测试'
            }
           
            this.newProps = {
                onChange:(text) => this._onChange(text)
            }
        }

        _onChange = (value) => {
            console.log(value);
            this.setState({value})
        }

        render() {
            return (<View style={styles.container}>
            <Text style={themeStyle.formTitleStyle}>
            {itemOption.title}
            </Text>
            <WrappedComponent {...this.props} value={this.state.value} {...this.newProps}/>
            {itemOption.subTitle != null?
            <Text style={styles.text}>
                {itemOption.subTitle}
            </Text>
            :null
            }
        </View>)
        }
    }
    NewComponent.displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    return NewComponent
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems:"center",
      padding: 10,
    },
    textInput: {
      flex:1,
      marginLeft:10
    },
});