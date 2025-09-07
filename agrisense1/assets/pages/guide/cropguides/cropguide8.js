"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Translation data for climate and crop suitability guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Climate & Crop Suitability",
    progressTitle: "Your Progress",
    complete: "Complete",
    steps: [
      { title: "Why Climate Matching Matters", emoji: "🌡️" },
      { title: "Main Climate Factors", emoji: "☀️" },
      { title: "Assessing Crop-Climate Match", emoji: "📊" },
      { title: "Regional Crop Examples", emoji: "🌍" },
      { title: "Adapting to Climate Challenges", emoji: "🛠️" },
      { title: "Beginner’s Action Steps", emoji: "🚀" },
    ],
    stepContent: {
      whyMatters: {
        title: "Why Matching Crops to Climate Is Important",
        subtitle: "Work with nature, not against it",
        description:
          "Each crop grows best under certain conditions like temperature, rainfall, and humidity. When you match the right crop to your climate, it can:",
        benefits: [
          "Increase harvests by 25–70%",
          "Lower the chance of crop failure",
          "Reduce costs for fertilizer, water, and pest control",
          "Make farming more sustainable and profitable",
        ],
        studyTitle: "Research Evidence:",
        studyText:
          "A 2025 study using the TOPSIS model showed that matching crops with local microclimates improved productivity by 40% in dry areas.",
        source: "Source: Bakhoda et al., 2025 – Environmental & Sustainability Indicators (ScienceDirect)",
        button: "Learn Climate Factors",
      },
      climateFactors: {
        title: "Main Climate Factors That Affect Crops",
        subtitle: "Understanding what crops need to thrive",
        description: "Different climate factors control how well crops grow and produce:",
        factors: [
          {
            factor: "Temperature",
            effect: "Controls crop growth and timing",
            examples: "Rice grows best at 20–35°C; wheat at 15–25°C",
            icon: "thermometer-outline",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            factor: "Rainfall",
            effect: "Affects soil moisture and flowering",
            examples: "Maize needs 400–800 mm; cassava needs less",
            icon: "rainy-outline",
            color: "#2563EB",
            bgColor: "#DBEAFE",
          },
          {
            factor: "Humidity",
            effect: "Influences disease risk and pollination",
            examples: "Low humidity helps reduce fungus in legumes",
            icon: "water-outline",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
          {
            factor: "Sunlight",
            effect: "Controls flowering and fruiting",
            examples: "Onion and soy are sensitive to sunlight hours",
            icon: "sunny-outline",
            color: "#D97706",
            bgColor: "#FED7AA",
          },
          {
            factor: "Wind",
            effect: "Can damage plants or dry out soil",
            examples: "Use windbreaks or hedges for protection",
            icon: "leaf-outline",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
        ],
        tip: "Tip: Use crop calendars to plan the best times to plant and harvest.",
        button: "Assess Crop Match",
      },
      assessment: {
        title: "How to Know If a Crop Matches Your Climate",
        subtitle: "Tools and methods for climate assessment",
        description: "There are different approaches depending on your experience level:",
        beginnerTitle: "For Beginners:",
        beginnerMethods: [
          "Use maps from your local agriculture office",
          "Try free online tools (from ICAR, FAO, or apps)",
          "Check satellite-based weather data (like CHIRPS or AgERA5)",
          "Consult with local extension officers",
        ],
        advancedTitle: "For Advanced Users:",
        advancedMethods: [
          "Use tools like TOPSIS for multi-criteria analysis",
          "Apply GIS overlays for spatial climate mapping",
          "Use machine learning to compare climate data with crop needs",
          "Analyze historical weather patterns and crop yields",
        ],
        source: "Source: Liu et al., 2025 – Environmental Earth Sciences (Springer)",
        button: "See Regional Examples",
      },
      regionalExamples: {
        title: "Examples of Crops That Suit Different Areas",
        subtitle: "Regional crop recommendations based on climate",
        description: "Different regions favor different crops based on their climate conditions:",
        regions: [
          {
            region: "Humid Tropics",
            bestCrops: ["Banana", "Taro", "Ginger", "Coconut"],
            notRecommended: ["Wheat", "Barley", "Apple"],
            color: "#16A34A",
            bgColor: "#DCFCE7",
            icon: "leaf-outline",
          },
          {
            region: "Semi-arid Areas",
            bestCrops: ["Millet", "Pigeon Pea", "Sorghum", "Groundnut"],
            notRecommended: ["Lettuce", "Spinach", "Cabbage"],
            color: "#D97706",
            bgColor: "#FED7AA",
            icon: "sunny-outline",
          },
          {
            region: "Highlands",
            bestCrops: ["Potato", "Cabbage", "Carrot", "Beans"],
            notRecommended: ["Rice (paddy)", "Cotton", "Sugarcane"],
            color: "#7C3AED",
            bgColor: "#EDE9FE",
            icon: "triangle-outline",
          },
          {
            region: "Coastal Zones",
            bestCrops: ["Coconut", "Rice", "Mango", "Cashew"],
            notRecommended: ["Chickpea", "Groundnut", "Wheat"],
            color: "#0891B2",
            bgColor: "#CFFAFE",
            icon: "water-outline",
          },
        ],
        source: "Source: Abuzaid et al., 2025 – PLOS One: Crop Suitability in Arid Lands",
        button: "Learn Adaptation Methods",
      },
      adaptation: {
        title: "How to Adapt to Climate Challenges",
        subtitle: "Strategies for climate resilience",
        description: "When climate conditions aren't perfect, you can adapt using these methods:",
        strategies: [
          {
            strategy: "Improved Crop Varieties",
            description: "Use drought-tolerant maize or flood-tolerant rice",
            icon: "leaf-outline",
            color: "#16A34A",
          },
          {
            strategy: "Simple Tools",
            description: "Shade nets, wind barriers, or raised beds",
            icon: "construct-outline",
            color: "#D97706",
          },
          {
            strategy: "Timing Adjustments",
            description: "Change planting dates based on weather forecasts",
            icon: "time-outline",
            color: "#2563EB",
          },
          {
            strategy: "Microclimate Management",
            description: "Plant trees or cover crops to control soil temperature and moisture",
            icon: "flower-outline",
            color: "#16A34A",
          },
        ],
        source: "Source: Zha & Zhang, 2025 – Frontiers in Plant Science",
        button: "Get Action Plan",
      },
      actionPlan: {
        title: "Beginner Action Plan",
        subtitle: "Steps to start climate-smart farming",
        description: "Follow these steps to match crops with your climate:",
        steps: [
          "Find your agroclimatic zone using local maps or apps",
          "Make a list of crops that grow well in your zone",
          "Test a few climate-resistant varieties",
          "Adjust planting time based on weather forecasts",
          "Keep a seasonal journal of climate and crop results",
          "Connect with local farmers for practical advice",
        ],
        reminder: "Reminder:",
        reminderText: '"Don\'t fight the climate—farm with it."',
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand how to match crops with your climate! Your farming will be more productive and sustainable.",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Klima at Crop Suitability",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    steps: [
      { title: "Bakit Mahalaga ang Climate Matching", emoji: "🌡️" },
      { title: "Mga Pangunahing Climate Factors", emoji: "☀️" },
      { title: "Pag-assess ng Crop-Climate Match", emoji: "📊" },
      { title: "Mga Halimbawa ng Regional Crops", emoji: "🌍" },
      { title: "Pag-adapt sa Climate Challenges", emoji: "🛠️" },
      { title: "Mga Hakbang para sa mga Nagsisimula", emoji: "🚀" },
    ],
    stepContent: {
      whyMatters: {
        title: "Bakit Mahalaga ang Pagdopat ng Crops sa Climate",
        subtitle: "Makipagtulungan sa kalikasan, hindi makipaglaban",
        description:
          "Ang bawat pananim ay lumalaki nang pinakamahusay sa ilalim ng mga tiyak na kondisyon tulad ng temperatura, ulan, at humidity. Kapag itinugma ninyo ang tamang pananim sa inyong klima, maaari itong:",
        benefits: [
          "Taasan ang ani ng 25–70%",
          "Bawasan ang pagkakataon ng pagkabagsak ng pananim",
          "Bawasan ang gastos para sa fertilizer, tubig, at pest control",
          "Gawing mas sustainable at profitable ang pagsasaka",
        ],
        studyTitle: "Katunayan ng Pananaliksik:",
        studyText:
          "Ang 2025 study na gumagamit ng TOPSIS model ay nagpakita na ang pagtugma ng mga pananim sa local microclimates ay nagpabuti ng productivity ng 40% sa mga tuyong lugar.",
        source: "Source: Bakhoda et al., 2025 – Environmental & Sustainability Indicators (ScienceDirect)",
        button: "Matuto ng Climate Factors",
      },
      climateFactors: {
        title: "Mga Pangunahing Climate Factors na Nakakaapekto sa Crops",
        subtitle: "Pag-unawa sa kailangan ng mga pananim para lumago",
        description:
          "Ang iba't ibang climate factors ay kumokontrol sa kung gaano kahusay lumalaki at nag-produce ang mga pananim:",
        factors: [
          {
            factor: "Temperatura",
            effect: "Kumokontrol sa paglaki at timing ng pananim",
            examples: "Ang bigas ay lumalaki nang pinakamahusay sa 20–35°C; trigo sa 15–25°C",
            icon: "thermometer-outline",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            factor: "Ulan",
            effect: "Nakakaapekto sa soil moisture at pamumulaklak",
            examples: "Ang mais ay kailangan ng 400–800 mm; kamote ay mas kaunti",
            icon: "rainy-outline",
            color: "#2563EB",
            bgColor: "#DBEAFE",
          },
          {
            factor: "Humidity",
            effect: "Nakakaimpluwensya sa disease risk at pollination",
            examples: "Ang mababang humidity ay nakakatulong na bawasan ang fungus sa legumes",
            icon: "water-outline",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
          {
            factor: "Sikat ng Araw",
            effect: "Kumokontrol sa pamumulaklak at pagbubunga",
            examples: "Ang sibuyas at soy ay sensitive sa oras ng sikat ng araw",
            icon: "sunny-outline",
            color: "#D97706",
            bgColor: "#FED7AA",
          },
          {
            factor: "Hangin",
            effect: "Maaaring masira ang halaman o matuyo ang lupa",
            examples: "Gumamit ng windbreaks o hedges para sa proteksyon",
            icon: "leaf-outline",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
        ],
        tip: "Tip: Gumamit ng crop calendars para magplano ng pinakamahusay na oras para magtanim at mag-ani.",
        button: "I-assess ang Crop Match",
      },
      assessment: {
        title: "Paano Malaman Kung Tumugma ang Pananim sa Inyong Klima",
        subtitle: "Mga tools at paraan para sa climate assessment",
        description: "May iba't ibang approach depende sa inyong experience level:",
        beginnerTitle: "Para sa mga Nagsisimula:",
        beginnerMethods: [
          "Gumamit ng mga mapa mula sa inyong local agriculture office",
          "Subukan ang mga libreng online tools (mula sa ICAR, FAO, o apps)",
          "Suriin ang satellite-based weather data (tulad ng CHIRPS o AgERA5)",
          "Makipag-consult sa mga local extension officers",
        ],
        advancedTitle: "Para sa mga Advanced Users:",
        advancedMethods: [
          "Gumamit ng mga tools tulad ng TOPSIS para sa multi-criteria analysis",
          "Mag-apply ng GIS overlays para sa spatial climate mapping",
          "Gumamit ng machine learning para ihambing ang climate data sa crop needs",
          "I-analyze ang historical weather patterns at crop yields",
        ],
        source: "Source: Liu et al., 2025 – Environmental Earth Sciences (Springer)",
        button: "Tingnan ang Regional Examples",
      },
      regionalExamples: {
        title: "Mga Halimbawa ng Crops na Bagay sa Iba't ibang Lugar",
        subtitle: "Mga regional crop recommendations base sa klima",
        description: "Ang iba't ibang rehiyon ay pabor sa iba't ibang pananim base sa kanilang climate conditions:",
        regions: [
          {
            region: "Humid Tropics",
            bestCrops: ["Saging", "Gabi", "Luya", "Niyog"],
            notRecommended: ["Trigo", "Barley", "Mansanas"],
            color: "#16A34A",
            bgColor: "#DCFCE7",
            icon: "leaf-outline",
          },
          {
            region: "Semi-arid Areas",
            bestCrops: ["Millet", "Pigeon Pea", "Sorghum", "Mani"],
            notRecommended: ["Lettuce", "Spinach", "Repolyo"],
            color: "#D97706",
            bgColor: "#FED7AA",
            icon: "sunny-outline",
          },
          {
            region: "Highlands",
            bestCrops: ["Patatas", "Repolyo", "Karot", "Sitaw"],
            notRecommended: ["Bigas (paddy)", "Cotton", "Tubo"],
            color: "#7C3AED",
            bgColor: "#EDE9FE",
            icon: "triangle-outline",
          },
          {
            region: "Coastal Zones",
            bestCrops: ["Niyog", "Bigas", "Mangga", "Kasoy"],
            notRecommended: ["Chickpea", "Mani", "Trigo"],
            color: "#0891B2",
            bgColor: "#CFFAFE",
            icon: "water-outline",
          },
        ],
        source: "Source: Abuzaid et al., 2025 – PLOS One: Crop Suitability in Arid Lands",
        button: "Matuto ng Adaptation Methods",
      },
      adaptation: {
        title: "Paano Mag-adapt sa Climate Challenges",
        subtitle: "Mga estratehiya para sa climate resilience",
        description: "Kapag hindi perpekto ang climate conditions, maaari kayong mag-adapt gamit ang mga paraang ito:",
        strategies: [
          {
            strategy: "Improved Crop Varieties",
            description: "Gumamit ng drought-tolerant na mais o flood-tolerant na bigas",
            icon: "leaf-outline",
            color: "#16A34A",
          },
          {
            strategy: "Simpleng Tools",
            description: "Shade nets, wind barriers, o raised beds",
            icon: "construct-outline",
            color: "#D97706",
          },
          {
            strategy: "Timing Adjustments",
            description: "Baguhin ang planting dates base sa weather forecasts",
            icon: "time-outline",
            color: "#2563EB",
          },
          {
            strategy: "Microclimate Management",
            description: "Magtanim ng mga puno o cover crops para kontrolin ang soil temperature at moisture",
            icon: "flower-outline",
            color: "#16A34A",
          },
        ],
        source: "Source: Zha & Zhang, 2025 – Frontiers in Plant Science",
        button: "Kunin ang Action Plan",
      },
      actionPlan: {
        title: "Action Plan para sa Nagsisimula",
        subtitle: "Mga hakbang para magsimula ng climate-smart farming",
        description: "Sundin ang mga hakbang na ito para itugma ang mga pananim sa inyong klima:",
        steps: [
          "Hanapin ang inyong agroclimatic zone gamit ang local maps o apps",
          "Gumawa ng listahan ng mga pananim na lumalaki nang mahusay sa inyong zone",
          "Subukan ang ilang climate-resistant varieties",
          "I-adjust ang planting time base sa weather forecasts",
          "Mag-keep ng seasonal journal ng klima at crop results",
          "Makipag-connect sa mga local farmers para sa practical advice",
        ],
        reminder: "Paalala:",
        reminderText: '"Huwag makipaglaban sa klima—makipagtulungan dito."',
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon kung paano itugma ang mga pananim sa inyong klima! Magiging mas productive at sustainable ang inyong pagsasaka.",
      completionButton: "Napakahusay!",
    },
  },
}

// Language Toggle Component
const LanguageToggle = ({ currentLanguage, onLanguageChange }) => (
  <View style={styles.languageToggle}>
    <TouchableOpacity
      style={[styles.languageButton, currentLanguage === "en" && styles.activeLanguageButton]}
      onPress={() => onLanguageChange("en")}
    >
      <Text style={[styles.languageButtonText, currentLanguage === "en" && styles.activeLanguageButtonText]}>EN</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.languageButton, currentLanguage === "tl" && styles.activeLanguageButton]}
      onPress={() => onLanguageChange("tl")}
    >
      <Text style={[styles.languageButtonText, currentLanguage === "tl" && styles.activeLanguageButtonText]}>TL</Text>
    </TouchableOpacity>
  </View>
)

const ProgressBar = ({ progress, completedSteps, totalSteps, t }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressTitle}>{t.progressTitle}</Text>
      <View style={styles.progressBadge}>
        <Text style={styles.progressBadgeText}>
          {completedSteps}/{totalSteps} {t.complete}
        </Text>
      </View>
    </View>
    <View style={styles.progressBar}>
      <Animated.View style={[styles.progressFill, { width: `${progress}%` }]} />
    </View>
  </View>
)

const StepNavigation = ({ steps, currentStep, completedSteps, onStepPress }) => (
  <View style={styles.stepNavigation}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {steps.map((step, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.stepTab,
            currentStep === index && styles.activeStepTab,
            completedSteps.includes(index) && styles.completedStepTab,
          ]}
          onPress={() => onStepPress(index)}
        >
          {completedSteps.includes(index) && (
            <Ionicons name="checkmark-circle" size={16} color="#16A34A" style={{ marginRight: 4 }} />
          )}
          <Text
            style={[
              styles.stepTabText,
              currentStep === index && styles.activeStepTabText,
              completedSteps.includes(index) && styles.completedStepTabText,
            ]}
          >
            {step.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function ClimateCropGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [progressAnim] = useState(new Animated.Value(0))
  const [isNavigating, setIsNavigating] = useState(false)
  const [language, setLanguage] = useState("en")
  const t = TRANSLATIONS[language]

  const handleStepComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      const newCompletedSteps = [...completedSteps, stepIndex]
      setCompletedSteps(newCompletedSteps)

      Animated.timing(progressAnim, {
        toValue: (newCompletedSteps.length / t.steps.length) * 100,
        duration: 600,
        useNativeDriver: false,
      }).start()

      setIsNavigating(true)
      setTimeout(() => {
        if (stepIndex < t.steps.length - 1) {
          setCurrentStep(stepIndex + 1)
        } else {
          setShowCompletionModal(true)
        }
        setIsNavigating(false)
      }, 800)
    }
  }

  const renderWhyMattersStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.whyMatters.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.whyMatters.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.whyMatters.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whyMatters.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.studyCard}>
        <Text style={styles.studyTitle}>{t.stepContent.whyMatters.studyTitle}</Text>
        <Text style={styles.studyText}>{t.stepContent.whyMatters.studyText}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.whyMatters.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyMatters.button}
      </CompleteButton>
    </View>
  )

  const renderClimateFactorsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.climateFactors.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.climateFactors.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.climateFactors.description}</Text>

      <View style={styles.factorsContainer}>
        {t.stepContent.climateFactors.factors.map((factor, index) => (
          <View key={index} style={[styles.factorCard, { backgroundColor: factor.bgColor }]}>
            <View style={styles.factorHeader}>
              <View style={[styles.factorIconContainer, { backgroundColor: factor.color }]}>
                <Ionicons name={factor.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.factorName}>{factor.factor}</Text>
            </View>
            <View style={styles.factorContent}>
              <Text style={styles.factorEffect}>{factor.effect}</Text>
              <Text style={styles.factorExamples}>{factor.examples}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <Text style={styles.tipText}>{t.stepContent.climateFactors.tip}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.climateFactors.button}
      </CompleteButton>
    </View>
  )

  const renderAssessmentStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.assessment.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.assessment.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.assessment.description}</Text>

      <View style={styles.methodsSection}>
        <Text style={styles.methodsTitle}>{t.stepContent.assessment.beginnerTitle}</Text>
        <View style={styles.methodsCard}>
          {t.stepContent.assessment.beginnerMethods.map((method, index) => (
            <View key={index} style={styles.methodItem}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text style={styles.methodText}>{method}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.methodsSection}>
        <Text style={styles.methodsTitle}>{t.stepContent.assessment.advancedTitle}</Text>
        <View style={styles.advancedMethodsCard}>
          {t.stepContent.assessment.advancedMethods.map((method, index) => (
            <View key={index} style={styles.methodItem}>
              <Ionicons name="analytics-outline" size={18} color="#7C3AED" />
              <Text style={styles.advancedMethodText}>{method}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.assessment.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.assessment.button}
      </CompleteButton>
    </View>
  )

  const renderRegionalExamplesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.regionalExamples.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.regionalExamples.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.regionalExamples.description}</Text>

      <View style={styles.regionsContainer}>
        {t.stepContent.regionalExamples.regions.map((region, index) => (
          <View key={index} style={[styles.regionCard, { backgroundColor: region.bgColor }]}>
            <View style={styles.regionHeader}>
              <View style={[styles.regionIconContainer, { backgroundColor: region.color }]}>
                <Ionicons name={region.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.regionName}>{region.region}</Text>
            </View>
            <View style={styles.regionContent}>
              <View style={styles.cropsSection}>
                <Text style={styles.cropsLabel}>Best Crops:</Text>
                <View style={styles.cropsContainer}>
                  {region.bestCrops.map((crop, cropIndex) => (
                    <View key={cropIndex} style={[styles.cropTag, { backgroundColor: region.color }]}>
                      <Text style={styles.cropTagText}>{crop}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.cropsSection}>
                <Text style={styles.notRecommendedLabel}>Not Recommended:</Text>
                <View style={styles.cropsContainer}>
                  {region.notRecommended.map((crop, cropIndex) => (
                    <View key={cropIndex} style={styles.notRecommendedTag}>
                      <Text style={styles.notRecommendedTagText}>{crop}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.regionalExamples.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.regionalExamples.button}
      </CompleteButton>
    </View>
  )

  const renderAdaptationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.adaptation.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.adaptation.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.adaptation.description}</Text>

      <View style={styles.strategiesContainer}>
        {t.stepContent.adaptation.strategies.map((strategy, index) => (
          <View key={index} style={styles.strategyCard}>
            <View style={[styles.strategyIconContainer, { backgroundColor: strategy.color }]}>
              <Ionicons name={strategy.icon} size={24} color="#fff" />
            </View>
            <View style={styles.strategyContent}>
              <Text style={styles.strategyTitle}>{strategy.strategy}</Text>
              <Text style={styles.strategyDescription}>{strategy.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.adaptation.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.adaptation.button}
      </CompleteButton>
    </View>
  )

  const renderActionPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionPlan.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.actionPlan.description}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.actionPlan.steps.map((step, index) => (
          <View key={index} style={styles.actionStepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.actionStepContent}>
              <Text style={styles.actionStepText}>{step}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTitle}>{t.stepContent.actionPlan.reminder}</Text>
        <Text style={styles.reminderText}>{t.stepContent.actionPlan.reminderText}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.actionPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyMattersStep,
      renderClimateFactorsStep,
      renderAssessmentStep,
      renderRegionalExamplesStep,
      renderAdaptationStep,
      renderActionPlanStep,
    ]
    return steps[currentStep]?.() || null
  }

  const progress = (completedSteps.length / t.steps.length) * 100

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0FDF4" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.headerTitle}</Text>
        <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProgressBar progress={progress} completedSteps={completedSteps.length} totalSteps={t.steps.length} t={t} />
        <StepNavigation
          steps={t.steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepPress={setCurrentStep}
        />
        {renderStepContent()}
      </ScrollView>

      {/* Completion Modal */}
      <Modal
        visible={showCompletionModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowCompletionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.completionModal}>
            <View style={styles.completionIconContainer}>
              <Ionicons name="thermometer-outline" size={48} color="#16A34A" />
            </View>
            <Text style={styles.completionTitle}>{t.modal.completionTitle}</Text>
            <Text style={styles.completionText}>{t.modal.completionText}</Text>
            <TouchableOpacity
              style={styles.completionButton}
              onPress={() => setShowCompletionModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.completionButtonText}>{t.modal.completionButton}</Text>
              <Ionicons name="checkmark" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3FFCE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#E3FFCE",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4A6B3E",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A6B3E",
    justifyContent: "center",
    alignItems: "center",
  },
  languageToggle: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    minWidth: 45,
    justifyContent: "center",
  },
  activeLanguageButton: {
    backgroundColor: "#4A6B3E",
  },
  languageButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginLeft: 2,
  },
  activeLanguageButtonText: {
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  progressContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16A34A",
  },
  progressBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressBadgeText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 5,
  },
  stepNavigation: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  stepTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    minWidth: 140,
  },
  activeStepTab: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  completedStepTab: {
    backgroundColor: "#DCFCE7",
    borderColor: "#16A34A",
  },
  stepTabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  activeStepTabText: {
    color: "#fff",
  },
  completedStepTabText: {
    color: "#16A34A",
  },
  stepContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#16A34A",
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 20,
  },
  benefitsCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 15,
    color: "#16A34A",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  studyCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  studyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
  },
  studyText: {
    fontSize: 15,
    color: "#1E40AF",
    lineHeight: 22,
  },
  sourcesCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sources: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
  },
  factorsContainer: {
    marginBottom: 24,
  },
  factorCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  factorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  factorIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  factorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  factorContent: {
    marginLeft: 52,
  },
  factorEffect: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 8,
    fontWeight: "500",
  },
  factorExamples: {
    fontSize: 14,
    color: "#16A34A",
    fontStyle: "italic",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
  },
  tipText: {
    fontSize: 15,
    color: "#D97706",
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
    fontStyle: "italic",
  },
  methodsSection: {
    marginBottom: 24,
  },
  methodsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
  },
  methodsCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  advancedMethodsCard: {
    backgroundColor: "#F5F3FF",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  methodText: {
    fontSize: 15,
    color: "#16A34A",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  advancedMethodText: {
    fontSize: 15,
    color: "#7C3AED",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  regionsContainer: {
    marginBottom: 24,
  },
  regionCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  regionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  regionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  regionName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  regionContent: {
    marginLeft: 52,
  },
  cropsSection: {
    marginBottom: 16,
  },
  cropsLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  notRecommendedLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
    marginBottom: 8,
  },
  cropsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  cropTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cropTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  notRecommendedTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  notRecommendedTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#DC2626",
  },
  strategiesContainer: {
    marginBottom: 24,
  },
  strategyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  strategyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  strategyContent: {
    flex: 1,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  strategyDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  actionStepsContainer: {
    marginBottom: 24,
  },
  actionStepCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  actionStepContent: {
    flex: 1,
  },
  actionStepText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 22,
  },
  reminderCard: {
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
    alignItems: "center",
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 18,
    color: "#D97706",
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "600",
  },
  completeButton: {
    backgroundColor: "#16A34A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  completionModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  completionIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  completionTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#16A34A",
    marginBottom: 16,
    textAlign: "center",
  },
  completionText: {
    fontSize: 16,
    color: "#16A34A",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  completionButton: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completionButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
})
