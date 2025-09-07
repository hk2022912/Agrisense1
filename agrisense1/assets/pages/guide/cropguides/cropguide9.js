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

// Translation data for weed management guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Weed Management Strategies",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Why Weed Management Matters", emoji: "🌾" },
      { title: "Controlling Weed Methods", emoji: "🛠️" },
      { title: "Sustainable Strategies", emoji: "🌱" },
      { title: "Weed Impact on Crops", emoji: "⚠️" },
      { title: "Beginner’s Action Steps", emoji: "📋" },
    ],
    stepContent: {
      importance: {
        title: "Why Weed Management Is Important",
        subtitle: "Control weeds in smart and sustainable ways to protect your crops",
        definition:
          "Weeds steal water, nutrients, and sunlight from crops. If not controlled, they can cut yields by 20–80%.",
        example: "Example:",
        studyResult:
          "A 2025 study on organic corn showed that using mulching and intercropping all season increased yields by 29–42% and reduced herbicide use by 60%.",
        keyPoints: "Key Impact Areas:",
        impacts: [
          { area: "Water Competition", effect: "Weeds absorb water meant for crops" },
          { area: "Nutrient Theft", effect: "Steal essential nutrients from soil" },
          { area: "Light Blocking", effect: "Shade crops and reduce photosynthesis" },
        ],
        scientificSources: "Source: Brockmueller et al., 2025 – Agronomy Journal (Wiley)",
        button: "Learn Control Methods",
      },
      methods: {
        title: "Different Ways to Control Weeds",
        subtitle: "Multiple approaches for effective weed management",
        definition: "The best approach is to combine methods. This is called Integrated Weed Management (IWM).",
        methods: [
          {
            type: "Cultural",
            examples: "Crop rotation, planting close together",
            effectiveness: "Prevents weeds from taking over",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Mechanical",
            examples: "Hoeing, mulching, soil solarization",
            effectiveness: "Low cost, safe for the environment",
            color: "#D97706",
            bgColor: "#FEF3C7",
          },
          {
            type: "Biological",
            examples: "Ducks in rice fields, weed-suppressing plants",
            effectiveness: "Long-term control with less effort",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
          {
            type: "Chemical",
            examples: "Pre- and post-emergence herbicides",
            effectiveness: "Works fast, but can cause resistance",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Technological",
            examples: "Robots, smart sprayers",
            effectiveness: "Very accurate, uses fewer inputs",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
        ],
        scientificSources: "Source: Hanif et al., 2025 – Agris FAO Database",
        button: "Explore Sustainable Strategies",
      },
      strategies: {
        title: "Real-World Sustainable Strategies",
        subtitle: "Proven methods that work in practice",
        definition: "These strategies have been tested and proven effective in real farming situations:",
        strategies: [
          {
            strategy: "Mulching",
            example: "Straw, plastic sheets, biochar",
            effect: "Blocks 70–90% of weeds and keeps soil moist",
            icon: "leaf-outline",
          },
          {
            strategy: "Intercropping",
            example: "Maize + cowpea, tomato + marigold",
            effect: "Covers soil, some plants also stop weed growth",
            icon: "flower-outline",
          },
          {
            strategy: "Cover Cropping",
            example: "Mustard, clover, rye",
            effect: "Smothers weeds and adds nutrients to soil",
            icon: "nutrition-outline",
          },
          {
            strategy: "Tarping",
            example: "Silage tarps on empty beds",
            effect: "Kills weeds without chemicals",
            icon: "shield-outline",
          },
          {
            strategy: "Nanoherbicides",
            example: "Micro-sprays aimed at root zones",
            effect: "More effective, with less leftover chemicals",
            icon: "water-outline",
          },
        ],
        scientificSources: "Source: Strauser et al., 2025 – ProQuest: Sustainable Weed Control in Vegetable Systems",
        button: "Understand Weed Impact",
      },
      impact: {
        title: "How Weeds Harm Soil and Crops",
        subtitle: "Understanding the consequences of poor weed management",
        definition: "If weeds are not managed, they can cause serious problems:",
        impacts: [
          "Lower yields by 50–80%, especially in grains and beans",
          "Increase time and effort needed to harvest",
          "Attract pests like aphids and beetles",
          "Cause herbicide resistance from repeated chemical use",
          "Reduce crop quality and make harvest uneven",
        ],
        yieldLoss: "Yield Loss Impact:",
        lossData: [
          { crop: "Grains", loss: "50-80%" },
          { crop: "Beans", loss: "50-80%" },
          { crop: "Vegetables", loss: "20-60%" },
        ],
        scientificSources: "Source: Springer – Weed Adaptation and Crop Timing (2025)",
        button: "Get Action Plan",
      },
      actionPlan: {
        title: "Beginner Action Plan",
        subtitle: "Simple steps to get started with weed management",
        definition: "Follow these practical steps to begin effective weed management:",
        steps: [
          {
            step: "Use mulch (like straw or leaves) after planting",
            description: "Creates a barrier that blocks weed growth while retaining soil moisture",
          },
          {
            step: "Intercrop with low-growing or weed-fighting plants",
            description: "Companion plants help suppress weeds naturally",
          },
          {
            step: "Pull weeds early—before they flower or seed",
            description: "Prevention is easier than dealing with established weeds",
          },
          {
            step: "Grow cover crops in the off-season to block weeds",
            description: "Keeps soil covered and prevents weed establishment",
          },
          {
            step: "If using chemicals, choose natural options like clove oil or vinegar",
            description: "Safer alternatives that are less harmful to the environment",
          },
          {
            step: "Keep a weed journal to track which ones keep coming back",
            description: "Understanding patterns helps you plan better control strategies",
          },
        ],
        reminder: "Reminder:",
        reminderText: "Stopping weeds early in the season helps prevent spread for the rest of the year.",
        button: "I'm Ready to Manage Weeds!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand effective weed management strategies and how to implement them for healthier, more productive crops!",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Mga Estratehiya sa Pag-manage ng Damo",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Bakit Mahalaga ang Pag-manage ng Damo", emoji: "🌾" },
      { title: "Mga Paraan ng Kontrol", emoji: "🛠️" },
      { title: "Sustainable na Estratehiya", emoji: "🌱" },
      { title: "Epekto ng Damo sa Pananim", emoji: "⚠️" },
      { title: "Mga Hakbang para sa mga Nagsisimula", emoji: "📋" },
    ],
    stepContent: {
      importance: {
        title: "Bakit Mahalaga ang Pag-manage ng Damo",
        subtitle: "Kontrolin ang damo sa matalinong at sustainable na paraan",
        definition:
          "Ang mga damo ay kumukunha ng tubig, nutrients, at sikat ng araw mula sa mga pananim. Kung hindi makontrol, maaaring mabawasan ang ani ng 20–80%.",
        example: "Halimbawa:",
        studyResult:
          "Ang 2025 study sa organic corn ay nagpakita na ang paggamit ng mulching at intercropping buong season ay nagtaas ng ani ng 29–42% at nabawasan ang herbicide use ng 60%.",
        keyPoints: "Mga Pangunahing Epekto:",
        impacts: [
          { area: "Kompetensya sa Tubig", effect: "Kinukuha ng damo ang tubig para sa pananim" },
          { area: "Pagnanakaw ng Nutrients", effect: "Kinukuha ang mahahalagang nutrients sa lupa" },
          { area: "Pagharang sa Liwanag", effect: "Nililiman ang pananim at binabawasan ang photosynthesis" },
        ],
        scientificSources: "Source: Brockmueller et al., 2025 – Agronomy Journal (Wiley)",
        button: "Matuto ng Mga Paraan ng Kontrol",
      },
      methods: {
        title: "Iba't Ibang Paraan ng Pagkontrol sa Damo",
        subtitle: "Maraming approach para sa epektibong pag-manage ng damo",
        definition:
          "Ang pinakamahusay na approach ay pagsama-sama ng mga paraan. Ito ay tinatawag na Integrated Weed Management (IWM).",
        methods: [
          {
            type: "Cultural",
            examples: "Crop rotation, malapit na pagtatanim",
            effectiveness: "Pinipigilan ang damo na mag-take over",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Mechanical",
            examples: "Pag-hoe, mulching, soil solarization",
            effectiveness: "Mababang gastos, ligtas sa kapaligiran",
            color: "#D97706",
            bgColor: "#FEF3C7",
          },
          {
            type: "Biological",
            examples: "Mga pato sa rice fields, halaman na sumusupress ng damo",
            effectiveness: "Pangmatagalang kontrol na hindi masyadong mahirap",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
          {
            type: "Chemical",
            examples: "Pre- at post-emergence herbicides",
            effectiveness: "Mabilis na epekto, pero maaaring magdulot ng resistance",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Technological",
            examples: "Mga robot, smart sprayers",
            effectiveness: "Napaka-accurate, gumagamit ng kaunting inputs",
            color: "#0891B2",
            bgColor: "#CFFAFE",
          },
        ],
        scientificSources: "Source: Hanif et al., 2025 – Agris FAO Database",
        button: "Tuklasin ang Sustainable na Estratehiya",
      },
      strategies: {
        title: "Real-World Sustainable na Estratehiya",
        subtitle: "Napatunayang mga paraan na gumagana sa practice",
        definition: "Ang mga estratehiyang ito ay nasubukan na at napatunayang epektibo sa tunay na farming:",
        strategies: [
          {
            strategy: "Mulching",
            example: "Dayami, plastic sheets, biochar",
            effect: "Humaharang sa 70–90% ng damo at pinapanatiling basa ang lupa",
            icon: "leaf-outline",
          },
          {
            strategy: "Intercropping",
            example: "Mais + cowpea, kamatis + marigold",
            effect: "Tumatakip sa lupa, may mga halaman din na pumipigil sa paglaki ng damo",
            icon: "flower-outline",
          },
          {
            strategy: "Cover Cropping",
            example: "Mustasa, clover, rye",
            effect: "Nilalamon ang damo at nagdadagdag ng nutrients sa lupa",
            icon: "nutrition-outline",
          },
          {
            strategy: "Tarping",
            example: "Silage tarps sa walang laman na beds",
            effect: "Pinapatay ang damo nang walang chemicals",
            icon: "shield-outline",
          },
          {
            strategy: "Nanoherbicides",
            example: "Micro-sprays na nakatutok sa root zones",
            effect: "Mas epektibo, na may kaunting natitirang chemicals",
            icon: "water-outline",
          },
        ],
        scientificSources: "Source: Strauser et al., 2025 – ProQuest: Sustainable Weed Control in Vegetable Systems",
        button: "Unawain ang Epekto ng Damo",
      },
      impact: {
        title: "Paano Nakakapinsala ang Damo sa Lupa at Pananim",
        subtitle: "Pag-unawa sa mga kahihinatnan ng mahinang pag-manage ng damo",
        definition: "Kung hindi ma-manage ang mga damo, maaaring magdulot ng seryosong problema:",
        impacts: [
          "Mababang ani ng 50–80%, lalo na sa grains at beans",
          "Pagtaas ng oras at effort na kailangan sa pag-ani",
          "Pag-akit ng mga peste tulad ng aphids at beetles",
          "Pagkakaroon ng herbicide resistance dahil sa paulit-ulit na paggamit ng chemicals",
          "Pagbaba ng kalidad ng ani at hindi pantay na pag-ani",
        ],
        yieldLoss: "Epekto sa Pagbaba ng Ani:",
        lossData: [
          { crop: "Grains", loss: "50-80%" },
          { crop: "Beans", loss: "50-80%" },
          { crop: "Gulay", loss: "20-60%" },
        ],
        scientificSources: "Source: Springer – Weed Adaptation and Crop Timing (2025)",
        button: "Kunin ang Action Plan",
      },
      actionPlan: {
        title: "Action Plan para sa Nagsisimula",
        subtitle: "Simpleng mga hakbang para magsimula sa weed management",
        definition: "Sundin ang mga practical na hakbang na ito para magsimula sa epektibong weed management:",
        steps: [
          {
            step: "Gumamit ng mulch (tulad ng dayami o dahon) pagkatapos magtanim",
            description: "Gumagawa ng barrier na humaharang sa paglaki ng damo habang pinapanatiling basa ang lupa",
          },
          {
            step: "Mag-intercrop ng mababang halaman o mga halaman na lumalaban sa damo",
            description: "Ang mga companion plants ay tumutulong na natural na pigilan ang damo",
          },
          {
            step: "Bunutan ang damo nang maaga—bago pa mamulak o mag-seed",
            description: "Mas madaling pigilan kaysa sa pakikipag-deal sa mga established na damo",
          },
          {
            step: "Magtanim ng cover crops sa off-season para harangan ang damo",
            description: "Pinapanatiling takip ang lupa at pinipigilan ang pag-establish ng damo",
          },
          {
            step: "Kung gagamit ng chemicals, pumili ng natural na options tulad ng clove oil o suka",
            description: "Mas ligtas na alternatives na hindi masyadong nakakasama sa kapaligiran",
          },
          {
            step: "Mag-keep ng weed journal para ma-track kung alin ang bumabalik",
            description: "Ang pag-unawa sa mga pattern ay tumutulong sa mas magandang planning ng control strategies",
          },
        ],
        reminder: "Paalala:",
        reminderText: "Ang pagpigil sa damo nang maaga sa season ay tumutulong na pigilan ang pagkalat sa buong taon.",
        button: "Handa na Akong Mag-manage ng Damo!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang mga epektibong estratehiya sa pag-manage ng damo at kung paano ipatupad ang mga ito para sa mas malusog at mas produktibong pananim!",
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

// Reusable Components
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
export default function WeedManagementGuide() {
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

  const renderImportanceStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.importance.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.importance.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.importance.definition}</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.importance.example}</Text>
        <Text style={styles.exampleText}>{t.stepContent.importance.studyResult}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.importance.keyPoints}</Text>
      <View style={styles.impactsContainer}>
        {t.stepContent.importance.impacts.map((impact, index) => (
          <View key={index} style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="warning-outline" size={20} color="#DC2626" />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactArea}>{impact.area}</Text>
              <Text style={styles.impactEffect}>{impact.effect}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.importance.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.importance.button}
      </CompleteButton>
    </View>
  )

  const renderMethodsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.methods.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.methods.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.methods.definition}</Text>

      <View style={styles.methodsContainer}>
        {t.stepContent.methods.methods.map((method, index) => (
          <View key={index} style={[styles.methodCard, { backgroundColor: method.bgColor }]}>
            <View style={styles.methodHeader}>
              <Text style={[styles.methodType, { color: method.color }]}>{method.type}</Text>
            </View>
            <View style={styles.methodDetails}>
              <Text style={styles.methodExamples}>{method.examples}</Text>
              <Text style={styles.methodEffectiveness}>{method.effectiveness}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.methods.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.methods.button}
      </CompleteButton>
    </View>
  )

  const renderStrategiesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.strategies.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.strategies.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.strategies.definition}</Text>

      <View style={styles.strategiesContainer}>
        {t.stepContent.strategies.strategies.map((strategy, index) => (
          <View key={index} style={styles.strategyItem}>
            <View style={styles.strategyIconContainer}>
              <Ionicons name={strategy.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.strategyContent}>
              <Text style={styles.strategyTitle}>{strategy.strategy}</Text>
              <Text style={styles.strategyExample}>{strategy.example}</Text>
              <Text style={styles.strategyEffect}>{strategy.effect}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.strategies.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.strategies.button}
      </CompleteButton>
    </View>
  )

  const renderImpactStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.impact.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.impact.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.impact.definition}</Text>

      <View style={styles.impactsListCard}>
        {t.stepContent.impact.impacts.map((impact, index) => (
          <View key={index} style={styles.impactListItem}>
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
            <Text style={styles.impactListText}>{impact}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.impact.yieldLoss}</Text>
      <View style={styles.yieldLossContainer}>
        {t.stepContent.impact.lossData.map((data, index) => (
          <View key={index} style={styles.yieldLossCard}>
            <Text style={styles.yieldLossCrop}>{data.crop}</Text>
            <Text style={styles.yieldLossPercent}>{data.loss}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.impact.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.impact.button}
      </CompleteButton>
    </View>
  )

  const renderActionPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionPlan.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.actionPlan.definition}</Text>

      <View style={styles.stepsContainer}>
        {t.stepContent.actionPlan.steps.map((step, index) => (
          <View key={index} style={styles.actionStepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.step}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.reminderCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>{t.stepContent.actionPlan.reminder}</Text>
          <Text style={styles.reminderText}>{t.stepContent.actionPlan.reminderText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.actionPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderImportanceStep,
      renderMethodsStep,
      renderStrategiesStep,
      renderImpactStep,
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
              <Ionicons name="leaf-outline" size={48} color="#16A34A" />
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
    minWidth: 120,
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
  exampleCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
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
  impactsContainer: {
    marginBottom: 24,
  },
  impactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  impactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  impactInfo: {
    flex: 1,
  },
  impactArea: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 4,
  },
  impactEffect: {
    fontSize: 14,
    color: "#DC2626",
    lineHeight: 20,
  },
  methodsContainer: {
    marginBottom: 24,
  },
  methodCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  methodHeader: {
    marginBottom: 12,
  },
  methodType: {
    fontSize: 18,
    fontWeight: "700",
  },
  methodDetails: {
    gap: 8,
  },
  methodExamples: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  methodEffectiveness: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  strategiesContainer: {
    marginBottom: 24,
  },
  strategyItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  strategyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
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
  strategyExample: {
    fontSize: 14,
    fontWeight: "600",
    color: "#16A34A",
    marginBottom: 4,
  },
  strategyEffect: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  impactsListCard: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  impactListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  impactListText: {
    fontSize: 15,
    color: "#DC2626",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  yieldLossContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  yieldLossCard: {
    flex: 1,
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  yieldLossCrop: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  yieldLossPercent: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
  },
  stepsContainer: {
    marginBottom: 24,
  },
  actionStepItem: {
    flexDirection: "row",
    alignItems: "flex-start", // Changed from "center" to "flex-start"
    marginBottom: 16, // Reduced from 20
    backgroundColor: "#F9FAFB",
    padding: 14, // Reduced from 16
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepNumber: {
    width: 20, // Reduced from 24
    height: 20, // Reduced from 24
    borderRadius: 10, // Reduced from 12
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10, // Reduced from 12
  },
  stepNumberText: {
    fontSize: 11, // Reduced from 12
    fontWeight: "700",
    color: "#fff",
  },
  stepContent: {
    flex: 1,
    marginTop: 2, // Add small top margin for better alignment
  },
  stepDescription: {
    fontSize: 13, // Reduced from 14
    color: "#6B7280",
    lineHeight: 18, // Reduced from 20
  },
  stepTitle: {
    fontSize: 15, // Reduced from 24 (this was way too big for action steps)
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6, // Reduced from 8
  },
  reminderCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
  },
  reminderContent: {
    flex: 1,
    marginLeft: 12,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 15,
    color: "#D97706",
    lineHeight: 22,
    fontStyle: "italic",
  },
  sourcesCard: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  sources: {
    fontSize: 13,
    color: "#1E40AF",
    fontStyle: "italic",
    textAlign: "center",
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
  actionStepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
})
