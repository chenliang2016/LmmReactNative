package com.lmm.rnshellforandroid.rnplugins.photo;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Looper;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.sdk.android.oss.ClientConfiguration;
import com.alibaba.sdk.android.oss.ClientException;
import com.alibaba.sdk.android.oss.OSS;
import com.alibaba.sdk.android.oss.OSSClient;
import com.alibaba.sdk.android.oss.ServiceException;
import com.alibaba.sdk.android.oss.common.auth.OSSCredentialProvider;
import com.alibaba.sdk.android.oss.common.auth.OSSPlainTextAKSKCredentialProvider;
import com.alibaba.sdk.android.oss.model.PutObjectRequest;
import com.alibaba.sdk.android.oss.model.PutObjectResult;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.lidroid.xutils.util.LogUtils;
import com.lmm.rnshellforandroid.rn.BaseRNActivity;
import com.lmm.rnshellforandroid.rn.annotation.RNPlugin;
import com.lmm.rnshellforandroid.rn.plugin.BasePlugin;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;


import top.zibin.luban.Luban;
import top.zibin.luban.OnCompressListener;

@RNPlugin(method = "photo")
public class PhotoPlugin extends BasePlugin<BaseRNActivity> {

    // oss 图片上传 start
    private static final String endpoint = "http://oss-cn-shanghai.aliyuncs.com";
    private static final String callbackAddress = "http://oss-demo.aliyuncs.com:23450";
    private String bucket = "jmybz";
    private String stsServer = "http://47.103.77.37:8010/api.ashx?method=getsts";

    private OssService ossService;

    // oss 图片上传 end

    private BaseRNActivity activity;

    private Callback callback;

    public File tempFile;

    public String tempFilePath;

    public static final int REQUEST_CODE_PICK_PHOTO = 0x0001;

    public static final int REQUEST_CODE_TAKE_PHOTO = 0x0002;

    private String tag; // key 的前缀

    private final String rootPath = Environment.getExternalStorageDirectory().getAbsolutePath() + File.separator + "lmm" + File.separator;

    UIDispatcher uiDispatcher = new UIDispatcher(Looper.getMainLooper());
    ImageDisplayer imageDisplayer = new ImageDisplayer(null);

