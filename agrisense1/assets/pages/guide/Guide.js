// assets/pages/guide/Guide.js

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Guide({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoBack = () => navigation.navigate('Home');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E3FFCE" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Guides</Text>

            <Image
              source={require('../../images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text style={styles.mainTitle}>Farming Guides</Text>
          <Text style={styles.subtitle}>
            Master farming practices from soil to harvest — one guide at a time.
          </Text>

          {/* Crop Guide Card */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CropGuide')}>
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name="sprout" size={40} color="#4A6B3E" style={styles.centeredIcon} />
              <Text style={styles.cardTitle}>Crop Guide</Text>
              <Text style={styles.cardDesc}>
                Learn to maximize yield with natural crop rotation, pest prevention, and seasonal pairing techniques.
              </Text>
              <View style={styles.learnMoreWrapper}>
                <Text style={styles.cardCTAtext}>Learn more</Text>
                <Ionicons name="chevron-forward" size={16} color="#4A6B3E" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Soil Guide Card */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SoilGuide')}>
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name="terrain" size={40} color="#4A6B3E" style={styles.centeredIcon} />
              <Text style={styles.cardTitle}>Soil Guide</Text>
              <Text style={styles.cardDesc}>
                Enrich and protect your soil with organic matter, erosion control, and nutrient balancing.
              </Text>
              <View style={styles.learnMoreWrapper}>
                <Text style={styles.cardCTAtext}>Learn more</Text>
                <Ionicons name="chevron-forward" size={16} color="#4A6B3E" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Did You Know Section */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Did you know?</Text>
            <Text style={styles.infoText}>
              Just one teaspoon of healthy soil contains more microbes than there are people on Earth. Soil is alive!
            </Text>
          </View>

          {/* Quick Tips Section */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipTitle}>Quick Tips</Text>
            <Text style={styles.tipItem}>• Water early in the day to reduce evaporation.</Text>
            <Text style={styles.tipItem}>• Rotate crops to prevent disease buildup in the soil.</Text>
            <Text style={styles.tipItem}>• Add compost regularly for healthy microbial activity.</Text>
          </View>

          {/* Clean End Spacing */}
          <View style={styles.endSpacer} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3FFCE',
  },
  scrollContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#4A6B3E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A6B3E',
  },
  logo: {
    width: 45,
    height: 45,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#3B5A2D',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#4A6B4A',
    opacity: 0.85,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 6, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardContent: {
    flex: 1,
  },
  centeredIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A6B3E',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 13.5,
    color: '#4A6B4A',
    opacity: 0.95,
    lineHeight: 18,
    textAlign: 'center',
  },
  learnMoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cardCTAtext: {
    fontWeight: '700',
    fontSize: 13,
    color: '#4A6B3E',
    marginRight: 6,
  },
  infoBox: {
    backgroundColor: '#F0FBE2',
    borderLeftWidth: 4,
    borderLeftColor: '#7A9E5E',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#2E2E2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4A6B3E',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#4A6B4A',
    lineHeight: 18,
  },
  tipsBox: {
    backgroundColor: '#D9F2B4',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7A9E5E',
    shadowColor: '#2E2E2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A6B4A',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#4A6B4A',
    lineHeight: 20,
  },
  endSpacer: {
    height: 40,
  },
});
