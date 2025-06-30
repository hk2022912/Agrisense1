// assets/pages/welcome/Welcome.js
import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';

const Welcome = ({ navigation }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start loader animation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Navigate after 300ms
    const timeout = setTimeout(() => {
      navigation.replace('Option');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  const rotateInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* AGRISENSE Text */}
      <Text style={styles.title}>AGRISENSE</Text>

      {/* Loader */}
      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
      />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F9D5', // Soft green like your background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A6B3E', // Your specified green shade
    letterSpacing: 2,
    marginBottom: 30,
  },
  loader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 6,
    borderTopColor: '#25b09b',
    borderRightColor: 'transparent',
    borderBottomColor: '#25b09b',
    borderLeftColor: 'transparent',
  },
});
