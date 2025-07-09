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

// Translation data for harvest timing guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Harvest Timing and Techniques",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Why Harvest Timing Is Important", emoji: "⏰" },
      { title: "Signs Your Crop Is Ready", emoji: "🔍" },
      { title: "How to Reduce Harvest Losses", emoji: "📉" },
      { title: "Manual vs Machine Harvesting", emoji: "🚜" },
      { title: "Beginner Action Plan", emoji: "📋" },
    ],
    stepContent: {
      importance: {
        title: "Why Harvest Timing Is Important",
        subtitle: "Learn the right time to harvest so you can keep more of your crops and protect their quality",
        definition:
          "Harvesting at the wrong time can reduce the crop's value and quality, leading to significant losses.",
        problems: "Common Problems:",
        issues: [
          { timing: "Too Early", effects: "Crops may be small, less tasty, or low in nutrients" },
          { timing: "Too Late", effects: "Crops may break apart (shatter), spoil, or get damaged by pests or mold" },
          { timing: "Wrong Time", effects: "Quality for selling drops and nutrition in the crop may go down" },
        ],
        example: "Example:",
        studyResult:
          "A 2024 study in Ukraine found that harvesting winter wheat on time helped keep 14–22% more yield and increased protein content in the grain.",
        scientificSources: "Source: Gamayunova et al., 2024 – Resource-Saving Wheat Production",
        button: "Learn Harvest Signs",
      },
      signs: {
        title: "Signs Your Crop Is Ready to Harvest",
        subtitle: "Know exactly when each crop is at its peak for harvesting",
        definition:
          "Different crops have different signs that tell you when they're ready. Here's how to identify the perfect timing:",
        crops: [
          {
            crop: "Maize",
            signs: "Husk is dry; dark layer at kernel base",
            method: "By hand or stripper machine",
            color: "#F59E0B",
            bgColor: "#FEF3C7",
          },
          {
            crop: "Rice",
            signs: "80–85% of the panicles turn brown",
            method: "Sickle or harvester",
            color: "#8B5CF6",
            bgColor: "#EDE9FE",
          },
          {
            crop: "Tomatoes",
            signs: "Fully red with no green spots",
            method: "By hand",
            color: "#EF4444",
            bgColor: "#FEE2E2",
          },
          {
            crop: "Leafy Greens",
            signs: "Leaves are firm and crisp, before they flower",
            method: "Knife or scissors",
            color: "#10B981",
            bgColor: "#D1FAE5",
          },
          {
            crop: "Potatoes",
            signs: "Vines dry up; skin is firm and set",
            method: "Fork or blade",
            color: "#92400E",
            bgColor: "#FEF3C7",
          },
        ],
        tip: "Tip:",
        tipText: "Harvest during cool hours—early morning or late afternoon—to reduce wilting and spoilage.",
        button: "Learn Loss Reduction",
      },
      losses: {
        title: "How to Reduce Harvest Losses",
        subtitle: "Proven methods to minimize crop damage and waste during harvest",
        definition: "Following these practices can significantly reduce your harvest losses and maintain crop quality:",
        methods: [
          {
            method: "Use Sharp Tools",
            description: "Sharp tools make clean cuts and avoid damaging the crop",
            icon: "cut-outline",
          },
          {
            method: "Handle Gently",
            description: "Gentle handling prevents bruising and maintains quality",
            icon: "hand-left-outline",
          },
          {
            method: "Clean Tools",
            description: "Clean your tools between crops to stop disease spread",
            icon: "medical-outline",
          },
          {
            method: "Immediate Shade",
            description: "Keep harvested items in the shade right away",
            icon: "umbrella-outline",
          },
          {
            method: "Quick Transport",
            description: "Transport quickly to a cool storage area",
            icon: "car-outline",
          },
        ],
        scientificSources: "Source: FAO Harvesting Guide (2023)",
        button: "Compare Harvesting Methods",
      },
      methods: {
        title: "Manual vs Machine Harvesting",
        subtitle: "Understanding different harvesting approaches and their trade-offs",
        definition:
          "Each harvesting method has its own advantages and challenges. Choose based on your farm size and resources:",
        methods: [
          {
            type: "Manual",
            benefits: "Low cost, easy to harvest carefully",
            challenges: "Slow, needs more labor",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Mechanized",
            benefits: "Fast, handles large harvests",
            challenges: "Machines cost more; can bruise crops",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Semi-mechanized",
            benefits: "Small tools (cutters, mini-harvesters), good for small farms",
            challenges: "Moderate speed, still requires some manual work",
            color: "#D97706",
            bgColor: "#FEF3C7",
          },
        ],
        insight: "Study Insight:",
        insightText:
          "Mechanized rice harvesting can save 30–50% labor time and improve how fast you move crops to storage.",
        scientificSources: "Source: Yadav et al., 2023 – Advances in Harvest Technology (Agris)",
        button: "Get Action Plan",
      },
      actionPlan: {
        title: "Beginner Action Plan",
        subtitle: "Simple steps to get started with proper harvest timing and techniques",
        definition: "Follow these practical steps to improve your harvesting success:",
        steps: [
          {
            step: "Learn the signs your crop is ready",
            description: "Study the specific indicators for each crop you grow to time harvest perfectly",
          },
          {
            step: "Use clean, sharp tools",
            description: "Maintain your harvesting tools to ensure clean cuts and prevent disease spread",
          },
          {
            step: "Harvest during cool times of day",
            description: "Early morning or late afternoon harvesting reduces stress on crops",
          },
          {
            step: "Keep crops shaded right after picking",
            description: "Immediate shade protection maintains quality and prevents wilting",
          },
          {
            step: "Don't pile produce too high in crates",
            description: "Avoid crushing bottom layers by limiting pile height",
          },
          {
            step: "Record when you harvested, how much, and the crop quality",
            description: "Keep detailed records to improve timing for future harvests",
          },
        ],
        tryThis: "Try this:",
        tryThisText:
          "Start by harvesting 1–2 rows at perfect ripeness, then compare how long they stay fresh vs. later-harvested crops.",
        button: "I'm Ready to Harvest!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand proper harvest timing and techniques to maximize your crop quality, reduce losses, and improve your farming success!",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Tamang Oras at Paraan ng Pag-ani",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Bakit Mahalaga ang Tamang Oras ng Pag-ani", emoji: "⏰" },
      { title: "Mga Palatandaan na Handa na ang Pananim", emoji: "🔍" },
      { title: "Paano Mabawasan ang Pagkalugi sa Pag-ani", emoji: "📉" },
      { title: "Manual vs Machine na Pag-ani", emoji: "🚜" },
      { title: "Action Plan para sa Nagsisimula", emoji: "📋" },
    ],
    stepContent: {
      importance: {
        title: "Bakit Mahalaga ang Tamang Oras ng Pag-ani",
        subtitle: "Matuto ng tamang oras para sa pag-ani upang mapanatili ang kalidad at mabawasan ang sayang",
        definition:
          "Ang pag-ani sa maling oras ay maaaring mabawasan ang halaga at kalidad ng pananim, na magdudulot ng malaking pagkalugi.",
        problems: "Mga Karaniwang Problema:",
        issues: [
          { timing: "Masyadong Maaga", effects: "Maaaring maliit, hindi masarap, o kulang sa nutrients ang pananim" },
          { timing: "Masyadong Huli", effects: "Maaaring masira, mabulok, o makain ng peste o amag ang pananim" },
          { timing: "Maling Oras", effects: "Bumababa ang kalidad para sa pagbebenta at nutrition ng pananim" },
        ],
        example: "Halimbawa:",
        studyResult:
          "Ang 2024 study sa Ukraine ay natagpuan na ang pag-ani ng winter wheat sa tamang oras ay nakatulong na mapanatili ang 14–22% na dagdag na ani at nagtaas ng protein content sa butil.",
        scientificSources: "Source: Gamayunova et al., 2024 – Resource-Saving Wheat Production",
        button: "Matuto ng Mga Palatandaan",
      },
      signs: {
        title: "Mga Palatandaan na Handa na ang Pananim",
        subtitle: "Alamin kung kailan eksaktong handa na ang bawat pananim para sa pag-ani",
        definition:
          "Iba't ibang pananim ay may iba't ibang palatandaan na nagsasabi kung handa na sila. Narito kung paano kilalanin ang perpektong timing:",
        crops: [
          {
            crop: "Mais",
            signs: "Tuyo na ang balat; may itim na layer sa base ng butil",
            method: "Sa kamay o stripper machine",
            color: "#F59E0B",
            bgColor: "#FEF3C7",
          },
          {
            crop: "Palay",
            signs: "80–85% ng mga panicle ay naging brown na",
            method: "Karit o harvester",
            color: "#8B5CF6",
            bgColor: "#EDE9FE",
          },
          {
            crop: "Kamatis",
            signs: "Lubos na pula na walang berdeng bahagi",
            method: "Sa kamay",
            color: "#EF4444",
            bgColor: "#FEE2E2",
          },
          {
            crop: "Mga Dahong Gulay",
            signs: "Matigas at presko ang mga dahon, bago pa mamulak",
            method: "Kutsilyo o gunting",
            color: "#10B981",
            bgColor: "#D1FAE5",
          },
          {
            crop: "Patatas",
            signs: "Natuyo na ang mga sanga; matigas na ang balat",
            method: "Tinidor o blade",
            color: "#92400E",
            bgColor: "#FEF3C7",
          },
        ],
        tip: "Tip:",
        tipText: "Mag-ani sa malamig na oras—madaling umaga o hapon—para mabawasan ang pagkalanta at pagkasira.",
        button: "Matuto ng Pagbawas ng Pagkalugi",
      },
      losses: {
        title: "Paano Mabawasan ang Pagkalugi sa Pag-ani",
        subtitle: "Napatunayang mga paraan para mabawasan ang pinsala at sayang sa pananim",
        definition:
          "Ang pagsunod sa mga practice na ito ay maaaring malaking mabawasan ang inyong pagkalugi sa pag-ani at mapanatili ang kalidad:",
        methods: [
          {
            method: "Gumamit ng Matalas na Kasangkapan",
            description: "Ang matalas na kasangkapan ay gumagawa ng malinis na hiwa at hindi nakakapinsala sa pananim",
            icon: "cut-outline",
          },
          {
            method: "Maingat na Paghawak",
            description: "Ang maingat na paghawak ay pumipigil sa pasa at pinapanatili ang kalidad",
            icon: "hand-left-outline",
          },
          {
            method: "Linisin ang mga Kasangkapan",
            description: "Linisin ang mga kasangkapan sa pagitan ng mga pananim para pigilan ang pagkalat ng sakit",
            icon: "medical-outline",
          },
          {
            method: "Agad na Lilim",
            description: "Ilagay agad sa lilim ang mga naaning pananim",
            icon: "umbrella-outline",
          },
          {
            method: "Mabilis na Transportasyon",
            description: "Mabilis na dalhin sa malamig na storage area",
            icon: "car-outline",
          },
        ],
        scientificSources: "Source: FAO Harvesting Guide (2023)",
        button: "Ikumpara ang Mga Paraan ng Pag-ani",
      },
      methods: {
        title: "Manual vs Machine na Pag-ani",
        subtitle: "Pag-unawa sa iba't ibang approach sa pag-ani at ang kanilang mga trade-offs",
        definition:
          "Bawat paraan ng pag-ani ay may sariling mga bentahe at hamon. Pumili base sa laki ng inyong sakahan at resources:",
        methods: [
          {
            type: "Manual",
            benefits: "Mababang gastos, madaling mag-ani nang maingat",
            challenges: "Mabagal, kailangan ng maraming manggagawa",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Mechanized",
            benefits: "Mabilis, kaya ang malalaking ani",
            challenges: "Mas mahal ang mga makina; maaaring mapasa ang pananim",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Semi-mechanized",
            benefits: "Maliliit na kasangkapan (cutters, mini-harvesters), maganda para sa maliliit na sakahan",
            challenges: "Katamtamang bilis, kailangan pa rin ng manual na trabaho",
            color: "#D97706",
            bgColor: "#FEF3C7",
          },
        ],
        insight: "Study Insight:",
        insightText:
          "Ang mechanized rice harvesting ay maaaring makatipid ng 30–50% labor time at mapabuti ang bilis ng paglipat ng pananim sa storage.",
        scientificSources: "Source: Yadav et al., 2023 – Advances in Harvest Technology (Agris)",
        button: "Kunin ang Action Plan",
      },
      actionPlan: {
        title: "Action Plan para sa Nagsisimula",
        subtitle: "Simpleng mga hakbang para magsimula sa tamang oras at paraan ng pag-ani",
        definition: "Sundin ang mga practical na hakbang na ito para mapabuti ang inyong tagumpay sa pag-ani:",
        steps: [
          {
            step: "Matuto ng mga palatandaan na handa na ang pananim",
            description: "Pag-aralan ang mga specific na indicator para sa bawat pananim na inyong tinanim",
          },
          {
            step: "Gumamit ng malinis at matalas na kasangkapan",
            description: "Alagaan ang mga kasangkapan para sa pag-ani upang masiguro ang malinis na hiwa",
          },
          {
            step: "Mag-ani sa malamig na oras ng araw",
            description: "Madaling umaga o hapon na pag-ani ay binabawasan ang stress sa pananim",
          },
          {
            step: "Ilagay agad sa lilim ang pananim pagkatapos pitasin",
            description: "Agad na proteksyon sa lilim ay pinapanatili ang kalidad at pinipigilan ang pagkalanta",
          },
          {
            step: "Huwag masyadong itaas ang pananim sa mga kahon",
            description: "Iwasan ang pagkakadurog ng mga nasa ibaba sa pamamagitan ng paglilimita sa taas",
          },
          {
            step: "I-record kung kailan kayo nag-ani, magkano, at ang kalidad ng pananim",
            description: "Mag-keep ng detalyadong records para mapabuti ang timing sa susunod na ani",
          },
        ],
        tryThis: "Subukan ito:",
        tryThisText:
          "Magsimula sa pag-ani ng 1–2 hilera sa perpektong hinog, tapos ikumpara kung gaano katagal silang nanatiling sariwa kumpara sa mga na-ani nang huli.",
        button: "Handa na Akong Mag-ani!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang tamang oras at paraan ng pag-ani para ma-maximize ang kalidad ng inyong pananim, mabawasan ang pagkalugi, at mapabuti ang inyong tagumpay sa pagsasaka!",
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
export default function HarvestTimingGuide() {
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

      <Text style={styles.sectionTitle}>{t.stepContent.importance.problems}</Text>
      <View style={styles.impactsContainer}>
        {t.stepContent.importance.issues.map((issue, index) => (
          <View key={index} style={styles.impactCard}>
            <View style={styles.impactIcon}>
              <Ionicons name="warning-outline" size={20} color="#DC2626" />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactArea}>{issue.timing}</Text>
              <Text style={styles.impactEffect}>{issue.effects}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.importance.example}</Text>
        <Text style={styles.exampleText}>{t.stepContent.importance.studyResult}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.importance.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.importance.button}
      </CompleteButton>
    </View>
  )

  const renderSignsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.signs.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.signs.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.signs.definition}</Text>

      <View style={styles.methodsContainer}>
        {t.stepContent.signs.crops.map((crop, index) => (
          <View key={index} style={[styles.methodCard, { backgroundColor: crop.bgColor }]}>
            <View style={styles.methodHeader}>
              <Text style={[styles.methodType, { color: crop.color }]}>{crop.crop}</Text>
            </View>
            <View style={styles.methodDetails}>
              <Text style={styles.methodExamples}>{crop.signs}</Text>
              <Text style={styles.methodEffectiveness}>{crop.method}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.reminderCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>{t.stepContent.signs.tip}</Text>
          <Text style={styles.reminderText}>{t.stepContent.signs.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.signs.button}
      </CompleteButton>
    </View>
  )

  const renderLossesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.losses.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.losses.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.losses.definition}</Text>

      <View style={styles.strategiesContainer}>
        {t.stepContent.losses.methods.map((method, index) => (
          <View key={index} style={styles.strategyItem}>
            <View style={styles.strategyIconContainer}>
              <Ionicons name={method.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.strategyContent}>
              <Text style={styles.strategyTitle}>{method.method}</Text>
              <Text style={styles.strategyEffect}>{method.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.losses.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.losses.button}
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
              <Text style={styles.methodExamples}>Benefits: {method.benefits}</Text>
              <Text style={styles.methodEffectiveness}>Challenges: {method.challenges}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.methods.insight}</Text>
        <Text style={styles.exampleText}>{t.stepContent.methods.insightText}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.methods.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.methods.button}
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
              <Text style={styles.actionStepTitle}>{step.step}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.reminderCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.reminderContent}>
          <Text style={styles.reminderTitle}>{t.stepContent.actionPlan.tryThis}</Text>
          <Text style={styles.reminderText}>{t.stepContent.actionPlan.tryThisText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.actionPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [renderImportanceStep, renderSignsStep, renderLossesStep, renderMethodsStep, renderActionPlanStep]
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
              <Ionicons name="time-outline" size={48} color="#16A34A" />
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
  strategyEffect: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  stepsContainer: {
    marginBottom: 24,
  },
  actionStepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  stepNumberText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  stepContent: {
    flex: 1,
    marginTop: 2,
  },
  actionStepTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
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
})
