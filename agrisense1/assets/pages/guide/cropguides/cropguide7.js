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

// Translation data for post-harvest guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Post-Harvest Handling & Storage",
    progressTitle: "Your Progress",
    complete: "Complete",
    steps: [
      { title: "Why Post-Harvest Handling Matters", emoji: "📦" },
      { title: "Best Handling Practices", emoji: "🤲" },
      { title: "Storage Methods for Different Crops", emoji: "🏪" },
      { title: "Common Reasons for Losses", emoji: "⚠️" },
      { title: "Beginner Action Plan", emoji: "🚀" },
    ],
    stepContent: {
      whyMatters: {
        title: "Why Post-Harvest Handling Matters",
        subtitle: "Reduce crop losses and keep produce fresh",
        description:
          "After harvest, 30–40% of food—especially fruits, vegetables, and grains—is often wasted due to poor storage, delays, or contamination.",
        benefits: ["Longer freshness", "Higher market value", "Fewer pests and fungi", "Safer, better-quality food"],
        exampleTitle: "Example:",
        exampleText:
          "In a 2025 study in Nigeria, small farms using ventilated crates and shaded sorting areas reduced losses by 35–52%.",
        source: "Source: Ibironke et al., 2025 – European Journal of Agriculture",
        button: "Learn Best Practices",
      },
      bestPractices: {
        title: "Best Handling Practices",
        subtitle: "Follow these steps for better crop preservation",
        description: "Each stage of handling affects the final quality of your produce:",
        practices: [
          {
            stage: "Harvesting",
            practice: "Harvest early in the morning",
            reason: "Reduces heat damage and spoilage",
            icon: "sunny-outline",
            color: "#EA580C",
          },
          {
            stage: "Sorting/Grading",
            practice: "Remove damaged or spoiled produce",
            reason: "Stops bad items from spoiling others",
            icon: "checkmark-circle-outline",
            color: "#16A34A",
          },
          {
            stage: "Cleaning",
            practice: "Use clean water and dry equipment",
            reason: "Lowers germs and bacteria",
            icon: "water-outline",
            color: "#0891B2",
          },
          {
            stage: "Packaging",
            practice: "Use breathable, stackable containers",
            reason: "Prevents crushing and heat buildup",
            icon: "cube-outline",
            color: "#7C3AED",
          },
          {
            stage: "Cooling",
            practice: "Cool produce right after harvest",
            reason: "Keeps taste and slows spoilage",
            icon: "snow-outline",
            color: "#059669",
          },
        ],
        tip: "Tip: Never seal wet produce in plastic bags — it can grow mold in just a few hours.",
        source: "Source: Innovative Strategies for Disease Management – Plant Archives, 2025",
        button: "Learn Storage Methods",
      },
      storageMethods: {
        title: "Storage Methods for Different Crops",
        subtitle: "Match storage to crop type for best results",
        description: "Different crops need different storage conditions:",
        crops: [
          {
            type: "Leafy Greens",
            storage: "Refrigerate at 0–5°C with moisture",
            duration: "7–14 days",
            color: "#16A34A",
            bgColor: "#DCFCE7",
            emoji: "🥬",
          },
          {
            type: "Tomatoes/Peppers",
            storage: "Keep at room temperature in ventilated crates",
            duration: "7–10 days",
            color: "#DC2626",
            bgColor: "#FEE2E2",
            emoji: "🍅",
          },
          {
            type: "Cereals/Grains",
            storage: "Store dry in sealed containers (≤13% moisture)",
            duration: "6–12 months",
            color: "#D97706",
            bgColor: "#FED7AA",
            emoji: "🌾",
          },
          {
            type: "Roots/Tubers",
            storage: "Keep cool, dark, and well-ventilated",
            duration: "1–4 months",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
            emoji: "🥔",
          },
        ],
        newMethodsTitle: "New methods:",
        newMethodsText:
          "Use solar-powered cold rooms or modified atmosphere packaging (MAP) to keep produce fresh for longer.",
        source: "Source: IntechOpen – Yam Storage Technologies",
        button: "Understand Common Problems",
      },
      commonProblems: {
        title: "Common Reasons for Post-Harvest Loss",
        subtitle: "Identify and prevent major causes of crop loss",
        description: "Understanding these problems helps you prevent them:",
        problems: [
          {
            problem: "Poor ventilation",
            whatHappens: "Heat builds up, faster spoilage",
            howToFix: "Use stackable crates or fans",
            icon: "thermometer-outline",
            color: "#DC2626",
          },
          {
            problem: "Too much humidity",
            whatHappens: "Mold and fungi grow easily",
            howToFix: "Dry produce (especially grains) well",
            icon: "water-outline",
            color: "#0891B2",
          },
          {
            problem: "Physical bruising",
            whatHappens: "Spoilage and contamination",
            howToFix: "Handle gently and use strong containers",
            icon: "hand-left-outline",
            color: "#EA580C",
          },
          {
            problem: "Pests",
            whatHappens: "Damage from insects or rodents",
            howToFix: "Use sealed storage and check regularly",
            icon: "bug-outline",
            color: "#7C3AED",
          },
          {
            problem: "Slow marketing",
            whatHappens: "Crops lose freshness and value",
            howToFix: "Plan harvest and transport in advance",
            icon: "time-outline",
            color: "#059669",
          },
        ],
        source: "Source: MDPI – Food Chain Waste & Storage Practices (2025)",
        button: "See Action Plan",
      },
      actionPlan: {
        title: "Beginner Action Plan",
        subtitle: "Start with these steps",
        description: "Follow these simple steps to reduce post-harvest losses:",
        basicSteps: [
          "Harvest during cool parts of the day",
          "Remove damaged or overripe produce",
          "Wash and air-dry if needed",
          "Store in clean, dry, well-ventilated containers",
          "Use breathable materials like mesh bags or crates",
          "Check for pests or spoilage once a week",
        ],
        extraTipsTitle: "Extra tips (optional):",
        extraTips: [
          "Build or install simple cool storage units",
          "Try natural coatings like aloe vera or chitosan to keep fruits fresh longer",
        ],
        source: "Source: Journal of Plant Sciences (2025) – Study on Natural Coatings",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand post-harvest handling and storage! Your crops will stay fresh longer and have higher market value.",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Post-Harvest Handling at Storage",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    steps: [
      { title: "Bakit Mahalaga ang Post-Harvest Handling", emoji: "📦" },
      { title: "Pinakamahusay na Practices", emoji: "🤲" },
      { title: "Mga Paraan ng Storage", emoji: "🏪" },
      { title: "Mga Dahilan ng Pagkalugi", emoji: "⚠️" },
      { title: "Plano ng Aksyon", emoji: "🚀" },
    ],
    stepContent: {
      whyMatters: {
        title: "Bakit Mahalaga ang Post-Harvest Handling",
        subtitle: "Bawasan ang pagkalugi at panatilihing sariwa ang ani",
        description:
          "Pagkatapos ng ani, 30–40% ng pagkain—lalo na ang mga prutas, gulay, at butil—ay madalas na nasasayang dahil sa mahinang storage, pagkaantala, o kontaminasyon.",
        benefits: [
          "Mas matagal na kasariwaan",
          "Mas mataas na halaga sa merkado",
          "Mas kaunting peste at fungi",
          "Mas ligtas at mas magandang kalidad ng pagkain",
        ],
        exampleTitle: "Halimbawa:",
        exampleText:
          "Sa 2025 study sa Nigeria, ang maliliit na farm na gumagamit ng ventilated crates at shaded sorting areas ay nabawasan ang losses ng 35–52%.",
        source: "Source: Ibironke et al., 2025 – European Journal of Agriculture",
        button: "Matuto ng Best Practices",
      },
      bestPractices: {
        title: "Pinakamahusay na Practices sa Handling",
        subtitle: "Sundin ang mga hakbang na ito para sa mas magandang preservation ng pananim",
        description: "Ang bawat yugto ng handling ay nakakaapekto sa final quality ng inyong ani:",
        practices: [
          {
            stage: "Pag-ani",
            practice: "Mag-ani ng maaga sa umaga",
            reason: "Binabawasan ang heat damage at spoilage",
            icon: "sunny-outline",
            color: "#EA580C",
          },
          {
            stage: "Pag-sort/Grade",
            practice: "Alisin ang nasira o nasirang ani",
            reason: "Pinipigilan ang masamang items na makasira sa iba",
            icon: "checkmark-circle-outline",
            color: "#16A34A",
          },
          {
            stage: "Paglilinis",
            practice: "Gumamit ng malinis na tubig at tuyong equipment",
            reason: "Binabawasan ang mga mikrobyo at bacteria",
            icon: "water-outline",
            color: "#0891B2",
          },
          {
            stage: "Packaging",
            practice: "Gumamit ng breathable, stackable containers",
            reason: "Pinipigilan ang crushing at heat buildup",
            icon: "cube-outline",
            color: "#7C3AED",
          },
          {
            stage: "Cooling",
            practice: "I-cool ang ani kaagad pagkatapos ng harvest",
            reason: "Pinapanatili ang lasa at binabagalan ang spoilage",
            icon: "snow-outline",
            color: "#059669",
          },
        ],
        tip: "Tip: Huwag kailanman i-seal ang basang ani sa plastic bags — maaaring lumago ang amag sa loob lang ng ilang oras.",
        source: "Source: Innovative Strategies for Disease Management – Plant Archives, 2025",
        button: "Matuto ng Storage Methods",
      },
      storageMethods: {
        title: "Mga Paraan ng Storage para sa Iba't ibang Pananim",
        subtitle: "Itugma ang storage sa uri ng pananim para sa pinakamahusay na resulta",
        description: "Ang iba't ibang pananim ay nangangailangan ng iba't ibang kondisyon sa storage:",
        crops: [
          {
            type: "Mga Dahong Gulay",
            storage: "I-refrigerate sa 0–5°C na may moisture",
            duration: "7–14 araw",
            color: "#16A34A",
            bgColor: "#DCFCE7",
            emoji: "🥬",
          },
          {
            type: "Kamatis/Sili",
            storage: "Panatilihin sa room temperature sa ventilated crates",
            duration: "7–10 araw",
            color: "#DC2626",
            bgColor: "#FEE2E2",
            emoji: "🍅",
          },
          {
            type: "Cereals/Butil",
            storage: "I-store nang tuyo sa sealed containers (≤13% moisture)",
            duration: "6–12 buwan",
            color: "#D97706",
            bgColor: "#FED7AA",
            emoji: "🌾",
          },
          {
            type: "Ugat/Tubers",
            storage: "Panatilihing malamig, madilim, at well-ventilated",
            duration: "1–4 buwan",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
            emoji: "🥔",
          },
        ],
        newMethodsTitle: "Mga bagong paraan:",
        newMethodsText:
          "Gumamit ng solar-powered cold rooms o modified atmosphere packaging (MAP) para mas matagal na panatilihing sariwa ang ani.",
        source: "Source: IntechOpen – Yam Storage Technologies",
        button: "Unawain ang Mga Karaniwang Problema",
      },
      commonProblems: {
        title: "Mga Karaniwang Dahilan ng Post-Harvest Loss",
        subtitle: "Kilalanin at pigilan ang mga pangunahing dahilan ng pagkalugi ng pananim",
        description: "Ang pag-unawa sa mga problemang ito ay tumutulong na maiwasan ninyo ang mga ito:",
        problems: [
          {
            problem: "Mahinang ventilation",
            whatHappens: "Nag-build up ang init, mas mabilis na spoilage",
            howToFix: "Gumamit ng stackable crates o fans",
            icon: "thermometer-outline",
            color: "#DC2626",
          },
          {
            problem: "Sobrang humidity",
            whatHappens: "Madaling lumago ang amag at fungi",
            howToFix: "Patuyuin nang mabuti ang ani (lalo na ang butil)",
            icon: "water-outline",
            color: "#0891B2",
          },
          {
            problem: "Physical bruising",
            whatHappens: "Spoilage at contamination",
            howToFix: "Hawakan nang maingat at gumamit ng matatag na containers",
            icon: "hand-left-outline",
            color: "#EA580C",
          },
          {
            problem: "Mga peste",
            whatHappens: "Pinsala mula sa mga insekto o daga",
            howToFix: "Gumamit ng sealed storage at suriin nang regular",
            icon: "bug-outline",
            color: "#7C3AED",
          },
          {
            problem: "Mabagal na marketing",
            whatHappens: "Nawawala ang kasariwaan at halaga ng pananim",
            howToFix: "Magplano ng ani at transport nang maaga",
            icon: "time-outline",
            color: "#059669",
          },
        ],
        source: "Source: MDPI – Food Chain Waste & Storage Practices (2025)",
        button: "Tingnan ang Action Plan",
      },
      actionPlan: {
        title: "Plano ng Aksyon para sa Nagsisimula",
        subtitle: "Magsimula sa mga hakbang na ito",
        description: "Sundin ang mga simpleng hakbang na ito para mabawasan ang post-harvest losses:",
        basicSteps: [
          "Mag-ani sa malamig na bahagi ng araw",
          "Alisin ang nasira o sobrang hinog na ani",
          "Hugasan at patuyin sa hangin kung kailangan",
          "I-store sa malinis, tuyo, at well-ventilated containers",
          "Gumamit ng breathable materials tulad ng mesh bags o crates",
          "Suriin ang mga peste o spoilage minsan sa isang linggo",
        ],
        extraTipsTitle: "Extra tips (optional):",
        extraTips: [
          "Magtayo o mag-install ng simpleng cool storage units",
          "Subukan ang natural coatings tulad ng aloe vera o chitosan para mas matagal na panatilihing sariwa ang mga prutas",
        ],
        source: "Source: Journal of Plant Sciences (2025) – Study on Natural Coatings",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang post-harvest handling at storage! Mas matagal na magiging sariwa ang inyong ani at mas mataas ang halaga sa merkado.",
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
      <Text style={styles.flagEmoji}>🇺🇸</Text>
      <Text style={[styles.languageButtonText, currentLanguage === "en" && styles.activeLanguageButtonText]}>EN</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.languageButton, currentLanguage === "tl" && styles.activeLanguageButton]}
      onPress={() => onLanguageChange("tl")}
    >
      <Text style={styles.flagEmoji}>🇵🇭</Text>
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
export default function PostHarvestGuide() {
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

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.whyMatters.exampleTitle}</Text>
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

  const renderBestPracticesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.bestPractices.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.bestPractices.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.bestPractices.description}</Text>

      <View style={styles.practicesContainer}>
        {t.stepContent.bestPractices.practices.map((practice, index) => (
          <View key={index} style={styles.practiceCard}>
            <View style={[styles.practiceIconContainer, { backgroundColor: practice.color }]}>
              <Ionicons name={practice.icon} size={24} color="#fff" />
            </View>
            <View style={styles.practiceContent}>
              <Text style={styles.practiceStage}>{practice.stage}</Text>
              <Text style={styles.practicePractice}>{practice.practice}</Text>
              <Text style={styles.practiceReason}>{practice.reason}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="warning-outline" size={24} color="#DC2626" />
        <Text style={styles.tipText}>{t.stepContent.bestPractices.tip}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.bestPractices.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.bestPractices.button}
      </CompleteButton>
    </View>
  )

  const renderStorageMethodsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.storageMethods.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.storageMethods.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.storageMethods.description}</Text>

      <View style={styles.cropsContainer}>
        {t.stepContent.storageMethods.crops.map((crop, index) => (
          <View key={index} style={[styles.cropCard, { backgroundColor: crop.bgColor }]}>
            <View style={styles.cropHeader}>
              <Text style={styles.cropEmoji}>{crop.emoji}</Text>
              <Text style={styles.cropType}>{crop.type}</Text>
            </View>
            <View style={styles.cropDetails}>
              <View style={styles.cropRow}>
                <Text style={styles.cropLabel}>Storage:</Text>
                <Text style={styles.cropValue}>{crop.storage}</Text>
              </View>
              <View style={styles.cropRow}>
                <Text style={styles.cropLabel}>Duration:</Text>
                <Text style={[styles.cropDuration, { color: crop.color }]}>{crop.duration}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.newMethodsCard}>
        <Text style={styles.newMethodsTitle}>{t.stepContent.storageMethods.newMethodsTitle}</Text>
        <Text style={styles.newMethodsText}>{t.stepContent.storageMethods.newMethodsText}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.storageMethods.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.storageMethods.button}
      </CompleteButton>
    </View>
  )

  const renderCommonProblemsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.commonProblems.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.commonProblems.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.commonProblems.description}</Text>

      <View style={styles.problemsContainer}>
        {t.stepContent.commonProblems.problems.map((problem, index) => (
          <View key={index} style={styles.problemCard}>
            <View style={[styles.problemIconContainer, { backgroundColor: problem.color }]}>
              <Ionicons name={problem.icon} size={24} color="#fff" />
            </View>
            <View style={styles.problemContent}>
              <Text style={styles.problemTitle}>{problem.problem}</Text>
              <View style={styles.problemRow}>
                <Text style={styles.problemLabel}>What happens:</Text>
                <Text style={styles.problemValue}>{problem.whatHappens}</Text>
              </View>
              <View style={styles.problemRow}>
                <Text style={styles.problemLabel}>How to fix:</Text>
                <Text style={[styles.problemSolution, { color: problem.color }]}>{problem.howToFix}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.commonProblems.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.commonProblems.button}
      </CompleteButton>
    </View>
  )

  const renderActionPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionPlan.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.actionPlan.description}</Text>

      <View style={styles.basicStepsContainer}>
        {t.stepContent.actionPlan.basicSteps.map((step, index) => (
          <View key={index} style={styles.basicStepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.basicStepContent}>
              <Text style={styles.basicStepText}>{step}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.actionPlan.extraTipsTitle}</Text>
      <View style={styles.extraTipsContainer}>
        {t.stepContent.actionPlan.extraTips.map((tip, index) => (
          <View key={index} style={styles.extraTipItem}>
            <Ionicons name="bulb-outline" size={18} color="#D97706" />
            <Text style={styles.extraTipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.actionPlan.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.actionPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyMattersStep,
      renderBestPracticesStep,
      renderStorageMethodsStep,
      renderCommonProblemsStep,
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
              <Ionicons name="archive-outline" size={48} color="#16A34A" />
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
  flagEmoji: {
    fontSize: 10,
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
  exampleCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
  },
  exampleText: {
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
  practicesContainer: {
    marginBottom: 24,
  },
  practiceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  practiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  practiceContent: {
    flex: 1,
  },
  practiceStage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  practicePractice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#16A34A",
    marginBottom: 4,
  },
  practiceReason: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
    marginBottom: 24,
  },
  tipText: {
    fontSize: 15,
    color: "#DC2626",
    lineHeight: 22,
    marginLeft: 12,
    flex: 1,
    fontWeight: "500",
  },
  cropsContainer: {
    marginBottom: 24,
  },
  cropCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cropHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  cropEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  cropType: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  cropDetails: {
    padding: 16,
  },
  cropRow: {
    marginBottom: 8,
  },
  cropLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 2,
  },
  cropValue: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  cropDuration: {
    fontSize: 14,
    fontWeight: "600",
  },
  newMethodsCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  newMethodsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 8,
  },
  newMethodsText: {
    fontSize: 15,
    color: "#16A34A",
    lineHeight: 22,
  },
  problemsContainer: {
    marginBottom: 24,
  },
  problemCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  problemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  problemContent: {
    flex: 1,
  },
  problemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  problemRow: {
    marginBottom: 4,
  },
  problemLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 2,
  },
  problemValue: {
    fontSize: 14,
    color: "#DC2626",
    lineHeight: 20,
  },
  problemSolution: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  basicStepsContainer: {
    marginBottom: 24,
  },
  basicStepCard: {
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
  basicStepContent: {
    flex: 1,
  },
  basicStepText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
    lineHeight: 22,
  },
  extraTipsContainer: {
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  extraTipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  extraTipText: {
    fontSize: 15,
    color: "#D97706",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
    lineHeight: 22,
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
