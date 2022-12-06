import React, { useEffect } from 'react';
// import {
//   Group,
//   LinearGradient,
//   RoundedRect,
//   Easing,
//   useComputedValue,
//   useTiming,
//   vec,
//   LinearGradientProps,
//   Color,
//   Canvas,
// } from '@shopify/react-native-skia';
import LinearGradient from 'react-native-linear-gradient';
// import type { AnimationParams } from '@shopify/react-native-skia/lib/typescript/src/animation/types';
import { Animated, Easing, View, ViewStyle } from 'react-native';
import {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type GradientDirection = {
  start: { x: number; y: number };
  end: { x: number; y: number };
};

export const GradientDirections = {
  Horizontal: {
    topToBottom: {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    bottomToTop: {
      start: { x: 0, y: 1 },
      end: { x: 0, y: 0 },
    },
  },
  Vertical: {
    leftToRight: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
    rightToLeft: {
      start: { x: 1, y: 0 },
      end: { x: 0, y: 0 },
    },
  },
  Diagonal: {
    fromTopLeft: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    fromTopRight: {
      start: { x: 1, y: 0 },
      end: { x: 0, y: 1 },
    },
    fromBottomLeft: {
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
    },
    fromBottomRight: {
      start: { x: 1, y: 1 },
      end: { x: 0, y: 0 },
    },
  },
};

export type AnimatedPlaceholderProps = {
  color?: '';
  size: { width: number; height: number };
  mode?: 'once' | 'loop' | 'reverseOnce' | 'reverseLoop';
  borderRadius?: number;
  duration?: number; // in milliseconds
  gradientWidth?: number;
  gradientDirection?: GradientDirection;
  gradientColors?: [];
  easing?: (t: number) => number;
  style?: ViewStyle;
};

const ShimmeringPlaceholder: React.FC<AnimatedPlaceholderProps> = ({
  color = 'grey',
  size: rectSize,
  mode = 'loop',
  borderRadius = 0,
  duration = 1000,
  gradientWidth = 40,
  gradientDirection = GradientDirections.Diagonal.fromTopLeft,
  gradientColors = ['#ebebeb', '#c5c5c5', '#ebebeb'],
  easing = Easing.linear,
  style,
}) => {
  // let modeProps: AnimationParams = {};
  // switch (mode) {
  //   case 'once':
  //     modeProps.loop = false;
  //     modeProps.yoyo = false;
  //     break;
  //   case 'loop':
  //     modeProps.loop = true;
  //     modeProps.yoyo = false;
  //     break;
  //   case 'reverseOnce':
  //     modeProps.loop = false;
  //     modeProps.yoyo = true;
  //     break;
  //   case 'reverseLoop':
  //     modeProps.loop = true;
  //     modeProps.yoyo = true;
  //     break;
  // }
  // const progress = withTiming(
  //   { from: 0, to: 1, ...modeProps },
  //   { duration, easing }
  // );
  // const start = useSharedValue(() => {
  //   const { x: x1, y: y1 } = gradientDirection.start;
  //   const { x: x2, y: y2 } = gradientDirection.end;
  //   const isConstX = x1 === x2;
  //   const isConstY = y1 === y2;
  //   const invertProgressX = x2 < x1;
  //   const invertProgressY = y2 < y1;
  //   return vec(
  //     isConstX
  //       ? 0
  //       : -gradientWidth +
  //           (invertProgressX ? 1 - progress.current : progress.current) *
  //             (Math.max(rectSize.width, rectSize.height) + gradientWidth),
  //     isConstY
  //       ? 0
  //       : -gradientWidth +
  //           (invertProgressY ? 1 - progress.current : progress.current) *
  //             (Math.max(rectSize.width, rectSize.height) + gradientWidth)
  //   );
  // }, [progress]);

  // const end = useComputedValue(() => {
  //   const { x: x1, y: y1 } = gradientDirection.start;
  //   const { x: x2, y: y2 } = gradientDirection.end;
  //   const isConstX = x1 === x2;
  //   const isConstY = y1 === y2;
  //   const invertProgressX = x2 < x1;
  //   const invertProgressY = y2 < y1;
  //   return vec(
  //     isConstX
  //       ? 0
  //       : (invertProgressX ? 1 - progress.current : progress.current) *
  //           (Math.max(rectSize.width, rectSize.height) + gradientWidth),
  //     isConstY
  //       ? 0
  //       : (invertProgressY ? 1 - progress.current : progress.current) *
  //           (Math.max(rectSize.width, rectSize.height) + gradientWidth)
  //   );
  // }, [progress]);

  const beginShimmerPosition = useSharedValue(-1);

  useEffect(() => {
    beginShimmerPosition;
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 255 }],
    };
  });

  return (
    <Animated.View
      style={[
        { width: rectSize.width, height: rectSize.height, ...style },
        animatedStyles,
      ]}
    >
      <LinearGradient
        start={gradientDirection.start}
        end={gradientDirection.end}
        colors={gradientColors}
        style={{ flex: 1, width: rectSize.width }}
      />
    </Animated.View>
  );
};

export { ShimmeringPlaceholder };
