// assets/pages/guide/SoilGuideList.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SoilGuideList() {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();
  const handleNavigate = (screen) => navigation.navigate(screen);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E3FFCE" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Soil Guides</Text>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Guide Cards */}
        <View style={styles.cardList}>
          {/* Card 1 - Basic Soil Guide */}
          <View style={styles.card}>
            <Image
              source={require('../../images/soil_basic.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Basic Soil Guide:</Text>
              <Text style={styles.cardDescription}>A Soil guide for Farmers</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('BasicSoilGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#4A6B3E" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2 - Improving Soil Fertility */}
          <View style={styles.card}>
            <Image
              source={require('../../images/soil_fertility.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Improving Soil Fertility:</Text>
              <Text style={styles.cardDescription}>
                Ways to enrich poor soil using compost, manure, cover crops, etc.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('FertilityGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#4A6B3E" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3 - Preventing Soil Erosion */}
          <View style={styles.card}>
            <Image
              source={require('../../images/soil_erosion.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Preventing Soil Erosion</Text>
              <Text style={styles.cardDescription}>
                Using mulching, contour planting, and vegetative barriers.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('ErosionGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#4A6B3E" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A6B3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A6B3E',
  },
  logo: {
    width: 32,
    height: 32,
  },
  cardList: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#4A6B3E',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardTextContainer: {
    padding: 16,
    backgroundColor: '#4A6B3E',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  startText: {
    color: '#4A6B3E',
    fontSize: 14,
    fontWeight: '600',
  },
});
