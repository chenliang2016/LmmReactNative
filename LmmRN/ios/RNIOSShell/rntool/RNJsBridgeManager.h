//
//  RNJsBridgeManager.h
//  ReactNativeIOS
//
//  Created by chenliang on 2017/9/11.
//  Copyright © 2017年 chenliang. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

typedef void (^RnJSAction)(NSDictionary*,RCTResponseSenderBlock);


@interface RNJsBridgeManager : NSObject

+ (RNJsBridgeManager *)getInstance;

- (void) registerAction:(NSString*)method callback:(RnJSAction) callback;

@property (retain, nonatomic) NSMutableDictionary * actionMap;

@end
