import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const sensorDevices = [
  {
    id: "1",
    name: "Kihare",
    latitude: 8.3667,
    longitude: 124.8667,
    status: "active",
    lastReading: {
      nitrogen: 45,
      phosphorus: 32,
      potassium: 28,
      ph: 6.8,
      temperature: 26,
    },
  },
  {
    id: "2",
    name: "North Field",
    latitude: 8.3687,
    longitude: 124.8687,
    status: "active",
    lastReading: {
      nitrogen: 38,
      phosphorus: 29,
      potassium: 31,
      ph: 7.1,
      temperature: 25,
    },
  },
  {
    id: "3",
    name: "South Field",
    latitude: 8.3647,
    longitude: 124.8647,
    status: "inactive",
    lastReading: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      ph: 0,
      temperature: 0,
    },
  },
];

export default function MapPage({ navigation }) {
  const [selectedSensor, setSelectedSensor] = useState(sensorDevices[0]);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        getCurrentLocation();
      } else {
        Alert.alert("Permission Denied", "Location access is required to show your position.");
      }
    } catch (error) {
      console.error("Permission error:", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(coords);

      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500
      );
    } catch (error) {
      Alert.alert("Error", "Unable to retrieve your current location.");
    }
  };

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const handleMarkerPress = (sensor) => {
    setSelectedSensor(sensor);
  };

  const handleMyLocationPress = () => {
    if (locationPermission) {
      getCurrentLocation();
    } else {
      requestLocationPermission();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.myLocationButton} onPress={handleMyLocationPress}>
        <Ionicons name="locate" size={24} color="#7CB342" />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 8.3667,
          longitude: 124.8667,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {sensorDevices.map((sensor) => (
          <Marker
            key={sensor.id}
            coordinate={{ latitude: sensor.latitude, longitude: sensor.longitude }}
            onPress={() => handleMarkerPress(sensor)}
          >
            <View
              style={[
                styles.markerContainer,
                {
                  backgroundColor: sensor.status === "active" ? "#7CB342" : "#FF5722",
                  borderColor: selectedSensor?.id === sensor.id ? "#FFD700" : "#fff",
                  borderWidth: selectedSensor?.id === sensor.id ? 4 : 3,
                },
              ]}
            >
              <Ionicons name="leaf" size={20} color="white" />
            </View>
          </Marker>
        ))}
        {userLocation && (
          <Marker coordinate={userLocation} title="You are here">
            <View style={styles.userLocationMarker}>
              <Ionicons name="person" size={16} color="white" />
            </View>
          </Marker>
        )}
      </MapView>

      {selectedSensor && (
        <View style={styles.sensorCard}>
          <View style={styles.sensorHeader}>
            <View style={styles.sensorIcon}>
              <View style={styles.soilBase} />
              <Ionicons name="leaf" size={16} color="#7CB342" style={styles.plantIcon} />
              <View style={styles.sensorDevice} />
            </View>
            <View style={styles.sensorInfo}>
              <Text style={styles.sensorName}>{selectedSensor.name}</Text>
              <Text style={styles.sensorLocation}>
                {selectedSensor.latitude.toFixed(4)}, {selectedSensor.longitude.toFixed(4)}
              </Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: selectedSensor.status === "active" ? "#4CAF50" : "#FF5722" },
              ]}
            />
          </View>

          {selectedSensor.status === "active" && (
            <View style={styles.readingsContainer}>
              <Text style={styles.readingsTitle}>Latest Readings:</Text>
              <View style={styles.readingsGrid}>
                {[
                  { label: "N", value: selectedSensor.lastReading.nitrogen },
                  { label: "P", value: selectedSensor.lastReading.phosphorus },
                  { label: "K", value: selectedSensor.lastReading.potassium },
                  { label: "pH", value: selectedSensor.lastReading.ph },
                  { label: "°C", value: selectedSensor.lastReading.temperature },
                ].map((item) => (
                  <View key={item.label} style={styles.readingItem}>
                    <Text style={styles.readingLabel}>{item.label}</Text>
                    <Text style={styles.readingValue}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  map: { flex: 1 },
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  myLocationButton: {
    position: "absolute",
    top: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  userLocationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  sensorCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  sensorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sensorIcon: {
    width: 50,
    height: 50,
    position: "relative",
    marginRight: 15,
  },
  soilBase: {
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
    height: 20,
    backgroundColor: "#8D6E63",
    borderRadius: 4,
  },
  plantIcon: {
    position: "absolute",
    top: 5,
    left: 17,
  },
  sensorDevice: {
    position: "absolute",
    bottom: 15,
    right: 5,
    width: 8,
    height: 12,
    backgroundColor: "#2196F3",
    borderRadius: 2,
  },
  sensorInfo: { flex: 1 },
  sensorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 4,
  },
  sensorLocation: {
    fontSize: 12,
    color: "#666",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  readingsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 15,
  },
  readingsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: 10,
  },
  readingsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  readingItem: {
    alignItems: "center",
    flex: 1,
  },
  readingLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  readingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
});
