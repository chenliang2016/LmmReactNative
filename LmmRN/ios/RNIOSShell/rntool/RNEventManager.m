//
//  RNEventManager.m
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/13.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import "RNEventManager.h"

@implementation RNEventManager

static RNEventManager *instance = nil;

// 伪单例 和 完整的单例。 以及线程的安全。
// 一般使用伪单例就足够了 每次都用 sharedDataHandle 创建对象。
+ (RNEventManager *)getInstance
{
    // 添加同步锁，一次只能一个线程访问。如果有多个线程访问，等待。一个访问结束后下一个。
    @synchronized(self){
        if (nil == instance) {
            instance = [[RNEventManager alloc] init];
            instance.event = [[RNEvent alloc] init];
        }
    }
    
    return instance;
}

-(void)registerSupportMethods:(NSArray<NSString *> *)supportedEvents{
    self.supportMethods = supportedEvents;
}

- (void)setBridge:(RCTBridge *)bridge{
    self.event.bridge = bridge;
}

- (void)sendEvent:(NSString *)method params:(NSDictionary *)params{
    [self.event dispatchEvent:method params:params];
}

@end
