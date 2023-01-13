import React, { useState } from 'react';

import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import {
  ShimmeringPlaceholder,
  ShimmeringWrapper,
  GradientDirections,
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

  return (
    <SafeAreaView style={styles.container}>
      <ShimmeringWrapper
        visible={viewsVisible}
        size={{ width: 256, height: 128 }}
        shimmerStyle={{ borderRadius: 16 }}
        style={styles.wrapper}
      >
        <View style={styles.view} />
      </ShimmeringWrapper>
      <Button onPress={() => setViewsVisible(!viewsVisible)} title="TOGGLE" />

      <ShimmeringPlaceholder
        size={{ width: 256, height: 128 }}
        style={styles.placeholder}
        gradientDirection={GradientDirections.Diagonal.fromTopLeft}
      />
    </SafeAreaView>
  );
}
