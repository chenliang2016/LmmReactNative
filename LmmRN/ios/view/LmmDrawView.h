//
//  LmmDrawView.h
//  RNIOSShell
//
//  Created by 陈靓 on 2019/9/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Line.h"

NS_ASSUME_NONNULL_BEGIN

@interface LmmDrawView : UIView
{
  BOOL isCleared;
}

@property (nonatomic) CGRect drawFrame;
@property (retain,nonatomic) UIBezierPath * bezierPath;
@property (nonatomic) int control;
@property (retain,nonatomic) NSMutableArray* points;
@property (nonatomic) UIColor * lineColor;

@property (nonatomic) Line *currentLine;
@property (nonatomic) NSMutableArray *linesCompleted;
@property (nonatomic) UIColor *drawColor;


-(UIImage*)getImage;

- (void)clearDrawView;

@end

NS_ASSUME_NONNULL_END
