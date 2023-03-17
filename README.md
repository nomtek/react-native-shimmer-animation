# react-native-shimmer-animation
Shimmering placeholder for iOS and Android based on Reanimated
## Installation

Using `npm`
```
npm install react-native-shimmer-animation
```

Using `yarn`
```
yarn add react-native-shimmer-animation
```

### Installing dependencies

This library uses [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated) and [`react-native-linear-gradient`](https://github.com/react-native-linear-gradient/react-native-linear-gradient) as peer dependencies - ensure you have them installed in your project.

Using `npm`
```
npm install react-native-reanimated react-native-linear-gradient
```

Using `yarn`
```
yarn add react-native-reanimated react-native-linear-gradient
```

## Usage

```jsx
import { ShimmeringPlaceholder } from 'react-native-reanimated-shimmering';

// use standalone placeholder component

<ShimmeringPlaceholder size={{ width: 100, height: 100 }} />

// or a wrapper around your component which is loading its content

const [isLoading, setLoading] = useState(false);

<ShimmeringWrapper visible={isLoading}>
    <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{ width: 100, height: 100 }}
    />
</ShimmeringWrapper>
```

### Synchronized animation between multiple components

<video width="320" controls>
  <source src="synchronized-shimmering.mov" type="video/mp4">
</video>

Check out the [example app](/example/src/App.tsx) for more usage examples.

## Props

### `ShimmeringPlaceholder`
| Prop                  | Description                           | Type                                  | Default                               |
| -                     | -                                     | -                                     | -                                     |
| `size`                | Placeholder size                      | `{ width: number; height: number }`   | -                                     |
| `duration`            | Animation duration (in milliseconds)  | `number`                              | `1000`                                |
| `gradientWidth`       | Width of the gradient                 | `number`                              | `size.width`                          |
| `gradientColors`      | Array of gradient colors              | `[string, string, string]`            | `['#ebebeb', '#c5c5c5', '#ebebeb']`   |
| `gradientLocations`   | Array of gradient locations           | `[number, number, number]`            | `[0.3, 0.5, 0.7]`                     |
| `easing`              | Animation easing function             | `(t: number) => number`               | `Easing.linear`                       |
| `style`               | Placeholder style                     | `StyleProp<ViewStyle>`                | `undefined`                           |
| `input`               | Interpolation input range             | `number[]`                            | `[-1, 1]`                             |
| `output`              | Interpolation output range            | `number[]`                            | `[-size.width, size.width]`           |

### `ShimmeringWrapper`
| Prop                  | Description                           | Type                                  | Default                               |
| -                     | -                                     | -                                     | -                                     |
| `visible`             | Is `ShimmeringPlaceholder` visible    | `boolean`                             | -                                     |
| `size`                | `ShimmeringPlaceholder` size          | `{ width: number; height: number }`   | -                                     |
| `style`               | Container style                       | `StyleProp<ViewStyle>`                | `undefined`                           |
| `shimmerStyle`        | `ShimmeringPlaceholder` style         | `StyleProp<ViewStyle>`                | `undefined`                           |
| `duration`            | Animation duration (in milliseconds)  | `number`                              | `1000`                                |
| `gradientWidth`       | Width of the gradient                 | `number`                              | `size.width`                          |
| `gradientColors`      | Array of gradient colors              | `[string, string, string]`            | `['#ebebeb', '#c5c5c5', '#ebebeb']`   |
| `gradientLocations`   | Array of gradient locations           | `[number, number, number]`            | `[0.3, 0.5, 0.7]`                     |
| `easing`              | Animation easing function             | `(t: number) => number`               | `Easing.linear`                       |
| `input`               | Interpolation input range             | `number[]`                            | `[-1, 1]`                             |
| `output`              | Interpolation output range            | `number[]`                            | `[-size.width, size.width]`           |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
