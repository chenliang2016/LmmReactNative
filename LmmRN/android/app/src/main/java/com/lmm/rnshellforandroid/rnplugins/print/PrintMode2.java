package com.lmm.rnshellforandroid.rnplugins.print;
import java.text.DecimalFormat;

public class PrintMode2 {
    public String plank_type;
    public String id;
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
    public String create_time;
    public String qrcode;


    public PrintMode2(String plank_type, String id, String task_no, String trader_name, String wood_type
            , String wood_name, String wood_no, String length, String thickness, String width, String width_detail, String volume
            , String layer, String piece, String pledge_no, String is_pbag, String pbag_info, String create_time, String label_guid) {
        this.plank_type = plank_type;
        this.id = id;
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
        this.create_time = create_time;
        this.qrcode="SB9819529075385969811";
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
