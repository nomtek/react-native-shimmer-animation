# react-native-skia-shimmering
Shimmering placeholder for iOS and Android based on Reanimated
## Installation

```sh
npm install react-native-reanimated-shimmering
```

```sh
yarn add react-native-reanimated-shimmering
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

| Prop      | Description                           | Type                                  | Default       |
| -         | -                                     | -                                     | -             |
| `size`    | Placeholder size                      | `{ width: number; height: number }`   | -             |
| `duration`| Animation duration (in milliseconds)  | `number`                              | `3000`        |
| `style`   | Placeholder style                     | `StyleProp<ViewStyle>`                | `undefined`   |
| `input`   | Interpolation input range             | `number[]`                            |               |
| `output`  | Interpolation output range            | `number[]`                            |               |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
