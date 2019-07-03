import * as React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';

import themeStyle from '../config/themeStyle'

import LmmInput from './LmmInput'

export default class LmmLoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loginId:props.defaultLoginId,
            password:props.defaultPassword
        }
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.defaultLoginId != undefined && nextProps.defaultLoginId != this.props.defaultLoginId){
            this.setState({loginId:nextProps.defaultLoginId})
        }   

        if (nextProps.defaultPassword != undefined && nextProps.defaultPassword != this.props.defaultPassword){
            this.setState({password:nextProps.defaultPassword})
        }
    }

    _loginAction = () => {
        this.props.loginAction({
            loginId:this.state.loginId,
            password:this.state.password,
        })
    }

    render(){
       
        let loginIdProps = {};
        let passwordProps = {};

        if (this.props.defaultLoginId != undefined){
            loginIdProps = {
                defaultValue:this.props.defaultLoginId,
            }
        }
        if (this.props.defaultPassword != undefined){
            passwordProps = {
                defaultValue:this.props.defaultPassword,
            }
        }

        return (
            <View style={{flex:1}}>
                    <View>
                        <LmmInput 
                            {...loginIdProps}
                            needUnderLineChange = {true}
                            placeholder = "请输入账号"
                            value = {this.state.loginId}
                            onChange={(text) => {
                                this.setState({loginId:text});
                            }}
                            icon={require('../image/login.png')} />
                    </View>
        
                    <View style={{marginTop:10}}> 
                        <LmmInput 
                            {...passwordProps}
                            needUnderLineChange = {true}
                            password = {true}
                            value={this.state.password}
                            placeholder = "请输入密码"
                            onChange={(text) => {
                                this.setState({password:text});
                            }}
                            icon={require('../image/password.png')} />
                    </View>

                    <TouchableOpacity 
                        onPress={() => {this._loginAction()}}
                        style={[themeStyle.loginBtnStyle,{marginTop:25 }]}>
                        <Text style={themeStyle.loginTxtStyle}>登录</Text>
                    </TouchableOpacity>
                </View>
        )
    }

}
