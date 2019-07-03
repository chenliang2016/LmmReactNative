import {
	StyleSheet
} from 'react-native';

const commonStyles = StyleSheet.create({

  themegreen_bg:{
    backgroundColor:'#1a9b3b',
  },
  themegreen_color:{
    color:'#1a9b3b',
  },
  //列表项显示
  itembar:{
    height:48,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    paddingLeft:20,
    backgroundColor:'white',
    paddingRight:20,
  },
  itembar_txt:{
  },
  line_gray:{
    backgroundColor:'#eee',
    height:1,
  },
  //绿色按钮 start
  greenbtn:{
    marginLeft:10,
    marginRight:10,
    borderRadius:5,
    backgroundColor:'#1a9b3b',
    height:46,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  codebtn:{
    marginTop: 8,
    marginBottom: 8,
    marginLeft:10,
    marginRight:0,
    borderRadius:5,
    backgroundColor:'#1a9b3b',
    justifyContent:'center',
    alignItems:'center',
    flex:1,
  },
  greenbtn_txt:{
    color:'white',
    fontSize:16,
  },
    //绿色按钮 end
});

export default commonStyles;
