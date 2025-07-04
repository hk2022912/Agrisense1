import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SOIL_TYPES = [
  {
    id: 'loam',
    name: 'Loam',
    description: 'Mixture of sand, silt and clay - ideal balance',
    bestFor: 'Rice, corn, vegetables',
    color: '#8FBC8F',
    characteristics: ['Good drainage', 'Nutrient retention', 'Easy to work with'],
  },
  {
    id: 'clay',
    name: 'Clay',
    description: 'Fine particles, sticky when wet, excellent nutrient retention',
    bestFor: 'Rice, certain fruits',
    color: '#CD853F',
    characteristics: ['High water retention', 'Rich in nutrients', 'Poor drainage'],
  },
  {
    id: 'sandy',
    name: 'Sandy',
    description: 'Large particles, excellent drainage, low water retention',
    bestFor: 'Root crops like carrots, potatoes',
    color: '#F4A460',
    characteristics: ['Fast drainage', 'Easy to work', 'Low nutrient retention'],
  },
  {
    id: 'silty',
    name: 'Silty',
    description: 'Smooth texture, good water retention, fertile',
    bestFor: 'Vegetables, grains',
    color: '#DEB887',
    characteristics: ['Good water retention', 'Fertile', 'Can compact easily'],
  },
];

const NPK_NUTRIENTS = [
  {
    symbol: 'N',
    name: 'NITROGEN',
    description: 'Essential for leaf growth and chlorophyll production',
    lowSigns: 'Yellowing leaves starting from older leaves, stunted growth',
    highSigns: 'Excessive leaf growth, delayed flowering, soft stems',
    color: '#4CAF50',
    sources: ['Compost', 'Chicken manure', 'Urea fertilizer'],
  },
  {
    symbol: 'P',
    name: 'PHOSPHORUS',
    description: 'Critical for root development and flowering',
    lowSigns: 'Poor root development, delayed maturity, purple leaves',
    highSigns: 'Can reduce zinc and iron uptake, environmental concerns',
    color: '#FF9800',
    sources: ['Bone meal', 'Rock phosphate', 'Superphosphate'],
  },
  {
    symbol: 'K',
    name: 'POTASSIUM',
    description: 'Strengthens disease resistance and water regulation',
    lowSigns: 'Brown leaf edges, weak stems, poor disease resistance',
    highSigns: 'Can affect magnesium and calcium uptake',
    color: '#9C27B0',
    sources: ['Wood ash', 'Kelp meal', 'Potassium sulfate'],
  },
];

const COLORS = {
  primary: '#4A6B3E',
  secondary: '#81C784',
  background: '#E3FFCE',
  cardBackground: '#fff',
  textPrimary: '#333',
  textSecondary: '#666',
  white: '#fff',
  shadow: '#000',
};

