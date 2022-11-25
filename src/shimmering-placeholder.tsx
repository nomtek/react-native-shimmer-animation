import React from 'react';
import {
  Group,
  LinearGradient,
  RoundedRect,
  Easing,
  useComputedValue,
  useTiming,
  vec,
  LinearGradientProps,
  Color,
  Canvas,
} from '@shopify/react-native-skia';
import type { AnimationParams } from '@shopify/react-native-skia/lib/typescript/src/animation/types';
import type { ViewStyle } from 'react-native';

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
  color?: Color;
  size: { width: number; height: number };
  mode?: 'once' | 'loop' | 'reverseOnce' | 'reverseLoop';
  borderRadius?: number;
  duration?: number; // in milliseconds
  gradientWidth?: number;
  gradientDirection?: GradientDirection;
  gradientColors?: LinearGradientProps['colors'];
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
  gradientColors = [color, '#ffffff80', color],
  easing = Easing.linear,
  style,
}) => {
  let modeProps: AnimationParams = {};
  switch (mode) {
    case 'once':
      modeProps.loop = false;
      modeProps.yoyo = false;
      break;
    case 'loop':
      modeProps.loop = true;
      modeProps.yoyo = false;
      break;
    case 'reverseOnce':
      modeProps.loop = false;
      modeProps.yoyo = true;
      break;
    case 'reverseLoop':
      modeProps.loop = true;
      modeProps.yoyo = true;
      break;
  }
  const progress = useTiming(
    { from: 0, to: 1, ...modeProps },
    { duration, easing }
  );
  const start = useComputedValue(() => {
    const { x: x1, y: y1 } = gradientDirection.start;
    const { x: x2, y: y2 } = gradientDirection.end;
    const isConstX = x1 === x2;
    const isConstY = y1 === y2;
    const invertProgressX = x2 < x1;
    const invertProgressY = y2 < y1;
    return vec(
      isConstX
        ? 0
        : -gradientWidth +
            (invertProgressX ? 1 - progress.current : progress.current) *
              (Math.max(rectSize.width, rectSize.height) + gradientWidth),
      isConstY
        ? 0
        : -gradientWidth +
            (invertProgressY ? 1 - progress.current : progress.current) *
              (Math.max(rectSize.width, rectSize.height) + gradientWidth)
    );
  }, [progress]);
  const end = useComputedValue(() => {
    const { x: x1, y: y1 } = gradientDirection.start;
    const { x: x2, y: y2 } = gradientDirection.end;
    const isConstX = x1 === x2;
    const isConstY = y1 === y2;
    const invertProgressX = x2 < x1;
    const invertProgressY = y2 < y1;
    return vec(
      isConstX
        ? 0
        : (invertProgressX ? 1 - progress.current : progress.current) *
            (Math.max(rectSize.width, rectSize.height) + gradientWidth),
      isConstY
        ? 0
        : (invertProgressY ? 1 - progress.current : progress.current) *
            (Math.max(rectSize.width, rectSize.height) + gradientWidth)
    );
  }, [progress]);
  return (
    <Canvas
      style={{ width: rectSize.width, height: rectSize.height, ...style }}
    >
      <Group>
        <RoundedRect {...rectSize} x={0} y={0} r={borderRadius} color={color}>
          <LinearGradient start={start} end={end} colors={gradientColors} />
        </RoundedRect>
      </Group>
    </Canvas>
  );
};

export { ShimmeringPlaceholder };
