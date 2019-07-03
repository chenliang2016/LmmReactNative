import { StyleSheet , Dimensions} from 'react-native';
const {width , height} = Dimensions.get('window');
import themeConfig from './theme';


const  themeStyle = StyleSheet.create({

    bigFontStyle : {
        fontSize: themeConfig.bigSize , 
        color:themeConfig.maincolor
    },

    titleFontStyle: {
        fontSize: themeConfig.titleSize, 
        color:'white'
    },

    normalFontStyle: {
        fontSize: themeConfig.normalSize,
        color: 'white'
    },

    commonFontStyle : {
        fontSize: themeConfig.commonSize, 
        color:'red'
    },

    loginBtnStyle : {
        width: width - 40,
        height: 40,
        backgroundColor: themeConfig.maincolor,
        flexDirection:'row' , 
        alignItems:'center' , 
        justifyContent:'center',
        borderRadius:3 ,
    },

    loginTxtStyle: {
        fontSize : themeConfig.titleSize,
        color : 'white'
    }, 
    whiteBtnTxtStyle:{
        fontSize : themeConfig.titleSize,
        color : 'white'
    },
    listItemTitleTxtStyle:{
        fontSize : themeConfig.titleSize,
        color : '#222'
    },
    listItemNormalTxtStyle:{
        fontSize : themeConfig.commonSize,
        color : '#888'
    },
    listItemSmallTxtStyle:{
        fontSize : themeConfig.smallSize,
        color : '#888'
    },

    submitBtnStyle : {
        width: width - 20,
        height: 40,
        backgroundColor: themeConfig.maincolor,
        flexDirection:'row' , 
        alignItems:'center' , 
        justifyContent:'center',
        borderRadius:3 
    },

    formTitleStyle:{
        fontSize: 16,
        width:70,
        fontWeight: 'bold',
        textAlign: 'left',
    }

});

module.exports = themeStyle;