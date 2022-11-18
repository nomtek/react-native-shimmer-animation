import React from 'react';
import { SafeAreaView } from 'react-native';
import { 
  Canvas, 
  Group, 
  LinearGradient, 
  RoundedRect, 
  Easing, 
  useComputedValue, 
  useTiming, 
  vec,
  LinearGradientProps,
  Color,
} from '@shopify/react-native-skia';
import type { AnimationParams } from '@shopify/react-native-skia/lib/typescript/src/animation/types';

type GradientDirection = {
  start: { x: number, y: number };
  end: { x: number, y: number };
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



type AnimatedPlaceholderProps = {
  color: Color;
  size: { width: number, height: number };
  mode: "once" | "loop" | "reverseOnce" | "reverseLoop";
  cornerRadius?: number;
  duration?: number; // in milliseconds
  gradientWidth?: number;
  gradientDirection?: GradientDirection;
  gradientColors?: LinearGradientProps["colors"];
  easing?: (t: number) => number;
};

const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({
  color,
  size: rectSize,
  mode,
  cornerRadius = 0, 
  duration = 1000,
  gradientWidth = 8,
  gradientDirection = GradientDirections.Vertical.leftToRight,
  gradientColors = [color, "#ffffff80", color],
  easing = Easing.linear,
}) => {
  let modeProps: AnimationParams = {};
  switch (mode) {
    case "once":
      modeProps.loop = false;
      modeProps.yoyo = false;
      break;
    case "loop":
      modeProps.loop = true;
      modeProps.yoyo = false;
      break;
    case "reverseOnce":
      modeProps.loop = false;
      modeProps.yoyo = true;
      break;
    case "reverseLoop":
      modeProps.loop = true;
      modeProps.yoyo = true;
      break;
  }
  const progress = useTiming({ from: 0, to: 1, ...modeProps }, { duration, easing });
  const start = useComputedValue(
    () => {
      const { x: x1, y: y1 } = gradientDirection.start;
      const { x: x2, y: y2 } = gradientDirection.end;
      const isConstX = x1 === x2;
      const isConstY = y1 === y2;
      const invertProgressX = x2 < x1;
      const invertProgressY = y2 < y1;
      return vec(
        isConstX ? 0 : -gradientWidth + (invertProgressX ? (1-progress.current) : progress.current) * (Math.max(rectSize.width, rectSize.height) + gradientWidth), 
        isConstY ? 0 : -gradientWidth + (invertProgressY ? (1-progress.current) : progress.current) * (Math.max(rectSize.width, rectSize.height) + gradientWidth)
      );
    },
    [progress]
  );
  const end = useComputedValue(
    () => {
      const { x: x1, y: y1 } = gradientDirection.start;
      const { x: x2, y: y2 } = gradientDirection.end;
      const isConstX = x1 === x2;
      const isConstY = y1 === y2;
      const invertProgressX = x2 < x1;
      const invertProgressY = y2 < y1;
      return vec(
        isConstX ? 0 : (invertProgressX ? (1-progress.current) : progress.current) * (Math.max(rectSize.width, rectSize.height) + gradientWidth), 
        isConstY ? 0 : (invertProgressY ? (1-progress.current) : progress.current) * (Math.max(rectSize.width, rectSize.height) + gradientWidth)
      );
    },
    [progress]
  );
  return (
    <Group>
      <RoundedRect
        {...rectSize}
        x={0}
        y={0}
        r={cornerRadius}
        color={color}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={gradientColors}
        />
      </RoundedRect>
    </Group>
  );
}

const ShimmerPlaceholder = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <AnimatedPlaceholder 
          color="lightgray"
          size={{ width: 256, height: 256 }}
          mode="loop"
          cornerRadius={13}
          gradientWidth={32}
          gradientDirection={GradientDirections.Vertical.leftToRight}
          duration={1000}
          easing={Easing.inOut(Easing.cubic)}
        />
      </Canvas>
    </SafeAreaView>
  );
};

export const createShimmeringPlaceholder = () => <ShimmerPlaceholder />;

export { ShimmerPlaceholder };
