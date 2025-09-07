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

// Translation data for Dry Season Cropping Tips
const TRANSLATIONS = {
  en: {
    headerTitle: "Dry Season Cropping Tips",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "Challenges of Dry Season", icon: "sunny-outline", iconLibrary: "Ionicons" },
      { title: "Drought-Tolerant Crops", icon: "sprout-outline", iconLibrary: "Ionicons" },
      { title: "Improve Water Efficiency", icon: "water-outline", iconLibrary: "Ionicons" },
      { title: "Soil Preparation and Protection Tips", icon: "earth-outline", iconLibrary: "Ionicons" },
      { title: "Pest and Disease Management", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Plan Your Crops for the Dry Season", icon: "calendar-outline", iconLibrary: "Ionicons" },
      { title: "Beginner’s Action Plan", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    cropGroups: {
      root: {
        name: "Root Crops",
        role: "Water Storers",
        examples: ["Sweet Potato", "Cassava", "Ube"],
        description: "Root crops store water in their roots, making them resilient to dry soil conditions.",
        benefits: ["Tolerate drought", "Store water efficiently", "Improve soil structure"],
      },
      legumes: {
        name: "Legumes",
        role: "Nitrogen Fixers",
        examples: ["Mungbean", "Cowpea", "Peanut"],
        description: "Legumes fix nitrogen in the soil and have short maturity periods, ideal for dry seasons.",
        benefits: ["Enrich soil nitrogen", "Quick growth cycle", "Reduce fertilizer needs"],
      },
      fruiting: {
        name: "Fruiting Vegetables",
        role: "Sunlight Lovers",
        examples: ["Tomato", "Eggplant", "Chili Pepper"],
        description: "Fruiting vegetables thrive in sunlight with proper irrigation support.",
        benefits: ["High market value", "Adaptable with irrigation", "Enhance crop diversity"],
      },
      cereals: {
        name: "Cereals (Short Duration)",
        role: "Early Harvesters",
        examples: ["Corn", "Upland Rice"],
        description: "Early-maturing cereal varieties are suited for limited water availability.",
        benefits: ["Fast maturity", "Tolerate dry conditions", "Stable yields"],
      },
      leafy: {
        name: "Leafy Greens",
        role: "Fast Growers",
        examples: ["Kangkong", "Saluyot"],
        description: "Leafy greens grow quickly with shade or irrigation, suitable for dry seasons.",
        benefits: ["Rapid growth", "Low water needs", "Nutrient-rich produce"],
      },
    },
    stepContent: {
      challenges: {
        title: "Understand the Challenges of Dry Season Farming",
        subtitle: "Thriving Under the Sun",
        description:
          "The dry season in the Philippines, from November to April, brings high temperatures, low rainfall, and intense sunlight. Without preparation, farmers face crop wilting, low germination, increased pests, and soil moisture loss.",
        challenges: [
          "Crop wilting and low germination rates",
          "Increased pest pressure",
          "Lower yields and income",
          "Soil moisture loss and erosion",
        ],
        opportunity: "With smart strategies, the dry season offers opportunities for fast-growing, high-value crops with proper irrigation.",
        evidenceTitle: "Scientific Evidence",
        evidenceText: "Effective dry season strategies can boost yields by up to 30–50% with proper crop selection and irrigation (DA-BSWM, 2023).",
        sources: "Sources: DA-BSWM, 2023 | IRRI.org | PhilRice.gov.ph",
        button: "Learn Crop Selection!",
      },
      crops: {
        title: "Choose Drought-Tolerant Crops",
        subtitle: "Top Crops for the Dry Season",
        description:
          "Selecting crops suited for dry conditions ensures better yields. Mungbean, promoted by DA-PhilRice, is a profitable intercrop after rice.",
        evidenceTitle: "Scientific Evidence",
        evidenceText: "Mungbean intercropping can increase farm income by 20–40% in dry seasons (PhilRice, 2024).",
        sources: "Sources: philrice.gov.ph | irri.org | agriculture.da.gov.ph",
        button: "Explore Water Efficiency!",
      },
      water: {
        title: "Improve Water Efficiency",
        subtitle: "Smart Irrigation Practices",
        description:
          "Efficient water use is critical during the dry season to sustain crops and maximize yields.",
        tips: [
          "Use drip or furrow irrigation to minimize waste",
          "Water early morning or late afternoon to reduce evaporation",
          "Mulch around plants to retain moisture",
          "Reuse safe, filtered graywater",
          "Install rainwater catchment systems",
        ],
        tipTitle: "Pro Tip:",
        tipText: "Maintain soil moisture at 50–70% of field capacity using a soil moisture meter or bamboo stick method.",
        sources: "Source: DA-AMIA, 2024",
        button: "Protect Your Soil!",
      },
      soil: {
        title: "Prepare and Protect the Soil",
        subtitle: "Soil-Saving Techniques",
        description: "Soil is vulnerable during the dry season due to intense sun and low rainfall. Use these methods to maintain soil health.",
        table: [
          { technique: "Mulching", purpose: "Prevents water loss and regulates temperature" },
          { technique: "Organic Compost", purpose: "Increases water-holding capacity" },
          { technique: "Minimum Tillage", purpose: "Reduces soil disruption and moisture loss" },
          { technique: "Cover Cropping", purpose: "Shields soil surface and adds nutrients" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Use rice straw, dried leaves, or banana leaves as mulch for vegetables and legumes.",
        button: "Manage Pests!",
      },
      pests: {
        title: "Manage Pests and Diseases",
        subtitle: "Natural Controls for Dry-Season Pests",
        description:
          "Warm, dry weather increases pest populations like aphids, spider mites, fruit borers, and flea beetles. Monitor weekly and use natural controls.",
        controls: [
          { method: "Neem Spray", effectiveness: "Repels soft-bodied insects" },
          { method: "Intercropping", effectiveness: "Disrupts pest cycles" },
          { method: "Marigolds or Basil", effectiveness: "Trap and confuse insect pests" },
          { method: "Row Covers", effectiveness: "Physically block pests" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Check crops weekly for early pest signs to prevent outbreaks.",
        button: "Plan Your Crop Calendar!",
      },
      calendar: {
        title: "Create a Dry-Season Crop Calendar",
        subtitle: "Plan for Success",
        description: "Plan planting to match water availability, crop maturity, and market demand.",
        table: [
          { month: "November", activity: "Soil testing, composting, rain collection" },
          { month: "December–January", activity: "Plant mungbean, eggplant, tomato" },
          { month: "February", activity: "Rotate to corn, cassava, chili" },
          { month: "March–April", activity: "Harvest and prepare land for wet season" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Rotate crops to avoid soil exhaustion and pest buildup.",
        button: "Start Your Action Plan!",
      },
      actionPlan: {
        title: "Beginner’s Action Plan",
        subtitle: "Start Farming Smart",
        steps: [
          { title: "Choose 2–3 dry-season crops", description: "E.g., mungbean, chili, tomato" },
          { title: "Prepare land with compost and mulch", description: "Enhance soil health" },
          { title: "Build simple irrigation", description: "Use drip or furrow systems" },
          { title: "Set a watering schedule", description: "Every 2–3 days, early morning" },
          { title: "Track yields and pests", description: "Keep a notebook for observations" },
          { title: "Save seeds", description: "Store successful crop seeds for next season" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Use apps to track planting schedules and crop performance.",
        button: "I'm Ready to Farm!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText: "You've learned the essentials of dry season cropping. Your farm is ready to thrive!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Mga Tip sa Pagtatanim sa Tag-init",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Mga Hamon ng Tag-init", icon: "sunny-outline", iconLibrary: "Ionicons" },
      { title: "Mga Pananim na Matibay sa Tagtuyot", icon: "sprout-outline", iconLibrary: "Ionicons" },
      { title: "Pagbutihin ang Paggamit ng Tubig", icon: "water-outline", iconLibrary: "Ionicons" },
      { title: "Protektahan ang Lupa", icon: "earth-outline", iconLibrary: "Ionicons" },
      { title: "Kontrolin ang mga Peste", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Kalendaryo ng Pananim", icon: "calendar-outline", iconLibrary: "Ionicons" },
      { title: "Plano para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    cropGroups: {
      root: {
        name: "Mga Ugat na Pananim",
        role: "Nagtatago ng Tubig",
        examples: ["Kamote", "Kamoteng Kahoy", "Ube"],
        description: "Ang mga ugat na pananim ay nagtatago ng tubig sa kanilang ugat, na matibay sa tuyong lupa.",
        benefits: ["Matibay sa tagtuyot", "Mabisang nagtatago ng tubig", "Pinapabuti ang istruktura ng lupa"],
      },
      legumes: {
        name: "Mga Legumbre",
        role: "Nag-aayos ng Nitrogen",
        examples: ["Munggo", "Kawpe", "Mani"],
        description: "Ang mga legumbre ay nag-aayos ng nitrogen sa lupa at mabilis ang pagkahinog, mainam sa tag-init.",
        benefits: ["Nagpapayaman ng nitrogen", "Mabilis na siklo ng paglago", "Binabawasan ang pangangailangan ng pataba"],
      },
      fruiting: {
        name: "Mga Namumungang Gulay",
        role: "Gustong-gusto ang Araw",
        examples: ["Kamatis", "Talong", "Sili"],
        description: "Ang mga namumungang gulay ay umuunlad sa araw kapag may tamang irigasyon.",
        benefits: ["Mataas ang halaga sa merkado", "Naaayon sa irigasyon", "Nagdadagdag ng pagkakaiba-iba"],
      },
      cereals: {
        name: "Mga Sereal (Mabilis na Hinog)",
        role: "Maagang Ani",
        examples: ["Mais", "Palay sa Mataas na Lupa"],
        description: "Ang mga sereal na mabilis mahinog ay angkop sa limitadong tubig.",
        benefits: ["Mabilis na hinog", "Matibay sa tuyong kondisyon", "Matatag na ani"],
      },
      leafy: {
        name: "Mga Madahong Gulay",
        role: "Mabilis na Lumago",
        examples: ["Kangkong", "Saluyot"],
        description: "Ang mga madahong gulay ay mabilis lumago kapag may lilim o irigasyon, angkop sa tag-init.",
        benefits: ["Mabilis na paglago", "Mababang pangangailangan ng tubig", "Masustansyang ani"],
      },
    },
    stepContent: {
      challenges: {
        title: "Unawain ang mga Hamon ng Pagtatanim sa Tag-init",
        subtitle: "Umunlad sa Ilalim ng Araw",
        description:
          "Ang tag-init sa Pilipinas, mula Nobyembre hanggang Abril, ay nagdudulot ng mataas na temperatura, kaunting ulan, at matinding sikat ng araw. Kung hindi handa, ang mga magsasaka ay nahaharap sa pagkalanta ng pananim, mababang germination, tumitinding peste, at pagkawala ng moisture sa lupa.",
        challenges: [
          "Pagkalanta ng pananim at mababang germination",
          "Tumitinding presyon ng peste",
          "Mababang ani at kita",
          "Pagkawala ng moisture at pagguho ng lupa",
        ],
        opportunity: "Sa tamang estratehiya, ang tag-init ay nagbibigay ng pagkakataon para sa mabilis na lumalagong, mataas ang halagang pananim na may tamang irigasyon.",
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText: "Ang epektibong estratehiya sa tag-init ay maaaring magpataas ng ani ng hanggang 30–50% sa tamang pagpili ng pananim at irigasyon (DA-BSWM, 2023).",
        sources: "Pinagmulan: DA-BSWM, 2023 | IRRI.org | PhilRice.gov.ph",
        button: "Alamin ang Pagpili ng Pananim!",
      },
      crops: {
        title: "Pumili ng mga Pananim na Matibay sa Tagtuyot",
        subtitle: "Nangungunang Pananim para sa Tag-init",
        description:
          "Ang pagpili ng mga pananim na angkop sa tuyong kondisyon ay nagsisiguro ng mas magandang ani. Ang munggo, na itinaguyod ng DA-PhilRice, ay isang kapaki-pakinabang na intercrop pagkatapos ng palay.",
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText: "Ang intercropping ng munggo ay maaaring magpataas ng kita ng bukid ng 20–40% sa tag-init (PhilRice, 2024).",
        sources: "Pinagmulan: philrice.gov.ph | irri.org | agriculture.da.gov.ph",
        button: "Tuklasin ang Paggamit ng Tubig!",
      },
      water: {
        title: "Pagbutihin ang Paggamit ng Tubig",
        subtitle: "Matalinong Pamamaraan ng Irigasyon",
        description:
          "Ang mahusay na paggamit ng tubig ay mahalaga sa tag-init upang mapanatili ang mga pananim at mapalaki ang ani.",
        tips: [
          "Gumamit ng drip o furrow irrigation upang mabawasan ang pag-aaksaya",
          "Magdilig sa umaga o hapon upang mabawasan ang evaporation",
          "Mag-mulch sa paligid ng mga pananim upang mapanatili ang moisture",
          "Gumamit ng ligtas at sinala na graywater",
          "Mag-install ng rainwater catchment system",
        ],
        tipTitle: "Payo ng Eksperto:",
        tipText: "Panatilihin ang moisture ng lupa sa 50–70% ng field capacity gamit ang soil moisture meter o bamboo stick method.",
        sources: "Pinagmulan: DA-AMIA, 2024",
        button: "Protektahan ang Iyong Lupa!",
      },
      soil: {
        title: "Ihanda at Protektahan ang Lupa",
        subtitle: "Mga Pamamaraan sa Pag-iingat ng Lupa",
        description: "Ang lupa ay mas mahina sa tag-init dahil sa matinding araw at kaunting ulan. Gamitin ang mga pamamaraang ito upang mapanatili ang kalusugan ng lupa.",
        table: [
          { technique: "Pag-mulch", purpose: "Pinipigilan ang pagkawala ng tubig at nireregula ang temperatura" },
          { technique: "Organikong Kompost", purpose: "Pinapataas ang kapasidad na maghawak ng tubig" },
          { technique: "Minimal na Pagtatanim", purpose: "Binabawasan ang pagkagambala sa lupa at pagkawala ng moisture" },
          { technique: "Cover Cropping", purpose: "Pinoprotektahan ang ibabaw ng lupa at nagdadagdag ng sustansya" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Gumamit ng dayami, tuyong dahon, o dahon ng saging bilang mulch para sa mga gulay at legumbre.",
        button: "Kontrolin ang mga Peste!",
      },
      pests: {
        title: "Kontrolin ang mga Peste at Sakit",
        subtitle: "Natural na Pamamaraan ng Pagkontrol",
        description:
          "Ang mainit at tuyong panahon ay nagpapataas ng populasyon ng mga peste tulad ng aphids, spider mites, fruit borers, at flea beetles. Subaybayan linggu-linggo at gumamit ng natural na pamamaraan.",
        controls: [
          { method: "Neem Spray", effectiveness: "Itinataboy ang mga soft-bodied na insekto" },
          { method: "Intercropping", effectiveness: "Sinisisra ang siklo ng peste" },
          { method: "Marigolds o Basil", effectiveness: "Nagtatangkap at nalilito ang mga peste" },
          { method: "Row Covers", effectiveness: "Pisikal na humaharang sa mga peste" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Suriin ang mga pananim linggu-linggo para sa maagang palatandaan ng peste upang maiwasan ang pagsabog.",
        button: "Planuhin ang Iyong Kalendaryo!",
      },
      calendar: {
        title: "Gumawa ng Kalendaryo ng Pananim sa Tag-init",
        subtitle: "Magplano para sa Tagumpay",
        description: "Planuhin ang pagtatanim upang tumugma sa kakayahang magbigay ng tubig, pagkahinog ng pananim, at pangangailangan sa merkado.",
        table: [
          { month: "Nobyembre", activity: "Pagsusuri sa lupa, pag-compost, pagkolekta ng tubig-ulan" },
          { month: "Disyembre–Enero", activity: "Magtanim ng munggo, talong, kamatis" },
          { month: "Pebrero", activity: "Magpalit sa mais, kamoteng kahoy, sili" },
          { month: "Marso–Abril", activity: "Mag-ani at ihanda ang lupa para sa tag-ulan" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Magpalit-palit ng pananim upang maiwasan ang pagkaubos ng lupa at pagdami ng peste.",
        button: "Simulan ang Iyong Plano!",
      },
      actionPlan: {
        title: "Plano para sa Nagsisimula",
        subtitle: "Magsimulang Magtanim nang Matalino",
        steps: [
          { title: "Pumili ng 2–3 pananim para sa tag-init", description: "Hal., munggo, sili, kamatis" },
          { title: "Ihanda ang lupa gamit ang compost at mulch", description: "Pahusayin ang kalusugan ng lupa" },
          { title: "Gumawa ng simpleng irigasyon", description: "Gumamit ng drip o furrow system" },
          { title: "Magtakda ng iskedyul ng pagdidilig", description: "Bawat 2–3 araw, maaga sa umaga" },
          { title: "Subaybayan ang ani at peste", description: "Panatilihin ang tala sa notebook" },
          { title: "Mag-imbak ng binhi", description: "Itago ang mga binhi mula sa matagumpay na pananim" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Gumamit ng mga app upang subaybayan ang iskedyul ng pagtatanim at pagganap ng pananim.",
        button: "Handa na Akong Magtanim!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText: "Natutunan ninyo na ang mga pangunahing kaalaman sa pagtatanim sa tag-init. Handa na ang inyong bukid na umunlad!",
      completionButton: "Magaling!",
    },
  },
}

// Crop Groups for visual styling
const CROP_GROUPS = {
  root: { color: "#7B341E", bgColor: "#FFF7ED", icon: "carrot", iconLibrary: "MaterialCommunityIcons" },
  legumes: { color: "#276749", bgColor: "#E6FFFA", icon: "leaf-outline", iconLibrary: "Ionicons" },
  fruiting: { color: "#2B6CB0", bgColor: "#EBF8FF", icon: "fruit-cherries", iconLibrary: "MaterialCommunityIcons" },
  cereals: { color: "#B45309", bgColor: "#FEF7E0", icon: "grain", iconLibrary: "MaterialCommunityIcons" },
  leafy: { color: "#4A5568", bgColor: "#F7FAFC", icon: "leaf-maple", iconLibrary: "MaterialCommunityIcons" },
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
            <Ionicons name="checkmark-circle" size={16} color="#276749" style={{ marginRight: 4 }} />
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
export default function DrySeasonCroppingGuide() {
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

  const renderChallengesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.challenges.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.challenges.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.challenges.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.challenges.challenges.map((challenge, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="close-circle" size= {18} color="#7B341E" />
            <Text style={styles.benefitText}>{challenge}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.challenges.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.challenges.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.challenges.sources}</Text>
      </View>

      <Text style={styles.description}>{t.stepContent.challenges.opportunity}</Text>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.challenges.button}
      </CompleteButton>
    </View>
  )

  const renderCropsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.crops.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.crops.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.crops.description}</Text>

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

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.crops.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.crops.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.crops.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.crops.button}
      </CompleteButton>
    </View>
  )

  const renderWaterStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.water.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.water.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.water.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.water.tips.map((tip, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#276749" />
            <Text style={styles.benefitText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.water.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.water.tipText}</Text>
        </View>
      </View>

      <Text style={styles.sources}>{t.stepContent.water.sources}</Text>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.water.button}
      </CompleteButton>
    </View>
  )

  const renderSoilStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soil.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soil.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soil.description}</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Technique</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Purpose</Text>
        </View>
        {t.stepContent.soil.table.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.technique}</Text>
            <Text style={styles.tableCell}>{row.purpose}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.soil.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.soil.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.soil.button}
      </CompleteButton>
    </View>
  )

  const renderPestsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.pests.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.pests.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.pests.description}</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Method</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Effectiveness</Text>
        </View>
        {t.stepContent.pests.controls.map((control, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{control.method}</Text>
            <Text style={styles.tableCell}>{control.effectiveness}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.pests.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.pests.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.pests.button}
      </CompleteButton>
    </View>
  )

  const renderCalendarStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.calendar.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.calendar.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.calendar.description}</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Month</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Activity</Text>
        </View>
        {t.stepContent.calendar.table.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.month}</Text>
            <Text style={styles.tableCell}>{row.activity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.calendar.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.calendar.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.calendar.button}
      </CompleteButton>
    </View>
  )

  const renderActionPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionPlan.subtitle}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.actionPlan.steps.map((step, index) => (
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
          <Text style={styles.tipTitle}>{t.stepContent.actionPlan.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.actionPlan.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(6)} isLoading={isNavigating}>
        {t.stepContent.actionPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderChallengesStep,
      renderCropsStep,
      renderWaterStep,
      renderSoilStep,
      renderPestsStep,
      renderCalendarStep,
      renderActionPlanStep,
    ]
    return steps[currentStep]?.() || null
  }

  const progress = (completedSteps.length / t.steps.length) * 100

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

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
                      <MaterialCommunityIcons name={selectedGroup.icon} size={28} color="#276749" style={{ marginRight: 12 }} />
                    ) : (
                      <Ionicons name={selectedGroup.icon} size={28} color="#276749" style={{ marginRight: 12 }} />
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
                    <Ionicons name="checkmark-circle" size={16} color="#276749" />
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
              <Ionicons name="partly-sunny-outline" size={48} color="#276749" />
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
    color: "#276749",
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
    backgroundColor: "#276749",
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
    backgroundColor: "#276749",
    borderColor: "#276749",
  },
  completedStepTab: {
    backgroundColor: "#E6FFFA",
    borderColor: "#276749",
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
    color: "#276749",
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
    color: "#276749",
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
    color: "#276749",
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
    backgroundColor: "#276749",
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
    backgroundColor: "#276749",
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
    backgroundColor: "#276749",
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
    color: "#276749",
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
    color: "#276749",
    marginBottom: 16,
    textAlign: "center",
  },
  completionText: {
    fontSize: 16,
    color: "#276749",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  completionButton: {
    backgroundColor: "#276749",
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