import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import LmmTabButton from './LmmTabButton'

export default class LmmTabView extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            tabValue:0,
        }
    }

    _onChange = (value) => {
        console.log(value)
        this.setState({tabValue:value})
    }

    _getTabView = () => {
        console.log(this.state.tabValue)
        let view = this.props.tabViews[this.state.tabValue];
        return view;
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={{height:50,backgroundColor:"#eee"}}>
                <View style={{height:50}}>
                    <LmmTabButton 
                        value={this.state.tabValue}
                        onChange={(value) => this._onChange(value)}
                        items={this.props.tabs}
                    />
                </View>      
            </View> 
            <View style={{flex:1}}>
                {this.props.children(this.state.tabValue)}
            </View>    
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
  },
});
