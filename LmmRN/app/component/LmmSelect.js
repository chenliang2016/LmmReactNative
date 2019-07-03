import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList ,Modal,Dimensions,ActivityIndicator,Image} from 'react-native';

import themeStyle from '../config/themeStyle'
const {width , height} = Dimensions.get('window');

export default class LmmSelect extends React.Component {
  state = {
    modalVisible: false,
    value: undefined,
    items:[],
    isLoading:true,
  };

  loadData = () => {
    if (this.props.loadData != undefined){
      this.props.loadData().then((value) => {
          this.setState({items:value,isLoading:false})
      })
    }
  }

  setModalVisible(visible) {

    if (visible){
      if (this.state.items.length == 0){
         this.loadData()
      }
    }

    this.setState({ modalVisible: visible });
  }

  onChange = item => {
    this.setState({ value: item });
    this.setModalVisible(false);
    this.props.onChange(item);
  };

  _keyGroupExtractor = (item) => {
    return item.value
  }

  _renderItem = ({item}) => {

      let width = width;

      return (<TouchableOpacity onPress={() => {
              this.onChange(item)
          }}>
              <View style={styles.itemRow}>
                  <Text>
                      {item.title}
                  </Text>
              </View>
          </TouchableOpacity>
      )
  }

  _renderSeparator = () => {
    return <View style={{backgroundColor:"#eee",height:1,flex:1}}></View>
  }

  render() {

    let item = <Text style={{color:"#d2d2d2"}}>{this.props.placeholder}</Text>
    if (this.state.value == undefined){
       if (this.props.defaultValue != undefined && this.props.defaultValue != ""){
          item = <Text>{this.props.defaultValue}</Text>
       }
    }else{
       item = <Text>{this.state.value.title}</Text>
    }

    let isCancleHidden = false;
    if (this.props.isCancleHide != undefined && this.props.isCancleHide == true){
      isCancleHidden = true;
    }

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
            
          {this.props.title != "" ?
          <Text style={themeStyle.formTitleStyle}>{this.props.title}</Text>
          :null
          }
          <TouchableOpacity
              style={{flex: 1,
                marginLeft: 10, }}
              onPress={() => {
                if (this.props.editable != undefined && !this.props.editable){
                  return ;
                }
                this.setModalVisible(true);
              }}
            >
              {item}
          </TouchableOpacity>
          {isCancleHidden ?null :
          <TouchableOpacity onPress={() => {this.onChange({title:"",value:""})}}>
            <Image source={require('../image/cancle.png')} style={{width:20,height:20}}>
              
            </Image>
          </TouchableOpacity>
          }
          
          
        </View>

        <Modal
          style = {{flex:1,backgroundColor:"#222"}}
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}
        >
        <View style={{flex:1,justifyContent:"flex-end",alignItems: 'stretch',flexDirection: 'column' }}>
          <TouchableOpacity
            onPress = {() => {this.setModalVisible(false);}}
            style = {{flex:1,backgroundColor:"rgba(178,178,178,0.5)"}}
            />
            {this.state.isLoading?
            <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}} >
                <ActivityIndicator hidesWhenStopped={true} animating={true} />
            </View> 
            :<FlatList
              style = {{flex:1,backgroundColor:"white"}}
              keyExtractor={this._keyGroupExtractor}
              ItemSeparatorComponent={this._renderSeparator}
              data={this.state.items}
              renderItem={this._renderItem}
              />
            }
        </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:"center",
  },
  subContainer: {
    flexDirection: 'row',
    alignItems:"center",
    padding: 10,
  },
  itemRow: {
    height:40,
    padding:10,
    flexDirection: 'row',
    alignItems: 'center'
  },
});
