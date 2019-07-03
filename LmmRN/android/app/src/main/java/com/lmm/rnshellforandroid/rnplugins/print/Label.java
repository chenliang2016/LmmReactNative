package com.lmm.rnshellforandroid.rnplugins.print;

import java.security.PublicKey;
import java.text.DecimalFormat;

public class Label {
    public String id;
    public String plank_type;
    public String task_no;
    public String trader_name;
    public String wood_type;
    public String wood_name;
    public String wood_no;
    public String length;
    public String thickness;
    public String width;
    public String width_detail;
    public String volume;
    public String layer;
    public String piece;
    public String pledge_no;
    public String is_pbag;
    public String pbag_info;
    public String md1;
    public String md2;
    public String create_time;
    public String qrcode;


    public Label(String id, String plank_type, String task_no, String trader_name, String wood_type
            , String wood_name, String wood_no, String length, String thickness, String width, String width_detail, String volume
            , String layer, String piece, String pledge_no, String is_pbag, String pbag_info, String md1, String md2, String qrcode, String create_time) {
        this.id = id;
        this.plank_type = plank_type;
        this.task_no = task_no;
        this.trader_name = trader_name;
        this.wood_type = wood_type;
        this.wood_name = wood_name;
        this.wood_no = wood_no;
        this.length = length;
        this.thickness = thickness;
        this.width = width;
        this.width_detail = width_detail;
        this.volume = volume;
        this.layer = layer;
        this.piece = piece;
        this.pledge_no = pledge_no;
        this.is_pbag = is_pbag;
        this.pbag_info = pbag_info;
        this.md1 = md1;
        this.md2 = md2;
        this.qrcode = qrcode;
        this.create_time = create_time;
    }

    public String TrimZero(String str) {
        if (str.equals("")) {
            return str;
        }
        DecimalFormat dformat = new DecimalFormat("###################.###########");
        return dformat.format(Double.parseDouble(str)).toString();
    }

}
