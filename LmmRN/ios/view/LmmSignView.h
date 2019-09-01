//
//  LmmSignView.h
//  RNIOSShell
//
//  Created by 陈靓 on 2019/9/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "LmmDrawView.h"

@protocol LmmSignViewDelegate <NSObject>

-(void)handle:(UIImage*) image;

@end

NS_ASSUME_NONNULL_BEGIN

@interface LmmSignView : UIView
@property (weak, nonatomic) IBOutlet LmmDrawView *drawView;

@property (retain, nonatomic) id<LmmSignViewDelegate> delegate;

+ (LmmSignView *)initFromNib;
- (void) show;



@end

NS_ASSUME_NONNULL_END
