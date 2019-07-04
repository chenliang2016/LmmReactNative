package com.lmm.rnshellforandroid;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rnplugins.QRScanPlugin;
import com.lmm.rnshellforandroid.rnplugins.ToastPlugin;
import com.lmm.rnshellforandroid.rnplugins.photo.PhotoPlugin;
import com.lmm.rnshellforandroid.rnplugins.print.PrintPlugin;
import com.lmm.rnshellforandroid.third.zbar.CaptureActivity;

import java.io.File;
import java.util.Map;

public class MainActivity extends BaseRNActivity {


    private QRScanPlugin qrScanPlugin;

    private PhotoPlugin photoPlugin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        photoPlugin.initPhotoError();
    }


    @Override
    public void addPlugins() {

        new ToastPlugin(this);

        new PrintPlugin(this);

        photoPlugin = new PhotoPlugin(this);

        qrScanPlugin =  new QRScanPlugin(this);

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        switch (requestCode) {
            case 1:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                    goScan();
                } else {
                    Toast.makeText(this, "你拒绝了权限申请，可能无法打开相机扫码哟！", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case QRScanPlugin.REQUEST_CODE_SCAN:// 二维码
                // 扫描二维码回传
                if (resultCode == RESULT_OK) {
                    if (data != null) {
                        Bundle bundle = data.getExtras();
                        String result = bundle.getString(CaptureActivity.EXTRA_STRING);
                        qrScanPlugin.setQRScanResult(result);
                    }
                }
                break;
            case PhotoPlugin.REQUEST_CODE_PICK_PHOTO:
                if (resultCode == RESULT_OK) {
                    Uri selectedImage = data.getData();
                    String[] filePathColumn = { MediaStore.Images.Media.DATA };
                    Cursor cursor = getContentResolver().query(selectedImage,
                            filePathColumn, null, null, null);
                    cursor.moveToFirst();
                    int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
                    String picturePath = cursor.getString(columnIndex);
                    Log.d("PickPicture", picturePath);
                    cursor.close();
                    File file = new File(picturePath);
                    photoPlugin.compressImg(file,picturePath);
                }
                break;
            case PhotoPlugin.REQUEST_CODE_TAKE_PHOTO:
                if (resultCode == RESULT_OK) {
                    photoPlugin.compressImg(photoPlugin.tempFile,photoPlugin.tempFilePath);
                }
                break;
            default:
                break;
        }
    }

    @Override
    public String getJsRootName() {
        return "LmmRn";
    }
}

