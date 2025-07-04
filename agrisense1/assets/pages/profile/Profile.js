import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = () => {
    navigation.navigate("Option");
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
          <Text style={styles.profileText}>MY PROFILE</Text>
          <View style={styles.underline} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>HK BUTLAY</Text>
          <Text style={styles.userEmail}>hkbutlay@gmail.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("AboutScreen")}
          >
            <Text style={styles.menuText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("FAQScreen")}
          >
            <Text style={styles.menuText}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress("SupportScreen")}
          >
            <Text style={styles.menuText}>Contact Support</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
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
  profileText: {
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
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 60,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
    letterSpacing: 1,
  },
  userEmail: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "400",
  },
  menuContainer: {
    marginBottom: 60,
  },
  menuItem: {
    backgroundColor: "#7CB342",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "#5A8A3A",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
