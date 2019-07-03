import {  
    Platform,  
    Dimensions  
} from 'react-native';  
  
// iPhoneX  
const X_WIDTH = 375;  
const X_HEIGHT = 812;  
  
// screen  
const SCREEN_WIDTH = Dimensions.get('window').width;  
const SCREEN_HEIGHT = Dimensions.get('window').height;  

let NAVIGATOR_HEIGHT = 44;
let PADDING_TOP = 44;
let PADDING_BOTTOM = 34;
  
export function isIphoneX() {  
    return (  
        Platform.OS === 'ios' &&   
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||   
        (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))  
    )  
}

export function ifIphoneX (iphoneXStyle, regularStyle) {  
    if (isIphoneX()) {  
        return iphoneXStyle;  
    } else {  
        return regularStyle  
    }  
}

if(isIphoneX()){
    NAVIGATOR_HEIGHT = 88;
    PADDING_TOP = 44;
    PADDING_BOTTOM = 34;
} else {
    PADDING_TOP =  Platform.OS === 'android' ? 0 : 20;
    NAVIGATOR_HEIGHT = Platform.OS === 'android' ? 48 : 64;
    PADDING_BOTTOM = 0;
}

export const naviHeight = NAVIGATOR_HEIGHT;
export const paddingTop = PADDING_TOP;
export const paddingBottom = PADDING_BOTTOM;