import React, { useState } from 'react';

import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  Easing,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  ShimmeringPlaceholder,
  ShimmeringWrapper,
} from 'react-native-skia-shimmering';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  wrapper: {
    marginBottom: 16,
  },
  view: {
    width: 256,
    height: 128,
    backgroundColor: 'red',
  },
  placeholder: {
    marginTop: 16,
    borderRadius: 16,
  },
});

export default function App() {
  const [viewsVisible, setViewsVisible] = useState(false);

  const one = withRepeat(
    withSequence(
      withTiming(1, { duration: 1000, easing: Easing.linear }),
      withTiming(2, { duration: 700, easing: Easing.linear })
    ),
    -1
  );
  const two = withRepeat(
    withDelay(700, withTiming(1, { duration: 1000, easing: Easing.linear })),
    -1
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <ShimmeringPlaceholder
          size={{ width: 256, height: 256 }}
          style={styles.placeholder}
          animated={one}
        />
        <ShimmeringPlaceholder
          size={{ width: 256, height: 256 }}
          style={styles.placeholder}
          animated={two}
        />
      </View>
      <ShimmeringWrapper
        visible={viewsVisible}
        size={{ width: 256, height: 256 }}
        shimmerStyle={{ borderRadius: 16 }}
        style={styles.wrapper}
      >
        <View style={styles.view} />
      </ShimmeringWrapper>
      <Button onPress={() => setViewsVisible(!viewsVisible)} title="TOGGLE" />

      <ShimmeringPlaceholder
        size={{ width: 256, height: 256 }}
        style={styles.placeholder}
      />
    </SafeAreaView>
  );
}
