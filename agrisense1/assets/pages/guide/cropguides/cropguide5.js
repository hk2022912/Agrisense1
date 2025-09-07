import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

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
import { useNavigation } from "@react-navigation/native"

// Translation data for comprehensive soil guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Soil Preparation & Testing",
    progressTitle: "Your Progress",
    complete: "Complete",
    steps: [
      { title: "Why Soil Preparation Matters", icon: { name: "leaf-outline", library: "Ionicons" } },
      { title: "Understanding Soil Types", icon: { name: "terrain", library: "MaterialCommunityIcons" } },
      { title: "pH and Nutrient Testing", icon: { name: "test-tube", library: "MaterialCommunityIcons" } },
      { title: "Soil Preparation Steps", icon: { name: "hammer-outline", library: "Ionicons" } },
      { title: "Soil Health & Living Things", icon: { name: "bug-outline", library: "MaterialCommunityIcons" } },
      { title: "Beginner’s Action Steps", icon: { name: "checkbox-outline", library: "Ionicons" } },
    ],
    stepContent: {
      whyMatters: {
        title: "Why Soil Preparation Matters",
        subtitle: "The foundation of successful farming",
        description: "Preparing soil the right way helps with:",
        benefits: [
          "Better root growth and seed sprouting",
          "Good water drainage and holding",
          "Nutrient absorption and healthy soil life",
        ],
        studyTitle: "Research Evidence:",
        studyText:
          "A 2023 study showed that proper soil preparation can boost crop yields by 22–45% and reduce the need for fertilizers by 15–30%.",
        caseStudyTitle: "Case Study:",
        caseStudyText:
          "In sub-Saharan Africa, using compost and tilling twice gave 52% more maize harvest and cut soil erosion by 20%.",
        source:
          "Source: Jatav & Rajput (2025). Sustainable Nutrient Management under Climate Change. Frontiers in Agronomy",
        button: "Learn About Soil Types",
      },
      soilTypes: {
        title: "Understanding Soil Types",
        subtitle: "Know your soil to manage it better",
        description: "Different soil types require different management approaches:",
        soilData: [
          {
            type: "Clay",
            properties: "Heavy, holds water",
            challenges: "Poor drainage",
            tips: "Mix in sand and compost",
            color: "#8B4513",
            bgColor: "#F5DEB3",
          },
          {
            type: "Sandy",
            properties: "Light, drains fast",
            challenges: "Few nutrients",
            tips: "Add compost and mulch",
            color: "#DAA520",
            bgColor: "#FFF8DC",
          },
          {
            type: "Loam",
            properties: "Balanced, ideal soil",
            challenges: "None (best type)",
            tips: "Keep organic matter in soil",
            color: "#654321",
            bgColor: "#DEB887",
          },
          {
            type: "Silt",
            properties: "Smooth, very fertile",
            challenges: "Poor soil structure",
            tips: "Plant cover crops",
            color: "#A0522D",
            bgColor: "#F4E4BC",
          },
        ],
        jarTestTitle: "Tip: Jar Test",
        jarTestText:
          "You can try the jar test at home to check your soil type by mixing soil and water in a jar and watching how it settles.",
        source: "Source: USDA Soil Survey Manual (2022)",
        button: "Learn About pH Testing",
      },
      phTesting: {
        title: "Soil pH and Nutrient Testing",
        subtitle: "Understanding what your soil needs",
        description: "Crops grow best when soil pH is between 6.0 and 7.0. Testing your soil can help you learn about:",
        testingAspects: ["pH problems", "Main nutrients (Nitrogen, Phosphorus, Potassium)", "Organic matter levels"],
        exampleTitle: "Example:",
        exampleText: "Soils with pH below 5.5 often have trouble absorbing phosphorus.",
        phScale: [
          { range: "4.0  -  5.5", label: "Very Acidic", color: "#DC2626", description: "Poor nutrient availability" },
          { range: "5.5  -  6.0", label: "Acidic", color: "#EA580C", description: "Some nutrient issues" },
          { range: "6.0  -  7.0", label: "Ideal Range", color: "#16A34A", description: "Best for most crops" },
          { range: "7.0  -  8.0", label: "Alkaline", color: "#0891B2", description: "Some nutrient lockup" },
          { range: "8.0 +", label: "Very Alkaline", color: "#7C3AED", description: "Poor nutrient availability" },
        ],
        source: "Source: Zahedi & Khalifehzadeh (2025). Soil Organic Carbon and Fertility. WMR Journal",
        button: "Learn Preparation Steps",
      },
      preparation: {
        title: "How to Prepare and Improve Soil",
        subtitle: "Step-by-step soil improvement process",
        beforePlantingTitle: "Before planting:",
        beforePlantingSteps: [
          "Remove old plants and roots",
          "Loosen soil 15–30 cm deep",
          "Mix in compost or animal manure",
        ],
        adjustmentTitle: "Adjust soil based on test results:",
        adjustments: [
          { problem: "Low Nitrogen (N)", solution: "Compost or legume plants", icon: "leaf-outline" },
          { problem: "Low Phosphorus (P)", solution: "Bone meal or rock phosphate", icon: "flower-outline" },
          { problem: "Low Potassium (K)", solution: "Wood ash or banana peel water", icon: "nutrition-outline" },
          { problem: "pH too low (acidic)", solution: "Lime", icon: "arrow-up-outline" },
          { problem: "pH too high (alkaline)", solution: "Sulfur or pine needles", icon: "arrow-down-outline" },
        ],
        source: "Source: FAO Soil Fertility Guide (2023)",
        button: "Learn About Soil Health",
      },
      soilHealth: {
        title: "Soil Health and Living Things",
        subtitle: "The living ecosystem beneath your feet",
        description: "Healthy soil includes:",
        healthComponents: [
          "Microbes, fungi, and worms",
          "Natural recycling of nutrients like nitrogen and carbon",
          "Better structure and moisture holding",
        ],
        unReportTitle: "UN Report Finding:",
        unReportText: "The UN reported that adding just 2% more organic matter can improve water holding by 25%.",
        soilLife: [
          { organism: "Earthworms", role: "Improve soil structure and aeration", icon: { name: "shield-bug-outline", library: "MaterialCommunityIcons" } },
          { organism: "Beneficial Bacteria", role: "Fix nitrogen and break down organic matter", icon: { name: "bacteria-outline", library: "MaterialCommunityIcons" } },
          { organism: "Mycorrhizal Fungi", role: "Help plants absorb nutrients and water", icon: { name: "mushroom-outline", library: "MaterialCommunityIcons" } },
          { organism: "Beneficial Insects", role: "Control pests and pollinate plants", icon: { name: "butterfly", library: "MaterialCommunityIcons" } },
        ],
        source: "Source: UNCCD Global Land Outlook Soil Report (2022–2024)",
        button: "See Action Steps",
      },
      actionSteps: {
        title: "Simple Action Steps for Beginners",
        subtitle: "Your soil preparation checklist",
        description: "Use this checklist to get started:",
        steps: [
          "Find out what soil type you have",
          "Test pH and nutrients each year",
          "Add compost, lime, or sulfur as needed",
          "Use mulch or plant cover crops",
          "Till or rake to make soil soft and fine",
          "Keep notes in a soil journal",
          "Change up your soil boosters each season",
        ],
        gardenerTip: "Gardener's Tip:",
        tipText: "Feed the soil, not just the plant.",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand soil preparation and testing fundamentals. Your crops will thrive with this healthy foundation!",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Paghahanda at Pagsubok ng Lupa",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    steps: [
      { title: "Bakit Mahalaga ang Paghahanda", icon: { name: "leaf-outline", library: "Ionicons" } },
      { title: "Pagkilala sa mga Uri ng Lupa", icon: { name: "terrain", library: "MaterialCommunityIcons" } },
      { title: "pH at Pagsubok ng Nutrients", icon: { name: "test-tube", library: "MaterialCommunityIcons" } },
      { title: "Mga Hakbang sa Paghahanda", icon: { name: "hammer-outline", library: "Ionicons" } },
      { title: "Kalusugan ng Lupa", icon: { name: "bug-outline", library: "MaterialCommunityIcons" } },
      { title: "Mga Hakbang para sa Nagsisimula", icon: { name: "checkbox-outline", library: "Ionicons" } },
    ],
    stepContent: {
      whyMatters: {
        title: "Bakit Mahalaga ang Paghahanda ng Lupa",
        subtitle: "Ang pundasyon ng matagumpay na pagsasaka",
        description: "Ang tamang paghahanda ng lupa ay tumutulong sa:",
        benefits: [
          "Mas magandang paglaki ng ugat at pagsibol ng binhi",
          "Magandang drainage at pag-hold ng tubig",
          "Pag-absorb ng nutrients at malusog na soil life",
        ],
        studyTitle: "Katunayan ng Pananaliksik:",
        studyText:
          "Ang 2023 study ay nagpakita na ang tamang paghahanda ng lupa ay maaaring magpataas ng ani ng 22–45% at mabawasan ang pangangailangan sa fertilizers ng 15–30%.",
        caseStudyTitle: "Case Study:",
        caseStudyText:
          "Sa sub-Saharan Africa, ang paggamit ng compost at dalawang beses na pag-till ay nagbigay ng 52% na mas maraming ani ng mais at nabawasan ang soil erosion ng 20%.",
        source:
          "Source: Jatav & Rajput (2025). Sustainable Nutrient Management under Climate Change. Frontiers in Agronomy",
        button: "Matuto Tungkol sa mga Uri ng Lupa",
      },
      soilTypes: {
        title: "Pag-unawa sa mga Uri ng Lupa",
        subtitle: "Kilalanin ang inyong lupa para mas mapangasiwaan",
        description: "Ang iba't ibang uri ng lupa ay nangangailangan ng iba't ibang pamamaraan sa pamamahala:",
        soilData: [
          {
            type: "Clay",
            properties: "Mabigat, humahawak ng tubig",
            challenges: "Mahinang drainage",
            tips: "Haluin ang buhangin at compost",
            color: "#8B4513",
            bgColor: "#F5DEB3",
          },
          {
            type: "Sandy",
            properties: "Magaan, mabilis na drainage",
            challenges: "Kaunting nutrients",
            tips: "Magdagdag ng compost at mulch",
            color: "#DAA520",
            bgColor: "#FFF8DC",
          },
          {
            type: "Loam",
            properties: "Balanced, ideal na lupa",
            challenges: "Wala (pinakamahusay na uri)",
            tips: "Panatilihin ang organic matter",
            color: "#654321",
            bgColor: "#DEB887",
          },
          {
            type: "Silt",
            properties: "Makinis, napaka-fertile",
            challenges: "Mahinang soil structure",
            tips: "Magtanim ng cover crops",
            color: "#A0522D",
            bgColor: "#F4E4BC",
          },
        ],
        jarTestTitle: "Tip: Jar Test",
        jarTestText:
          "Maaari ninyong subukan ang jar test sa bahay para suriin ang uri ng inyong lupa sa pamamagitan ng paghalo ng lupa at tubig sa jar at pagbabantay kung paano ito mag-settle.",
        source: "Source: USDA Soil Survey Manual (2022)",
        button: "Matuto Tungkol sa pH Testing",
      },
      phTesting: {
        title: "Pagsubok ng pH at Nutrients ng Lupa",
        subtitle: "Pag-unawa sa kailangan ng inyong lupa",
        description:
          "Ang mga pananim ay pinakamahusay na lumalaki kapag ang soil pH ay nasa pagitan ng 6.0 at 7.0. Ang pagsubok sa inyong lupa ay makakatulong na malaman ninyo ang:",
        testingAspects: [
          "Mga problema sa pH",
          "Pangunahing nutrients (Nitrogen, Phosphorus, Potassium)",
          "Levels ng organic matter",
        ],
        exampleTitle: "Halimbawa:",
        exampleText:
          "Ang mga lupa na may pH na mas mababa sa 5.5 ay madalas na may problema sa pag-absorb ng phosphorus.",
        phScale: [
          {
            range: "4.0-5.5",
            label: "Sobrang Acidic",
            color: "#DC2626",
            description: "Mahinang nutrient availability",
          },
          { range: "5.5-6.0", label: "Acidic", color: "#EA580C", description: "May ilang nutrient issues" },
          {
            range: "6.0-7.0",
            label: "Ideal na Range",
            color: "#16A34A",
            description: "Pinakamahusay para sa karamihan ng pananim",
          },
          { range: "7.0-8.0", label: "Alkaline", color: "#0891B2", description: "May ilang nutrient lockup" },
          {
            range: "8.0+",
            label: "Sobrang Alkaline",
            color: "#7C3AED",
            description: "Mahinang nutrient availability",
          },
        ],
        source: "Source: Zahedi & Khalifehzadeh (2025). Soil Organic Carbon and Fertility. WMR Journal",
        button: "Matuto ng mga Hakbang sa Paghahanda",
      },
      preparation: {
        title: "Paano Maghanda at Mapabuti ang Lupa",
        subtitle: "Step-by-step na proseso ng pagpapabuti ng lupa",
        beforePlantingTitle: "Bago magtanim:",
        beforePlantingSteps: [
          "Alisin ang mga lumang halaman at ugat",
          "Gawing maluwag ang lupa ng 15–30 cm na lalim",
          "Haluin ang compost o animal manure",
        ],
        adjustmentTitle: "I-adjust ang lupa base sa mga resulta ng test:",
        adjustments: [
          { problem: "Mababang Nitrogen (N)", solution: "Compost o legume plants", icon: "leaf-outline" },
          { problem: "Mababang Phosphorus (P)", solution: "Bone meal o rock phosphate", icon: "flower-outline" },
          {
            problem: "Mababang Potassium (K)",
            solution: "Wood ash o banana peel water",
            icon: "nutrition-outline",
          },
          { problem: "pH na masyadong mababa (acidic)", solution: "Lime", icon: "arrow-up-outline" },
          {
            problem: "pH na masyadong mataas (alkaline)",
            solution: "Sulfur o pine needles",
            icon: "arrow-down-outline",
          },
        ],
        source: "Source: FAO Soil Fertility Guide (2023)",
        button: "Matuto Tungkol sa Kalusugan ng Lupa",
      },
      soilHealth: {
        title: "Kalusugan ng Lupa at mga Buhay na Bagay",
        subtitle: "Ang buhay na ecosystem sa ilalim ng inyong mga paa",
        description: "Ang malusog na lupa ay nagsasama ng:",
        healthComponents: [
          "Microbes, fungi, at mga uod",
          "Natural na pag-recycle ng nutrients tulad ng nitrogen at carbon",
          "Mas magandang structure at moisture holding",
        ],
        unReportTitle: "Natuklasan ng UN Report:",
        unReportText:
          "Ang UN ay nag-report na ang pagdagdag ng 2% pa lang na organic matter ay maaaring mapabuti ang water holding ng 25%.",
        soilLife: [
          { organism: "Mga Uod", role: "Pinapabuti ang soil structure at aeration", icon: { name: "worm", library: "MaterialCommunityIcons" } },
          { organism: "Beneficial Bacteria", role: "Nag-fix ng nitrogen at sinisira ang organic matter", icon: { name: "bacteria-outline", library: "MaterialCommunityIcons" } },
          {
            organism: "Mycorrhizal Fungi",
            role: "Tumutulong sa mga halaman na mag-absorb ng nutrients at tubig",
            icon: { name: "mushroom-outline", library: "MaterialCommunityIcons" },
          },
          {
            organism: "Beneficial Insects",
            role: "Kumokontrol sa mga peste at nag-pollinate ng mga halaman",
            icon: { name: "bug-outline", library: "MaterialCommunityIcons" },
          },
        ],
        source: "Source: UNCCD Global Land Outlook Soil Report (2022–2024)",
        button: "Tingnan ang mga Hakbang",
      },
      actionSteps: {
        title: "Simpleng Hakbang para sa Nagsisimula",
        subtitle: "Inyong checklist sa paghahanda ng lupa",
        description: "Gamitin ang checklist na ito para magsimula:",
        steps: [
          "Alamin kung anong uri ng lupa ang mayroon kayo",
          "Subukan ang pH at nutrients bawat taon",
          "Magdagdag ng compost, lime, o sulfur kung kailangan",
          "Gumamit ng mulch o magtanim ng cover crops",
          "Mag-till o mag-rake para gawing malambot at pino ang lupa",
          "Mag-keep ng notes sa soil journal",
          "Baguhin ang inyong soil boosters bawat season",
        ],
        gardenerTip: "Tip ng Hardinero:",
        tipText: "Pakainin ang lupa, hindi lang ang halaman.",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang mga pangunahing kaalaman sa paghahanda at pagsubok ng lupa. Magiging matagumpay ang inyong mga pananim!",
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
export default function ComprehensiveSoilGuide() {
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

      <View style={styles.caseStudyCard}>
        <Text style={styles.caseStudyTitle}>{t.stepContent.whyMatters.caseStudyTitle}</Text>
        <Text style={styles.caseStudyText}>{t.stepContent.whyMatters.caseStudyText}</Text>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.whyMatters.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyMatters.button}
      </CompleteButton>
    </View>
  )

  const renderSoilTypesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilTypes.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilTypes.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soilTypes.description}</Text>

      <View style={styles.soilTypesGrid}>
        {t.stepContent.soilTypes.soilData.map((soil, index) => (
          <View key={index} style={[styles.soilTypeCard, { backgroundColor: soil.bgColor }]}>
            <View style={[styles.soilTypeHeader, { backgroundColor: soil.color }]}>
              <Text style={styles.soilTypeName}>{soil.type} Soil</Text>
            </View>
            <View style={styles.soilTypeContent}>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Properties:</Text>
                <Text style={styles.soilTypeValue}>{soil.properties}</Text>
              </View>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Challenges:</Text>
                <Text style={styles.soilTypeValue}>{soil.challenges}</Text>
              </View>
              <View style={styles.soilTypeRow}>
                <Text style={styles.soilTypeLabel}>Tips:</Text>
                <Text style={styles.soilTypeTips}>{soil.tips}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.soilTypes.jarTestTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.soilTypes.jarTestText}</Text>
        </View>
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.soilTypes.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.soilTypes.button}
      </CompleteButton>
    </View>
  )

  const renderPhTestingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.phTesting.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.phTesting.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.phTesting.description}</Text>

      <View style={styles.testingCard}>
        {t.stepContent.phTesting.testingAspects.map((aspect, index) => (
          <View key={index} style={styles.testingItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.testingText}>{aspect}</Text>
          </View>
        ))}
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.phTesting.exampleTitle}</Text>
        <Text style={styles.exampleText}>{t.stepContent.phTesting.exampleText}</Text>
      </View>

      <Text style={styles.sectionTitle}>pH Scale Guide:</Text>
      <View style={styles.phScaleContainer}>
        {t.stepContent.phTesting.phScale.map((item, index) => (
          <View key={index} style={styles.phScaleItem}>
            <View style={[styles.phColorBar, { backgroundColor: item.color }]} />
            <View style={styles.phScaleContent}>
              <Text style={styles.phRange}>{item.range}</Text>
              <Text style={styles.phLabel}>{item.label}</Text>
              <Text style={styles.phDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.phTesting.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.phTesting.button}
      </CompleteButton>
    </View>
  )

  const renderPreparationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.preparation.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.preparation.subtitle}</Text>

      <Text style={styles.sectionTitle}>{t.stepContent.preparation.beforePlantingTitle}</Text>
      <View style={styles.stepsCard}>
        {t.stepContent.preparation.beforePlantingSteps.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.preparation.adjustmentTitle}</Text>
      <View style={styles.adjustmentsContainer}>
        {t.stepContent.preparation.adjustments.map((adjustment, index) => (
          <View key={index} style={styles.adjustmentItem}>
            <View style={styles.adjustmentIconContainer}>
              <Ionicons name={adjustment.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.adjustmentContent}>
              <Text style={styles.adjustmentProblem}>{adjustment.problem}</Text>
              <Text style={styles.adjustmentSolution}>→ {adjustment.solution}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.preparation.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.preparation.button}
      </CompleteButton>
    </View>
  )

  const renderSoilHealthStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilHealth.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilHealth.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soilHealth.description}</Text>

      <View style={styles.healthCard}>
        {t.stepContent.soilHealth.healthComponents.map((component, index) => (
          <View key={index} style={styles.healthItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.healthText}>{component}</Text>
          </View>
        ))}
      </View>

      <View style={styles.unReportCard}>
        <Text style={styles.unReportTitle}>{t.stepContent.soilHealth.unReportTitle}</Text>
        <Text style={styles.unReportText}>{t.stepContent.soilHealth.unReportText}</Text>
      </View>

      <Text style={styles.sectionTitle}>Soil Life:</Text>
      <View style={styles.soilLifeContainer}>
        {t.stepContent.soilHealth.soilLife.map((organism, index) => (
          <View key={index} style={styles.soilLifeItem}>
            {organism.icon.library === "Ionicons" ? (
              <Ionicons name={organism.icon.name} size={32} color="#374151" style={styles.soilLifeIcon} />
            ) : (
              <MaterialCommunityIcons name={organism.icon.name} size={32} color="#374151" style={styles.soilLifeIcon} />
            )}
            <View style={styles.soilLifeContent}>
              <Text style={styles.soilLifeOrganism}>{organism.organism}</Text>
              <Text style={styles.soilLifeRole}>{organism.role}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.soilHealth.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.soilHealth.button}
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

      <View style={styles.gardenerTipCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.gardenerTipContent}>
          <Text style={styles.gardenerTipTitle}>{t.stepContent.actionSteps.gardenerTip}</Text>
          <Text style={styles.gardenerTipText}>{t.stepContent.actionSteps.tipText}</Text>
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
      renderSoilTypesStep,
      renderPhTestingStep,
      renderPreparationStep,
      renderSoilHealthStep,
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
              <Ionicons name="earth-outline" size={48} color="#16A34A" />
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
  caseStudyCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  caseStudyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 8,
  },
  caseStudyText: {
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
  soilTypesGrid: {
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
  },
  testingCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  testingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  testingText: {
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
    marginBottom: 20,
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
  phScaleContainer: {
    marginBottom: 24,
  },
  phScaleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  phColorBar: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 16,
  },
  phScaleContent: {
    flex: 1,
  },
  phRange: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  phLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 4,
  },
  phDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
  },
  stepsCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  stepText: {
    fontSize: 15,
    color: "#16A34A",
    fontWeight: "500",
    flex: 1,
  },
  adjustmentsContainer: {
    marginBottom: 24,
  },
  adjustmentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  adjustmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  adjustmentContent: {
    flex: 1,
  },
  adjustmentProblem: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  adjustmentSolution: {
    fontSize: 14,
    color: "#16A34A",
    fontWeight: "500",
  },
  healthCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  healthItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  healthText: {
    fontSize: 15,
    color: "#16A34A",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  unReportCard: {
    backgroundColor: "#EFF6FF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  unReportTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E40AF",
    marginBottom: 8,
  },
  unReportText: {
    fontSize: 15,
    color: "#1E40AF",
    lineHeight: 22,
  },
  soilLifeContainer: {
    marginBottom: 24,
  },
  soilLifeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  soilLifeIcon: {
    marginRight: 16,
  },
  soilLifeContent: {
    flex: 1,
  },
  soilLifeOrganism: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  soilLifeRole: {
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
  gardenerTipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
  },
  gardenerTipContent: {
    flex: 1,
    marginLeft: 12,
  },
  gardenerTipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 8,
  },
  gardenerTipText: {
    fontSize: 16,
    color: "#D97706",
    fontWeight: "600",
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