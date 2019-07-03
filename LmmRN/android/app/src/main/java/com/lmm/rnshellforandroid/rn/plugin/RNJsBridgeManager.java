package com.lmm.rnshellforandroid.rn.plugin;

import com.lmm.rnshellforandroid.rn.BaseRNActivity;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by chenliang on 2017/6/9.
 */

public class RNJsBridgeManager {


    private Map<String,RNJsBridgeCallAction> actions = new HashMap<>();

    public Map<String, RNJsBridgeCallAction> getActions() {
        return actions;
    }

    public void setActions(Map<String, RNJsBridgeCallAction> actions) {
        this.actions = actions;
    }

    private BaseRNActivity activity;

    public BaseRNActivity getActivity() {
        return activity;
    }

    public void setActivity(BaseRNActivity activity) {
        this.activity = activity;
    }

    private static RNJsBridgeManager instance;

    private RNJsBridgeManager(){

    }

    public void init(BaseRNActivity activity){
        this.activity = activity;
    }

    public static RNJsBridgeManager get(){
        if (instance == null){
            instance  = new RNJsBridgeManager();
        }
        return instance;
    }

    public void registerAction(String method, RNJsBridgeCallAction action){
        if (action != null){
            actions.put(method,action);
        }
    }

}
