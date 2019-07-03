package com.lmm.rnshellforandroid.rn.plugin;

import com.facebook.react.bridge.Callback;

import java.util.Map;

/**
 * Created by chenliang on 2017/9/6.
 */

public interface RNJsBridgeCallAction {

    void call(Map<String, Object> paramsMap, Callback callback);

}