    public PhotoPlugin(BaseRNActivity act) {
        super(act);
        this.activity = act;

        ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.CAMERA,Manifest.permission.WRITE_EXTERNAL_STORAGE},1);

        ossService = initOSS(imageDisplayer);
    }

    @Override
    protected void doAction(Map map, Callback callback) {

        this.callback = callback;

        String type = map.get("type").toString();

        if (type.equals("pick")){
            this.tag = map.get("tag").toString();
            choosePhoto();
        }else if(type.equals("takephoto")){
            this.tag = map.get("tag").toString();
            takePhoto();
        }else if (type.equals("convert")){
            String imagesString = map.get("images").toString();
            String[] images = imagesString.split(",");
            WritableArray imgArray = Arguments.createArray();
            for(String image : images){
                String url = ossService.getImageUrl(image);
                WritableMap writableMap =  Arguments.createMap();
                writableMap.putString("url",url);
                writableMap.putString("id",image);
                imgArray.pushMap(writableMap);
            }
            callback.invoke(imgArray);
        }

    }

    public void takePhoto() {
        if (!new File(rootPath).exists()) {
            new File(rootPath).mkdirs();
        }
        tempFilePath = rootPath + UUID.randomUUID() + "_pic.jpg";
        tempFile = new File(tempFilePath);
        Intent mintent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        mintent.addCategory(Intent.CATEGORY_DEFAULT);
        mintent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(tempFile));
        activity.startActivityForResult(mintent, REQUEST_CODE_TAKE_PHOTO);
    }

    public void choosePhoto() {
        if (!new File(rootPath).exists()) {
            new File(rootPath).mkdirs();
        }
        Intent photoPickerIntent = new Intent(Intent.ACTION_PICK, MediaStore.Audio.Media.EXTERNAL_CONTENT_URI);
        photoPickerIntent.setType("image/*");
        activity.startActivityForResult(photoPickerIntent, REQUEST_CODE_PICK_PHOTO);
    }

    @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR2)
    public void initPhotoError() {
        // android 7.0系统解决拍照的问题
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure();
    }

    public OssService initOSS(ImageDisplayer displayer) {
        //使用自己的获取STSToken的类
        OSSCredentialProvider credentialProvider = new STSGetter(stsServer);

        ClientConfiguration conf = new ClientConfiguration();
        conf.setConnectionTimeout(15 * 1000); // 连接超时，默认15秒
        conf.setSocketTimeout(15 * 1000); // socket超时，默认15秒
        conf.setMaxConcurrentRequest(5); // 最大并发请求书，默认5个
        conf.setMaxErrorRetry(2); // 失败后最大重试次数，默认2次

        OSS oss = new OSSClient(activity.getApplicationContext(), endpoint, credentialProvider, conf);

        return new OssService(oss, bucket, displayer);

    }

    // 回调RN
    public void setUploadResult(Boolean isSuccess,String requestid,String obj,String url ){
        WritableMap returnMap = Arguments.createMap();
        returnMap.putBoolean("success",isSuccess);
        returnMap.putString("requestid",requestid);
        returnMap.putString("objkey",obj);
        returnMap.putString("url",url);
        callback.invoke(returnMap);
    }

    // 压缩图片上传
    public void compressImg(File file,final String picturePath) {
        Luban.with(activity)
                .load(file)
                .ignoreBy(100)
                .setTargetDir(getPath())
                .setCompressListener(new OnCompressListener() {
                    @Override
                    public void onStart() {
                    }

                    @Override
                    public void onSuccess(File file) {
                        uploadFile(file);
                    }

                    @Override
                    public void onError(Throwable e) {
                        e.printStackTrace();
                    }
                }).launch();

    }

    public void uploadFile(File file){
        SimpleDateFormat format = new SimpleDateFormat("YYYYMMDDHHmmssSSS");
        int s = (int)Math.random()*(10000);
        final String key =  format.format(new Date()) + s;
        String path = file.getPath();
        ossService.asyncPutImage(this.tag+key+".jpg", path, getPutCallback(), new ProgressCallbackFactory<PutObjectRequest>().get());
    }

    public String getPath() {
        return rootPath;
    }

    private class ProgressCallbackFactory<T> {
        public UIProgressCallback<T> get() {
            return new UIProgressCallback<T>(uiDispatcher) {
                @Override
                public void onProgress(T request, long currentSize, long totalSize) {
                    final int progress = (int) (100 * currentSize / totalSize);
                    addCallback(new Runnable() {
                        @Override
                        public void run() {

//                            updateProgress(progress);
//                            displayInfo("进度: " + String.valueOf(progress) + "%");
                        }
                    });
                    super.onProgress(request, currentSize, totalSize);
                }
            };
        }
    }

    public UICallback<PutObjectRequest, PutObjectResult> getPutCallback() {
        return new UICallback<PutObjectRequest, PutObjectResult>(uiDispatcher) {
            @Override
            public void onSuccess(PutObjectRequest request, PutObjectResult result) {
                Log.d("PutObject", "UploadSuccess");

                Log.d("ETag", result.getETag());
                Log.d("RequestId", result.getRequestId());
                final String object = request.getObjectKey();
                final String ETag = result.getETag();
                final String requestid = result.getRequestId();
                final String callback = result.getServerCallbackReturnBody();

                final String url = ossService.getImageUrl(object);
                setUploadResult(true,requestid,object,url);

//                addCallback(new Runnable() {
//                    @Override
//                    public void run() {
//                        displayToast("上传成功");
//                        displayInfo(String.format("Bucket: %s\nObject: %s\nETag: %s\nRequestId: %s\nCallback: %s",
//                                bucket,
//                                object,
//                                ETag,
//                                requestid,
//                                callback));
//                    }
//                }, null);
//                super.onSuccess(request, result);
            }

            @Override
            public void onFailure(PutObjectRequest request, ClientException clientExcepion, ServiceException serviceException) {
                String info = "";
                // 请求异常
                if (clientExcepion != null) {
                    // 本地异常如网络异常等
                    clientExcepion.printStackTrace();
                    info = clientExcepion.toString();
                }
                if (serviceException != null) {
                    // 服务异常
                    Log.e("ErrorCode", serviceException.getErrorCode());
                    Log.e("RequestId", serviceException.getRequestId());
                    Log.e("HostId", serviceException.getHostId());
                    Log.e("RawMessage", serviceException.getRawMessage());
                    info = serviceException.toString();
                }
                final String outputinfo = new String(info);
//                addCallback(null, new Runnable() {
//                    @Override
//                    public void run() {
//                        displayDialog("上传失败", outputinfo);
//                        displayInfo(outputinfo);
//                    }
//                });
                onFailure(request, clientExcepion, serviceException);
            }
        };
    }


}
