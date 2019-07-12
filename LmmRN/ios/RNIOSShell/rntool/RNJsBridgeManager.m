//
//  RNJsBridgeManager.m
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/11.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import "RNJsBridgeManager.h"

@implementation RNJsBridgeManager

static RNJsBridgeManager *instance = nil;

// 伪单例 和 完整的单例。 以及线程的安全。
// 一般使用伪单例就足够了 每次都用 sharedDataHandle 创建对象。
+ (RNJsBridgeManager *)getInstance
{
    // 添加同步锁，一次只能一个线程访问。如果有多个线程访问，等待。一个访问结束后下一个。
    @synchronized(self){
        if (nil == instance) {
            instance = [[RNJsBridgeManager alloc] init];
        }
    }
    return instance;
}

-(void)registerAction:(NSString *)method callback:(RnJSAction)callback{
    if (self.actionMap == nil){
        self.actionMap = [[NSMutableDictionary alloc] init];
    }
    
    [self.actionMap setObject:callback forKey:method];
}

@end
