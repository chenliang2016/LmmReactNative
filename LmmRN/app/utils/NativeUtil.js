'use strict';

import React from 'react';
import {
    NativeModules,
} from 'react-native';
import LmmStore from '../component/LmmStore'

export const toast = (value) => {
    console.log('toast')
    NativeModules.RNJsBridge.invoke('showinfo', {info: value}, (res) => {
    });
};

export const print = (action,params,callback) => {
    NativeModules.RNJsBridge.invoke('print', Object.assign({},{action: action},params), (res) => {
        callback(action,res);
    });
};

export const qrscan = (callback) => {
    NativeModules.RNJsBridge.invoke('qrscan',{}, (res) => {
        callback(res);
    });
};

export const photo = (type,params,callback) => {
    NativeModules.RNJsBridge.invoke('photo',Object.assign({},{type:type},params), (res) => {
        callback(res); // type：（pick，takephoto）返回是map  type：（convert）返回是array
    });
};

/**
 * 上传图片
 */

export const choosePhoto = (params, callback) => {
    NativeModules.RNJsBridge.invoke('cgPhotos', params, function (res) {
        callback(res);
    });
};

export const chooseCity = (callback) => {
    console.log('choosecity')
    NativeModules.RNJsBridge.invoke('chooseCity', {}, function (res) {
        callback(res);
    });
};

export const checkCity = (callback) => {
    console.log('checkcity');
    NativeModules.RNJsBridge.invoke("checkcity", {}, (params) => {
        callback(params);
    });
};

export const getLocation = (callback) => {
    console.log('getlocation')
    NativeModules.RNJsBridge.invoke("getlocation", {}, (values) => {
        callback(values);
    });
};

export const unRead = (callback) => {
    console.log('unRead')
    NativeModules.RNJsBridge.invoke("unRead", {}, (values) => {
        callback(values);
    });
};

/**
 * 地图上选点
 */
export const getMapLocation = (params, callback) => {
    console.log('getMapLocation')
    NativeModules.RNJsBridge.invoke('chooseMapLocation', params, values => {
        callback(values);
    });
};

/**
 * 导航
 */
export const navi = (params) => {
    console.log('bd_navi')
    NativeModules.RNJsBridge.invoke('bd_navi', params, values => {
        callback(values);
    });
};

export const setBlueTooth = (callback) => {
    NativeModules.RNJsBridge.invoke("setBlueThooth",{},value=>{
        callback(value)
    });
}


export const printer = (params , callback) => {
    NativeModules.RNJsBridge.invoke("printerCpgl" , params , value => {
        callback(value);
    })
}

export const printerProgram = (params , callback) => {    
    NativeModules.RNJsBridge.invoke("printerJycx" , params , value => {
        callback(value);
    });
}

export const checkContectState = (params , callback) => {
    NativeModules.RNJsBridge.invoke("checkPrinterState" , params , value => {
         callback(value)
    })
}


export const contectPrinter = (params , callback) => {
    NativeModules.RNJsBridge.invoke("contectPrinter" , params , value => {
        callback(value)
    })
}


export const updateApp = (params , callback) => {
    NativeModules.RNJsBridge.invoke("updateApp" , params , value => {
        callback(value)
    })
}

export const microPhotoListener = (params , callback) => {
    NativeModules.RNJsBridge.invoke("microPhotoListener" , params , value => {
        callback(value)
    });
}
