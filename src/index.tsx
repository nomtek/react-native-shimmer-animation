import { NativeModules, Platform } from 'react-native';
import {
  ShimmeringPlaceholder,
  GradientDirections,
} from './shimmering-placeholder';
import { ShimmeringWrapper } from './shimmering-wrapper';

const LINKING_ERROR =
  `The package 'react-native-skia-shimmering' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const SkiaShimmering = NativeModules.SkiaShimmering
  ? NativeModules.SkiaShimmering
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return SkiaShimmering.multiply(a, b);
}

export { ShimmeringPlaceholder, ShimmeringWrapper, GradientDirections };
