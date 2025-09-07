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

// Translation data for irrigation guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Smart Irrigation Methods",
    progressTitle: "Your Progress",
    complete: "Complete",
    steps: [
      { title: "Why Efficient Irrigation Matters", emoji: "💧" },
      { title: "Comparing Irrigation Methods", emoji: "🚿" },
      { title: "Timing and Scheduling", emoji: "⏰" },
      { title: "Soil and Climate Considerations", emoji: "🌡️" },
      { title: "Cost and Maintenance Overview", emoji: "💰" },
      { title: "Beginner’s Action Steps", emoji: "🚀" },
    ],
    stepContent: {
      whyMatters: {
        title: "Why Efficient Irrigation Matters",
        subtitle: "Water is important but limited",
        description: "Using water wisely in farming helps:",
        benefits: [
          "Use less water while getting more results",
          "Grow better and healthier crops",
          "Prevent soil erosion and nutrient loss",
          "Lower labor and other farming costs",
        ],
        studyTitle: "Research Evidence:",
        studyText:
          "A study found that drip irrigation can save 30–70% of water and boost crop yield by 25–50%, especially in dry areas and small farms.",
        globalExample: "Global Example:",
        exampleText:
          "In a 2025 study in the Mediterranean, precision irrigation gave 42% more crops and 37% less fertilizer use.",
        source: "Source: Sustainable Farming Practices and Their Impact on Crop Yields – AM Research Review, 2025",
        button: "Compare Irrigation Methods",
      },
      comparing: {
        title: "Comparing Irrigation Methods",
        subtitle: "Choose the right method for your needs",
        description: "Each irrigation method has different benefits and challenges:",
        methods: [
          {
            name: "Drip Irrigation",
            waterSaving: "Very High (90%+)",
            bestFor: "Vegetables, fruits, herbs",
            challenges: "Costly setup, needs regular checking",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          
          },
          {
            name: "Sprinkler",
            waterSaving: "High (70–80%)",
            bestFor: "Grains, lawns",
            challenges: "Wind can affect spray, water loss",
            color: "#0891B2",
            bgColor: "#CFFAFE",
            
          },
          {
            name: "Furrow",
            waterSaving: "Medium (50-60%)",
            bestFor: "Maize, cotton",
            challenges: "Uneven water, risk of flooding",
            color: "#EA580C",
            bgColor: "#FED7AA",
            
          },
          {
            name: "Manual",
            waterSaving: "Low (30-50%)",
            bestFor: "Small/home gardens",
            challenges: "Hard work, not always even",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
           
          },
        ],
        tip: "Tip: Use mulch with drip irrigation to keep water in the soil and stop weeds from growing.",
        source: "Source: Precision Irrigation with UAV Mapping – SpringerLink, 2025",
        button: "Learn About Timing",
      },
      timing: {
        title: "Timing and Scheduling",
        subtitle: "It's not just how you water, but when",
        description: "Smart watering timing can save water and improve crop health:",
        guidelines: [
          "Water early in the morning or late afternoon",
          "Don't water after rain",
          "Use tools like moisture meters or weather data",
          "Don't water too much — roots may rot and nutrients can be lost",
        ],
        studyResult:
          "Studies show: Using moisture-based watering can save up to 25% water while keeping the same harvest.",
        timeSlots: [
          { time: "6:00 - 8:00 AM", status: "Best", reason: "Low evaporation, plants absorb well", color: "#16A34A" },
          { time: "5:00 - 7:00 PM", status: "Good", reason: "Cooler temperatures, less wind", color: "#059669" },
          { time: "10:00 AM - 4:00 PM", status: "Avoid", reason: "High evaporation, water waste", color: "#DC2626" },
          {
            time: "After Rain",
            status: "Skip",
            reason: "Soil already moist, may cause overwatering",
            color: "#7C3AED",
          },
        ],
        source: "Source: Innovative Irrigation Practices – Srce.hr, 2025",
        button: "Consider Soil & Climate",
      },
      soilClimate: {
        title: "Soil and Climate Considerations",
        subtitle: "Match your irrigation to your conditions",
        description: "Different soils need different irrigation approaches:",
        soilTypes: [
          {
            type: "Sandy Soil",
            bestIrrigation: "Drip",
            reason: "Water drains quickly",
            tips: "Frequent, small amounts",
            color: "#DAA520",
            bgColor: "#FFF8DC",
          },
          {
            type: "Clay Soil",
            bestIrrigation: "Sprinkler or Furrow",
            reason: "Holds water longer",
            tips: "Less frequent, deeper watering",
            color: "#8B4513",
            bgColor: "#F5DEB3",
          },
          {
            type: "Loam Soil",
            bestIrrigation: "Any method",
            reason: "Balanced soil, works with all",
            tips: "Most flexible, adjust as needed",
            color: "#654321",
            bgColor: "#DEB887",
          },
        ],
        climateTitle: "Climate Considerations:",
        climateFactors: [
          { factor: "Dry Areas", solution: "Solar-powered drip systems", icon: "sunny-outline" },
          { factor: "Windy Regions", solution: "Low-pressure sprinklers or drip", icon: "cloudy-outline" },
          { factor: "High Humidity", solution: "Reduce watering frequency", icon: "water-outline" },
          { factor: "Cold Climate", solution: "Avoid evening watering", icon: "snow-outline" },
        ],
        tip: "Tip: In dry areas, solar-powered drip systems help save electricity and improve watering accuracy.",
        source: "Source: Impact of Deficit Irrigation and Soil Conditioners – HAL Science, 2025",
        button: "Check Costs & Maintenance",
      },
      costMaintenance: {
        title: "Cost and Maintenance Overview",
        subtitle: "Plan your investment wisely",
        description: "Understanding costs helps you choose the right system:",
        systems: [
          {
            name: "Drip System",
            setupCost: "High",
            lifespan: "5–10 years",
            maintenance: "Keep pipes clean, check water flow",
            roi: "Best for long-term",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            name: "Sprinkler",
            setupCost: "Medium",
            lifespan: "5–7 years",
            maintenance: "Fix nozzles, check spray regularly",
            roi: "Good for medium farms",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
          {
            name: "Furrow",
            setupCost: "Low",
            lifespan: "One season",
            maintenance: "Set it up manually each time",
            roi: "Low cost, high labor",
            color: "#EA580C",
            bgColor: "#FED7AA",
          },
          {
            name: "Manual",
            setupCost: "Very low",
            lifespan: "Daily effort",
            maintenance: "Takes time and labor",
            roi: "Only for small gardens",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
        ],
        faoReport:
          "FAO (2023) Report: Drip and sprinkler systems give the best returns for small and medium-sized farms.",
        source: "Source: FAO Irrigation Investment Report (2023)",
        button: "See Action Steps",
      },
      actionSteps: {
        title: "Beginner Action Steps",
        subtitle: "Use this simple guide to start",
        description: "Follow these steps to improve your irrigation:",
        steps: [
          "Pick the right method for your crop, soil, and budget",
          "Plan watering zones based on what each plant needs",
          "Try a basic drip or sprinkler system for a small area",
          "Add mulch or cover crops to keep moisture in",
          "Check soil moisture once a week",
          "Watch your results and adjust as seasons change",
        ],
        helpfulTip: "Helpful Tip:",
        tipText: "Try using gravity-powered drip kits if you want a low-cost option without electricity.",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand smart irrigation methods! Your crops will thrive with efficient water management.",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Mga Smart na Paraan ng Irrigation",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    steps: [
      { title: "Bakit Mahalaga ang Efficient Irrigation" },
      { title: "Paghahambing ng mga Paraan" },
      { title: "Timing at Scheduling" },
      { title: "Katangian ng Lupa at Klima" },
      { title: "Gastos at Maintenance" },
      { title: "Mga Hakbang para sa Nagsisimula" },
    ],
    stepContent: {
      whyMatters: {
        title: "Bakit Mahalaga ang Efficient Irrigation",
        subtitle: "Ang tubig ay mahalaga pero limitado",
        description: "Ang matalinong paggamit ng tubig sa pagsasaka ay nakakatulong na:",
        benefits: [
          "Gumamit ng mas kaunting tubig habang nakakakuha ng mas maraming resulta",
          "Magtanim ng mas magaganda at mas malusog na pananim",
          "Pigilan ang soil erosion at pagkawala ng nutrients",
          "Bawasan ang labor at iba pang gastos sa pagsasaka",
        ],
        studyTitle: "Katunayan ng Pananaliksik:",
        studyText:
          "Ang isang pag-aaral ay natuklasan na ang drip irrigation ay makakatipid ng 30–70% ng tubig at makapagpapataas ng ani ng 25–50%, lalo na sa mga tuyong lugar at maliliit na farm.",
        globalExample: "Global na Halimbawa:",
        exampleText:
          "Sa 2025 study sa Mediterranean, ang precision irrigation ay nagbigay ng 42% na mas maraming pananim at 37% na mas kaunting paggamit ng fertilizer.",
        source: "Source: Sustainable Farming Practices and Their Impact on Crop Yields – AM Research Review, 2025",
        button: "Ihambing ang mga Paraan ng Irrigation",
      },
      comparing: {
        title: "Paghahambing ng mga Paraan ng Irrigation",
        subtitle: "Pumili ng tamang paraan para sa inyong pangangailangan",
        description: "Ang bawat paraan ng irrigation ay may iba't ibang benepisyo at hamon:",
        methods: [
          {
            name: "Drip Irrigation",
            waterSaving: "Napakataas (90%+)",
            bestFor: "Gulay, prutas, herbs",
            challenges: "Mahal ang setup, kailangan ng regular na check",
            color: "#16A34A",
            bgColor: "#DCFCE7",
            emoji: "💧",
          },
          {
            name: "Sprinkler",
            waterSaving: "Mataas (70–80%)",
            bestFor: "Butil, lawn",
            challenges: "Maaapektuhan ng hangin, may water loss",
            color: "#0891B2",
            bgColor: "#CFFAFE",
            emoji: "🚿",
          },
          {
            name: "Furrow",
            waterSaving: "Katamtaman (50–60%)",
            bestFor: "Mais, cotton",
            challenges: "Hindi pantay ang tubig, risk ng flooding",
            color: "#EA580C",
            bgColor: "#FED7AA",
            emoji: "🌊",
          },
          {
            name: "Manual",
            waterSaving: "Mababa (30–50%)",
            bestFor: "Maliliit/home gardens",
            challenges: "Mahirap na trabaho, hindi laging pantay",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
            emoji: "🪣",
          },
        ],
        tip: "Tip: Gumamit ng mulch kasama ng drip irrigation para manatili ang tubig sa lupa at pigilan ang mga damo.",
        source: "Source: Precision Irrigation with UAV Mapping – SpringerLink, 2025",
        button: "Matuto Tungkol sa Timing",
      },
      timing: {
        title: "Timing at Scheduling",
        subtitle: "Hindi lang kung paano kayo mag-water, kundi kailan",
        description:
          "Ang matalinong timing sa pag-water ay makakatipid ng tubig at mapapabuti ang kalusugan ng pananim:",
        guidelines: [
          "Mag-water ng maaga sa umaga o sa hapon",
          "Huwag mag-water pagkatapos ng ulan",
          "Gumamit ng tools tulad ng moisture meters o weather data",
          "Huwag sobrang water — maaaring mabulok ang ugat at mawala ang nutrients",
        ],
        studyResult:
          "Mga pag-aaral ay nagpapakita: Ang paggamit ng moisture-based watering ay makakatipid ng hanggang 25% tubig habang pinapanatili ang parehong ani.",
        timeSlots: [
          {
            time: "6:00 - 8:00 AM",
            status: "Pinakamahusay",
            reason: "Mababang evaporation, mahusay na pag-absorb ng halaman",
            color: "#16A34A",
          },
          {
            time: "5:00 - 7:00 PM",
            status: "Maganda",
            reason: "Mas malamig na temperatura, mas kaunting hangin",
            color: "#059669",
          },
          {
            time: "10:00 AM - 4:00 PM",
            status: "Iwasan",
            reason: "Mataas na evaporation, sayang ang tubig",
            color: "#DC2626",
          },
          {
            time: "Pagkatapos ng Ulan",
            status: "Laktawan",
            reason: "Basa na ang lupa, maaaring mag-cause ng overwatering",
            color: "#7C3AED",
          },
        ],
        source: "Source: Innovative Irrigation Practices – Srce.hr, 2025",
        button: "Isaalang-alang ang Lupa at Klima",
      },
      soilClimate: {
        title: "Mga Consideration sa Lupa at Klima",
        subtitle: "Itugma ang inyong irrigation sa inyong kondisyon",
        description: "Ang iba't ibang lupa ay nangangailangan ng iba't ibang approach sa irrigation:",
        soilTypes: [
          {
            type: "Sandy Soil",
            bestIrrigation: "Drip",
            reason: "Mabilis na tumatagos ang tubig",
            tips: "Madalas, maliit na dami",
            color: "#DAA520",
            bgColor: "#FFF8DC",
          },
          {
            type: "Clay Soil",
            bestIrrigation: "Sprinkler o Furrow",
            reason: "Mas matagal na humahawak ng tubig",
            tips: "Mas bihira, mas malalim na watering",
            color: "#8B4513",
            bgColor: "#F5DEB3",
          },
          {
            type: "Loam Soil",
            bestIrrigation: "Anumang paraan",
            reason: "Balanced na lupa, gumagana sa lahat",
            tips: "Pinaka-flexible, i-adjust kung kailangan",
            color: "#654321",
            bgColor: "#DEB887",
          },
        ],
        climateTitle: "Mga Consideration sa Klima:",
        climateFactors: [
          { factor: "Tuyong Lugar", solution: "Solar-powered drip systems", icon: "sunny-outline" },
          { factor: "Mahanging Lugar", solution: "Low-pressure sprinklers o drip", icon: "cloudy-outline" },
          { factor: "Mataas na Humidity", solution: "Bawasan ang frequency ng watering", icon: "water-outline" },
          { factor: "Malamig na Klima", solution: "Iwasan ang evening watering", icon: "snow-outline" },
        ],
        tip: "Tip: Sa mga tuyong lugar, ang solar-powered drip systems ay nakakatulong na makatipid ng kuryente at mapabuti ang accuracy ng watering.",
        source: "Source: Impact of Deficit Irrigation and Soil Conditioners – HAL Science, 2025",
        button: "Suriin ang Gastos at Maintenance",
      },
      costMaintenance: {
        title: "Overview ng Gastos at Maintenance",
        subtitle: "Magplano ng inyong investment nang matalino",
        description: "Ang pag-unawa sa mga gastos ay tumutulong na pumili ng tamang system:",
        systems: [
          {
            name: "Drip System",
            setupCost: "Mataas",
            lifespan: "5–10 taon",
            maintenance: "Panatilihing malinis ang pipes, suriin ang water flow",
            roi: "Pinakamahusay para sa long-term",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            name: "Sprinkler",
            setupCost: "Katamtaman",
            lifespan: "5–7 taon",
            maintenance: "Ayusin ang nozzles, suriin ang spray regularly",
            roi: "Maganda para sa medium farms",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
          {
            name: "Furrow",
            setupCost: "Mababa",
            lifespan: "Isang season",
            maintenance: "I-setup manually bawat beses",
            roi: "Mababang gastos, mataas na labor",
            color: "#EA580C",
            bgColor: "#FED7AA",
          },
          {
            name: "Manual",
            setupCost: "Napakababa",
            lifespan: "Araw-araw na effort",
            maintenance: "Kailangan ng oras at labor",
            roi: "Para lang sa maliliit na hardin",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
        ],
        faoReport:
          "FAO (2023) Report: Ang drip at sprinkler systems ay nagbibigay ng pinakamahusay na returns para sa maliliit at medium-sized farms.",
        source: "Source: FAO Irrigation Investment Report (2023)",
        button: "Tingnan ang mga Hakbang",
      },
      actionSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Gamitin ang simpleng gabay na ito para magsimula",
        description: "Sundin ang mga hakbang na ito para mapabuti ang inyong irrigation:",
        steps: [
          "Pumili ng tamang paraan para sa inyong pananim, lupa, at budget",
          "Magplano ng watering zones base sa kailangan ng bawat halaman",
          "Subukan ang basic drip o sprinkler system para sa maliit na lugar",
          "Magdagdag ng mulch o cover crops para manatili ang moisture",
          "Suriin ang soil moisture minsan sa isang linggo",
          "Bantayan ang inyong mga resulta at mag-adjust habang nagbabago ang mga season",
        ],
        helpfulTip: "Kapakipakinabang na Tip:",
        tipText:
          "Subukan ang gravity-powered drip kits kung gusto ninyo ng mababang gastos na option na walang kuryente.",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang mga smart na paraan ng irrigation! Magiging matagumpay ang inyong mga pananim sa efficient water management.",
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
export default function IrrigationGuide() {
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

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.whyMatters.globalExample}</Text>
        <Text style={styles.exampleText}>{t.stepContent.whyMatters.exampleText}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.whyMatters.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyMatters.button}
      </CompleteButton>
    </View>
  )

  const renderComparingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.comparing.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.comparing.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.comparing.description}</Text>

      <View style={styles.methodsContainer}>
        {t.stepContent.comparing.methods.map((method, index) => (
          <View key={index} style={[styles.methodCard, { backgroundColor: method.bgColor }]}>
            <View style={styles.methodHeader}>
              <Text style={styles.methodEmoji}>{method.emoji}</Text>
              <Text style={styles.methodName}>{method.name}</Text>
            </View>
            <View style={styles.methodDetails}>
              <View style={styles.methodRow}>
                <Text style={styles.methodLabel}>Water Saving:</Text>
                <Text style={[styles.methodValue, { color: method.color }]}>{method.waterSaving}</Text>
              </View>
              <View style={styles.methodRow}>
                <Text style={styles.methodLabel}>Best for:</Text>
                <Text style={styles.methodValue}>{method.bestFor}</Text>
              </View>
              <View style={styles.methodRow}>
                <Text style={styles.methodLabel}>Challenges:</Text>
                <Text style={styles.methodChallenges}>{method.challenges}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <Text style={styles.tipText}>{t.stepContent.comparing.tip}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.comparing.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.comparing.button}
      </CompleteButton>
    </View>
  )

  const renderTimingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.timing.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.timing.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.timing.description}</Text>

      <View style={styles.guidelinesCard}>
        {t.stepContent.timing.guidelines.map((guideline, index) => (
          <View key={index} style={styles.guidelineItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.guidelineText}>{guideline}</Text>
          </View>
        ))}
      </View>

      <View style={styles.studyResultCard}>
        <Text style={styles.studyResultText}>{t.stepContent.timing.studyResult}</Text>
      </View>

      <Text style={styles.sectionTitle}>Best Watering Times:</Text>
      <View style={styles.timeSlotsContainer}>
        {t.stepContent.timing.timeSlots.map((slot, index) => (
          <View key={index} style={styles.timeSlotCard}>
            <View style={[styles.timeSlotIndicator, { backgroundColor: slot.color }]} />
            <View style={styles.timeSlotContent}>
              <Text style={styles.timeSlotTime}>{slot.time}</Text>
              <Text style={[styles.timeSlotStatus, { color: slot.color }]}>{slot.status}</Text>
              <Text style={styles.timeSlotReason}>{slot.reason}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.timing.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.timing.button}
      </CompleteButton>
    </View>
  )

  const renderSoilClimateStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilClimate.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilClimate.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soilClimate.description}</Text>

      <View style={styles.soilTypesContainer}>
        {t.stepContent.soilClimate.soilTypes.map((soil, index) => (
          <View key={index} style={[styles.soilTypeCard, { backgroundColor: soil.bgColor }]}>
            <View style={[styles.soilTypeHeader, { backgroundColor: soil.color }]}>
              <Text style={styles.soilTypeName}>{soil.type}</Text>
            </View>
            <View style={styles.soilTypeContent}>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Best Irrigation:</Text>
                <Text style={styles.soilTypeValue}>{soil.bestIrrigation}</Text>
              </View>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Reason:</Text>
                <Text style={styles.soilTypeValue}>{soil.reason}</Text>
              </View>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Tips:</Text>
                <Text style={styles.soilTypeTips}>{soil.tips}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.soilClimate.climateTitle}</Text>
      <View style={styles.climateFactorsContainer}>
        {t.stepContent.soilClimate.climateFactors.map((factor, index) => (
          <View key={index} style={styles.climateFactorItem}>
            <View style={styles.climateFactorIconContainer}>
              <Ionicons name={factor.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.climateFactorContent}>
              <Text style={styles.climateFactorTitle}>{factor.factor}</Text>
              <Text style={styles.climateFactorSolution}>{factor.solution}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <Text style={styles.tipText}>{t.stepContent.soilClimate.tip}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.soilClimate.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.soilClimate.button}
      </CompleteButton>
    </View>
  )

  const renderCostMaintenanceStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.costMaintenance.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.costMaintenance.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.costMaintenance.description}</Text>

      <View style={styles.systemsContainer}>
        {t.stepContent.costMaintenance.systems.map((system, index) => (
          <View key={index} style={[styles.systemCard, { backgroundColor: system.bgColor }]}>
            <View style={[styles.systemHeader, { backgroundColor: system.color }]}>
              <Text style={styles.systemName}>{system.name}</Text>
            </View>
            <View style={styles.systemContent}>
              <View style={styles.systemRow}>
                <Text style={styles.systemLabel}>Setup Cost:</Text>
                <Text style={styles.systemValue}>{system.setupCost}</Text>
              </View>
              <View style={styles.systemRow}>
                <Text style={styles.systemLabel}>Lifespan:</Text>
                <Text style={styles.systemValue}>{system.lifespan}</Text>
              </View>
              <View style={styles.systemRow}>
                <Text style={styles.systemLabel}>Maintenance:</Text>
                <Text style={styles.systemMaintenance}>{system.maintenance}</Text>
              </View>
              <View style={styles.systemRow}>
                <Text style={styles.systemLabel}>ROI:</Text>
                <Text style={[styles.systemRoi, { color: system.color }]}>{system.roi}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.faoReportCard}>
        <Text style={styles.faoReportText}>{t.stepContent.costMaintenance.faoReport}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.costMaintenance.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.costMaintenance.button}
      </CompleteButton>
    </View>
  )

  const renderActionStepsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionSteps.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionSteps.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.actionSteps.description}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.actionSteps.steps.map((step, index) => (
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

      <View style={styles.helpfulTipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.helpfulTipContent}>
          <Text style={styles.helpfulTipTitle}>{t.stepContent.actionSteps.helpfulTip}</Text>
          <Text style={styles.helpfulTipText}>{t.stepContent.actionSteps.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.actionSteps.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyMattersStep,
      renderComparingStep,
      renderTimingStep,
      renderSoilClimateStep,
      renderCostMaintenanceStep,
      renderActionStepsStep,
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
              <Ionicons name="water-outline" size={48} color="#16A34A" />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
    marginTop: 8,
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
  exampleCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 15,
    color: "#16A34A",
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
  methodsContainer: {
    marginBottom: 24,
  },
  methodCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  methodHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  methodEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  methodName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  methodDetails: {
    padding: 16,
  },
  methodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  methodLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  methodValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    flex: 2,
    textAlign: "right",
  },
  methodChallenges: {
    fontSize: 14,
    color: "#DC2626",
    flex: 2,
    textAlign: "right",
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
  guidelinesCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  guidelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  guidelineText: {
    fontSize: 15,
    color: "#16A34A",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  studyResultCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  studyResultText: {
    fontSize: 15,
    color: "#1E40AF",
    lineHeight: 22,
    fontStyle: "italic",
  },
  timeSlotsContainer: {
    marginBottom: 24,
  },
  timeSlotCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeSlotIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 16,
  },
  timeSlotContent: {
    flex: 1,
  },
  timeSlotTime: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  timeSlotStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  timeSlotReason: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  soilTypesContainer: {
    marginBottom: 24,
  },
  soilTypeCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  soilTypeHeader: {
    padding: 12,
    alignItems: "center",
  },
  soilTypeName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  soilTypeContent: {
    padding: 16,
  },
  soilTypeRow: {
    marginBottom: 8,
  },
  soilTypeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  soilTypeValue: {
    fontSize: 14,
    color: "#6B7280",
  },
  soilTypeTips: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "500",
  },
  climateFactorsContainer: {
    marginBottom: 24,
  },
  climateFactorItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  climateFactorIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  climateFactorContent: {
    flex: 1,
  },
  climateFactorTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  climateFactorSolution: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "500",
  },
  systemsContainer: {
    marginBottom: 24,
  },
  systemCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  systemHeader: {
    padding: 12,
    alignItems: "center",
  },
  systemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  systemContent: {
    padding: 16,
  },
  systemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  systemLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    flex: 1,
  },
  systemValue: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
    textAlign: "right",
  },
  systemMaintenance: {
    fontSize: 13,
    color: "#6B7280",
    flex: 2,
    textAlign: "right",
    lineHeight: 18,
  },
  systemRoi: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },
  faoReportCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  faoReportText: {
    fontSize: 15,
    color: "#1E40AF",
    lineHeight: 22,
    fontStyle: "italic",
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
  helpfulTipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
  },
  helpfulTipContent: {
    flex: 1,
    marginLeft: 12,
  },
  helpfulTipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 8,
  },
  helpfulTipText: {
    fontSize: 15,
    color: "#D97706",
    lineHeight: 22,
    fontStyle: "italic",
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
