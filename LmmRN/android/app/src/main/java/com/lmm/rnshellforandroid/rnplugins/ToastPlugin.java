package com.lmm.rnshellforandroid.rnplugins;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;
import com.lmm.rnshellforandroid.rn.plugin.BasePlugin;

import java.util.Map;


/**
 * @author xmgong
 * @date 2017/11/15
 */
@RNPlugin(method = "showinfo")
public class ToastPlugin extends BasePlugin<BaseRNActivity> {

    private BaseRNActivity activity;

    public ToastPlugin(BaseRNActivity act) {
        super(act);
        this.activity = act;
    }

    @Override
    protected void doAction(Map map, Callback callback) {
        if (map.containsKey("info")) {
            Toast.makeText(this.activity,map.get("info").toString(),3000);
        }
    }
}
