import React, { useEffect, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ViewStyle, View } from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  animated: {
    flex: 1,
  },
});

const GradientDirections = {
  Vertical: {
    leftToRight: {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  },
};

export type AnimatedPlaceholderProps = {
  size: { width: number; height: number };
  mode?: 'loop' | 'reverseLoop';
  duration?: number; // in milliseconds
  gradientWidth?: number;
  gradientColors?: [string, string, string];
  easing?: (t: number) => number;
  style?: ViewStyle;
  gradientLocations?: [number, number, number];
};

const ShimmeringPlaceholder: React.FC<AnimatedPlaceholderProps> = ({
  size: rectSize,
  mode = 'loop',
  duration = 1000,
  gradientWidth = rectSize.width,
  gradientColors = ['#ebebeb', '#c5c5c5', '#ebebeb'],
  easing = Easing.linear,
  gradientLocations = [0.3, 0.5, 0.7],
  style,
}) => {
  const beginShimmerPosition = useSharedValue(-1);

  const gradientDirection = useMemo(
    () => GradientDirections.Vertical.leftToRight,
    []
  );

  useEffect(() => {
    beginShimmerPosition.value = withRepeat(
      withTiming(1, { duration, easing }),
      -1
    );
  }, [duration, beginShimmerPosition, easing]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            beginShimmerPosition.value,
            [-1, 1],
            mode === 'loop'
              ? [-rectSize.width, rectSize.width]
              : [rectSize.width, -rectSize.width]
          ),
        },
      ],
    };
  }, [mode, rectSize]);

  return (
    <View style={[styles.container, { ...rectSize }, style]}>
      <View style={[styles.background, { backgroundColor: gradientColors[0] }]}>
        <Animated.View style={[styles.animated, animatedStyles]}>
          <LinearGradient
            start={gradientDirection.start}
            end={gradientDirection.end}
            colors={gradientColors}
            style={[styles.gradient, { width: gradientWidth }]}
            locations={gradientLocations}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export { ShimmeringPlaceholder };
