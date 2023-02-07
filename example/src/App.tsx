import React from 'react';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ShimmeringPlaceholder } from 'react-native-skia-shimmering';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  sessionTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 6,
    fontWeight: '600',
    color: 'black',
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> React Native Reanimated Shimmer </Text>
      <Text style={styles.sessionTitle}>Simple</Text>
      <ShimmeringPlaceholder style={{ borderRadius: 16 }} />
      <Text style={styles.sessionTitle}>Avatar</Text>
      <ShimmeringPlaceholder
        style={{ borderRadius: 100 }}
        size={{ width: 200, height: 200 }}
      />
      <Text style={styles.sessionTitle}>Facebook</Text>
      <ShimmeringPlaceholder
        style={{ borderRadius: 8, marginBottom: 16, height: 24 }}
        input={[-1, -0.33, 0.33, 1]}
        output={[-200, 0, 200, 200]}
      />
      <View style={{ flexDirection: 'row' }}>
        <ShimmeringPlaceholder
          size={{ width: 124, height: 124 }}
          style={{ borderRadius: 64, marginEnd: 16 }}
          input={[-1, -0.33, 0.33, 1]}
          output={[-200, 0, 200, 200]}
        />
        <View style={{ justifyContent: 'space-between' }}>
          <ShimmeringPlaceholder
            style={{ borderRadius: 8 }}
            input={[-1, -0.33, 0.33, 1]}
            output={[-200, -200, 0, 200]}
          />
          <ShimmeringPlaceholder
            style={{ borderRadius: 8 }}
            input={[-1, -0.33, 0.33, 1]}
            output={[-200, -200, 0, 200]}
          />
          <ShimmeringPlaceholder
            style={{ borderRadius: 8 }}
            input={[-1, -0.33, 0.33, 1]}
            output={[-200, -200, 0, 200]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
