package com.lmm.rnshellforandroid.rn;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.lmm.rnshellforandroid.rn.plugin.RNJsBridgeManager;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chenliang on 2019/07/03.
 */

public abstract class BaseRNActivity extends ReactActivity implements DefaultHardwareBackBtnHandler {


    Map<String, Callback> callbackMap = new HashMap<>();

    @Override
    protected String getMainComponentName() {
        return getJsRootName(); // this one too
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(BaseRNActivity.this);
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
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

//    @Override
//    protected void onPause() {
//        super.onPause();
//
//        if (mReactInstanceManager != null) {
//            mReactInstanceManager.onHostPause(this);
//        }
//    }
//
//    @Override
//    protected void onResume() {
//        super.onResume();
//
//        if (mReactInstanceManager != null) {
//            mReactInstanceManager.onHostResume(this, this);
//        }
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//
//        if (mReactInstanceManager != null) {
//            mReactInstanceManager.onHostDestroy(this);
//        }
//    }
//
//    @Override
//    public void onBackPressed() {
//        if (mReactInstanceManager != null) {
//            mReactInstanceManager.onBackPressed();
//        } else {
//            super.onBackPressed();
//        }
//    }
//
//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
//            mReactInstanceManager.showDevOptionsDialog();
//            return true;
//        }
//        return super.onKeyUp(keyCode, event);
//    }
//
//    public void sendEvent(String method, WritableMap params) {
//        ReactContext reactContext = mReactInstanceManager.getCurrentReactContext();
//        if (reactContext == null) {
//            Toast.makeText(getApplicationContext(), "程序未启动", Toast.LENGTH_SHORT).show();
//        } else {
//            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(method, params);
//        }
//    }
}

