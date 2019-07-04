package com.lmm.rnshellforandroid.rnplugins.print;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import com.example.tscdll.TSCActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;
import com.lmm.rnshellforandroid.rn.plugin.BasePlugin;

import java.util.Map;
import java.util.Set;



@RNPlugin(method = "print")
public class PrintPlugin extends BasePlugin<BaseRNActivity> {

    public static TSCActivity printUtils = new TSCActivity();

    private BaseRNActivity activity;

    BluetoothAdapter mAdapter = BluetoothAdapter.getDefaultAdapter();

    public PrintPlugin(BaseRNActivity act) {
        super(act);
        this.activity = act;
    }

    @Override
    protected void doAction(Map map, Callback callback) {
        bluetooth();

        String printAction = map.get("action").toString();

        if (printAction.equals("autoConnect")) {
            IntentFilter mFilter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
            this.activity.registerReceiver(mReceiver, mFilter);
        }

        if (printAction.equals("searchDevice")) {
            WritableArray devices =  searchDevice();
            callback.invoke(devices);
        }


        if (printAction.equals("connectDevice")) {
            String address = map.get("address").toString();
            String name = map.get("name").toString();
            String status =  connectDevice(address);

            WritableMap returnMap = Arguments.createMap();
            returnMap.putString("address",address);
            returnMap.putString("name",name);
            returnMap.putString("status",status);
            callback.invoke(returnMap);
        }

        if (printAction.equals("print")) {


            String id = map.get("id").toString();
            int printType = Integer.parseInt(map.get("printType").toString()) ;
            int printNum = Integer.parseInt(map.get("printNum").toString()) ;
            String plank_type = map.get("plank_type").toString();
            String task_no = map.get("task_no").toString();
            String trader_name = map.get("trader_name").toString();
            String wood_type = map.get("wood_type").toString();
            String wood_name = map.get("wood_name").toString();
            String wood_no = map.get("wood_no").toString();
            String length = map.get("length").toString();
            String thickness = map.get("thickness").toString();
            String width = map.get("width").toString();
            String width_detail = map.get("width_detail")!=null?map.get("width_detail").toString():"";
            String volume = map.get("volume").toString();
            String layer = map.get("layer").toString();
            String piece = map.get("piece").toString();
            String pledge_no = map.get("pledge_no").toString();
            String is_pbag = map.get("is_pbag").toString();
            String pbag_info = map.get("pbag_info").toString();
            String md1 = map.get("md1").toString();
            String md2 = map.get("md2").toString();
            String qrcode = map.get("qrcode").toString();
            String create_time = map.get("create_time").toString();

            Label obj = new Label(map.get("id").toString(), plank_type, task_no, trader_name,
                    wood_type, wood_name, wood_no, length, thickness, width
                    , width_detail, volume, layer, piece, pledge_no
                    , is_pbag, pbag_info, md1,md2,qrcode,create_time);

            Boolean isSuccess =  print(printType,printNum,obj);
            if (isSuccess){
                callback.invoke("success");
            }else{
                callback.invoke("error");
            }

        }



    }

    public void bluetooth() {
        if (!mAdapter.isEnabled()) {
            Intent enabler = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            activity.startActivity(enabler);
        }
    }

    private BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            // 获得已经搜索到的蓝牙设备
            if (action.equals(BluetoothDevice.ACTION_FOUND)) {
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                // 搜索到的不是已经绑定的蓝牙设备
                if (device.getBondState() != BluetoothDevice.BOND_BONDED) {
                    // 显示在TextView上
//                    mTextView.append(device.getName() + ":" + device.getAddress() + "\n");
                }
                // 搜索完成
            } else if (action.equals(BluetoothAdapter.ACTION_DISCOVERY_FINISHED)) {
//                setTitle("搜索蓝牙设备");
            }
        }
    };

    public WritableArray searchDevice(){
        Set<BluetoothDevice> devices = mAdapter.getBondedDevices();
        if (devices.size() > 0) {
            final WritableArray sexArry =  Arguments.createArray();
            int i = 0;
            for (final BluetoothDevice bluetoothDevice : devices) {
                String address = bluetoothDevice.getAddress();
                String name = bluetoothDevice.getName();

                WritableMap deviceMap = Arguments.createMap();
                deviceMap.putString("address",address);
                deviceMap.putString("name",name);

                sexArry.pushMap(deviceMap);
                i++;
            }
            return sexArry;
        }
        return null;
    }

    // 连接单个打印机
    public String connectDevice(final String myAddress) {
            try{
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        printUtils.openport(myAddress);
                    }
                }).start();

                String status = printUtils.status();//查看打印机状态，但是返回的是空的
                //printUtils.formfeed();//自动跳到下一页
                return "success";
            } catch (Exception ex) {
                return "error";
            }
    }

    public Boolean print(int printType ,int count ,Label obj){
        PrintLabel pl=new PrintLabel(printUtils);
        Boolean isSuccess = pl.Print(obj,count,printType);
        return isSuccess;

    }


}
