import React, { useState } from 'react';

import { Button, SafeAreaView, View } from 'react-native';
import {
  ShimmeringPlaceholder,
  ShimmeringWrapper,
} from 'react-native-skia-shimmering';

export default function App() {
  const [viewsVisible, setViewsVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <ShimmeringWrapper
          visible={viewsVisible}
          size={{ width: 256, height: 128 }}
          borderRadius={13}
        >
          <View
            style={{
              width: 256,
              height: 128,
              borderRadius: 13,
              backgroundColor: 'red',
            }}
          />
        </ShimmeringWrapper>
      </View>

      <ShimmeringPlaceholder
        size={{ width: 256, height: 128 }}
        borderRadius={13}
      />

      <Button onPress={() => setViewsVisible(!viewsVisible)} title="title">
        TOGGLE
      </Button>
    </SafeAreaView>
  );
}
