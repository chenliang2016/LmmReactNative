import React, {Component} from 'react';

import { Text, View, StyleSheet } from 'react-native';

import themeStyle from '../config/themeStyle'

// 获取组件的名字
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const getFieldDecorator = (itemOption) => (WrappedComponent) => {

    class FormItemContainerComponent extends Component {

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
            console.log("渲染子组件")
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
    FormItemContainerComponent.displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    return FormItemContainerComponent
}

const createForm = (WrappedComponent) => {

    class FormContainerComponent extends Component {

        constructor(props){
            super(props)

            console.log("创建高级组件")
           
            this.newProps = {
                setValue:this._setValue,
                getValue:this._getValue,
                form:{
                    getFieldDecorator:getFieldDecorator
                },
            }
        }
    
        _setValue = (key,value) => {
            
        }
    
        _getValue = () => {
    
        }

        render() {
            console.log("渲染高阶组件")
            return (<WrappedComponent {...this.props} {...this.newProps}/>)
        }
    }
    FormContainerComponent.displayName = `HOC(${getDisplayName(WrappedComponent)})`;

    return FormContainerComponent
}

class LmmFormContainer extends Component {

    static create = createForm;

	render() {
		return (<View>
                    {this.props.children}
                </View>
		   )
	}
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

export default LmmFormContainer