import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SoilGuide7() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Soil Guide 7 - Blank Page</Text>
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
