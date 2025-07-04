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

export default function Profile() {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  const handleNavigate = (screen) => {
    navigation.navigate(screen); // Replace with your actual screen names
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E3FFCE" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Top Oval Background */}
        <View style={styles.topOvalContainer}>
          <Image
            source={require('../../images/background_top_oval.png')}
            style={styles.topOval}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.brand}>AGRISENSE</Text>
          <Text style={styles.profileText}>MY PROFILE →</Text>
        </View>

        {/* Profile Details */}
        <View style={styles.profileInfo}>
          <Text style={styles.name}>HK BUTLAY</Text>
          <Text style={styles.email}>hkbutlay@gmail.com</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('AboutScreen')}
          >
            <Text style={styles.optionText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('FAQScreen')}
          >
            <Text style={styles.optionText}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => handleNavigate('SupportScreen')}
          >
            <Text style={styles.optionText}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

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
  topOvalContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  topOval: {
    width: '100%',
    height: 160,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A6B3E',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  brand: {
    position: 'absolute',
    top: 50,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  profileText: {
    position: 'absolute',
    top: 75,
    fontSize: 12,
    color: '#fff',
    fontWeight: '300',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1D1D1D',
  },
  email: {
    fontSize: 14,
    color: '#1D1D1D',
    opacity: 0.6,
    marginTop: 4,
  },
  optionsContainer: {
    marginTop: 30,
    paddingHorizontal: 30,
    gap: 16,
  },
  optionButton: {
    backgroundColor: '#7BBE4F',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 40,
    alignSelf: 'center',
    backgroundColor: '#4A6B3E',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
