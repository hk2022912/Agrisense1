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

// Updated Translation data with your new content
const TRANSLATIONS = {
  en: {
    headerTitle: "Crop Rotation Planning",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Why Crop Rotation Is Important", emoji: "🌱" },
      { title: "What Crop Rotation Does", emoji: "🔄" },
      { title: "How to Make a Rotation Plan", emoji: "📋" },
      { title: "Plan for Many Seasons", emoji: "📅" },
      { title: "Check and Change as Needed", emoji: "📊" },
      { title: "Easy First Steps for Beginners", emoji: "✅" },
    ],
    cropGroups: {
      legumes: {
        name: "Legumes",
        role: "Add nitrogen to the soil",
        examples: ["Peas", "Beans", "Peanuts"],
        description:
          "These crops fix nitrogen from the air and add it to the soil, naturally fertilizing your garden for the next crops.",
        benefits: ["Add nitrogen to the soil", "Improve soil structure", "Work well in rainy weather"],
      },
      leafy: {
        name: "Leafy Greens",
        role: "Use a lot of nitrogen",
        examples: ["Cabbage", "Lettuce", "Spinach"],
        description: "Fast-growing crops that consume the nitrogen-rich soil nutrients that legumes have provided.",
        benefits: ["Quick harvest cycles", "High nutritional value", "Use nitrogen efficiently"],
      },
      fruiting: {
        name: "Fruiting Crops",
        role: "Need phosphorus and potassium",
        examples: ["Tomato", "Pepper", "Eggplant"],
        description:
          "Heavy feeders that require balanced nutrients, especially phosphorus and potassium for fruit development.",
        benefits: ["High yield potential", "Long harvest season", "Valuable market crops"],
      },
      root: {
        name: "Root Crops",
        role: "Use some nutrients",
        examples: ["Onion", "Carrot", "Radish"],
        description: "These crops use moderate nutrients and help break up compacted soil with their root systems.",
        benefits: ["Break up compacted soil", "Use nutrients efficiently", "Store well after harvest"],
      },
      cover: {
        name: "Cover/Fallow",
        role: "Rest the soil and add nutrients",
        examples: ["Rye", "Mungbean", "None"],
        description: "Cover crops or fallow periods that allow soil to rest and regenerate nutrients naturally.",
        benefits: ["Rest the soil", "Add organic matter", "Prevent soil erosion"],
      },
    },
    stepContent: {
      whyImportant: {
        title: "Why Crop Rotation Is Important",
        subtitle: "Why Change Crops Each Season?",
        description:
          "Long-term tests show that even simple crop changes—like planting sweet potato or beans before wheat or corn—can bring big benefits:",
        benefits: [
          "Increase crop harvests by up to 38%",
          "Raise farmer income by 20%",
          "Store more carbon in the soil",
          "Lower harmful gas emissions by up to 88%",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "These results come from a 6-year study (2016–2022) in China's North Plain. It compared regular wheat–corn farming with crop rotation.",
        sources: "Sources: pubmed.ncbi.nlm.nih.gov | nature.com | researchgate.net",
        additionalInfo:
          "Studies around the world using satellite and field data also show that rotations with beans work well in rainy weather. Farmers who choose good 'precrops' (previous crops) often get better harvests.",
        button: "Got It! Let's Learn More",
      },
      whatItDoes: {
        title: "What Crop Rotation Does",
        subtitle: "Soil and Microbes",
        description:
          "A 6-year field test showed that growing crops like sweet potato or beans before wheat or corn can:",
        soilBenefits: [
          "Increase helpful microbes in the soil",
          "Improve how nutrients like nitrogen and carbon move in the soil",
          "Reduce pests and diseases that build up when the same crop is grown every year",
        ],
        yieldsTitle: "Better Yields and Stronger Crops",
        yieldsDescription: "A 2025 global satellite study showed that choosing the right crop before planting helps:",
        yieldsBenefits: [
          "Get better harvests, even with changing weather",
          "Use the full benefits of beans during wet seasons",
          "Make better planting choices using local weather data",
        ],
        button: "Ready to Plan!",
      },
      howToPlan: {
        title: "How to Make a Rotation Plan",
        subtitle: "Group Crops by Type - tap on cards to learn more",
        description: "Rotations work best when crops are grouped by what they take or give to the soil:",
        tipTitle: "Simple Tip from Gardeners:",
        tipText: '"Leaf comes after legumes… fruits after leaves… roots after fruits… then back to legumes."',
        source: "Source: li01.tci-thaijo.org",
        button: "Let's Plan Seasons!",
      },
      planSeasons: {
        title: "Plan for Many Seasons",
        subtitle: "Make a crop calendar to plan what to plant each year",
        tableTitle: "4-Year Crop Rotation Example",
        year: "Year",
        plotA: "Plot A",
        plotB: "Plot B",
        plotC: "Plot C",
        plotD: "Plot D",
        benefitsTitle: "This rotation helps:",
        benefits: [
          "Keep the soil healthy",
          "Balance how much each crop uses from the soil",
          "Lower pest and disease problems",
        ],
        button: "Perfect! Let's Monitor",
      },
      checkAndChange: {
        title: "Check and Change as Needed",
        subtitle: "Stay flexible:",
        aspects: [
          { title: "Watch Crops", description: "Watch which crops grow better after others" },
          { title: "Test Soil", description: "Test your soil once a year for nitrogen, phosphorus, and potassium" },
          { title: "Rainy Years", description: "In rainy years, grow more beans or legumes" },
          { title: "Fix Problems", description: "If you see the same pest or soil problem often, change your plan" },
        ],
        button: "Great! Show Me First Steps",
      },
      firstSteps: {
        title: "Easy First Steps for Beginners",
        subtitle: "Follow these simple steps to start your crop rotation journey",
        steps: [
          {
            title: "Divide your land into 3 to 5 plots",
            description: "Start with manageable sections for easier rotation planning",
          },
          {
            title: "Group your crops using the table above",
            description: "Categorize your planned crops by their nutrient requirements",
          },
          {
            title: "Make a 3- to 4-year rotation plan",
            description: "Plan ahead to prevent soil nutrient depletion",
          },
          {
            title: "Add fallow or cover crops in between",
            description: "Let soil rest and regenerate between main crops",
          },
          {
            title: "Write down what works each season",
            description: "Track what works best in your specific conditions",
          },
          {
            title: "Use mobile apps or ask for expert help if needed",
            description: "Don't hesitate to seek help when you need it",
          },
        ],
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the fundamentals of crop rotation planning. Your crops and soil will thank you for this knowledge!",
      completionButton: "Amazing!",
    },
  },
  tl: {
    headerTitle: "Pagpaplano ng Pag-ikot ng Pananim",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Bakit Mahalaga ang Pag-ikot ng Pananim", emoji: "🌱" },
      { title: "Ano ang Ginagawa ng Pag-ikot ng Pananim", emoji: "🔄" },
      { title: "Paano Gumawa ng Plano sa Pag-ikot", emoji: "📋" },
      { title: "Pagpaplano para sa Maraming Panahon", emoji: "📅" },
      { title: "Suriin at Baguhin Kung Kailangan", emoji: "📊" },
      { title: "Madaling Unang Hakbang para sa mga Nagsisimula", emoji: "✅" },
    ],
    cropGroups: {
      legumes: {
        name: "Mga Legumes",
        role: "Nagdadagdag ng nitrogen sa lupa",
        examples: ["Gisantes", "Sitaw", "Mani"],
        description:
          "Ang mga pananim na ito ay kumukuha ng nitrogen mula sa hangin at inilalagay sa lupa, natural na nagpapataba sa inyong hardin para sa susunod na pananim.",
        benefits: [
          "Nagdadagdag ng nitrogen sa lupa",
          "Pinapabuti ang istraktura ng lupa",
          "Mahusay sa maulan na panahon",
        ],
      },
      leafy: {
        name: "Mga Dahong Gulay",
        role: "Gumagamit ng maraming nitrogen",
        examples: ["Repolyo", "Lettuce", "Kangkong"],
        description:
          "Mabilis na lumalaking pananim na umuubos ng nitrogen-rich na sustansya sa lupa na ibinigay ng mga legumes.",
        benefits: ["Mabilis na ani", "Mataas na nutritional value", "Epektibong gumagamit ng nitrogen"],
      },
      fruiting: {
        name: "Mga Pananim na Nagbubunga",
        role: "Nangangailangan ng phosphorus at potassium",
        examples: ["Kamatis", "Sili", "Talong"],
        description:
          "Mga pananim na maraming kailangan na sustansya, lalo na ang phosphorus at potassium para sa pagbubunga.",
        benefits: ["Mataas na ani", "Mahabang panahon ng pag-ani", "Mahalaga sa merkado"],
      },
      root: {
        name: "Mga Ugat na Pananim",
        role: "Gumagamit ng ilang sustansya",
        examples: ["Sibuyas", "Karot", "Labanos"],
        description:
          "Ang mga pananim na ito ay gumagamit ng katamtamang sustansya at tumutulong na sirain ang matigas na lupa gamit ang kanilang ugat.",
        benefits: [
          "Sinisira ang matigas na lupa",
          "Epektibong gumagamit ng sustansya",
          "Matagal na nakakaimbak pagkatapos ng ani",
        ],
      },
      cover: {
        name: "Cover/Fallow",
        role: "Nagpapahinga sa lupa at nagdadagdag ng sustansya",
        examples: ["Rye", "Mungbean", "Wala"],
        description:
          "Mga cover crops o fallow periods na nagpapahayag sa lupa na magpahinga at natural na mag-regenerate ng sustansya.",
        benefits: ["Nagpapahinga sa lupa", "Nagdadagdag ng organic matter", "Pumipigil sa soil erosion"],
      },
    },
    stepContent: {
      whyImportant: {
        title: "Bakit Mahalaga ang Pag-ikot ng Pananim",
        subtitle: "Bakit Palitan ang mga Pananim Bawat Panahon?",
        description:
          "Ang mga matagalang pagsubok ay nagpapakita na kahit simpleng pagbabago ng pananim—tulad ng pagtatanim ng kamote o sitaw bago ang trigo o mais—ay maaaring magdulot ng malalaking benepisyo:",
        benefits: [
          "Taasan ang ani ng pananim hanggang 38%",
          "Taasan ang kita ng magsasaka ng 20%",
          "Mag-imbak ng mas maraming carbon sa lupa",
          "Bawasan ang nakakapinsalang gas emissions hanggang 88%",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ang mga resulta na ito ay nagmula sa 6-taong pag-aaral (2016–2022) sa North Plain ng China. Inihambing nito ang regular na wheat–corn farming sa crop rotation.",
        sources: "Sources: pubmed.ncbi.nlm.nih.gov | nature.com | researchgate.net",
        additionalInfo:
          "Ang mga pag-aaral sa buong mundo gamit ang satellite at field data ay nagpapakita rin na ang mga rotation na may sitaw ay mahusay sa maulan na panahon. Ang mga magsasakang pumipili ng magagandang 'precrops' (nakaraang pananim) ay madalas na nakakakuha ng mas magagandang ani.",
        button: "Nakuha Ko! Matuto Pa Tayo",
      },
      whatItDoes: {
        title: "Ano ang Ginagawa ng Pag-ikot ng Pananim",
        subtitle: "Lupa at Microbes",
        description:
          "Ang 6-taong field test ay nagpakita na ang pagtatanim ng mga pananim tulad ng kamote o sitaw bago ang trigo o mais ay maaaring:",
        soilBenefits: [
          "Dagdagan ang mga kapakipakinabang na microbes sa lupa",
          "Mapabuti kung paano gumagalaw ang mga sustansya tulad ng nitrogen at carbon sa lupa",
          "Bawasan ang mga peste at sakit na naipon kapag ang parehong pananim ay itinatanim bawat taon",
        ],
        yieldsTitle: "Mas Magagandang Ani at Mas Malakas na Pananim",
        yieldsDescription:
          "Ang 2025 global satellite study ay nagpakita na ang pagpili ng tamang pananim bago magtanim ay nakakatulong na:",
        yieldsBenefits: [
          "Makakuha ng mas magagandang ani, kahit na may pagbabago sa panahon",
          "Gamitin ang buong benepisyo ng sitaw sa maulan na panahon",
          "Gumawa ng mas magagandang desisyon sa pagtatanim gamit ang lokal na weather data",
        ],
        button: "Handa na Magplano!",
      },
      howToPlan: {
        title: "Paano Gumawa ng Plano sa Pag-ikot",
        subtitle: "Pangkatin ang mga Pananim ayon sa Uri - pindutin ang mga card para matuto pa",
        description:
          "Ang mga rotation ay pinakamahusay kapag ang mga pananim ay pinapangkat ayon sa kung ano ang kinukuha o ibinibigay nila sa lupa:",
        tipTitle: "Simpleng Tip mula sa mga Magsasaka:",
        tipText:
          '"Ang dahon ay sumusunod sa legumes… ang prutas pagkatapos ng dahon… ang ugat pagkatapos ng prutas… tapos balik sa legumes."',
        source: "Source: li01.tci-thaijo.org",
        button: "Magplano Tayo ng mga Panahon!",
      },
      planSeasons: {
        title: "Pagpaplano para sa Maraming Panahon",
        subtitle: "Gumawa ng kalendaryo ng pananim para magplano kung ano ang itatanim bawat taon",
        tableTitle: "4-Taong Halimbawa ng Crop Rotation",
        year: "Taon",
        plotA: "Plot A",
        plotB: "Plot B",
        plotC: "Plot C",
        plotD: "Plot D",
        benefitsTitle: "Ang rotation na ito ay nakakatulong na:",
        benefits: [
          "Panatilihin ang kalusugan ng lupa",
          "Balansehin kung gaano karami ang ginagamit ng bawat pananim mula sa lupa",
          "Bawasan ang mga problema sa peste at sakit",
        ],
        button: "Perpekto! Bantayan Natin",
      },
      checkAndChange: {
        title: "Suriin at Baguhin Kung Kailangan",
        subtitle: "Maging flexible:",
        aspects: [
          {
            title: "Bantayan ang mga Pananim",
            description: "Bantayan kung aling mga pananim ang mas lumalaki pagkatapos ng iba",
          },
          {
            title: "Subukan ang Lupa",
            description: "Subukan ang inyong lupa minsan sa isang taon para sa nitrogen, phosphorus, at potassium",
          },
          { title: "Maulan na Taon", description: "Sa maulan na taon, magtanim ng mas maraming sitaw o legumes" },
          {
            title: "Ayusin ang mga Problema",
            description:
              "Kung nakikita ninyo ang parehong peste o problema sa lupa nang madalas, baguhin ang inyong plano",
          },
        ],
        button: "Magaling! Ipakita ang Unang mga Hakbang",
      },
      firstSteps: {
        title: "Madaling Unang Hakbang para sa mga Nagsisimula",
        subtitle: "Sundin ang mga simpleng hakbang na ito para simulan ang inyong paglalakbay sa crop rotation",
        steps: [
          {
            title: "Hatiin ang inyong lupa sa 3 hanggang 5 plot",
            description:
              "Magsimula sa mga seksyong kaya ninyong pamahalaan para sa mas madaling pagpaplano ng rotation",
          },
          {
            title: "Pangkatin ang inyong mga pananim gamit ang talahanayan sa itaas",
            description:
              "I-categorize ang inyong mga planong pananim ayon sa kanilang mga pangangailangan sa sustansya",
          },
          {
            title: "Gumawa ng 3 hanggang 4 taong rotation plan",
            description: "Magplano nang maaga para maiwasan ang pagkakaubos ng sustansya sa lupa",
          },
          {
            title: "Magdagdag ng fallow o cover crops sa pagitan",
            description: "Hayaang magpahinga at mag-regenerate ang lupa sa pagitan ng mga pangunahing pananim",
          },
          {
            title: "Isulat kung ano ang gumagana bawat panahon",
            description: "Bantayan kung ano ang pinakamahusay sa inyong tiyak na kondisyon",
          },
          {
            title: "Gumamit ng mobile apps o humingi ng tulong sa eksperto kung kailangan",
            description: "Huwag mag-atubiling humingi ng tulong kapag kailangan ninyo",
          },
        ],
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa pagpaplano ng crop rotation. Magpapasalamat sa inyo ang inyong mga pananim at lupa dahil sa kaalamang ito!",
      completionButton: "Kahanga-hanga!",
    },
  },
}

// Updated Data constants with new crop group
const CROP_GROUPS = {
  legumes: { color: "#16A34A", bgColor: "#DCFCE7", emoji: "🌱" },
  leafy: { color: "#059669", bgColor: "#A7F3D0", emoji: "🥬" },
  fruiting: { color: "#DC2626", bgColor: "#FEE2E2", emoji: "🍅" },
  root: { color: "#EA580C", bgColor: "#FED7AA", emoji: "🥕" },
  cover: { color: "#7C3AED", bgColor: "#EDE9FE", emoji: "🌾" },
}

const ROTATION_PLAN = [
  { year: 1, plots: ["legumes", "leafy", "fruiting", "root"] },
  { year: 2, plots: ["leafy", "fruiting", "root", "legumes"] },
  { year: 3, plots: ["fruiting", "root", "legumes", "leafy"] },
  { year: 4, plots: ["root", "legumes", "leafy", "fruiting"] },
]

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

// Interactive Crop Group Card (with modal for How to Plan step only)
const CropGroupCard = ({ groupKey, group, onPress, t, interactive = false }) => (
  <TouchableOpacity
    style={[styles.cropGroupCard, { backgroundColor: group.bgColor }]}
    onPress={interactive ? () => onPress(groupKey) : undefined}
    activeOpacity={interactive ? 0.7 : 1}
    disabled={!interactive}
  >
    <Text style={styles.cropGroupEmoji}>{group.emoji}</Text>
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
)

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function EnhancedCropGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedCropGroup, setSelectedCropGroup] = useState(null)
  const [showCropModal, setShowCropModal] = useState(false)
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

  const handleCropGroupPress = (groupKey) => {
    setSelectedCropGroup({
      ...CROP_GROUPS[groupKey],
      ...t.cropGroups[groupKey],
      key: groupKey,
    })
    setShowCropModal(true)
  }

  const renderWhyImportantStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.whyImportant.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.whyImportant.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.whyImportant.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whyImportant.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.whyImportant.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.whyImportant.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.whyImportant.sources}</Text>
        <Text style={styles.additionalInfo}>{t.stepContent.whyImportant.additionalInfo}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyImportant.button}
      </CompleteButton>
    </View>
  )

  const renderWhatItDoesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.whatItDoes.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.whatItDoes.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.whatItDoes.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whatItDoes.soilBenefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.whatItDoes.yieldsTitle}</Text>
      <Text style={styles.description}>{t.stepContent.whatItDoes.yieldsDescription}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whatItDoes.yieldsBenefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#0891B2" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.whatItDoes.button}
      </CompleteButton>
    </View>
  )

  const renderHowToPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.howToPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.howToPlan.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.howToPlan.description}</Text>

      <View style={styles.cropGroupsContainer}>
        {Object.entries(CROP_GROUPS).map(([key, group]) => (
          <CropGroupCard
            key={key}
            groupKey={key}
            group={group}
            onPress={handleCropGroupPress}
            t={t}
            interactive={true}
          />
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.howToPlan.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.howToPlan.tipText}</Text>
          <Text style={styles.tipSource}>{t.stepContent.howToPlan.source}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.howToPlan.button}
      </CompleteButton>
    </View>
  )

  const renderPlanSeasonsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.planSeasons.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.planSeasons.subtitle}</Text>

      <Text style={styles.tableTitle}>{t.stepContent.planSeasons.tableTitle}</Text>

      <View style={styles.rotationTable}>
        <View style={styles.rotationHeader}>
          <Text style={styles.rotationHeaderText}>{t.stepContent.planSeasons.year}</Text>
          <Text style={styles.rotationHeaderText}>{t.stepContent.planSeasons.plotA}</Text>
          <Text style={styles.rotationHeaderText}>{t.stepContent.planSeasons.plotB}</Text>
          <Text style={styles.rotationHeaderText}>{t.stepContent.planSeasons.plotC}</Text>
          <Text style={styles.rotationHeaderText}>{t.stepContent.planSeasons.plotD}</Text>
        </View>
        {ROTATION_PLAN.map((year) => (
          <View key={year.year} style={styles.rotationRow}>
            <View style={styles.yearCell}>
              <Text style={styles.yearText}>
                {t.stepContent.planSeasons.year} {year.year}
              </Text>
            </View>
            {year.plots.map((cropType, plotIndex) => {
              const group = CROP_GROUPS[cropType]
              const groupTranslation = t.cropGroups[cropType]
              return (
                <View key={plotIndex} style={[styles.plotCell, { backgroundColor: group.bgColor }]}>
                  <Text style={styles.plotEmoji}>{group.emoji}</Text>
                  <Text style={styles.plotName}>{groupTranslation.name}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>

      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>{t.stepContent.planSeasons.benefitsTitle}</Text>
        {t.stepContent.planSeasons.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.planSeasons.button}
      </CompleteButton>
    </View>
  )

  const renderCheckAndChangeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.checkAndChange.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.checkAndChange.subtitle}</Text>

      <View style={styles.monitoringGrid}>
        {t.stepContent.checkAndChange.aspects.map((aspect, index) => (
          <View key={index} style={styles.monitoringItem}>
            <View style={styles.monitoringIconContainer}>
              <Ionicons
                name={["eye-outline", "flask-outline", "rainy-outline", "warning-outline"][index]}
                size={20}
                color="#16A34A"
              />
            </View>
            <View style={styles.monitoringItemContent}>
              <Text style={styles.monitoringItemTitle}>{aspect.title}</Text>
              <Text style={styles.monitoringItemDescription}>{aspect.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.checkAndChange.button}
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

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.firstSteps.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyImportantStep,
      renderWhatItDoesStep,
      renderHowToPlanStep,
      renderPlanSeasonsStep,
      renderCheckAndChangeStep,
      renderFirstStepsStep,
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

      {/* Crop Group Modal (only for How to Plan step) */}
      <Modal
        visible={showCropModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCropModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCropGroup && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <Text style={styles.modalEmoji}>{selectedCropGroup.emoji}</Text>
                    <Text style={styles.modalTitle}>{selectedCropGroup.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowCropModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: selectedCropGroup.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedCropGroup.role}</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedCropGroup.description}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.examples}</Text>
                <Text style={styles.modalExamples}>{selectedCropGroup.examples.join(", ")}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.benefits}</Text>
                {selectedCropGroup.benefits.map((benefit, index) => (
                  <View key={index} style={styles.modalBenefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
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
              <Ionicons name="trophy-outline" size={48} color="#16A34A" />
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
  evidenceCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  evidenceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 12,
  },
  evidenceText: {
    fontSize: 15,
    color: "#1E40AF",
    marginBottom: 12,
    lineHeight: 22,
  },
  sources: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 12,
  },
  additionalInfo: {
    fontSize: 15,
    color: "#1E40AF",
    lineHeight: 22,
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
  cropGroupEmoji: {
    fontSize: 36,
    marginRight: 16,
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
    color: "#D97706",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    color: "#D97706",
    lineHeight: 22,
    fontStyle: "italic",
    marginBottom: 8,
  },
  tipSource: {
    fontSize: 13,
    color: "#92400E",
    fontStyle: "italic",
  },
  rotationTable: {
    marginBottom: 24,
  },
  rotationHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  rotationHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  rotationRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  yearCell: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  yearText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
  },
  plotCell: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  plotEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  plotName: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
  },
  benefitsSection: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  monitoringItemContent: {
    flex: 1,
  },
  monitoringItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  monitoringItemDescription: {
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
