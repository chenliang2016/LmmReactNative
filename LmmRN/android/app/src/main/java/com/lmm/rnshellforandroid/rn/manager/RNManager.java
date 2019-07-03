package com.lmm.rnshellforandroid.rn.manager;

import android.app.Activity;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;

/**
 * Created by chenliang on 2017/3/27.
 */

public class RNManager {

    private static ReactInstanceManager mManager = null;
    private static RNManager mInstance;


    public static RNManager getInstance(Activity activity) {
        if (mInstance == null) {
            mInstance = new RNManager();
            mManager = createReactInstanceManager(activity);
        }
        return mInstance;
    }

    public ReactInstanceManager getManager(Activity activity) {
        if (mManager == null) {
            mManager = createReactInstanceManager(activity);
        }

        return mManager;
    }

    private static ReactInstanceManager createReactInstanceManager(Activity act) {

        ReactInstanceManager mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(act.getApplication())
                .setCurrentActivity(act)
                .setBundleAssetName("index.android.bundle")
                .setJSMainModulePath("index")
                .addPackage(new MainReactPackage())
                .addPackage(new RNPackage())
                .setUseDeveloperSupport(true)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        return mReactInstanceManager;
    }

}
