package com.lmm.rnshellforandroid.rn.plugin;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableNativeMap;

import java.util.HashMap;

/**
 * Created by chenliang on 2017/9/6.
 */

public class RNJsBridgeModule extends ReactContextBaseJavaModule {

    public RNJsBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNJsBridge";
    }

    @ReactMethod
    public void invoke(String method, ReadableMap params, Callback callback) {

        ReadableNativeMap map = (ReadableNativeMap) params;
        HashMap<String, Object> paramsMap = toHashMap(map);

        RNJsBridgeCallAction rnJsBridgeCallAction = RNJsBridgeManager.get().getActions().get(method);

        if (rnJsBridgeCallAction == null) {
            Toast.makeText(getReactApplicationContext(), "未注册此方法", Toast.LENGTH_SHORT).show();
        } else {
            rnJsBridgeCallAction.call(paramsMap, callback);
        }
    }


    public HashMap<String, Object> toHashMap(ReadableNativeMap map) {
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        HashMap<String, Object> hashMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (map.getType(key)) {
                case Null:
                    hashMap.put(key, null);
                    break;
                case Boolean:
                    hashMap.put(key, map.getBoolean(key));
                    break;
                case Number:
                    if (map.getDouble(key) % 1 == 0) {
                        hashMap.put(key, map.getInt(key));
                    } else {
                        hashMap.put(key, map.getDouble(key));
                    }
                    break;
                case String:
                    hashMap.put(key, map.getString(key));
                    break;
                case Map:
                    hashMap.put(key, toHashMap(map.getMap(key)));
                    break;
                case Array:
                    hashMap.put(key, map.getArray(key).toArrayList());
                    break;
                default:
                    throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }
        }
        return hashMap;
    }


}
