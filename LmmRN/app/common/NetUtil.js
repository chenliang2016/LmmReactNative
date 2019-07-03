/**
 * NetUitl 网络请求的实现
 * @author chenliang
 * @date 2017-01-22
 * https://github.com/facebook/react-native
 */
'use strict';
import LmmStore from '../component/LmmStore'
import NavigationService from '../navigation/NavigationService';

import {
	NativeModules
} from 'react-native';

var LoginOutPlugin = NativeModules.LoginOutPlugin;

class NetUitl {

   static serializeJSON(data){
      return Object.keys(data).map(function (keyName) {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
      }).join('&');
   }

  static postSign(url, data) {
    var fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: NetUitl.serializeJSON(data)
    };

    let fetchPromise = new Promise((resolve,reject) => {
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => JSON.parse(responseText))
        .then((responseJson) => {
                if (responseJson.result == "200") {
                    resolve(responseJson.data)
                } else {
                    // toast(responseJson.msg);
                }
            }).catch(function (e) {
                console.log(e);
                // toast("网络异常");
        }).done();
    })
    return fetchPromise;
  }

  static async post(url, data) {
    
    let token = await LmmStore.getConfig("token");
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (token != undefined){
        console.log(token);
        headers = Object.assign({},headers,{"Authorization":"Bearer "+token})
    }

    var fetchOptions = {
        method: 'POST',
        headers: headers,
        body: NetUitl.serializeJSON(data)
    };

    let fetchPromise = new Promise((resolve,reject) => {
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => JSON.parse(responseText))
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.result == 1) {
                resolve(responseJson.data)
            } else {
                if (responseJson.result == -100){
                    console.log("跳转到登录")
                    NavigationService.navigate('Login', { });
                    resolve("");
                }else{
                    global.toast(responseJson.msg)
                    reject(responseJson)
                }

            }
        }).catch(function (e) {
                global.toast('网络异常')
                reject(e)
        }).done(() => {
            global.hideLoading()
        });
    })
    return fetchPromise;
  }
}

export default NetUitl;
