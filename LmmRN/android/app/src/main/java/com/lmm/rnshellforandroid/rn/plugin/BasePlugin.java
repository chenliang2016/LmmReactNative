package com.lmm.rnshellforandroid.rn.plugin;

import com.facebook.react.bridge.Callback;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;

import java.util.Map;

/**
 * @author xmgong
 * @date 2017/11/14
 * 插件父类
 */

public abstract class BasePlugin<T extends BaseRNActivity> implements RNJsBridgeCallAction {
    public T activity = null;
    String method = "";

    public BasePlugin(T act) {
        this.activity = act;
        if (getClass().isAnnotationPresent(RNPlugin.class)) {
            method = getClass().getAnnotation(RNPlugin.class).method();
        }
        RNJsBridgeManager.get().registerAction(method, this);
    }


    @Override
    public void call(Map<String, Object> paramsMap, Callback callback) {
        if (method.length() > 0) {
            activity.addCallBack(method, callback);
        }
        doAction(paramsMap, callback);
    }



    public Callback getCallBack() {
        return ((BaseRNActivity) activity).getCallBack(method);
    }

    protected abstract void doAction(Map<String, Object> paramsMap, Callback callback);


}
