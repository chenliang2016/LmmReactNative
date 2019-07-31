package com.lmm.rnshellforandroid.rnplugins;

import android.content.Context;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;
import com.lmm.rnshellforandroid.rn.plugin.BasePlugin;

import java.util.Map;

@RNPlugin(method = "version")
public class VersionPlugin extends BasePlugin<BaseRNActivity> {

    private BaseRNActivity activity;

    private Callback callback;

    public VersionPlugin(BaseRNActivity act) {
        super(act);
        this.activity = act;
    }

    @Override
    protected void doAction(Map<String, Object> paramsMap, Callback callback) {

        this.callback = callback;
        WritableMap returnMap = Arguments.createMap();
        returnMap.putString("versionCode","" + getVersionCode(this.activity));
        returnMap.putString("versionName",getVersionName(this.activity));
        callback.invoke(returnMap);

    }

    public int getVersionCode(Context mContext) {
        if (mContext != null) {
            try {
                return mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionCode;
            } catch (PackageManager.NameNotFoundException ignored) {
            }
        }
        return 0;
    }

    public String getVersionName(Context mContext) {
        if (mContext != null) {
            try {
                return mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0).versionName;
            } catch (PackageManager.NameNotFoundException ignored) {
            }
        }

        return "";
    }

}
