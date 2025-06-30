import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const screenWidth = Dimensions.get('window').width;

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        data: [65, 58, 62, 75, 30, 70],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#ff6384',
    },
  };

  const healthData = [
    { label: 'NITROGEN', value: '30%', status: 'Immediate Action Needed', color: '#E53935' },
    { label: 'POTASSIUM', value: '55%', status: 'Needs Attention', color: '#F9A825' },
    { label: 'PHOSPHORUS', value: '80%', status: 'Good', color: '#43A047' },
    { label: 'PH LEVEL', value: '80%', status: 'Good', color: '#43A047' },
    { label: 'TEMPERATURE', value: '20°C', status: 'Good', color: '#43A047' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <Text style={styles.sectionTitle}>Plant Vital Stats</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Soil Health Status */}
      <Text style={styles.sectionTitle}>Soil Health Status</Text>
      {healthData.map((item, index) => (
        <View key={index} style={styles.healthBox}>
          <Text style={styles.healthLabel}>{item.label}</Text>
          <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
            <Text style={styles.statusValue}>{item.value}</Text>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      ))}

      {/* Bottom Nav Buttons */}
            <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
            <Ionicons name="location-outline" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SoilLog')}>
            <Ionicons name="time-outline" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Guide')}>
            <Ionicons name="book-outline" size={26} color="#2E7D32" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={26} color="#2E7D32" />
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#F1F8E9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 10,
    marginTop: 15,
  },
  chart: {
    borderRadius: 12,
    marginBottom: 20,
  },
  healthBox: {
    backgroundColor: '#DCEDC8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  healthLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2E7D32',
  },
  statusBadge: {
    padding: 10,
    borderRadius: 8,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C5E1A5',
    padding: 10,
    borderRadius: 16,
    marginTop: 20,
  },
});
