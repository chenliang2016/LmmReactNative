//
//  LmmSignView.m
//  RNIOSShell
//
//  Created by 陈靓 on 2019/9/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "LmmSignView.h"

@implementation LmmSignView



/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

+ (LmmSignView *)initFromNib{
   NSArray * viewArr = [[NSBundle mainBundle] loadNibNamed:@"LmmSignView" owner:nil options:nil];
  return viewArr.firstObject;
}

- (void) show{
  NSLog(@"show");
  [UIApplication.sharedApplication.keyWindow addSubview:self ];
}
- (IBAction)cancle:(id)sender {
    [self removeFromSuperview];
}
- (IBAction)redo:(id)sender {
    [_drawView clearDrawView];
}
- (IBAction)confirm:(id)sender {
  if (self.delegate != NULL){
    [self.delegate handle:[_drawView getImage]];
  }
    [self removeFromSuperview];
}

@end
