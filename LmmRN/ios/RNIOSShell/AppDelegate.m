/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"


#import "RNSplashScreen.h"
#import "ViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[ViewController alloc] init];
  
  self.window.rootViewController = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  [self.window makeKeyAndVisible];
  
  [RNSplashScreen show];
  
  return YES;
  
  
}

@end
