'use strict';

import React from 'react';
import {
    NativeModules,
    Platform,
} from 'react-native';

export const NaviManager = NativeModules.NaviManagerPlugin;

let NaviUtil = {};

NaviUtil.TypeNative = "native";
NaviUtil.TypeReact = "react";

NaviUtil.key = {
    "shopEdit": "shopEdit",
    "shopStory": "shopStory",
    "shopComplete": "shopComplete",
}


NaviUtil.push = (module, passProps, navigator) => {
    const nextRoute = {
        component: module.component,
        title: module.name,
        passProps: passProps,
    };

    const type = module.type;
    const route = nextRoute;

    if (type == NaviUtil.TypeNative) {
        NaviManager.pushToRoute(module.tag, passProps);
    } else if (type == NaviUtil.TypeReact) {
        navigator.push(route);
    }
}

NaviUtil.nativePush = (routerKey, passProps) => {
    NaviManager.pushToRoute(routerKey, passProps);
}

export default NaviUtil;