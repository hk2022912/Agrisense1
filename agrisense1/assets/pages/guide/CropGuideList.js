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

  const guides = [
    {
      id: 1,
      title: 'Crop Rotation Planning',
      desc: 'Helps diversify crops to improve soil health and reduce pests.',
      img: require('../../images/rotation2.png'),
      screen: 'CropGuide1',
    },
    {
      id: 2,
      title: 'Pest and Disease Management',
      desc: 'Gives tips on integrated pest and crop monitoring tools.',
      img: require('../../images/pest.png'),
      screen: 'CropGuide2',
    },
    {
      id: 3,
      title: 'Companion Planting Techniques',
      desc: 'Crops that grow better together.',
      img: require('../../images/companion.png'),
      screen: 'CropGuide3',
    },
    {
      id: 4,
      title: 'Irrigation Best Practices',
      desc: 'Efficient water use for improved crop growth.',
      img: require('../../images/rotation2.png'),
      screen: 'CropGuide4',
    },
    {
      id: 5,
      title: 'Seed Selection and Treatment',
      desc: 'Choosing quality seeds for better harvest.',
      img: require('../../images/pest.png'),
      screen: 'CropGuide5',
    },
    {
      id: 6,
      title: 'Weed Management',
      desc: 'Learn strategies to reduce weed impact.',
      img: require('../../images/companion.png'),
      screen: 'CropGuide6',
    },
    {
      id: 7,
      title: 'Fertilizer Application Timing',
      desc: 'Optimize nutrient availability for plants.',
      img: require('../../images/rotation2.png'),
      screen: 'CropGuide7',
    },
    {
      id: 8,
      title: 'Harvesting Tips and Timing',
      desc: 'Maximize yield through proper harvesting.',
      img: require('../../images/pest.png'),
      screen: 'CropGuide8',
    },
    {
      id: 9,
      title: 'Post-Harvest Handling',
      desc: 'How to reduce crop loss after harvest.',
      img: require('../../images/companion.png'),
      screen: 'CropGuide9',
    },
    {
      id: 10,
      title: 'Climate Smart Agriculture',
      desc: 'Adapt to climate change with resilient practices.',
      img: require('../../images/rotation2.png'),
      screen: 'CropGuide10',
    },
  ];

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

        {/* Cards */}
        <View style={styles.cardList}>
          {guides.map((guide) => (
            <View key={guide.id} style={styles.card}>
              <Image source={guide.img} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{guide.title}</Text>
                <Text style={styles.cardDescription}>{guide.desc}</Text>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => handleNavigate(guide.screen)}
                >
                  <Text style={styles.startText}>Let's start</Text>
                  <Ionicons name="arrow-forward" size={16} color="#4A6B3E" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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