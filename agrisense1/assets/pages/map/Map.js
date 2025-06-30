import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Map() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5F0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A6B4A',
  },
});