const SoilGuideApp = () => {
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(null);
  const [phValue, setPhValue] = useState(7.0);
  const [selectedSoilType, setSelectedSoilType] = useState(null);

  const phData = useMemo(() => {
    if (phValue < 6.0)
      return {
        level: 'Acidic',
        color: '#FF5722',
        recommendation: 'Add lime or wood ash to raise pH',
        crops: 'Blueberries, potatoes, sweet potatoes',
      };
    if (phValue < 7.0)
      return {
        level: 'Slightly Acidic',
        color: '#FF9800',
        recommendation: 'Good for most crops, consider light liming',
        crops: 'Most vegetables, corn, soybeans',
      };
    if (phValue < 8.0)
      return {
        level: 'Neutral to Alkaline',
        color: '#4CAF50',
        recommendation: 'Ideal for most plants',
        crops: 'Most crops thrive in this range',
      };
    return {
      level: 'Alkaline',
      color: '#2196F3',
      recommendation: 'Add sulfur or organic matter to lower pH',
      crops: 'Asparagus, cabbage, some herbs',
    };
  }, [phValue]);

  const toggleSection = useCallback((section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  }, []);

  const handleSoilTypeSelect = useCallback((soilId) => {
    setSelectedSoilType((prev) => (prev === soilId ? null : soilId));
  }, []);

  const handlePhValueChange = useCallback((value) => {
    setPhValue(value);
  }, []);

  const renderSoilTypeCard = useCallback(
    (soil) => (
      <TouchableOpacity
        key={soil.id}
        style={[
          styles.soilTypeCard,
          { backgroundColor: soil.color },
          selectedSoilType === soil.id && styles.selectedSoilType,
        ]}
        onPress={() => handleSoilTypeSelect(soil.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.soilTypeName}>{soil.name}</Text>
        <Text style={styles.soilTypeDescription}>{soil.description}</Text>
        <Text style={styles.soilTypeBestFor}>Best for: {soil.bestFor}</Text>
        {selectedSoilType === soil.id && (
          <View style={styles.soilCharacteristics}>
            <Text style={styles.characteristicsTitle}>Characteristics:</Text>
            {soil.characteristics.map((char, index) => (
              <Text key={index} style={styles.characteristicItem}>
                • {char}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    ),
    [selectedSoilType, handleSoilTypeSelect]
  );

  const renderNPKCard = useCallback(
    (nutrient) => (
      <View key={nutrient.symbol} style={[styles.npkCard, { borderColor: nutrient.color }]}>
        <View style={[styles.npkSymbol, { backgroundColor: nutrient.color }]}>
          <Text style={styles.npkSymbolText}>{nutrient.symbol}</Text>
        </View>
        <Text style={styles.npkName}>{nutrient.name}</Text>
        <Text style={styles.npkDescription}>{nutrient.description}</Text>
        <View style={styles.npkDetails}>
          <Text style={styles.npkSigns}>Low: {nutrient.lowSigns}</Text>
          <Text style={styles.npkSigns}>High: {nutrient.highSigns}</Text>
          <Text style={styles.npkSources}>Sources: {nutrient.sources.join(', ')}</Text>
        </View>
      </View>
    ),
    []
  );

  const renderCollapsibleSection = useCallback(
    (sectionKey, title, icon, content) => (
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(sectionKey)}
          activeOpacity={0.8}
        >
          {icon && <Ionicons name={icon} size={20} color={COLORS.white} />}
          <Text style={styles.sectionTitle}>{title}</Text>
          <Ionicons
            name={expandedSection === sectionKey ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
        {expandedSection === sectionKey && content}
      </View>
    ),
    [expandedSection, toggleSection]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Soil Guide for Farmers</Text>
        <Image
          source={require('../../../images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* What is Soil Health */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color={COLORS.white} />
            <Text style={styles.sectionTitle}>What is Soil Health?</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Soil health refers to the continued capacity of soil to function as a vital living ecosystem. 
              Healthy soil supports plant growth, maintains water quality, and provides habitat for countless organisms. 
              Understanding your soil's condition is crucial for successful farming and sustainable agriculture.
            </Text>
            <View style={styles.healthIndicators}>
              <Text style={styles.cardSubtitle}>Key Indicators:</Text>
              <Text style={styles.bulletPoint}>• Rich, dark color with earthy smell</Text>
              <Text style={styles.bulletPoint}>• Good water infiltration and retention</Text>
              <Text style={styles.bulletPoint}>• Presence of earthworms and beneficial microorganisms</Text>
              <Text style={styles.bulletPoint}>• Proper pH balance (6.0-7.0 for most crops)</Text>
            </View>
          </View>
        </View>

        {/* Explore Soil Types */}
        {renderCollapsibleSection('soilTypes', 'Explore Soil Types', 'search', (
          <View style={styles.soilTypesGrid}>
            {SOIL_TYPES.map(renderSoilTypeCard)}
          </View>
        ))}

        {/* NPK Nutrients */}
        {renderCollapsibleSection('npk', 'Understanding NPK Nutrients', 'flask', (
          <View style={styles.npkContainer}>
            {NPK_NUTRIENTS.map(renderNPKCard)}
          </View>
        ))}

        {/* pH Simulator */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="speedometer" size={20} color={COLORS.white} />
            <Text style={styles.sectionTitle}>Soil pH Simulator</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.phTitle}>Adjust the slider to explore different pH levels:</Text>
            <View style={styles.phSliderContainer}>
              <Slider
                style={styles.phSlider}
                minimumValue={4.0}
                maximumValue={10.0}
                value={phValue}
                onValueChange={handlePhValueChange}
                minimumTrackTintColor={phData.color}
                maximumTrackTintColor="#ddd"
                thumbTintColor={phData.color}
                step={0.1}
                accessibilityLabel="pH level slider"
              />
              <View style={styles.phLabels}>
                <Text style={styles.phLabel}>4.0 (Very Acidic)</Text>
                <Text style={styles.phLabel}>7.0 (Neutral)</Text>
                <Text style={styles.phLabel}>10.0 (Very Alkaline)</Text>
              </View>
              <View style={styles.phValueContainer}>
                <Text style={[styles.phValue, { color: phData.color }]}>
                  pH: {phValue.toFixed(1)} - {phData.level}
                </Text>
              </View>
            </View>
            <View style={styles.phInfo}>
              <Text style={styles.phRecommendation}>
                Recommendation: {phData.recommendation}
              </Text>
              <Text style={styles.phCrops}>
                Suitable crops: {phData.crops}
              </Text>
            </View>
          </View>
        </View>

        {/* Improving Soil Fertility */}
        {renderCollapsibleSection('fertility', 'Improving Soil Fertility', 'trending-up', (
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Natural Methods to Boost Soil Health:</Text>
            <View style={styles.improvementMethods}>
              <View style={styles.methodCard}>
                <Text style={styles.methodTitle}>Organic Matter</Text>
                <Text style={styles.methodDescription}>Add compost, rice hulls, or aged manure to improve soil structure and fertility</Text>
              </View>
              <View style={styles.methodCard}>
                <Text style={styles.methodTitle}>Crop Rotation</Text>
                <Text style={styles.methodDescription}>Alternate crops to prevent nutrient depletion and break pest cycles</Text>
              </View>
              <View style={styles.methodCard}>
                <Text style={styles.methodTitle}>Cover Crops</Text>
                <Text style={styles.methodDescription}>Plant mung beans or other legumes to add nitrogen and prevent erosion</Text>
              </View>
              <View style={styles.methodCard}>
                <Text style={styles.methodTitle}>Mulching</Text>
                <Text style={styles.methodDescription}>Apply organic mulch to retain moisture and gradually add nutrients</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Monitoring Tips */}
        {renderCollapsibleSection('monitoring', 'Monitoring & Testing Tips', 'analytics', (
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Regular Monitoring Schedule:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Test soil pH annually or after major amendments</Text>
              <Text style={styles.bulletPoint}>• Check moisture levels weekly during growing season</Text>
              <Text style={styles.bulletPoint}>• Observe plant health regularly for nutrient deficiency signs</Text>
              <Text style={styles.bulletPoint}>• Monitor after heavy rains or irrigation</Text>
              <Text style={styles.bulletPoint}>• Keep records of soil tests and crop performance</Text>
              <Text style={styles.bulletPoint}>• Set up alerts for critical pH or nutrient levels</Text>
            </View>
          </View>
        ))}

        {/* Best Practices */}
        {renderCollapsibleSection('practices', 'Best Practices', 'checkmark-circle', (
          <View style={styles.card}>
            <Text style={styles.cardSubtitle}>Essential Farming Practices:</Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletPoint}>• Always test soil before planting new crops</Text>
              <Text style={styles.bulletPoint}>• Avoid over-tilling to preserve soil structure</Text>
              <Text style={styles.bulletPoint}>• Add compost after each harvest to restore nutrients</Text>
              <Text style={styles.bulletPoint}>• Act quickly on nutrient deficiency signs (yellowing, purpling leaves)</Text>
              <Text style={styles.bulletPoint}>• Allow soil to rest with cover crops when exhausted</Text>
              <Text style={styles.bulletPoint}>• Maintain proper drainage to prevent waterlogging</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
    }),
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  logo: {
    width: 32,
    height: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionHeader: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    padding: 18,
    borderRadius: 12,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  healthIndicators: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  soilTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  soilTypeCard: {
    width: (width - 48) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedSoilType: {
    borderWidth: 3,
    borderColor: COLORS.primary,
    transform: [{ scale: 1.02 }],
  },
  soilTypeName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
    marginBottom: 6,
  },
  soilTypeDescription: {
    fontSize: 13,
    color: COLORS.white,
    marginBottom: 8,
    opacity: 0.9,
  },
  soilTypeBestFor: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '600',
  },
  soilCharacteristics: {
    marginTop: 12,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
  },
  characteristicsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
    marginBottom: 4,
  },
  characteristicItem: {
    fontSize: 11,
    color: COLORS.white,
    marginBottom: 2,
  },
  npkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  npkCard: {
    backgroundColor: COLORS.cardBackground,
    width: (width - 48) / 3 - 4,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  npkSymbol: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  npkSymbolText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
  npkName: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: COLORS.textPrimary,
  },
  npkDescription: {
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 8,
    color: COLORS.textSecondary,
    lineHeight: 12,
  },
  npkDetails: {
    marginTop: 4,
  },
  npkSigns: {
    fontSize: 8,
    color: COLORS.textSecondary,
    marginBottom: 3,
    lineHeight: 10,
  },
  npkSources: {
    fontSize: 8,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 4,
    lineHeight: 10,
  },
  phSliderContainer: {
    marginVertical: 20,
  },
  phSlider: {
    width: '100%',
    height: 44,
  },
  phLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  phLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  phValueContainer: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  phValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  phTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.textPrimary,
  },
  phInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  phRecommendation: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
  },
  phCrops: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  improvementMethods: {
    marginTop: 8,
  },
  methodCard: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeft: 4,
    borderLeftColor: COLORS.primary,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default SoilGuideApp;