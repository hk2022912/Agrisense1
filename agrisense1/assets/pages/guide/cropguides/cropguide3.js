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

// Translation data for companion planting
const TRANSLATIONS = {
  en: {
    headerTitle: "Companion Planting Techniques",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Why Use Companion Planting?", emoji: "🤝" },
      { title: "Proven Companion Pairings", emoji: "👥" },
      { title: "Seasonal Strategy", emoji: "📅" },
      { title: "Monitoring and Adjusting", emoji: "📊" },
      { title: "Beginner Steps", emoji: "🌱" },
    ],
    companionPairs: {
      threeSisters: {
        name: "Corn + Beans + Squash",
        plants: ["Corn", "Beans", "Squash"],
        benefits: "Structure, nitrogen, weed suppression",
        description:
          "The classic 'Three Sisters' combination where corn provides structure for beans to climb, beans fix nitrogen for all plants, and squash leaves suppress weeds while retaining soil moisture.",
        tips: [
          "Plant corn first, then beans 2-3 weeks later",
          "Add squash around the base",
          "Space properly for sunlight",
        ],
      },
      tomatoBasil: {
        name: "Tomatoes + Basil",
        plants: ["Tomatoes", "Basil"],
        benefits: "Pest control, flavor boost",
        description:
          "Basil repels aphids, spider mites, and hornworms from tomatoes while potentially improving tomato flavor. This classic Mediterranean pairing works in both garden and kitchen.",
        tips: ["Plant basil around tomato base", "Pinch basil flowers for better growth", "Harvest both together"],
      },
      carrotOnion: {
        name: "Carrots + Onions",
        plants: ["Carrots", "Onions", "Lettuce"],
        benefits: "Scent masking, root diversity",
        description:
          "Onions mask the scent of carrots from carrot flies, while carrots help break up soil for onion roots. Lettuce can be interplanted as it matures quickly.",
        tips: [
          "Alternate rows of carrots and onions",
          "Add lettuce between for space efficiency",
          "Harvest lettuce first",
        ],
      },
      cabbageDill: {
        name: "Cabbage + Dill",
        plants: ["Cabbage", "Dill"],
        benefits: "Attracts pest predators",
        description:
          "Dill attracts beneficial insects like parasitic wasps that prey on cabbage worms and aphids. The umbrella-shaped flowers provide landing platforms for beneficial insects.",
        tips: [
          "Let some dill go to flower",
          "Plant dill around cabbage perimeter",
          "Succession plant dill for continuous blooms",
        ],
      },
      cucumberRadish: {
        name: "Cucumbers + Radishes",
        plants: ["Cucumbers", "Radishes"],
        benefits: "Trap pests, improve soil",
        description:
          "Radishes act as trap crops for cucumber beetles and help break up compacted soil. They mature quickly, leaving space for cucumber vines to spread.",
        tips: [
          "Plant radishes first as trap crop",
          "Harvest radishes before cucumbers spread",
          "Use radish leaves as mulch",
        ],
      },
      repellentFlowers: {
        name: "Marigolds, Nasturtiums, Chives",
        plants: ["Marigolds", "Nasturtiums", "Chives"],
        benefits: "Repel pests, attract beneficials",
        description:
          "These companion plants serve as natural pest deterrents while attracting pollinators and beneficial insects. They can be planted throughout the garden as living mulch.",
        tips: [
          "Scatter throughout garden beds",
          "Choose varieties that bloom all season",
          "Deadhead for continuous flowers",
        ],
      },
    },
    stepContent: {
      whyUse: {
        title: "Why Use Companion Planting?",
        subtitle: "Discover the natural benefits of strategic plant partnerships",
        description:
          "Companion planting harnesses natural plant relationships to create healthier, more productive gardens.",
        benefits: [
          "Natural pest control",
          "Attracting pollinators and predators",
          "Enhancing soil health and moisture",
          "Providing structure and shade",
        ],
        sources: "Sources: Wikipedia, ResearchGate, MasterClass, GardeningKnowHow",
        button: "Learn Proven Pairings",
      },
      pairings: {
        title: "Proven Companion Pairings",
        subtitle: "Time-tested plant combinations - tap on cards to learn more",
        description: "These companion pairings have been proven effective by gardeners and researchers worldwide:",
        tip: "Tip: Intermix herbs and flowers with crops to deter pests and draw pollinators.",
        button: "Plan Seasonal Strategy",
      },
      seasonal: {
        title: "Seasonal Strategy",
        subtitle: "Multi-year companion planting rotation plan",
        description: "Rotate companion plantings annually to maximize benefits and prevent soil depletion:",
        tableTitle: "Multi-Year Plan Example:",
        years: [
          { year: 1, planting: "Corn + beans + squash" },
          { year: 2, planting: "Tomatoes with basil and marigolds" },
          { year: 3, planting: "Carrots–onions and lettuces–onions + dill" },
          { year: 4, planting: "Cucumbers + radishes + border chives" },
        ],
        button: "Learn Monitoring",
      },
      monitoring: {
        title: "Monitoring and Adjusting",
        subtitle: "Track success and optimize your companion plantings",
        aspects: [
          {
            title: "Record pest presence by pair",
            description: "Note which companion combinations effectively reduce pest problems",
            icon: "bug-outline",
          },
          {
            title: "Track beneficial insect activity",
            description: "Observe and document increases in pollinators and predatory insects",
            icon: "flower-outline",
          },
          {
            title: "Measure crop yields and flavor quality",
            description: "Compare harvests and taste from companion planted vs. solo crops",
            icon: "analytics-outline",
          },
          {
            title: "Rotate families to avoid allelopathy/pest buildup",
            description: "Prevent negative plant interactions and pest accumulation over time",
            icon: "refresh-outline",
          },
        ],
        button: "Show Beginner Steps",
      },
      beginnerSteps: {
        title: "Beginner Steps",
        subtitle: "Simple steps to start your companion planting journey",
        steps: [
          {
            title: "Draw a map of your garden",
            description: "Plan your space and identify areas suitable for different companion combinations",
          },
          {
            title: "Choose 3–5 companion pairs",
            description: "Start small with proven combinations that suit your climate and preferences",
          },
          {
            title: "Include herbs/flowers in every bed",
            description: "Add beneficial plants throughout your garden for maximum pest control and pollination",
          },
          {
            title: "Track outcomes seasonally",
            description: "Keep records of what works best in your specific growing conditions",
          },
          {
            title: "Adjust yearly based on results",
            description: "Modify your companion planting strategy based on your observations and results",
          },
        ],
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      plants: "Plants:",
      benefits: "Benefits:",
      tips: "Tips:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the art of companion planting! Your garden will be more productive, pest-resistant, and beautiful.",
      completionButton: "Fantastic!",
    },
  },
  tl: {
    headerTitle: "Mga Teknik sa Companion Planting",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Bakit Gumamit ng Companion Planting?", emoji: "🤝" },
      { title: "Napatunayang Companion Pairings", emoji: "👥" },
      { title: "Estratehiya sa Panahon", emoji: "📅" },
      { title: "Pagbabantay at Pag-aayos", emoji: "📊" },
      { title: "Mga Hakbang para sa Nagsisimula", emoji: "🌱" },
    ],
    companionPairs: {
      threeSisters: {
        name: "Mais + Sitaw + Kalabasa",
        plants: ["Mais", "Sitaw", "Kalabasa"],
        benefits: "Istraktura, nitrogen, pagsupil sa damo",
        description:
          "Ang klasikong 'Three Sisters' combination kung saan ang mais ay nagbibigay ng istraktura para sa sitaw na aakyatin, ang sitaw ay nag-fix ng nitrogen para sa lahat ng halaman, at ang dahon ng kalabasa ay sumusupil sa damo habang nagreretain ng moisture sa lupa.",
        tips: [
          "Itanim muna ang mais, tapos ang sitaw pagkatapos ng 2-3 linggo",
          "Idagdag ang kalabasa sa paligid ng base",
          "Mag-space nang tama para sa sikat ng araw",
        ],
      },
      tomatoBasil: {
        name: "Kamatis + Balanoy",
        plants: ["Kamatis", "Balanoy"],
        benefits: "Kontrol sa peste, pagpapabuti ng lasa",
        description:
          "Ang balanoy ay tumatakot sa aphids, spider mites, at hornworms mula sa kamatis habang posibleng pinapabuti ang lasa ng kamatis. Ang klasikong Mediterranean pairing na ito ay gumagana sa hardin at kusina.",
        tips: [
          "Itanim ang balanoy sa paligid ng base ng kamatis",
          "Pitasin ang mga bulaklak ng balanoy para sa mas magandang paglaki",
          "Mag-harvest ng pareho nang sabay",
        ],
      },
      carrotOnion: {
        name: "Karot + Sibuyas",
        plants: ["Karot", "Sibuyas", "Lettuce"],
        benefits: "Pagtago ng amoy, diversity ng ugat",
        description:
          "Ang sibuyas ay nagtago sa amoy ng karot mula sa carrot flies, habang ang karot ay tumutulong na sirain ang lupa para sa ugat ng sibuyas. Ang lettuce ay maaaring i-interplant dahil mabilis itong lumaki.",
        tips: [
          "Mag-alternate ng rows ng karot at sibuyas",
          "Idagdag ang lettuce sa pagitan para sa space efficiency",
          "Mag-harvest ng lettuce muna",
        ],
      },
      cabbageDill: {
        name: "Repolyo + Dill",
        plants: ["Repolyo", "Dill"],
        benefits: "Umaakit sa mga predator ng peste",
        description:
          "Ang dill ay umaakit sa beneficial insects tulad ng parasitic wasps na kumakain sa cabbage worms at aphids. Ang umbrella-shaped na mga bulaklak ay nagbibigay ng landing platforms para sa beneficial insects.",
        tips: [
          "Hayaang mamulak ang ilang dill",
          "Itanim ang dill sa paligid ng perimeter ng repolyo",
          "Mag-succession plant ng dill para sa tuloy-tuloy na bulaklak",
        ],
      },
      cucumberRadish: {
        name: "Pipino + Labanos",
        plants: ["Pipino", "Labanos"],
        benefits: "Trap pests, pagpapabuti ng lupa",
        description:
          "Ang labanos ay gumagawa bilang trap crops para sa cucumber beetles at tumutulong na sirain ang compacted soil. Mabilis silang lumaki, nag-iiwan ng space para sa cucumber vines na kumalat.",
        tips: [
          "Itanim muna ang labanos bilang trap crop",
          "Mag-harvest ng labanos bago kumalat ang pipino",
          "Gamitin ang dahon ng labanos bilang mulch",
        ],
      },
      repellentFlowers: {
        name: "Marigolds, Nasturtiums, Chives",
        plants: ["Marigolds", "Nasturtiums", "Chives"],
        benefits: "Tumatakot sa peste, umaakit sa beneficial",
        description:
          "Ang mga companion plants na ito ay nagsisilbi bilang natural na pest deterrents habang umaakit sa pollinators at beneficial insects. Maaari silang itanim sa buong hardin bilang living mulch.",
        tips: [
          "Ikalat sa buong garden beds",
          "Pumili ng varieties na namumulaklak buong season",
          "Mag-deadhead para sa tuloy-tuloy na bulaklak",
        ],
      },
    },
    stepContent: {
      whyUse: {
        title: "Bakit Gumamit ng Companion Planting?",
        subtitle: "Tuklasin ang natural na benepisyo ng strategic plant partnerships",
        description:
          "Ang companion planting ay gumagamit ng natural na relasyon ng mga halaman para makagawa ng mas malusog at mas produktibong hardin.",
        benefits: [
          "Natural na kontrol sa peste",
          "Pag-akit sa mga pollinators at predators",
          "Pagpapabuti ng kalusugan at moisture ng lupa",
          "Pagbibigay ng istraktura at lilim",
        ],
        sources: "Sources: Wikipedia, ResearchGate, MasterClass, GardeningKnowHow",
        button: "Matuto ng Napatunayang Pairings",
      },
      pairings: {
        title: "Napatunayang Companion Pairings",
        subtitle: "Mga time-tested na kombinasyon ng halaman - pindutin ang mga card para matuto pa",
        description:
          "Ang mga companion pairings na ito ay napatunayan nang epektibo ng mga hardinero at researchers sa buong mundo:",
        tip: "Tip: Ihalo ang mga herbs at bulaklak sa mga pananim para takutin ang peste at akitin ang pollinators.",
        button: "Magplano ng Seasonal Strategy",
      },
      seasonal: {
        title: "Estratehiya sa Panahon",
        subtitle: "Multi-year companion planting rotation plan",
        description:
          "Mag-rotate ng companion plantings taun-taon para ma-maximize ang benefits at maiwasan ang soil depletion:",
        tableTitle: "Halimbawa ng Multi-Year Plan:",
        years: [
          { year: 1, planting: "Mais + sitaw + kalabasa" },
          { year: 2, planting: "Kamatis na may balanoy at marigolds" },
          { year: 3, planting: "Karot–sibuyas at lettuce–sibuyas + dill" },
          { year: 4, planting: "Pipino + labanos + border chives" },
        ],
        button: "Matuto ng Monitoring",
      },
      monitoring: {
        title: "Pagbabantay at Pag-aayos",
        subtitle: "Bantayan ang tagumpay at i-optimize ang inyong companion plantings",
        aspects: [
          {
            title: "Mag-record ng pest presence by pair",
            description: "Tandaan kung aling companion combinations ang epektibong nagbabawas ng pest problems",
            icon: "bug-outline",
          },
          {
            title: "Bantayan ang beneficial insect activity",
            description: "Obserbahan at i-document ang pagtaas ng pollinators at predatory insects",
            icon: "flower-outline",
          },
          {
            title: "Sukatin ang crop yields at flavor quality",
            description: "Ihambing ang ani at lasa mula sa companion planted vs. solo crops",
            icon: "analytics-outline",
          },
          {
            title: "Mag-rotate ng families para maiwasan ang allelopathy/pest buildup",
            description: "Pigilan ang negative plant interactions at pest accumulation sa paglipas ng panahon",
            icon: "refresh-outline",
          },
        ],
        button: "Ipakita ang Beginner Steps",
      },
      beginnerSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simpleng hakbang para simulan ang inyong companion planting journey",
        steps: [
          {
            title: "Gumawa ng mapa ng inyong hardin",
            description:
              "Magplano ng inyong space at kilalanin ang mga lugar na angkop para sa iba't ibang companion combinations",
          },
          {
            title: "Pumili ng 3–5 companion pairs",
            description: "Magsimula sa maliit na may napatunayang combinations na angkop sa inyong klima at preference",
          },
          {
            title: "Isama ang herbs/flowers sa bawat bed",
            description: "Magdagdag ng beneficial plants sa buong hardin para sa maximum pest control at pollination",
          },
          {
            title: "Bantayan ang mga resulta bawat season",
            description: "Mag-keep ng records kung ano ang pinakamahusay sa inyong specific growing conditions",
          },
          {
            title: "Mag-adjust taun-taon base sa mga resulta",
            description: "Baguhin ang inyong companion planting strategy base sa inyong observations at mga resulta",
          },
        ],
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      plants: "Mga Halaman:",
      benefits: "Mga Benepisyo:",
      tips: "Mga Tip:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang sining ng companion planting! Mas magiging produktibo, pest-resistant, at maganda ang inyong hardin.",
      completionButton: "Napakagaling!",
    },
  },
}

