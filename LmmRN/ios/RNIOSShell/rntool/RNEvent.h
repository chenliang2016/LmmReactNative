//
//  RNEvent.h
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/12.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNEvent : RCTEventEmitter<RCTBridgeModule>

- (void)dispatchEvent:(NSString*)method params:(NSDictionary *)params;

@end
