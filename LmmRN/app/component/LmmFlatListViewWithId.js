import React, {
    Component
  } from 'react';
  import {
    View,FlatList,InteractionManager
  } from 'react-native';

import CLTableFootView from './CLTableFootView'

class LmmFlatListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footText: "",
            refreshing: false,
            isLoading:true,
            hasMore: false,
            list:[],
        }
        this.lastId = undefined;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadData();
        });
    }

    _renderFooter = () => {
        return (
          <CLTableFootView isLoading={this.state.isLoading} footText = {this.state.footText} />
        )
    }

    _getLastId = (data) => {
        if (data.length > 0){
            let lastObj = data[data.length - 1];
            this.lastId = lastObj[this.props.id]
        }else{
            this.lastId = undefined;        
        }
    }

    _onEndReached = () => {
        if (this.state.hasMore && !this.state.isLoading) {
          this.setState({isLoading: true});
          this.loadData();
        }
    }
    
    _onRefresh = () => {
        this.lastId = undefined;
        this.setState({refreshing:true,list:[],footText:"正在加载"});
        this.loadData();
    }

    _keyExtractor = (item) => {
        return item[this.props.id]
    }

    _renderSeparator = () => {
        return <View style={{backgroundColor:"#eee",height:1,flex:1}}></View>
    }

    loadData = () => {
        if (this.props.loadData != undefined){
            this.props.loadData(this.lastId).then((value) => {
                if (value){
                    let type = 1;
                    let data = value;


                    if (this.lastId == undefined){
                        if (data.length == 0){
                            type = 0;
                        }
                    }else{
                        if (data.length < 10){
                            type = 2;
                        }else{
                            type = 1;
                        }
                    }

                    if (this.lastId != undefined){
                        data = this.state.list.concat(value);
                    }else{
                        data = value;
                    }

                    this._getLastId(data);
                    
                    if(type == 1){
                        this.setState({ 
                            list:data,    
                            hasMore:true, 
                            refreshing:false,
                            isLoading:false, 
                            footText:"上拉加载更多"});
                    }else if(type == 2){
                        this.setState({
                            list:data,
                            hasMore:false, 
                            refreshing:false,
                            isLoading:false, 
                            footText:"加载完成"});
                    }else if(type == 0){
                        this.setState({
                            list:data,
                            hasMore:false, 
                            refreshing:false,
                            isLoading:false, 
                            footText:"暂无数据"
                        });
                    }
                    
                }
            })
        }
    }

    render() {
        return <View style={{flex:1}}>
        <FlatList
            style = {{flex:1}}
            data={this.state.list}
            renderItem={this.props.renderItem}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._onEndReached}
            ItemSeparatorComponent={this._renderSeparator}
            onEndReachedThreshold={1}
            onRefresh={this._onRefresh}
            refreshing={this.state.refreshing}></FlatList>
        </View>
    }
}

export default LmmFlatListView;