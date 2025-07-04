
// CropGuide2.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CropGuide2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crop Guide 2 - Blank Page</Text>
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