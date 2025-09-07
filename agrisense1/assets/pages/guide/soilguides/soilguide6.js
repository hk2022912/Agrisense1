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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

// Translation data for Crop Rotation Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Crop Rotation Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "Understand Crop Rotation", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Suppress Pests and Diseases", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Rebalance Soil Nutrients", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "Sample Rotation Planning", icon: "calendar-outline", iconLibrary: "Ionicons" },
      { title: "Monitor and Adapting Strategy", icon: "analytics-outline", iconLibrary: "Ionicons" },
      { title: "Beginner’s Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    cropGroups: {
      legumes: {
        name: "Legumes",
        role: "Nitrogen Fixers",
        examples: ["Mungbean", "Peanuts"],
        description: "Legumes fix nitrogen in the soil, enriching it for subsequent crops.",
        benefits: ["Increases soil nitrogen", "Reduces fertilizer needs", "Improves soil structure"],
      },
      leafy: {
        name: "Leafy Crops",
        role: "Nitrogen Consumers",
        examples: ["Cabbage", "Lettuce"],
        description: "Leafy crops use significant nitrogen, benefiting from legume predecessors.",
        benefits: ["High yield with rich soil", "Improves soil aeration", "Supports crop diversity"],
      },
      fruiting: {
        name: "Fruiting Crops",
        role: "Phosphorus/Potassium Users",
        examples: ["Tomato", "Pepper"],
        description: "Fruiting crops require more phosphorus and potassium for fruit development.",
        benefits: ["Enhances fruit quality", "Balances nutrient draw", "Reduces pest buildup"],
      },
      root: {
        name: "Root Crops",
        role: "Moderate Nutrient Users",
        examples: ["Onion", "Carrot"],
        description: "Root crops use moderate nutrients, helping maintain soil balance.",
        benefits: ["Prevents nutrient depletion", "Improves soil texture", "Reduces weed pressure"],
      },
    },
    stepContent: {
      rotation: {
        title: "Understand the Power of Rotation",
        subtitle: "Breaking Pest Cycles and Restoring Soil Balance",
        description:
          "Crop rotation is the practice of growing different crops in a specific sequence on the same land over several seasons or years. It prevents soil fatigue and disrupts pest and disease buildup.",
        benefits: [
          "Breaks pest and disease life cycles",
          "Reduces dependence on chemical pesticides",
          "Balances soil nutrients naturally",
          "Enhances soil microbial health and structure",
          "Improves crop yield and farm resilience",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Crop rotation can reduce pest pressure by up to 60–80% and improve soil fertility, cutting fertilizer use significantly.",
        sources: "Sources: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fpls.2020.00292/full",
        button: "Got It! Let's Start Rotating",
      },
      pests: {
        title: "Suppress Pests and Diseases",
        subtitle: "Disrupting Pest Lifecycles",
        description:
          "Rotating crops disrupts the life cycles of pests and pathogens by removing their preferred host plants, reducing fungal diseases and weed pressure.",
        examples: [
          "Rotating out of tomato or pepper breaks the life cycle of root-knot nematodes.",
          "Reduces fungal diseases like wilt, blight, and rust in monocropping systems.",
          "Different crops shade or compete differently, reducing dominance of certain weeds.",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText: "Research shows 3-year rotations can reduce pest pressure by up to 60–80% compared to monocropping.",
        sources: "Sources: agronomyjournal.org | nature.com",
        button: "Learn Nutrient Balancing!",
      },
      nutrients: {
        title: "Rebalance Soil Nutrients",
        subtitle: "Crop Grouping for Soil Health",
        description:
          "Crops use and return nutrients differently. Rotation prevents depletion and overuse of specific nutrients, maintaining soil health.",
        tipTitle: "Farmer Tip:",
        tipText: "Follow this sequence: Legumes → Leaves → Fruits → Roots → Legumes again.",
        button: "Explore Rotation Plans!",
      },
      plan: {
        title: "Sample 3- to 4-Year Rotation Plan",
        subtitle: "Structured Crop Sequencing",
        description: "A 4-plot rotation plan prevents nutrient exhaustion, breaks pest cycles, and stabilizes yields over time.",
        table: [
          { year: "Year 1", plotA: "Legumes", plotB: "Leafy Crops", plotC: "Fruiting Crops", plotD: "Root Crops" },
          { year: "Year 2", plotA: "Leafy Crops", plotB: "Fruiting Crops", plotC: "Root Crops", plotD: "Legumes" },
          { year: "Year 3", plotA: "Fruiting Crops", plotB: "Root Crops", plotC: "Legumes", plotD: "Leafy Crops" },
          { year: "Year 4", plotA: "Root Crops", plotB: "Legumes", plotC: "Leafy Crops", plotD: "Fruiting Crops" },
        ],
        source: "Source: li01.tci-thaijo.org/index.php/anres/article/view/260446",
        button: "Learn to Monitor and Adapt!",
      },
      monitor: {
        title: "Monitor and Adapt Each Season",
        subtitle: "Tracking Soil and Crop Health",
        description: "Regularly monitor plant performance and soil conditions to adapt your rotation plan effectively.",
        steps: [
          "Observe plant performance: yellowing, stunting, pest outbreaks",
          "Test N-P-K levels yearly",
          "Adjust crop order if issues persist",
          "Use legume rotations in wet seasons",
          "Avoid repeating the same crop family in one plot for 2–3 years",
        ],
        tipTitle: "Farmer Tip:",
        tipText: "No single crop should rule the land. Rotate to confuse pests and feed the soil.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner’s Action Steps",
        subtitle: "Start Rotating Today",
        steps: [
          { title: "Divide land into 3 to 5 plots", description: "Organize your farm for rotation" },
          { title: "Group crops by nutrient and pest patterns", description: "Plan based on crop families" },
          { title: "Design a 3- to 4-year rotation plan", description: "Create a sustainable sequence" },
          { title: "Include fallow or cover crops", description: "Enhance soil recovery" },
          { title: "Keep a field journal", description: "Track results and observations" },
          { title: "Seek local advice", description: "Consult agri-extension workers for regional tips" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Use apps to track planting schedules and crop groups for better planning.",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText: "You've mastered the basics of crop rotation. Your farm will thrive with this knowledge!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Pag-ikot ng Pananim",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Unawain ang Pag-ikot ng Pananim", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Pigilan ang mga Peste at Sakit", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Balanseng Sustansya sa Lupa", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "Halimbawa ng Plano sa Pag-ikot", icon: "calendar-outline", iconLibrary: "Ionicons" },
      { title: "Subaybayan at I-adjust", icon: "analytics-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    cropGroups: {
      legumes: {
        name: "Mga Legumbre",
        role: "Nag-aayos ng Nitrogen",
        examples: ["Munggo", "Mani"],
        description: "Ang mga legumbre ay nag-aayos ng nitrogen sa lupa, na nagpapayaman dito para sa susunod na pananim.",
        benefits: ["Nagdaragdag ng nitrogen sa lupa", "Binabawasan ang pangangailangan ng pataba", "Pinapabuti ang istruktura ng lupa"],
      },
      leafy: {
        name: "Mga Madahong Pananim",
        role: "Kumukonsumo ng Nitrogen",
        examples: ["Repolyo", "Litsugas"],
        description: "Ang mga madahong pananim ay gumagamit ng maraming nitrogen, na nakikinabang mula sa naunang legumbre.",
        benefits: ["Mataas na ani sa mayamang lupa", "Pinapabuti ang aeration ng lupa", "Sumusuporta sa pagkakaiba-iba ng pananim"],
      },
      fruiting: {
        name: "Mga Namumungang Pananim",
        role: "Gumagamit ng Phosphorus/Potassium",
        examples: ["Kamatis", "Paminta"],
        description: "Ang mga namumungang pananim ay nangangailangan ng mas maraming phosphorus at potassium para sa pagbuo ng prutas.",
        benefits: ["Pinapahusay ang kalidad ng prutas", "Binalanse ang paggamit ng sustansya", "Binabawasan ang pagdami ng peste"],
      },
      root: {
        name: "Mga Ugat na Pananim",
        role: "Katamtamang Gumagamit ng Sustansya",
        examples: ["Sibuyas", "Karot"],
        description: "Ang mga ugat na pananim ay gumagamit ng katamtamang sustansya, na tumutulong sa pagpapanatili ng balanse ng lupa.",
        benefits: ["Pinipigilan ang pagkaubos ng sustansya", "Pinapabuti ang texture ng lupa", "Binabawasan ang presyon ng damo"],
      },
    },
    stepContent: {
      rotation: {
        title: "Unawain ang Kapangyarihan ng Pag-ikot",
        subtitle: "Pagsira sa Siklo ng Peste at Pagpapanumbalik ng Balanse ng Lupa",
        description:
          "Ang pag-ikot ng pananim ay ang pagsasanay ng pagtatanim ng iba't ibang pananim sa isang tiyak na pagkakasunod-sunod sa parehong lupa sa loob ng ilang panahon o taon. Pinipigilan nito ang pagkapagod ng lupa at sinisira ang pagdami ng peste at sakit.",
        benefits: [
          "Sinisisra ang siklo ng buhay ng peste at sakit",
          "Binabawasan ang pagdepende sa kemikal na pestisidyo",
          "Binalanse ang sustansya ng lupa nang natural",
          "Pinapahusay ang kalusugan at istruktura ng mikrobyo sa lupa",
          "Pinapabuti ang ani ng pananim at katatagan ng bukid",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ang pag-ikot ng pananim ay maaaring magpabawas ng presyon ng peste ng hanggang 60–80% at mapabuti ang pagkamayabong ng lupa, na lubos na binabawasan ang paggamit ng pataba.",
        sources: "Pinagmulan: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fpls.2020.00292/full",
        button: "Nakuha Ko! Simulan ang Pag-ikot",
      },
      pests: {
        title: "Pigilan ang mga Peste at Sakit",
        subtitle: "Pagsira sa Siklo ng Buhay ng Peste",
        description:
          "Ang pag-ikot ng pananim ay sinisira ang siklo ng buhay ng mga peste at pathogen sa pamamagitan ng pag-alis ng kanilang gustong halaman, na binabawasan ang mga sakit na fungal at presyon ng damo.",
        examples: [
          "Ang pag-ikot mula sa kamatis o paminta ay sinisira ang siklo ng buhay ng root-knot nematodes.",
          "Binabawasan ang mga sakit na fungal tulad ng wilt, blight, at rust sa mga sistema ng monocropping.",
          "Ang iba't ibang pananim ay nagbibigay ng iba't ibang lilim o kompetisyon, na binabawasan ang dominasyon ng ilang damo.",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText: "Ipinapakita ng pananaliksik na ang 3-taong pag-ikot ay maaaring magpabawas ng presyon ng peste ng hanggang 60–80% kumpara sa monocropping.",
        sources: "Pinagmulan: agronomyjournal.org | nature.com",
        button: "Alamin ang Pagbabalanse ng Sustansya!",
      },
      nutrients: {
        title: "Balanseng Sustansya sa Lupa",
        subtitle: "Pag-aagrupo ng Pananim para sa Kalusugan ng Lupa",
        description:
          "Ang mga pananim ay gumagamit at nagbabalik ng sustansya nang iba. Ang pag-ikot ay pinipigilan ang pagkaubos at sobrang paggamit ng tiyak na sustansya, na nagpapanatili ng kalusugan ng lupa.",
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Sundin ang pagkakasunod-sunod na ito: Legumbre → Dahon → Prutas → Ugat → Legumbre ulit.",
        button: "Galugarin ang mga Plano sa Pag-ikot!",
      },
      plan: {
        title: "Halimbawa ng 3- hanggang 4-Taong Plano sa Pag-ikot",
        subtitle: "Nakaayos na Pagkakasunod-sunod ng Pananim",
        description: "Ang isang 4-plot na plano sa pag-ikot ay pinipigilan ang pagkaubos ng sustansya, sinisira ang siklo ng peste, at nagpapatatag ng ani sa paglipas ng panahon.",
        table: [
          { year: "Taon 1", plotA: "Legumbre", plotB: "Madahong Pananim", plotC: "Namumungang Pananim", plotD: "Ugat na Pananim" },
          { year: "Taon 2", plotA: "Madahong Pananim", plotB: "Namumungang Pananim", plotC: "Ugat na Pananim", plotD: "Legumbre" },
          { year: "Taon 3", plotA: "Namumungang Pananim", plotB: "Ugat na Pananim", plotC: "Legumbre", plotD: "Madahong Pananim" },
          { year: "Taon 4", plotA: "Ugat na Pananim", plotB: "Legumbre", plotC: "Madahong Pananim", plotD: "Namumungang Pananim" },
        ],
        source: "Pinagmulan: li01.tci-thaijo.org/index.php/anres/article/view/260446",
        button: "Alamin ang Pagsubaybay at Pag-aadjust!",
      },
      monitor: {
        title: "Subaybayan at I-adjust Bawat Panahon",
        subtitle: "Pagsubaybay sa Kalusugan ng Lupa at Pananim",
        description: "Regular na subaybayan ang pagganap ng halaman at kondisyon ng lupa upang epektibong maiayos ang plano sa pag-ikot.",
        steps: [
          "Obserbahan ang pagganap ng halaman: pagdilaw, pagkabansot, pagsabog ng peste",
          "Subukan ang antas ng N-P-K taun-taon",
          "Ayusin ang pagkakasunod ng pananim kung magpapatuloy ang mga isyu",
          "Gumamit ng pag-ikot ng legumbre sa mga basang panahon",
          "Iwasang ulitin ang parehong pamilya ng pananim sa isang plot sa loob ng 2–3 taon",
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Walang iisang pananim ang dapat magdomina sa lupa. Mag-ikot upang malito ang mga peste at pakainin ang lupa.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Pag-ikot Ngayon",
        steps: [
          { title: "Hatiin ang lupa sa 3 hanggang 5 plot", description: "Ayusin ang iyong bukid para sa pag-ikot" },
          { title: "Igrupo ang mga pananim ayon sa sustansya at pattern ng peste", description: "Planuhin batay sa mga pamilya ng pananim" },
          { title: "Gumawa ng 3- hanggang 4-taong plano sa pag-ikot", description: "Lumikha ng napapanatiling pagkakasunod-sunod" },
          { title: "Isama ang fallow o cover crops", description: "Pahusayin ang pagbawi ng lupa" },
          { title: "Magpanatili ng talaarawan ng bukirin", description: "Subaybayan ang mga resulta at obserbasyon" },
          { title: "Humingi ng lokal na payo", description: "Kumonsulta sa mga agri-extension worker para sa mga tip sa rehiyon" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Gumamit ng mga app upang subaybayan ang mga iskedyul ng pagtatanim at grupo ng pananim para sa mas mahusay na pagpaplano.",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText: "Natutunan ninyo na ang mga pangunahing kaalaman sa pag-ikot ng pananim. Magpapalago ang inyong bukid dahil sa kaalamang ito!",
      completionButton: "Magaling!",
    },
  },
}

// Crop Groups for visual styling
const CROP_GROUPS = {
  legumes: { color: "#2F855A", bgColor: "#E6FFFA", icon: "leaf-outline", iconLibrary: "Ionicons" },
  leafy: { color: "#B45309", bgColor: "#FFF7ED", icon: "leaf-maple", iconLibrary: "MaterialCommunityIcons" },
  fruiting: { color: "#2B6CB0", bgColor: "#EBF8FF", icon: "chili-mild", iconLibrary: "MaterialCommunityIcons" },
  root: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "carrot", iconLibrary: "MaterialCommunityIcons" },
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
            <Ionicons name="checkmark-circle" size={16} color="#2F855A" style={{ marginRight: 4 }} />
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

// Interactive Crop Group Card
const CropGroupCard = ({ groupKey, group, onPress, t, interactive = false }) => {
  const IconComponent = group.iconLibrary === "MaterialCommunityIcons" ? MaterialCommunityIcons : Ionicons;

  return (
    <TouchableOpacity
      style={[styles.cropGroupCard, { backgroundColor: group.bgColor }]}
      onPress={interactive ? () => onPress(groupKey) : undefined}
      activeOpacity={interactive ? 0.7 : 1}
      disabled={!interactive}
    >
      <IconComponent name={group.icon} size={36} color="#1A3C34" style={{ marginRight: 16 }} />
      <View style={styles.cropGroupInfo}>
        <Text style={styles.cropGroupName}>{t.cropGroups[groupKey].name}</Text>
        <View style={[styles.cropGroupBadge, { backgroundColor: group.color }]}>
          <Text style={styles.cropGroupBadgeText}>{t.cropGroups[groupKey].role}</Text>
        </View>
        <Text style={styles.cropGroupExamples}>
          {t.modal.examples} {t.cropGroups[groupKey].examples.join(", ")}
        </Text>
      </View>
      {interactive && <Ionicons name="chevron-forward" size={20} color={group.color} />}
    </TouchableOpacity>
  );
};

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function CropRotationGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showGroupModal, setShowGroupModal] = useState(false)
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

  const handleGroupPress = (groupKey) => {
    setSelectedGroup({
      ...CROP_GROUPS[groupKey],
      ...t.cropGroups[groupKey],
      key: groupKey,
    })
    setShowGroupModal(true)
  }

  const renderRotationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.rotation.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.rotation.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.rotation.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.rotation.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.rotation.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.rotation.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.rotation.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.rotation.button}
      </CompleteButton>
    </View>
  )

  const renderPestsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.pests.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.pests.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.pests.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.pests.examples.map((example, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{example}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.pests.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.pests.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.pests.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.pests.button}
      </CompleteButton>
    </View>
  )

  const renderNutrientsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.nutrients.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.nutrients.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.nutrients.description}</Text>

      <View style={styles.cropGroupsContainer}>
        {Object.entries(CROP_GROUPS).map(([key, group]) => (
          <CropGroupCard
            key={key}
            groupKey={key}
            group={group}
            onPress={handleGroupPress}
            t={t}
            interactive={true}
          />
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.nutrients.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.nutrients.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.nutrients.button}
      </CompleteButton>
    </View>
  )

  const renderPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.plan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.plan.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.plan.description}</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Year</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Plot A</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Plot B</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Plot C</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Plot D</Text>
        </View>
        {t.stepContent.plan.table.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.year}</Text>
            <Text style={styles.tableCell}>{row.plotA}</Text>
            <Text style={styles.tableCell}>{row.plotB}</Text>
            <Text style={styles.tableCell}>{row.plotC}</Text>
            <Text style={styles.tableCell}>{row.plotD}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.plan.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.plan.button}
      </CompleteButton>
    </View>
  )

  const renderMonitorStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.monitor.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.monitor.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.monitor.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.monitor.steps.map((step, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.monitor.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.monitor.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.monitor.button}
      </CompleteButton>
    </View>
  )

  const renderFirstStepsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.firstSteps.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.firstSteps.subtitle}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.firstSteps.steps.map((step, index) => (
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

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.firstSteps.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.firstSteps.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.firstSteps.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderRotationStep,
      renderPestsStep,
      renderNutrientsStep,
      renderPlanStep,
      renderMonitorStep,
      renderFirstStepsStep,
    ]
    return steps[currentStep]?.() || null
  }

  const progress = (completedSteps.length / t.steps.length) * 100

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7FAF7" />

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

      {/* Crop Group Modal */}
      <Modal
        visible={showGroupModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowGroupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGroup && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    {selectedGroup.iconLibrary === "MaterialCommunityIcons" ? (
                      <MaterialCommunityIcons name={selectedGroup.icon} size={28} color="#2F855A" style={{ marginRight: 12 }} />
                    ) : (
                      <Ionicons name={selectedGroup.icon} size={28} color="#2F855A" style={{ marginRight: 12 }} />
                    )}
                    <Text style={styles.modalTitle}>{selectedGroup.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowGroupModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: selectedGroup.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedGroup.role}</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedGroup.description}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.examples}</Text>
                <Text style={styles.modalExamples}>{selectedGroup.examples.join(", ")}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.benefits}</Text>
                {selectedGroup.benefits.map((benefit, index) => (
                  <View key={index} style={styles.modalBenefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#2F855A" />
                    <Text style={styles.modalBenefitText}>{benefit}</Text>
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
              <Ionicons name="flower-outline" size={48} color="#2F855A" />
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
    fontSize: 18,
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
    color: "#2F855A",
  },
  progressBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 172,
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
    backgroundColor: "#2F855A",
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
    backgroundColor: "#2F855A",
    borderColor: "#2F855A",
  },
  completedStepTab: {
    backgroundColor: "#E6FFFA",
    borderColor: "#2F855A",
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
    color: "#2F855A",
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
    color: "#2F855A",
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
    color: "#2F855A",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  evidenceCard: {
    backgroundColor: "#EBF8FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BEE3F8",
  },
  evidenceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B6CB0",
    marginBottom: 12,
  },
  evidenceText: {
    fontSize: 15,
    color: "#2B6CB0",
    marginBottom: 12,
    lineHeight: 22,
  },
  sources: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 12,
  },
  cropGroupsContainer: {
    marginBottom: 24,
  },
  cropGroupCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cropGroupInfo: {
    flex: 1,
  },
  cropGroupName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  cropGroupBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  cropGroupBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  cropGroupExamples: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
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
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B45309",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    color: "#B45309",
    lineHeight: 22,
    fontStyle: "italic",
    marginBottom: 8,
  },
  tableContainer: {
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2F855A",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontWeight: "700",
    color: "#fff",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
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
    backgroundColor: "#2F855A",
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
    backgroundColor: "#2F855A",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F855A",
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
  modalExamples: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalBenefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalBenefitText: {
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
    backgroundColor: "#E6FFFA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  completionTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2F855A",
    marginBottom: 16,
    textAlign: "center",
  },
  completionText: {
    fontSize: 16,
    color: "#2F855A",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  completionButton: {
    backgroundColor: "#2F855A",
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