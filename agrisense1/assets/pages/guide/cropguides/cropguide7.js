
// CropGuide7.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CropGuide7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crop Guide 7 - Blank Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  text: {
    fontSize: 18, fontWeight: 'bold'
  }
});