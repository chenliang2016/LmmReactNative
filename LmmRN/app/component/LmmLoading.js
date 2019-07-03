
import React, { Component } from 'react';
import {
    Platform,
    View,
    ActivityIndicator,
    Modal,
    Text,
} from 'react-native';
 
export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: !this.props.hide,
        }
    }
 
    close() {
        // if (Platform.OS === 'android') {
            setTimeout(()=>{
                this.setState({modalVisible: false});
            },1000)
        // }else {
        //     setTimeout(()=>{
        //         this.setState({modalVisible: false});
        //     },1000)
        // }
    }
 
    show() {
        this.setState({modalVisible: true});
    }
 
    render() {
        if (!this.state.modalVisible) {
            return null
        }
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.8)', width: 100, height: 100, alignItems: 'center'}}>
                        <ActivityIndicator
                            animating={true}
                            color='white'
                            style={{
                                marginTop: 10,
                                width: 60,
                                height: 60,
                            }}
                            size="large" />

                        <Text style={{color:'white'}}>加载中...</Text>    
                    </View>
                </View>
            </Modal>
        );
    }
}
 
// // 获取组件的名字
// function getDisplayName(WrappedComponent) {
//     return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }

// const LmmLoading = ({option}) => (WrappedComponent) => {

//     class LoadingContainerComponent extends Component {

//         constructor(props){
//             super(props)
//             this.state = {
//                 isLoading:false,
//             }
//             this.newProps = {
//                 showLoading:() => {this.showLoading()},
//                 hideLoading:() => {this.hideLoading()}
//             }
//         }

//         showLoading = () => {
//             if (this._isFull()){
//                 this.setState({isLoading:true})
//             }else{
//                 this.Loading.show();
//             }
//         }

//         hideLoading = () => {
//             if (this._isFull()){
//                 this.setState({isLoading:true})
//             }else{
//                 this.Loading.close();
//             }
//         }

//         _isFull = () => {
//             if (option != undefined && option.isFull != undefined && option.isFull == true){
//                 return true;
//             }else{
//                 return false;
//             }
//         }

//         render() {
//             if (this._isFull()){
//                 if (this.state.isLoading){
//                     return <View style={{alignItems:'center',justifyContent:'center'}}>
//                                 <ActivityIndicator
//                                     animating={true}
//                                 />
//                             </View>
//                 }else{
//                     return <WrappedComponent {...this.newProps} {...this.props}  />
//                 }
//             }else{
//                 return (<View style={{flex:1}}>
//                     <WrappedComponent {...this.newProps} {...this.props}  />
//                     <Loading ref={r=>{this.Loading = r}} hide = {true} /> 
//                 </View>)
//             }
//         }
//     }
//     LoadingContainerComponent.displayName = `HOC(${getDisplayName(WrappedComponent)})`;

//     return LoadingContainerComponent
// }
