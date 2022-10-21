import React from 'react';
import { Canvas, Group, LinearGradient, RoundedRect, useClockValue, useComputedValue, vec } from '@shopify/react-native-skia';
import { SafeAreaView } from 'react-native';

const gradientDirections = {
  horizontal: {
    topToBottom: {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 1 },
    },
    bottomToTop: {
      p1: { x: 0, y: 1 },
      p2: { x: 0, y: 0 },
    },
  },
  vertical: {
    leftToRight: {
      p1: { x: 0, y: 0 },
      p2: { x: 1, y: 0 },
    },
    rightToLeft: {
      p1: { x: 1, y: 0 },
      p2: { x: 0, y: 0 },
    },
  },
  diagonal: {
    fromTopLeft: {
      p1: { x: 0, y: 0 },
      p2: { x: 1, y: 1 },
    },
    fromTopRight: {
      p1: { x: 1, y: 0 },
      p2: { x: 0, y: 1 },
    },
    fromBottomLeft: {
      p1: { x: 0, y: 1 },
      p2: { x: 1, y: 0 },
    },
    fromBottomRight: {
      p1: { x: 1, y: 1 },
      p2: { x: 0, y: 0 },
    },
  },
};

type AnimatedPlaceholderProps = {
  size: { width: number, height: number };
  cornerRadius: number;
  gradientWidth: number;
}

const AnimatedPlaceholder: React.FC<AnimatedPlaceholderProps> = ({ 
  size: rectSize, 
  cornerRadius, 
  gradientWidth
}) => {
  const gradient = {
    // normalized vector
    direction: gradientDirections.diagonal.fromTopLeft,
    width: gradientWidth,
  };
  const clock = useClockValue();
  // Normalize the clock value to a value between 0 and 1
  const normalized = useComputedValue(
    () => (clock.current / 1000) % 1.0,
    [clock]
  );
  const start = useComputedValue(
    () => vec(
        -gradient.width + normalized.current * (Math.max(rectSize.width, rectSize.height) + gradient.width), 
        -gradient.width + normalized.current * (Math.max(rectSize.width, rectSize.height) + gradient.width)
      ),
    [normalized]
  );
  const end = useComputedValue(
    () => vec(
        normalized.current * (Math.max(rectSize.width, rectSize.height) + gradient.width), 
        normalized.current * (Math.max(rectSize.width, rectSize.height) + gradient.width)
      ),
    [normalized]
  );
  return (
    <Group>
      <RoundedRect
        {...rectSize}
        x={0}
        y={0}
        r={cornerRadius}
        color="lightgray"
      >
        <LinearGradient
          start={start}
          end={end}
          colors={["lightgray", "#ffffff80", "lightgray"]}
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
          size={{ width: 256, height: 128 }}
          cornerRadius={13}
          gradientWidth={32}
        />
      </Canvas>
    </SafeAreaView>
  );
};

export const createShimmeringPlaceholder = () => <ShimmerPlaceholder />;

export { ShimmerPlaceholder };
