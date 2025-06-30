// assets/pages/guide/CropGuideList.js

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

export default function CropGuideList() {
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
          <Text style={styles.headerText}>Crop Guides</Text>
          <Image
            source={require('../../images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Guide Cards */}
        <View style={styles.cardList}>
          {/* Card 1 */}
          <View style={styles.card}>
            <Image
              source={require('../../images/rotation.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Crop Rotation Planning</Text>
              <Text style={styles.cardDescription}>
                Helps diversify crops to improve soil health and reduce pests.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('RotationGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Image
              source={require('../../images/pest.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Pest and Disease Management</Text>
              <Text style={styles.cardDescription}>
                Gives tips on integrated pest and crop monitoring tools.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('PestGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <Image
              source={require('../../images/companion.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Companion Planting Techniques</Text>
              <Text style={styles.cardDescription}>
                Crops that grow better together.
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handleNavigate('CompanionGuide')}
              >
                <Text style={styles.startText}>Let's start</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 6 }} />
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
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardTextContainer: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4A6B3E',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4A6B3E',
    marginBottom: 10,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end', // ← moved to the opposite side
    backgroundColor: '#4A6B3E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
  },
  startText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
