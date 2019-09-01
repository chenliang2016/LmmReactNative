//
//  LmmDrawView.m
//  RNIOSShell
//
//  Created by 陈靓 on 2019/9/1.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "LmmDrawView.h"
#import "Common.h"

@implementation LmmDrawView
{
  BOOL _isEraser;
}
@synthesize currentLine;
@synthesize linesCompleted;
@synthesize drawColor;
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    [self initDrawView];
  }
  return self;
}

- (instancetype)initWithCoder:(NSCoder *)coder
{
  self = [super initWithCoder:coder];
  if (self) {
    [self initDrawView];
  }
  return self;
}

- (void)initDrawView{
  self.backgroundColor = UIColor.whiteColor;
  self.drawFrame = self.bounds;
  self.bezierPath = [[UIBezierPath alloc]init];
  self.control = 0;
  _points = [[NSMutableArray alloc] init];
  _lineColor = UIColor.blueColor;
  
  linesCompleted = [[NSMutableArray alloc] init];
  [self setMultipleTouchEnabled:YES];
  
  drawColor = [UIColor blackColor];
  [self becomeFirstResponder];
}

-(UIImage*)getImage {
  UIGraphicsBeginImageContext(_drawFrame.size);
  [self.layer renderInContext:UIGraphicsGetCurrentContext()];
  UIImage * image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return image;
}

- (void)clearDrawView{
//  [_bezierPath removeAllPoints];
//  [self setNeedsDisplayInRect:_drawFrame];

}


- (void)undo
{
  if ([self.undoManager canUndo]) {
    [self.undoManager undo];
  }
}

- (void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event
{
  [self.undoManager beginUndoGrouping];
  for (UITouch *t in touches) {
    // Create a line for the value
    CGPoint loc = [t locationInView:self];
    Line *newLine = [[Line alloc] init];
    [newLine setBegin:loc];
    [newLine setEnd:loc];
    [newLine setColor:drawColor];
    currentLine = newLine;
  }
}

- (void)addLine:(Line*)line
{
  [[self.undoManager prepareWithInvocationTarget:self] removeLine:line];
  [linesCompleted addObject:line];
  [self setNeedsDisplay];
}

- (void)removeLine:(Line*)line
{
  if ([linesCompleted containsObject:line]) {
    [[self.undoManager prepareWithInvocationTarget:self] addLine:line];
    [linesCompleted removeObject:line];
    [self setNeedsDisplay];
  }
}

- (void)removeLineByEndPoint:(CGPoint)point
{
  NSPredicate *predicate = [NSPredicate predicateWithBlock:^BOOL(id evaluatedObject, NSDictionary *bindings) {
    Line *evaluatedLine = (Line*)evaluatedObject;
    //        return (evaluatedLine.end.x == point.x && evaluatedLine.end.y == point.y) ||
    //               (evaluatedLine.end.x == point.x - 1.0f && evaluatedLine.end.y == point.y - 1.0f) ||
    //               (evaluatedLine.end.x == point.x + 1.0f && evaluatedLine.end.y == point.y + 1.0f);
    return (evaluatedLine.end.x <= point.x-1 || evaluatedLine.end.x > point.x+1) &&
    (evaluatedLine.end.y <= point.y-1 || evaluatedLine.end.y > point.y+1);
  }];
  NSArray *result = [linesCompleted filteredArrayUsingPredicate:predicate];
  if (result && result.count > 0) {
    [linesCompleted removeObject:result[0]];
  }
}

- (void)touchesMoved:(NSSet *)touches withEvent:(UIEvent *)event
{
  if (!isCleared) {
    for (UITouch *t in touches) {
      [currentLine setColor:drawColor];
      CGPoint loc = [t locationInView:self];
      [currentLine setEnd:loc];
      
      if (currentLine) {
        if ([Common color:drawColor isEqualToColor:[UIColor clearColor] withTolerance:0.2]) {
          // eraser
          // [self removeLineByEndPoint:loc]; //this solution can not work.
          _isEraser = YES;
        } else {
          _isEraser = NO;
          [self addLine:currentLine];
        }
      }
      Line *newLine = [[Line alloc] init];
      [newLine setBegin:loc];
      [newLine setEnd:loc];
      [newLine setColor:drawColor];
      currentLine = newLine;
    }
  }
}


- (void)drawRect:(CGRect)rect
{
  CGContextRef context = UIGraphicsGetCurrentContext();
  
  CGContextSetLineWidth(context, 5.0);
  CGContextSetLineCap(context, kCGLineCapRound);
  for (Line *line in linesCompleted) {
    [[line color] set];
    CGContextMoveToPoint(context, [line begin].x, [line begin].y);
    CGContextAddLineToPoint(context, [line end].x, [line end].y);
    CGContextStrokePath(context);
  }
}

@end
