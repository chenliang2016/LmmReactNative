package com.lmm.rnshellforandroid.rnplugins.print;


import org.json.JSONObject;

import java.text.DecimalFormat;

public class PrintMode {
    public String FMCTypeID;
    public String ID;
    public String PZName;
    public String FBH;
    public String Flength;
    public String FHD;
    public String FKD;
    public String FQty;
    public String FMXMD;
    public String FZY;
    public String FCH;
    public String FDH;
    public String FSpecName;
    public String FCustomerName;
    public String YMZFQty;
    public String FCS;
    public String FPNum;

    public PrintMode(JSONObject optJSONObject) {
        ID = GetString(optJSONObject.optString("ID"), false);
        FMCTypeID = GetString(optJSONObject.optString("FMCTypeID"), false);
        PZName = GetString(optJSONObject.optString("PZName"), false);
        FBH = GetString(optJSONObject.optString("FBH"), false);
        Flength = GetString(optJSONObject.optString("Flength"), true);
        FHD = GetString(optJSONObject.optString("FHD"), true);
        FKD = GetString(optJSONObject.optString("FKD"), true);
        FQty = GetString(optJSONObject.optString("FQty"), true);
        FMXMD = GetString(optJSONObject.optString("FMXMD"), false);
        FZY = GetString(optJSONObject.optString("FZY"), false);
        FCH = GetString(optJSONObject.optString("FCH"), false);
        FDH = GetString(optJSONObject.optString("FDH"), false);
        FSpecName = GetString(optJSONObject.optString("FSpecName"), false);
        FCustomerName = GetString(optJSONObject.optString("FCustomerName"), false);
        //FSCTZH=optJSONObject.optString("FSCTZH");
        YMZFQty = GetString(optJSONObject.optString("YMZFQty"), true);
        FCS = GetString(optJSONObject.optString("FCS"), true);
        FPNum = GetString(optJSONObject.optString("FPNum"), true);


//        ID =optJSONObject.optString("ID");
//        FMCTypeID = optJSONObject.optString("FMCTypeID");
//        PZName = optJSONObject.optString("PZName");
//        FBH = optJSONObject.optString("FBH");
//        Flength = optJSONObject.optString("Flength");
//        FHD = optJSONObject.optString("FHD");
//        FKD = optJSONObject.optString("FKD");
//        FQty = optJSONObject.optString("FQty");
//        FMXMD = optJSONObject.optString("FMXMD");
//        FZY = optJSONObject.optString("FZY");
//        FCH = optJSONObject.optString("FCH");
//        FDH = optJSONObject.optString("FDH");
//        FSpecName =optJSONObject.optString("FSpecName");
//        FCustomerName = optJSONObject.optString("FCustomerName");
//        //FSCTZH=optJSONObject.optString("FSCTZH");
//        YMZFQty = optJSONObject.optString("YMZFQty");
//        FCS = optJSONObject.optString("FCS");
//        FPNum =optJSONObject.optString("FPNum");
    }

    private String GetString(String str, boolean trimZero) {
        String value = str.toLowerCase().trim().equals("null") ? "" : str.trim();
        if (!value.equals("") && trimZero) {
            DecimalFormat dformat = new DecimalFormat("###################.###########");
            value = dformat.format(Double.parseDouble(value));
        }
        return value;
    }

}
