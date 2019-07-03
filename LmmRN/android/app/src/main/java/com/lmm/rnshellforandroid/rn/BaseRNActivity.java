package com.lmm.rnshellforandroid.rn;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.widget.Toast;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.lmm.rnshellforandroid.rn.manager.RNManager;
import com.lmm.rnshellforandroid.rn.plugin.RNJsBridgeManager;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chenliang on 2019/07/03.
 */

public abstract class BaseRNActivity extends Activity implements DefaultHardwareBackBtnHandler {


    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;


    Map<String, Callback> callbackMap = new HashMap<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = RNManager.getInstance(this).getManager(this);

        String rootname = getJsRootName();
        mReactRootView.startReactApplication(mReactInstanceManager, rootname, null);

        setContentView(mReactRootView);

        RNJsBridgeManager.get().init(this);

        addPlugins();

    }


    public void addCallBack(String tag, Callback callback) {
        callbackMap.put(tag, callback);
    }

    public Callback getCallBack(String tag) {
        if (callbackMap.containsKey(tag)) {
            return callbackMap.get(tag);
        } else {
            return null;
        }
    }

    public abstract void addPlugins();

    public abstract String getJsRootName();

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    public void sendEvent(String method, WritableMap params) {
        ReactContext reactContext = mReactInstanceManager.getCurrentReactContext();
        if (reactContext == null) {
            Toast.makeText(getApplicationContext(), "程序未启动", Toast.LENGTH_SHORT).show();
        } else {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(method, params);
        }
    }
}

