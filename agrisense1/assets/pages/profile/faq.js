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

export default function FAQPage() {
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7CB342" />

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.brandText}>AGRISENSE</Text>
          <Text style={styles.pageText}>FAQ</Text>
          <View style={styles.underline} />
        </View>
      </View>

      {/* Content Section */}
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            ...styles.contentCard,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text style={styles.questionTitle}>
            What should I do if the app isn't showing the right NPK or pH data?
          </Text>
          <Text style={styles.answerText}>
            Try restarting the app and ensure your sensors are properly connected and placed in the soil. If issues
            continue, contact support.
          </Text>

          <Text style={styles.questionTitle}>
            How do I know if my sensors are working properly?
          </Text>
          <Text style={styles.answerText}>
            The app will display live data if sensors are working. Ensure sensors are turned on and synced.
          </Text>

          <Text style={styles.questionTitle}>How can I view past soil data?</Text>
          <Text style={styles.answerText}>
            Go to the "Soil Log" section to track historical data for better insights.
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
    color: "white",
    letterSpacing: 2,
    marginBottom: 8,
  },
  pageText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
  },
  underline: {
    width: 60,
    height: 2,
    backgroundColor: "white",
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  contentCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 12,
    marginTop: 16,
    lineHeight: 22,
  },
  answerText: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 20,
    textAlign: "justify",
    marginBottom: 20,
  },
});
