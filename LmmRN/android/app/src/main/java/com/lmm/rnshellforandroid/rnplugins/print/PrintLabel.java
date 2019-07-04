package com.lmm.rnshellforandroid.rnplugins.print;

import com.example.tscdll.TSCActivity;

import java.text.SimpleDateFormat;
import java.util.Date;


public class PrintLabel {
    private TSCActivity printUtils;

    public PrintLabel(TSCActivity printUtils){
        this.printUtils = printUtils;
    }

    public boolean Print(Label obj, int count, int type) {
        boolean flag = false;
        try {
            printUtils.setup(100, 80, 4, 5, 0, 2, 0);
            printUtils.clearbuffer();

            if (type == 0) {//生产标签
                //第1行
                printChinese(100, 5, "TSS24.BF2", 0, 4, 4, obj.trader_name);
                //第2行
                printLetter(5, 115, "5", 0, 2, 2, "" + obj.length);
                printLetter(220, 135, "5", 0, 1, 1, "*");
                printLetter(255, 115, "5", 0, 2, 2, "" + obj.thickness);
                printLetter(470, 135, "5", 0, 1, 1, "*");
                printLetter(510, 115, "5", 0, 2, 2, "" + obj.width);
                //第3行
                printChinese(10, 240, "TSS24.BF2", 0, 2, 2, "批次:" + obj.task_no);
                printChinese(450, 240, "TSS24.BF2", 0, 2, 2, "包号:");
                printLetter(570, 240, "5", 0, 1, 1, obj.wood_no);
                //第4行
                printChinese(10, 305, "TSS24.BF2", 0, 2, 2, "品名:" + obj.wood_name);
                //第5行
                if (obj.plank_type.equals("自然宽板")) {
                    printChinese(10, 370, "TSS24.BF2", 0, 2, 2, "层数:" + obj.layer);
                } else {
                    printChinese(10, 370, "TSS24.BF2", 0, 2, 2, "片数:" + obj.piece);
                }
                //第6行
                printChinese(10, 435, "TSS24.BF2", 0, 2, 2, "材积:" + obj.volume);
                printChinese(300, 455, "TSS24.BF2", 0, 1, 1, "m3");
                //第7行
                printChinese(10, 500, "TSS24.BF2", 0, 2, 2, "合同:" + obj.pledge_no);
                //底部拼包
                if (!obj.pbag_info.equals("")) {
                    printChinese(10, 570, "TSS24.BF2", 0, 1, 1, "拼包:" + obj.pbag_info);
                }
                // 二维码
                String strQRCode = "QRCODE 500,310,L,9,A,0,M1,S3,\"" + obj.qrcode + "\n";
                printUtils.sendcommand(strQRCode);
                //日期
                printChinese(540, 520, "TSS24.BF2", 0, 1, 1, obj.create_time);
                //打印
                printUtils.printlabel(1, count);
            } else {  //销售标签
                //第1行
                printLetter(5, 5, "5", 0, 3, 3, obj.wood_no);
                //第2行
                printLetter(5, 160, "5", 0, 2, 2, "" + obj.length);
                printLetter(220, 180, "5", 0, 1, 1, "*");
                printLetter(255, 160, "5", 0, 2, 2, "" + obj.thickness);
                printLetter(470, 180, "5", 0, 1, 1, "*");
                printLetter(510, 160, "5", 0, 2, 2, "" + obj.width);
                //第3行
                printChinese(10, 270, "TSS24.BF2", 0, 2, 2, "批次:" + obj.task_no);
                printChinese(420, 270, "TSS24.BF2", 0, 2, 2, "品名:" + obj.wood_name);
                //第4行
                if (obj.plank_type.equals("自然宽板")) {
                    printChinese(10, 340, "TSS24.BF2", 0, 2, 2, "层数:" + obj.layer);
                } else {
                    printChinese(10, 340, "TSS24.BF2", 0, 2, 2, "片数:" + obj.piece);
                }
                //第5行
                printChinese(10, 405, "TSS24.BF2", 0, 2, 2, "材积:" + obj.volume);
                printChinese(300, 420, "TSS24.BF2", 0, 1, 1, "m3");
                //第6行
                printChinese(10, 470, "TSS24.BF2", 0, 2, 2, "合同:" + obj.pledge_no);
                //底部码单
                printChinese(10, 535, "TSS24.BF2", 0, 1, 1, "码单:" + obj.md1);
                printChinese(70, 575, "TSS24.BF2", 0, 1, 1, obj.md2);
                // 二维码
                String strQRCode = "QRCODE 500,320,L,9,A,0,M1,S3,\"" + obj.qrcode + "\n";
                printUtils.sendcommand(strQRCode);
                //打印
                printUtils.printlabel(1, count);
            }
            flag = true;
        } catch (Exception ex) {
            flag = false;
        }
        return flag;
    }

    private void printLetter(int x, int y, String size, int rotation, int xMulti, int yMulti, String content) {
        printUtils.sendcommand("TEXT " + x + "," + y + ",\"" + size + "\"," + rotation + "," + xMulti + "," + yMulti + ",\"" + content + "\n");
    }

    private void printChinese(int x, int y, String size, int rotation, int xMulti, int yMulti, String content) {
        String s = "TEXT " + x + "," + y + ",\"" + size + "\"," + rotation + "," + xMulti + "," + yMulti + ",\"" + content + "\n";
        byte b[] = new byte[0];
        try {
            b = s.getBytes("GBK");
        } catch (Exception e) {
        }
        printUtils.sendcommand(b);
    }
}