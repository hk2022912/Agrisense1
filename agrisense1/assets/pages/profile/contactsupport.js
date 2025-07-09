import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <-- Added for navigation

export default function ContactSupportPage() {
  const navigation = useNavigation(); // <-- Hook to access navigation

  const handleBackPress = () => {
    navigation.navigate("Home"); // <-- Navigates to Home screen
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:agrisense@gmail.com");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:0936311790");
  };

  const handleFacebookPress = () => {
    Linking.openURL("https://facebook.com/agrisense");
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
          <Text style={styles.pageText}>CONTACT SUPPORT</Text>
          <View style={styles.underline} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.contentCard}>
          {/* Email Contact */}
          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <Ionicons name="mail" size={28} color="#2E7D32" style={styles.contactIcon} />
            <Text style={styles.contactText}>agrisense@gmail.com</Text>
          </TouchableOpacity>

          {/* Phone Contact */}
          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <Ionicons name="call" size={28} color="#2E7D32" style={styles.contactIcon} />
            <Text style={styles.contactText}>0936311790</Text>
          </TouchableOpacity>

          {/* Facebook Contact */}
          <TouchableOpacity style={styles.contactItem} onPress={handleFacebookPress}>
            <Ionicons name="logo-facebook" size={28} color="#2E7D32" style={styles.contactIcon} />
            <Text style={styles.contactText}>AGRISENSE</Text>
          </TouchableOpacity>

          {/* Support Message */}
          <Text style={styles.supportMessage}>If you need assistance, feel free to contact us here.</Text>
        </View>
      </View>
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
    paddingBottom: 60,
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
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
    paddingBottom: 100,
    justifyContent: "center",
  },
  contentCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  contactIcon: {
    marginRight: 20,
    width: 32,
  },
  contactText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E7D32",
    flex: 1,
  },
  supportMessage: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginTop: 40,
    lineHeight: 22,
  },
});
