package com.lmm.rnshellforandroid.rnplugins.photo;

import android.util.Log;

import com.alibaba.sdk.android.oss.common.auth.OSSFederationCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSFederationToken;


import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by Administrator on 2015/12/9 0009.
 * 重载OSSFederationCredentialProvider生成自己的获取STS的功能
 */
public class STSGetter extends OSSFederationCredentialProvider {

    String stsServer;

    public STSGetter(String stsServer) {
        this.stsServer = stsServer;
    }

    public OSSFederationToken getFederationToken() {

        String stsJson;
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(stsServer).build();
        try {
            Response response = client.newCall(request).execute();
//            if (response.isSuccessful()) {
                stsJson = response.body().string();
//            } else {
//                throw new IOException("Unexpected code " + response);
//            }
        }
        catch (IOException e) {
            e.printStackTrace();
            Log.e("GetSTSTokenFail", e.toString());
            return null;
        }

        try {
            JSONObject jsonObjs = new JSONObject(stsJson);
            JSONObject successObj = jsonObjs.getJSONObject("data");
            String ak = successObj.getString("AccessKeyId");
            String sk = successObj.getString("AccessKeySecret");
            String token = successObj.getString("SecurityToken");
            String expiration = successObj.getString("Expiration");
            return new OSSFederationToken(ak, sk, token, expiration);
        }
        catch (JSONException e) {
            Log.e("GetSTSTokenFail", e.toString());
            e.printStackTrace();
            return null;
        }
    }

}
