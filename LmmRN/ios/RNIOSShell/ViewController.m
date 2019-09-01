//
//  ViewController.m
//  RNIOSShell
//
//  Created by 陈靓 on 2019/7/12.
//  Copyright © 2019年 Facebook. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNEventManager.h"
#import "RNJsBridgeManager.h"

#import "LmmSignView.h"
#import "AFNetworking.h"

@interface ViewController ()

@property (nonatomic,strong) RCTResponseSenderBlock callback;

@end

@implementation ViewController



- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    NSURL *jsCodeLocation;
  
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
  
    //  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"LmmRn"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  
  
    self.view = rootView;
  
   [[RNEventManager getInstance] setBridge:rootView.bridge];
  
  [self registerRNAction];
  
  LmmSignView * sign1 =  [LmmSignView initFromNib];
  sign1.delegate = self;
  [sign1 show];
  
}

-(void)registerRNAction {

  [[RNJsBridgeManager getInstance] registerAction:@"qrscan" callback:(RnJSAction)(^(NSDictionary * params, RCTResponseSenderBlock callback) {
     NSString *res = @"test";
     callback(@[res]);
  })];
  
  [[RNJsBridgeManager getInstance] registerAction:@"sign" callback:(RnJSAction)(^(NSDictionary * params, RCTResponseSenderBlock callback) {
    LmmSignView * sign1 =  [LmmSignView initFromNib];
    sign1.delegate = self;
    [sign1 show];
    self.callback = callback;
  })];
  
  [[RNJsBridgeManager getInstance] registerAction:@"choosePhoto" callback:(RnJSAction)(^(NSDictionary * params, RCTResponseSenderBlock callback) {
    
    NSString * type = params[@"type"];
    self.callback = callback;
    [self tekePhoto:type];
    
  })];
  
  
}

// 签名完处理图片
- (void)handle:(UIImage *)image params:(NSDictionary*)params{
  [self uploadImage:image params:params];
  
//  UIImageWriteToSavedPhotosAlbum(image, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);

}

