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
        this.page = 0;
        this.query = {};
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.query != undefined && nextProps.query != this.props.query){
            console.log("重新加载");
            this.query = nextProps.query;
            this.page = 0;
            this.setState({refreshing:true,list:[],footText:"正在加载"});
            this.loadData(1)
        }   
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.page = 0;
            this.loadData();
        });
    }

    _renderFooter = () => {
        return (
          <CLTableFootView isLoading={this.state.isLoading} footText = {this.state.footText} />
        )
    }

    _onEndReached = () => {
        if (this.state.hasMore && !this.state.isLoading) {
          this.setState({isLoading: true});
          this.loadData();
        }
    }
    
    _onRefresh = () => {
        this.page = 0;
        this.setState({refreshing:true,list:[],footText:"正在加载"});
        this.loadData(1);
    }

    _keyExtractor = (item) => {
        return "" + item[this.props.id]
    }

    _renderSeparator = () => {
        return <View style={{backgroundColor:"#eee",height:1,flex:1}}></View>
    }

    loadData = (isfresh) => {
        let oldList = this.state.list;
        if ( isfresh ){
            oldList = [];
        }
        if (this.props.loadData != undefined){
            this.props.loadData(this.page,this.query).then((value) => {
                console.log("获取列表数据")
                console.log(value[0])
                if (value){
                    this.page = this.page + 1;
                    let type = 1;
                    if (value.length < 10){
                        type = 2; // 加载完成
                    }else{
                        type = 1;
                    }

                    let data = oldList.concat(value);

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