// Data constants for companion pairs
const COMPANION_GROUPS = {
  threeSisters: { color: "#16A34A", bgColor: "#DCFCE7", emoji: "🌽" },
  tomatoBasil: { color: "#DC2626", bgColor: "#FEE2E2", emoji: "🍅" },
  carrotOnion: { color: "#EA580C", bgColor: "#FED7AA", emoji: "🥕" },
  cabbageDill: { color: "#059669", bgColor: "#A7F3D0", emoji: "🥬" },
  cucumberRadish: { color: "#0891B2", bgColor: "#CFFAFE", emoji: "🥒" },
  repellentFlowers: { color: "#7C3AED", bgColor: "#EDE9FE", emoji: "🌻" },
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

// Interactive Companion Pair Card (with modal for pairings step only)
const CompanionPairCard = ({ pairKey, pair, onPress, t, interactive = false }) => (
  <TouchableOpacity
    style={[styles.companionCard, { backgroundColor: pair.bgColor }]}
    onPress={interactive ? () => onPress(pairKey) : undefined}
    activeOpacity={interactive ? 0.7 : 1}
    disabled={!interactive}
  >
    <Text style={styles.companionEmoji}>{pair.emoji}</Text>
    <View style={styles.companionInfo}>
      <Text style={styles.companionName}>{t.companionPairs[pairKey].name}</Text>
      <View style={[styles.companionBadge, { backgroundColor: pair.color }]}>
        <Text style={styles.companionBadgeText}>{t.companionPairs[pairKey].benefits}</Text>
      </View>
      <Text style={styles.companionPlants}>
        {t.modal.plants} {t.companionPairs[pairKey].plants.join(", ")}
      </Text>
    </View>
    {interactive && <Ionicons name="chevron-forward" size={20} color={pair.color} />}
  </TouchableOpacity>
)

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function CompanionPlantingGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedPair, setSelectedPair] = useState(null)
  const [showPairModal, setShowPairModal] = useState(false)
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

  const handlePairPress = (pairKey) => {
    setSelectedPair({
      ...COMPANION_GROUPS[pairKey],
      ...t.companionPairs[pairKey],
      key: pairKey,
    })
    setShowPairModal(true)
  }

  const renderWhyUseStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.whyUse.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.whyUse.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.whyUse.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whyUse.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.whyUse.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyUse.button}
      </CompleteButton>
    </View>
  )

  const renderPairingsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.pairings.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.pairings.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.pairings.description}</Text>

      <View style={styles.companionsContainer}>
        {Object.entries(COMPANION_GROUPS).map(([key, pair]) => (
          <CompanionPairCard key={key} pairKey={key} pair={pair} onPress={handlePairPress} t={t} interactive={true} />
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <Text style={styles.tipText}>{t.stepContent.pairings.tip}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.pairings.button}
      </CompleteButton>
    </View>
  )

  const renderSeasonalStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.seasonal.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.seasonal.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.seasonal.description}</Text>

      <Text style={styles.tableTitle}>{t.stepContent.seasonal.tableTitle}</Text>

      <View style={styles.seasonalTable}>
        {t.stepContent.seasonal.years.map((yearData, index) => (
          <View key={index} style={styles.seasonalRow}>
            <View style={styles.yearCell}>
              <Text style={styles.yearText}>Year {yearData.year}</Text>
            </View>
            <View style={styles.plantingCell}>
              <Text style={styles.plantingText}>{yearData.planting}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.seasonal.button}
      </CompleteButton>
    </View>
  )

  const renderMonitoringStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.monitoring.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.monitoring.subtitle}</Text>

      <View style={styles.monitoringGrid}>
        {t.stepContent.monitoring.aspects.map((aspect, index) => (
          <View key={index} style={styles.monitoringItem}>
            <View style={styles.monitoringIconContainer}>
              <Ionicons name={aspect.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.monitoringContent}>
              <Text style={styles.monitoringTitle}>{aspect.title}</Text>
              <Text style={styles.monitoringDescription}>{aspect.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.monitoring.button}
      </CompleteButton>
    </View>
  )

  const renderBeginnerStepsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.beginnerSteps.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.beginnerSteps.subtitle}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.beginnerSteps.steps.map((step, index) => (
          <View key={index} style={styles.actionStepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <View style={styles.actionStepContent}>
              <Text style={styles.actionStepTitle}>{step.title}</Text>
              <Text style={styles.actionStepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.beginnerSteps.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyUseStep,
      renderPairingsStep,
      renderSeasonalStep,
      renderMonitoringStep,
      renderBeginnerStepsStep,
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

      {/* Companion Pair Modal (only for Proven Pairings step) */}
      <Modal
        visible={showPairModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPairModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPair && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalEmoji}>{selectedPair.emoji}</Text>
                    <Text style={styles.modalTitle}>{selectedPair.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowPairModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: selectedPair.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedPair.benefits}</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedPair.description}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.plants}</Text>
                <Text style={styles.modalPlants}>{selectedPair.plants.join(", ")}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.tips}</Text>
                {selectedPair.tips.map((tip, index) => (
                  <View key={index} style={styles.modalTipItem}>
                    <Ionicons name="bulb-outline" size={16} color="#D97706" />
                    <Text style={styles.modalTipText}>{tip}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>

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
              <Ionicons name="flower-outline" size={48} color="#16A34A" />
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
    minWidth: 160,
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
  tableTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
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
  companionsContainer: {
    marginBottom: 24,
  },
  companionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  companionEmoji: {
    fontSize: 36,
    marginRight: 16,
  },
  companionInfo: {
    flex: 1,
  },
  companionName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  companionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  companionBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  companionPlants: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
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
  seasonalTable: {
    marginBottom: 24,
  },
  seasonalRow: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  yearCell: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  yearText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  plantingCell: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  plantingText: {
    fontSize: 15,
    color: "#374151",
    fontWeight: "500",
  },
  monitoringGrid: {
    marginBottom: 24,
  },
  monitoringItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  monitoringIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  monitoringContent: {
    flex: 1,
  },
  monitoringTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  monitoringDescription: {
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
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  stepNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  actionStepContent: {
    flex: 1,
  },
  actionStepTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  actionStepDescription: {
    fontSize: 15,
    color: "#6B7280",
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
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#16A34A",
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  modalBadgeText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "700",
  },
  modalDescription: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
    marginTop: 8,
  },
  modalPlants: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalTipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  modalTipText: {
    fontSize: 15,
    color: "#374151",
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
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