#pragma mark -- <保存到相册>
-(void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo {
  NSString *msg = nil ;
  if(error){
    msg = @"保存图片失败" ;
  }else{
    msg = @"保存图片成功" ;
  }
}

- (void)viewWillAppear:(BOOL)animated{
  [super viewWillAppear:animated];
  [self.navigationController setNavigationBarHidden:true];
}

- (void)viewWillDisappear:(BOOL)animated{
  [super viewWillDisappear:animated];
  [self.navigationController setNavigationBarHidden:false];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

-(void)tekePhoto:(NSString*) type {
  UIImagePickerController * picker = [[UIImagePickerController alloc]init];
  picker.delegate = self;
  picker.allowsEditing = NO;
  
  if ([type isEqualToString:@"takephoto"]) {
    picker.sourceType = UIImagePickerControllerSourceTypeCamera;
  }else{
    picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
  }
  [self presentViewController:picker animated:YES completion:NULL];
}

- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary<NSString *,id> *)info{
  [picker dismissViewControllerAnimated:true completion:nil];
  
  //   let image = info[UIImagePickerControllerOriginalImage] as! UIImage
  
  UIImage *image = info[UIImagePickerControllerOriginalImage];
  UIImage * uploadImage = [self imageWithImageSimple:image scaledToSize:CGSizeMake(240.0, 240.0)];
  
  //  QNUploadManager *upManager = [[QNUploadManager alloc] init];
  
  NSData *imageData = UIImagePNGRepresentation(uploadImage);
  
  
  NSDateFormatter *dateStringFormatter = [[NSDateFormatter alloc] init];
  
  [dateStringFormatter setDateFormat:@"yyyyMMddHHmmss"];
  
  NSDate *currentDate = [NSDate date];
  
  NSString * key =  [dateStringFormatter stringFromDate:currentDate];
  
  NSString * keyString = [[NSString alloc] initWithFormat:@"photo/%@.png", key ];
  
//  [self uploadImage:uploadImage];
  
}

- (UIImage*)imageWithImageSimple:(UIImage*)image scaledToSize:(CGSize)newSize
{
  // Create a graphics image context
  UIGraphicsBeginImageContext(newSize);
  // Tell the old image to draw in this new context, with the desired
  // new size
  [image drawInRect:CGRectMake(0,0,newSize.width,newSize.height)];
  // Get the new image from the context
  UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();
  // End the context
  UIGraphicsEndImageContext();
  // Return the new image.
  return newImage;
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)uploadImage:(UIImage*)image params:(NSDictionary*) params{
  
  NSMutableArray *photos = [NSMutableArray array];
  [photos addObject:image];
  
  // NSString * url = @"http://leasingapi.songshuqubang.com/api/upload";
  NSString * url = @"http://api.2727online.com/api/upload";
  
  NSMutableURLRequest *request = [[AFHTTPRequestSerializer serializer] multipartFormRequestWithMethod:@"POST" URLString:url parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData> formData) {
    //参数name：是后台给你的图片在服务器上字段名;
    //参数fileNmae：自己起得一个名字，
    //参数mimeType：这个是决定于后来接收什么类型的图片，接收的时png就用image/png ,接收的时jpeg就用image/jpeg
    for (int i = 0; i < photos.count; i++) {
      NSDateFormatter *formatter=[[NSDateFormatter alloc]init];
      formatter.dateFormat=@"yyyyMMddHHmmss";
      NSString *str=[formatter stringFromDate:[NSDate date]];
      NSString *fileName=[NSString stringWithFormat:@"%@.jpg",str];
      UIImage *image = photos[i];
      NSData *imageData = UIImageJPEGRepresentation(image, 0.28);
      [formData appendPartWithFileData:imageData name:[NSString stringWithFormat:@"upload%d",i+1] fileName:fileName mimeType:@"image/jpeg"];
      
    }

    [params enumerateKeysAndObjectsUsingBlock:^(id key, id obj, BOOL *stop)
     {
       NSLog(@"%@-->%@", key, obj);
       [formData appendPartWithFormData:[obj dataUsingEncoding:NSUTF8StringEncoding]  name:@"key"];
     }];
    
  } error:nil]; AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
  //设置服务器返回内容的接受格式
  AFHTTPResponseSerializer *responseSer = [AFHTTPResponseSerializer serializer]; responseSer.acceptableContentTypes = [NSSet setWithObjects:@"application/json", nil];
  manager.responseSerializer = responseSer;
  // NSProgress *progress = nil;
  NSURLSessionUploadTask *uploadTask = [manager uploadTaskWithStreamedRequest:request progress:nil completionHandler:^(NSURLResponse *response, id responseObject, NSError *error) {
    if (error) { NSLog(@"上传图片失败Error: %@", error);
      
    } else {
      
      NSDictionary * dic = [NSJSONSerialization JSONObjectWithData:responseObject options:NSJSONReadingAllowFragments error:nil];
      NSLog(@"ResDic = %@",dic);
      
      BOOL success = [dic objectForKey:@"success"];
      
      if (success){
        NSDictionary * result = [dic objectForKey:@"data"];
        
        NSString* returnUrl = [result objectForKey:@"url"];
        
        NSLog(@"returnUrl = %@",returnUrl);
        
        NSDictionary * ob = @{@"imgs":returnUrl};
        
        self.callback(@[ob]);
        
      }
      
    }
    
  }];
  [uploadTask resume];
}

- (NSDictionary *)parseJSONStringToNSDictionary:(NSString *)JSONString {
  NSData *JSONData = [JSONString dataUsingEncoding:NSUTF8StringEncoding];
  NSDictionary *responseJSON = [NSJSONSerialization JSONObjectWithData:JSONData options:NSJSONReadingMutableLeaves error:nil];
  return responseJSON;
}


@end
