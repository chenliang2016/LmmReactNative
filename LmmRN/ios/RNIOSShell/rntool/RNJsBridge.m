//
//  RNJSBridge.m
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/11.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import "RNJsBridge.h"
#import "RNJsBridgeManager.h"

@implementation RNJsBridge

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(invoke:(NSString *)method params:(NSDictionary *)params callback:(RCTResponseSenderBlock)callback)
{
    
    NSMutableDictionary *actionMap = [RNJsBridgeManager getInstance].actionMap;
    
    RnJSAction action = [actionMap objectForKey:method];
    
    if (action) {
        dispatch_async(dispatch_get_main_queue(), ^{
            action(params, callback);
        });
    } else {
        NSLog(@"未注册方法: %@", method);
    }

}

@end
