//
//  RNEventManager.h
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/13.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RNEvent.h"

@interface RNEventManager : NSObject

+ (RNEventManager *)getInstance;

@property(nonatomic,retain) RNEvent* event;
@property(nonatomic,retain) NSArray<NSString *>* supportMethods;

- (void)registerSupportMethods:(NSArray<NSString *> *)supportedEvents;

- (void)setBridge:(RCTBridge*)bridge;

- (void)sendEvent:(NSString*)method params:(NSDictionary *)params;

@end
