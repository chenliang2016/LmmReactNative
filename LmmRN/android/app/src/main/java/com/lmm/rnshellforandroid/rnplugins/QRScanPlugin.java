package com.lmm.rnshellforandroid.rnplugins;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;
import com.lmm.rnshellforandroid.rn.plugin.BasePlugin;
import com.lmm.rnshellforandroid.third.zbar.CaptureActivity;

import java.util.Map;


@RNPlugin(method = "qrscan")
public class QRScanPlugin extends BasePlugin<BaseRNActivity> {

    private BaseRNActivity activity;

    private Callback callback;

    public static final int REQUEST_CODE_SCAN = 0x0000;// 扫描二维码

    public QRScanPlugin(BaseRNActivity act) {
        super(act);
        this.activity = act;
    }

    @Override
    protected void doAction(Map map, Callback callback) {
        this.callback = callback;
        Intent intent = new Intent(activity, CaptureActivity.class);
        activity.startActivityForResult(intent, REQUEST_CODE_SCAN);
    }

    public void setQRScanResult(String msg){
        callback.invoke(msg);
    }
}
