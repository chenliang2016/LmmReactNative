//
//  RNEvent.m
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/12.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import "RNEvent.h"
#import "RNEventManager.h"

@implementation RNEvent

RCT_EXPORT_MODULE();

+(id)allocWithZone:(NSZone *)zone {
    static RNEvent *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSArray<NSString *> *)supportedEvents{
    return  [RNEventManager getInstance].supportMethods;
}

- (void)dispatchEvent:(NSString*)method params:(NSDictionary *)params
{
    [self sendEventWithName:method body:params];
}

@end
