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

// Translation data for fertilizer guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Complete Fertilizer Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "What is Soil Fertility?"},
      { title: "Organic Fertilizers"},
      { title: "Inorganic Fertilizers" },
      { title: "Integrated Approaches"},
      { title: "Best Practices & Comparison"},
    ],
    stepContent: {
      soilFertility: {
        title: "What is Soil Fertility?",
        subtitle: "Understanding the foundation of healthy plant growth",
        definition:
          "Soil fertility refers to its ability to support healthy plant growth by supplying nutrients like nitrogen (N), phosphorus (P), and potassium (K).",
        problems: "Unfertile soil causes:",
        issues: ["Low yields", "Weak crops", "Pest problems"],
        keyNutrients: "Essential nutrients (NPK):",
        nutrients: [
          { symbol: "N", name: "Nitrogen", role: "Leaf growth and green color" },
          { symbol: "P", name: "Phosphorus", role: "Root development and flowering" },
          { symbol: "K", name: "Potassium", role: "Disease resistance and fruit quality" },
        ],
        button: "Learn About Organic Fertilizers",
      },
      organic: {
        title: "Organic Fertilizers",
        subtitle: "Natural nutrition for sustainable farming",
        definition: "Made from natural sources like:",
        sources: ["Animal manure", "Compost/plant waste", "Fish/food waste"],
        benefits: [
          "Enhance beneficial soil microbes",
          "Improve root growth and crop productivity",
          "Raise soil carbon and moisture retention",
          "Minimize environmental pollution",
        ],
        limitations: ["Slow nutrient release", "Variable content", "Higher labor needs", "Affected by weather"],
        scientificSources: "Sources: Frontiers in Microbiology (2025), Soil Science (2025)",
        button: "Explore Chemical Fertilizers",
      },
      inorganic: {
        title: "Inorganic (Chemical) Fertilizers",
        subtitle: "Synthetic solutions for immediate results",
        definition: "Made from synthetic/mined minerals like:",
        sources: ["Urea (Nitrogen)", "Superphosphate (Phosphorus)", "Potash (Potassium)"],
        benefits: ["Rapid nutrient delivery", "Precise dosage", "Easy to store and apply", "High yields short term"],
        limitations: [
          "No improvement to soil life",
          "Risk of soil damage (acidification/salinity)",
          "Runoff pollution risk",
          "Decreased soil biodiversity over time",
        ],
        scientificSources: "Sources: Environmental Research (2024), ScienceDirect (2023–2024)",
        button: "Discover Integrated Approach",
      },
      integrated: {
        title: "Integrated Fertilizer Use",
        subtitle: "Best of both worlds approach",
        definition: "Combines organic and inorganic methods for optimal results",
        benefits: [
          "Improves nutrient uptake",
          "Supports soil health and biodiversity",
          "Increases crop yield sustainably",
          "Reduces chemical dependency",
        ],
        example: "Example:",
        studyResult:
          "2025 Yangzhou, China study showed 38% higher rice yield and reduced emissions using integrated fertilization.",
        keyPrinciple: "Key Principle:",
        principle:
          "Fertilizers feed crops—but healthy soil feeds your farm. Use the right fertilizer, in the right amount, at the right time.",
        button: "View Best Practices",
      },
      bestPractices: {
        title: "Best Practices & Comparison",
        subtitle: "Choose the right fertilizer for your needs",
        tableTitle: "Fertilizer Comparison Table",
        comparisonData: [
          {
            type: "Organic",
            icon: "leaf",
            madeFrom: "Compost, manure",
            speed: "Slow",
            soilHealth: "Very high",
            bestUse: "Long-term soil health",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Inorganic",
            icon: "test-tube",
            madeFrom: "Synthetic compounds",
            speed: "Fast",
            soilHealth: "Low to medium",
            bestUse: "Immediate crop needs",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Integrated",
            icon: "scale",
            madeFrom: "Organic + Inorganic",
            speed: "Balanced",
            soilHealth: "High",
            bestUse: "Sustainable yield + health",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
        ],
        bestPractices: "Best Practices:",
        practices: [
          {
            title: "Test your soil first",
            description: "Know what nutrients your soil needs before applying fertilizers",
            icon: "flask-outline",
          },
          {
            title: "Follow application timing",
            description: "Apply fertilizers when plants can best utilize the nutrients",
            icon: "time-outline",
          },
          {
            title: "Use proper amounts",
            description: "More is not always better - follow recommended dosages",
            icon: "scale-outline",
          },
          {
            title: "Consider environmental impact",
            description: "Choose methods that protect water sources and soil health",
            icon: "leaf-outline",
          },
        ],
        button: "I'm Ready to Apply This Knowledge!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You now understand the different types of fertilizers and how to use them effectively for healthy, productive crops!",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Kumpletong Gabay sa Fertilizer",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Ano ang Soil Fertility?" },
      { title: "Organic Fertilizers" },
      { title: "Inorganic Fertilizers" },
      { title: "Integrated Approaches" },
      { title: "Best Practices & Comparison" },
    ],
    stepContent: {
      soilFertility: {
        title: "Ano ang Soil Fertility?",
        subtitle: "Pag-unawa sa pundasyon ng malusog na paglaki ng halaman",
        definition:
          "Ang soil fertility ay tumutukoy sa kakayahan nito na suportahan ang malusog na paglaki ng halaman sa pamamagitan ng pagbibigay ng nutrients tulad ng nitrogen (N), phosphorus (P), at potassium (K).",
        problems: "Ang hindi fertile na lupa ay nagdudulot ng:",
        issues: ["Mababang ani", "Mahinang pananim", "Mga problema sa peste"],
        keyNutrients: "Mahahalagang nutrients (NPK):",
        nutrients: [
          { symbol: "N", name: "Nitrogen", role: "Paglaki ng dahon at berdeng kulay" },
          { symbol: "P", name: "Phosphorus", role: "Pag-develop ng ugat at pamumulaklak" },
          { symbol: "K", name: "Potassium", role: "Resistance sa sakit at kalidad ng prutas" },
        ],
        button: "Matuto Tungkol sa Organic Fertilizers",
      },
      organic: {
        title: "Organic Fertilizers",
        subtitle: "Natural na nutrisyon para sa sustainable farming",
        definition: "Gawa mula sa natural na sources tulad ng:",
        sources: ["Animal manure", "Compost/plant waste", "Fish/food waste"],
        benefits: [
          "Pinapahusay ang beneficial soil microbes",
          "Pinapabuti ang root growth at crop productivity",
          "Pinapataas ang soil carbon at moisture retention",
          "Binabawasan ang environmental pollution",
        ],
        limitations: [
          "Mabagal na nutrient release",
          "Variable na content",
          "Mas mataas na labor needs",
          "Naapektuhan ng panahon",
        ],
        scientificSources: "Sources: Frontiers in Microbiology (2025), Soil Science (2025)",
        button: "Tuklasin ang Chemical Fertilizers",
      },
      inorganic: {
        title: "Inorganic (Chemical) Fertilizers",
        subtitle: "Synthetic na solusyon para sa agarang resulta",
        definition: "Gawa mula sa synthetic/mined minerals tulad ng:",
        sources: ["Urea (Nitrogen)", "Superphosphate (Phosphorus)", "Potash (Potassium)"],
        benefits: [
          "Mabilis na nutrient delivery",
          "Tumpak na dosage",
          "Madaling i-store at i-apply",
          "Mataas na ani sa maikling panahon",
        ],
        limitations: [
          "Walang pagpapabuti sa soil life",
          "Risk ng soil damage (acidification/salinity)",
          "Risk ng runoff pollution",
          "Bumababa ang soil biodiversity sa paglipas ng panahon",
        ],
        scientificSources: "Sources: Environmental Research (2024), ScienceDirect (2023–2024)",
        button: "Tuklasin ang Integrated Approach",
      },
      integrated: {
        title: "Integrated Fertilizer Use",
        subtitle: "Best of both worlds approach",
        definition: "Pinagsasama ang organic at inorganic methods para sa optimal na resulta",
        benefits: [
          "Pinapabuti ang nutrient uptake",
          "Sinusuportahan ang soil health at biodiversity",
          "Pinapataas ang crop yield nang sustainable",
          "Binabawasan ang chemical dependency",
        ],
        example: "Halimbawa:",
        studyResult:
          "Ang 2025 Yangzhou, China study ay nagpakita ng 38% na mas mataas na rice yield at nabawasang emissions gamit ang integrated fertilization.",
        keyPrinciple: "Pangunahing Prinsipyo:",
        principle:
          "Ang mga fertilizer ay nagpapakain sa pananim—pero ang malusog na lupa ang nagpapakain sa inyong farm. Gamitin ang tamang fertilizer, sa tamang dami, sa tamang oras.",
        button: "Tingnan ang Best Practices",
      },
      bestPractices: {
        title: "Best Practices at Paghahambing",
        subtitle: "Pumili ng tamang fertilizer para sa inyong pangangailangan",
        tableTitle: "Fertilizer Comparison Table",
        comparisonData: [
          {
            type: "Organic",
            icon: "leaf",
            madeFrom: "Compost, manure",
            speed: "Mabagal",
            soilHealth: "Napakataas",
            bestUse: "Pangmatagalang kalusugan ng lupa",
            color: "#16A34A",
            bgColor: "#DCFCE7",
          },
          {
            type: "Inorganic",
            icon: "test-tube",
            madeFrom: "Synthetic compounds",
            speed: "Mabilis",
            soilHealth: "Mababa hanggang katamtaman",
            bestUse: "Agarang pangangailangan ng pananim",
            color: "#DC2626",
            bgColor: "#FEE2E2",
          },
          {
            type: "Integrated",
            icon: "scale",
            madeFrom: "Organic + Inorganic",
            speed: "Balanced",
            soilHealth: "Mataas",
            bestUse: "Sustainable na ani + kalusugan",
            color: "#7C3AED",
            bgColor: "#EDE9FE",
          },
        ],
        bestPractices: "Best Practices:",
        practices: [
          {
            title: "Subukan muna ang inyong lupa",
            description: "Alamin kung anong nutrients ang kailangan ng inyong lupa bago mag-apply ng fertilizers",
            icon: "flask-outline",
          },
          {
            title: "Sundin ang application timing",
            description: "Mag-apply ng fertilizers kapag pinakamahusay na magagamit ng mga halaman ang nutrients",
            icon: "time-outline",
          },
          {
            title: "Gumamit ng tamang dami",
            description: "Ang mas marami ay hindi palaging mas maganda - sundin ang recommended dosages",
            icon: "scale-outline",
          },
          {
            title: "Isaalang-alang ang environmental impact",
            description: "Pumili ng mga paraan na nagpoprotekta sa water sources at kalusugan ng lupa",
            icon: "leaf-outline",
          },
        ],
        button: "Handa na Akong Gamitin ang Kaalamang Ito!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Nauunawaan ninyo na ngayon ang iba't ibang uri ng fertilizers at kung paano gamitin ang mga ito nang epektibo para sa malusog at produktibong pananim!",
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
          <MaterialCommunityIcons name={step.icon} size={16} color={currentStep === index ? "#fff" : completedSteps.includes(index) ? "#16A34A" : "#6B7280"} style={{ marginRight: 4 }} />
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
export default function FertilizerGuide() {
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

  const renderSoilFertilityStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilFertility.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilFertility.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soilFertility.definition}</Text>

      <Text style={styles.sectionTitle}>{t.stepContent.soilFertility.problems}</Text>
      <View style={styles.issuesCard}>
        {t.stepContent.soilFertility.issues.map((issue, index) => (
          <View key={index} style={styles.issueItem}>
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
            <Text style={styles.issueText}>{issue}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.soilFertility.keyNutrients}</Text>
      <View style={styles.nutrientsContainer}>
        {t.stepContent.soilFertility.nutrients.map((nutrient, index) => (
          <View key={index} style={styles.nutrientCard}>
            <View style={styles.nutrientSymbol}>
              <Text style={styles.nutrientSymbolText}>{nutrient.symbol}</Text>
            </View>
            <View style={styles.nutrientInfo}>
              <Text style={styles.nutrientName}>{nutrient.name}</Text>
              <Text style={styles.nutrientRole}>{nutrient.role}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.soilFertility.button}
      </CompleteButton>
    </View>
  )

  const renderOrganicStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.organic.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.organic.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.organic.definition}</Text>

      <View style={styles.fertilizerCard}>
        <MaterialCommunityIcons name="leaf" size={36} color="#374151" style={{ marginRight: 16 }} />
        <View style={styles.fertilizerContent}>
          <Text style={styles.fertilizerTitle}>Sources:</Text>
          {t.stepContent.organic.sources.map((source, index) => (
            <Text key={index} style={styles.fertilizerItem}>
              • {source}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.benefitsCard}>
        <Text style={styles.cardTitle}>Benefits:</Text>
        {t.stepContent.organic.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.limitationsCard}>
        <Text style={styles.cardTitle}>Limitations:</Text>
        {t.stepContent.organic.limitations.map((limitation, index) => (
          <View key={index} style={styles.limitationItem}>
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
            <Text style={styles.limitationText}>{limitation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.organic.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.organic.button}
      </CompleteButton>
    </View>
  )

  const renderInorganicStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.inorganic.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.inorganic.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.inorganic.definition}</Text>

      <View style={styles.fertilizerCard}>
        <MaterialCommunityIcons name="test-tube" size={36} color="#374151" style={{ marginRight: 16 }} />
        <View style={styles.fertilizerContent}>
          <Text style={styles.fertilizerTitle}>Sources:</Text>
          {t.stepContent.inorganic.sources.map((source, index) => (
            <Text key={index} style={styles.fertilizerItem}>
              • {source}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.benefitsCard}>
        <Text style={styles.cardTitle}>Benefits:</Text>
        {t.stepContent.inorganic.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.limitationsCard}>
        <Text style={styles.cardTitle}>Limitations:</Text>
        {t.stepContent.inorganic.limitations.map((limitation, index) => (
          <View key={index} style={styles.limitationItem}>
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
            <Text style={styles.limitationText}>{limitation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.inorganic.scientificSources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.inorganic.button}
      </CompleteButton>
    </View>
  )

  const renderIntegratedStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.integrated.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.integrated.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.integrated.definition}</Text>

      <View style={styles.benefitsCard}>
        <Text style={styles.cardTitle}>Benefits:</Text>
        {t.stepContent.integrated.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>{t.stepContent.integrated.example}</Text>
        <Text style={styles.exampleText}>{t.stepContent.integrated.studyResult}</Text>
      </View>

      <View style={styles.principleCard}>
        <Ionicons name="bulb-outline" size={24} color="#D97706" />
        <View style={styles.principleContent}>
          <Text style={styles.principleTitle}>{t.stepContent.integrated.keyPrinciple}</Text>
          <Text style={styles.principleText}>{t.stepContent.integrated.principle}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.integrated.button}
      </CompleteButton>
    </View>
  )

  const renderBestPracticesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.bestPractices.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.bestPractices.subtitle}</Text>

      <Text style={styles.tableTitle}>{t.stepContent.bestPractices.tableTitle}</Text>

      <View style={styles.comparisonContainer}>
        {t.stepContent.bestPractices.comparisonData.map((item, index) => (
          <View key={index} style={[styles.comparisonCard, { backgroundColor: item.bgColor }]}>
            <View style={styles.comparisonHeader}>
              <MaterialCommunityIcons name={item.icon} size={24} color="#374151" style={{ marginRight: 12 }} />
              <Text style={styles.comparisonType}>{item.type}</Text>
            </View>
            <View style={styles.comparisonDetails}>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonLabel}>Made From:</Text>
                <Text style={styles.comparisonValue}>{item.madeFrom}</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonLabel}>Speed:</Text>
                <Text style={styles.comparisonValue}>{item.speed}</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonLabel}>Soil Health:</Text>
                <Text style={styles.comparisonValue}>{item.soilHealth}</Text>
              </View>
              <View style={styles.comparisonRow}>
                <Text style={styles.comparisonLabel}>Best Use:</Text>
                <Text style={styles.comparisonValue}>{item.bestUse}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.bestPractices.bestPractices}</Text>
      <View style={styles.practicesContainer}>
        {t.stepContent.bestPractices.practices.map((practice, index) => (
          <View key={index} style={styles.practiceItem}>
            <View style={styles.practiceIconContainer}>
              <Ionicons name={practice.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.practiceContent}>
              <Text style={styles.practiceTitle}>{practice.title}</Text>
              <Text style={styles.practiceDescription}>{practice.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.bestPractices.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderSoilFertilityStep,
      renderOrganicStep,
      renderInorganicStep,
      renderIntegratedStep,
      renderBestPracticesStep,
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
              <Ionicons name="nutrition-outline" size={48} color="#16A34A" />
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
    color: "#2F855A",
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
    minWidth: 120,
  },
  activeStepTab: {
    backgroundColor: "#2F855A",
    borderColor: "#2F855A",
  },
  completedStepTab: {
    backgroundColor: "#DCFCE7",
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
  tableTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  issuesCard: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  issueItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  issueText: {
    fontSize: 15,
    color: "#DC2626",
    marginLeft: 12,
    fontWeight: "500",
    flex: 1,
  },
  nutrientsContainer: {
    marginBottom: 24,
  },
  nutrientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  nutrientSymbol: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  nutrientSymbolText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  nutrientInfo: {
    flex: 1,
  },
  nutrientName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16A34A",
    marginBottom: 4,
  },
  nutrientRole: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  fertilizerCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  fertilizerContent: {
    flex: 1,
  },
  fertilizerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  fertilizerItem: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  limitationsCard: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
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
  limitationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  limitationText: {
    fontSize: 15,
    color: "#DC2626",
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
  principleCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFBEB",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 24,
  },
  principleContent: {
    flex: 1,
    marginLeft: 12,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D97706",
    marginBottom: 8,
  },
  principleText: {
    fontSize: 15,
    color: "#D97706",
    lineHeight: 22,
    fontStyle: "italic",
  },
  comparisonContainer: {
    marginBottom: 24,
  },
  comparisonCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  comparisonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  comparisonType: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  comparisonDetails: {
    gap: 8,
  },
  comparisonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  comparisonLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    flex: 1,
  },
  comparisonValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    flex: 2,
    textAlign: "right",
  },
  practicesContainer: {
    marginBottom: 24,
  },
  practiceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  practiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  practiceContent: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  practiceDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
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