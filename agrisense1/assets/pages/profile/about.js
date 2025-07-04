import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7CB342" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.brandText}>AGRISENSE</Text>
          <Text style={styles.pageText}>ABOUT</Text>
          <View style={styles.underline} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>🌿 What is AGRISENSE?</Text>
          <Text style={styles.paragraph}>
            AgriSense is a smart farming assistant using IoT technology to monitor Nitrogen, Phosphorus, Potassium,
            pH level, and temperature—helping you make data-driven decisions for better yields and healthier soil.
          </Text>

          <Text style={styles.sectionTitle}>🔧 How It Works</Text>
          <Text style={styles.paragraph}>
            Sensors placed in the soil transmit real-time NPK and pH data to the app. This allows you to take timely
            actions like adjusting fertilizers or irrigation.
          </Text>

          <Text style={styles.sectionTitle}>🌱 Why These Factors Matter</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletKey}>• Nitrogen:</Text>
            <Text style={styles.bulletValue}> Stimulates leafy growth and greenery.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletKey}>• Phosphorus:</Text>
            <Text style={styles.bulletValue}> Develops strong roots and flower production.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletKey}>• Potassium:</Text>
            <Text style={styles.bulletValue}> Boosts plant resilience and yield.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletKey}>• pH Level:</Text>
            <Text style={styles.bulletValue}> Helps with optimal nutrient absorption.</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bulletKey}>• Temperature:</Text>
            <Text style={styles.bulletValue}> Impacts nutrient uptake and microbial activity.</Text>
          </View>

          <Text style={styles.paragraph}>
            With AgriSense, farmers can sustainably manage their soil and maximize harvests.
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E8",
  },
  headerContainer: {
    backgroundColor: "#7CB342",
    paddingTop: 20,
    paddingBottom: 70,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    overflow: "hidden",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 40,
  },
  brandText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 1,
  },
  underline: {
    width: 60,
    height: 2,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    marginBottom: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 14.5,
    color: "#4A4A4A",
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bulletKey: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#2E7D32",
  },
  bulletValue: {
    fontSize: 14,
    color: "#4A4A4A",
    flex: 1,
    lineHeight: 20,
  },
});
