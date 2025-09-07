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

// Translation data for pest management
const TRANSLATIONS = {
  en: {
    headerTitle: "Organic Pest & Disease Management",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Understanding Integrated Organic Methods", icon: "microscope-outline" },
      { title: "Core Approaches to Pest Management", icon: "shield-checkmark-outline" },
      { title: "Simple Steps for Effective Organic Pest Management", icon: "document-text-outline" },
      { title: "Organic Pest Control for Beginners", icon: "rocket-outline" },
    ],
    strategies: {
      biological: {
        name: "Biological Control",
        examples: ["Ladybugs", "Microbial nematodes", "Beneficial wasps"],
        effect: "50–70% pest reduction",
        description:
          "Use natural predators and beneficial organisms to control pest populations. This method works by introducing or encouraging natural enemies of pests.",
        benefits: ["Long-term pest control", "Environmentally safe", "Self-sustaining once established"],
      },
      cultural: {
        name: "Cultural Practices",
        examples: ["Crop rotation", "Intercropping", "Companion planting"],
        effect: "Breaks disease cycles",
        description:
          "Modify farming practices to create unfavorable conditions for pests and diseases while promoting healthy plant growth.",
        benefits: ["Prevents pest buildup", "Improves soil health", "Reduces disease pressure"],
      },
      mechanical: {
        name: "Mechanical Control",
        examples: ["Mulching", "Handpicking", "Solarization"],
        effect: "Aids suppression",
        description:
          "Physical methods to prevent, remove, or destroy pests and create barriers to protect crops from pest damage.",
        benefits: ["Immediate results", "No chemical residues", "Precise targeting"],
      },
      biopesticides: {
        name: "Biopesticides",
        examples: ["Neem", "Pyrethrum", "Essential oils"],
        effect: "Natural pest control",
        description:
          "Plant-based or naturally occurring substances that control pests with minimal environmental impact and low toxicity.",
        benefits: ["Biodegradable", "Low toxicity", "Target specific pests"],
      },
      trapPush: {
        name: "Trap/Push–Pull Crops",
        examples: ["Desmodium", "Marigolds", "Nasturtiums"],
        effect: "Repel pests, attract predators",
        description:
          "Strategic planting of crops that either attract pests away from main crops (trap) or repel them while attracting beneficial insects.",
        benefits: ["Natural pest management", "Attracts beneficial insects", "Improves biodiversity"],
      },
      nonPesticidal: {
        name: "Non-Pesticidal Practices",
        examples: ["Garlic sprays", "Pheromone traps", "Sticky traps"],
        effect: "Sustainable suppression",
        description:
          "Alternative methods that don't rely on pesticides but use natural deterrents and monitoring tools for pest management.",
        benefits: ["Chemical-free", "Safe for beneficial insects", "Cost-effective"],
      },
    },
    stepContent: {
      understanding: {
        title: "Understanding Integrated Organic Methods",
        subtitle: "The Power of Combined Strategies",
        description:
          "Studies show that combining biological, cultural, mechanical, and natural repellent strategies can:",
        benefits: [
          "Reduce pests by 40–70%",
          "Decrease diseases by 30–60%",
          "Lower synthetic pesticide use by 50–80%",
          "Improve yields by 20–50%",
        ],
        sources: "Sources: ucanr.edu | researchgate.net | thesun.co.uk | tcimag.tcia.org",
        button: "Learn Key Strategies",
      },
      strategies: {
        title: "Strategic Pest Control Solutions",
        subtitle: "Comprehensive approach to organic pest management",
        description: "Each strategy plays a unique role in creating a balanced pest management system:",
        button: "Ready to Implement",
      },
      implementation: {
        title: "Structured Plan for Organic Pest Solutions",
        subtitle: "Step-by-step approach to organic pest management",
        steps: [
          {
            title: "Study local pest/disease cycles",
            description: "Research common pests and diseases in your area and their seasonal patterns",
            icon: "book-outline",
          },
          {
            title: "Install monitoring tools",
            description: "Set up traps, scouts, and sensors to track pest populations",
            icon: "eye-outline",
          },
          {
            title: "Intercrop or rotate repellent/trap crops",
            description: "Plant strategic crops that repel pests or attract them away from main crops",
            icon: "leaf-outline",
          },
          {
            title: "Apply biopesticides as needed",
            description: "Use natural pesticides when pest levels exceed acceptable thresholds",
            icon: "water-outline",
          },
          {
            title: "Track pest levels, yields, and soil metrics annually",
            description: "Monitor and record data to improve your pest management strategy over time",
            icon: "analytics-outline",
          },
        ],
        button: "Show Beginner Plan",
      },
      beginnerPlan: {
        title: "Beginner’s Step-by-Step Guide",
        subtitle: "Simple steps to start your organic pest management journey",
        steps: [
          {
            title: "Identify common pests/diseases",
            description: "Learn to recognize the most common problems in your area",
          },
          {
            title: "Select 2–3 biopesticides or beneficial insects",
            description: "Start with proven organic solutions that work in your region",
          },
          {
            title: "Plant trap/repellent crops",
            description: "Add companion plants that naturally deter pests",
          },
          {
            title: "Check crops weekly",
            description: "Regular monitoring helps catch problems early",
          },
          {
            title: "Rotate/intercrop each season",
            description: "Change your planting patterns to break pest cycles",
          },
          {
            title: "Try simple tech tools",
            description: "Use light traps, IoT sensors, or mobile apps for monitoring",
          },
        ],
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      effect: "Effect:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've learned the fundamentals of organic pest and disease management. Your crops will be healthier and more sustainable!",
      completionButton: "Excellent!",
    },
  },
  tl: {
    headerTitle: "Organic na Pamamahala sa Peste at Sakit",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Pag-unawa sa Integrated Organic Methods", icon: "microscope-outline" },
      { title: "Mga Pangunahing Estratehiya", icon: "shield-checkmark-outline" },
      { title: "Planong Organiko para Labanan ang mga Peste", icon: "document-text-outline" },
      { title: "Plano ng Aksyon para sa Nagsisimula", icon: "rocket-outline" },
    ],
    strategies: {
      biological: {
        name: "Biological Control",
        examples: ["Ladybugs", "Microbial nematodes", "Beneficial wasps"],
        effect: "50–70% na pagbawas ng peste",
        description:
          "Gamitin ang natural na mandaragit at kapakipakinabang na organismo para kontrolin ang populasyon ng peste. Ang pamamaraang ito ay gumagana sa pamamagitan ng pagpapakilala o paghikayat sa natural na kaaway ng mga peste.",
        benefits: [
          "Pangmatagalang kontrol sa peste",
          "Ligtas sa kapaligiran",
          "Nagiging self-sustaining kapag naitatag na",
        ],
      },
      cultural: {
        name: "Cultural Practices",
        examples: ["Pag-ikot ng pananim", "Intercropping", "Companion planting"],
        effect: "Naputuputol ang cycle ng sakit",
        description:
          "Baguhin ang mga gawi sa pagsasaka para makagawa ng hindi pabor na kondisyon para sa peste at sakit habang nagpo-promote ng malusog na paglaki ng halaman.",
        benefits: [
          "Pumipigil sa pagdami ng peste",
          "Pinapabuti ang kalusugan ng lupa",
          "Binabawasan ang pressure ng sakit",
        ],
      },
      mechanical: {
        name: "Mechanical Control",
        examples: ["Mulching", "Handpicking", "Solarization"],
        effect: "Tumutulong sa pagsupil",
        description:
          "Pisikal na paraan para pigilan, alisin, o sirain ang mga peste at makagawa ng hadlang para protektahan ang mga pananim mula sa pinsala ng peste.",
        benefits: ["Agarang resulta", "Walang chemical residues", "Tumpak na targeting"],
      },
      biopesticides: {
        name: "Biopesticides",
        examples: ["Neem", "Pyrethrum", "Essential oils"],
        effect: "Natural na kontrol sa peste",
        description:
          "Mga substansyang galing sa halaman o natural na nangyayari na kumokontrol sa peste na may minimal na impact sa kapaligiran at mababang toxicity.",
        benefits: ["Biodegradable", "Mababang toxicity", "Target ng specific na peste"],
      },
      trapPush: {
        name: "Trap/Push–Pull Crops",
        examples: ["Desmodium", "Marigolds", "Nasturtiums"],
        effect: "Tumatakot sa peste, umaakit sa predators",
        description:
          "Strategic na pagtatanim ng mga pananim na umaakit sa peste palayo sa pangunahing pananim (trap) o tumatakot sa kanila habang umaakit sa beneficial insects.",
        benefits: ["Natural na pamamahala sa peste", "Umaakit sa beneficial insects", "Pinapabuti ang biodiversity"],
      },
      nonPesticidal: {
        name: "Non-Pesticidal Practices",
        examples: ["Garlic sprays", "Pheromone traps", "Sticky traps"],
        effect: "Sustainable na pagsupil",
        description:
          "Alternative na paraan na hindi umaasa sa pesticides pero gumagamit ng natural na deterrents at monitoring tools para sa pest management.",
        benefits: ["Walang chemical", "Ligtas sa beneficial insects", "Cost-effective"],
      },
    },
    stepContent: {
      understanding: {
        title: "Pag-unawa sa Integrated Organic Methods",
        subtitle: "Ang Kapangyarihan ng Pinagsama-samang Estratehiya",
        description:
          "Ang mga pag-aaral ay nagpapakita na ang pagsasama ng biological, cultural, mechanical, at natural repellent strategies ay maaaring:",
        benefits: [
          "Bawasan ang peste ng 40–70%",
          "Bawasan ang mga sakit ng 30–60%",
          "Bawasan ang paggamit ng synthetic pesticide ng 50–80%",
          "Mapabuti ang ani ng 20–50%",
        ],
        sources: "Sources: ucanr.edu | researchgate.net | thesun.co.uk | tcimag.tcia.org",
        button: "Matuto ng Mga Pangunahing Estratehiya",
      },
      strategies: {
        title: "Mga Pangunahing Estratehiya",
        subtitle: "Komprehensibong approach sa organic pest management - pindutin ang mga card para matuto pa",
        description:
          "Ang bawat estratehiya ay may natatanging papel sa paglikha ng balanced na pest management system:",
        button: "Handa na Magpatupad",
      },
      implementation: {
        title: "Maayos na Plano para sa Likas na Panlaban sa mga Peste",
        subtitle: "Step-by-step na approach sa organic pest management",
        steps: [
          {
            title: "Pag-aralan ang local pest/disease cycles",
            description: "Mag-research ng mga common pests at sakit sa inyong lugar at ang kanilang seasonal patterns",
            icon: "book-outline",
          },
          {
            title: "Mag-install ng monitoring tools",
            description: "Mag-setup ng mga trap, scouts, at sensors para bantayan ang pest populations",
            icon: "eye-outline",
          },
          {
            title: "Mag-intercrop o mag-rotate ng repellent/trap crops",
            description:
              "Magtanim ng strategic na crops na tumatakot sa peste o umaakit sa kanila palayo sa main crops",
            icon: "leaf-outline",
          },
          {
            title: "Mag-apply ng biopesticides kung kailangan",
            description: "Gamitin ang natural pesticides kapag ang pest levels ay lumampas sa acceptable thresholds",
            icon: "water-outline",
          },
          {
            title: "Bantayan ang pest levels, yields, at soil metrics taun-taon",
            description:
              "Monitor at mag-record ng data para mapabuti ang inyong pest management strategy sa paglipas ng panahon",
            icon: "analytics-outline",
          },
        ],
        button: "Ipakita ang Beginner Plan",
      },
      beginnerPlan: {
        title: "Plano ng Aksyon para sa Nagsisimula",
        subtitle: "Simpleng hakbang para simulan ang inyong organic pest management journey",
        steps: [
          {
            title: "Kilalanin ang mga common pests/diseases",
            description: "Matutong makilala ang mga pinakakaraniwang problema sa inyong lugar",
          },
          {
            title: "Pumili ng 2–3 biopesticides o beneficial insects",
            description: "Magsimula sa napatunayang organic solutions na gumagana sa inyong rehiyon",
          },
          {
            title: "Magtanim ng trap/repellent crops",
            description: "Magdagdag ng companion plants na natural na tumatakot sa peste",
          },
          {
            title: "Suriin ang mga pananim lingguhan",
            description: "Regular na monitoring ay tumutulong na mahuli ang mga problema nang maaga",
          },
          {
            title: "Mag-rotate/intercrop bawat season",
            description: "Baguhin ang inyong planting patterns para maputol ang pest cycles",
          },
          {
            title: "Subukan ang simpleng tech tools",
            description: "Gamitin ang light traps, IoT sensors, o mobile apps para sa monitoring",
          },
        ],
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      effect: "Epekto:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa organic pest at disease management. Mas magiging malusog at sustainable ang inyong mga pananim!",
      completionButton: "Napakahusay!",
    },
  },
}

// Data constants for pest management strategies
const STRATEGY_GROUPS = {
  biological: { color: "#16A34A", bgColor: "#DCFCE7", icon: "ladybug" },
  cultural: { color: "#059669", bgColor: "#A7F3D0", icon: "recycle" },
  mechanical: { color: "#DC2626", bgColor: "#FEE2E2", icon: "wrench" },
  biopesticides: { color: "#7C3AED", bgColor: "#EDE9FE", icon: "flower-pollen" },
  trapPush: { color: "#EA580C", bgColor: "#FED7AA", icon: "bee-flower" },
  nonPesticidal: { color: "#0891B2", bgColor: "#CFFAFE", icon: "target" },
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

// Interactive Strategy Card (with modal for strategies step only)
const StrategyCard = ({ strategyKey, strategy, onPress, t, interactive = false }) => (
  <TouchableOpacity
    style={[styles.strategyCard, { backgroundColor: strategy.bgColor }]}
    onPress={interactive ? () => onPress(strategyKey) : undefined}
    activeOpacity={interactive ? 0.7 : 1}
    disabled={!interactive}
  >
    <MaterialCommunityIcons name={strategy.icon} size={36} color="#374151" style={{ marginRight: 16 }} />
    <View style={styles.strategyInfo}>
      <Text style={styles.strategyName}>{t.strategies[strategyKey].name}</Text>
      <View style={[styles.strategyBadge, { backgroundColor: strategy.color }]}>
        <Text style={styles.strategyBadgeText}>{t.strategies[strategyKey].effect}</Text>
      </View>
      <Text style={styles.strategyExamples}>
        {t.modal.examples} {t.strategies[strategyKey].examples.join(", ")}
      </Text>
    </View>
    {interactive && <Ionicons name="chevron-forward" size={20} color={strategy.color} />}
  </TouchableOpacity>
)

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function PestManagementGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedStrategy, setSelectedStrategy] = useState(null)
  const [showStrategyModal, setShowStrategyModal] = useState(false)
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

  const handleStrategyPress = (strategyKey) => {
    setSelectedStrategy({
      ...STRATEGY_GROUPS[strategyKey],
      ...t.strategies[strategyKey],
      key: strategyKey,
    })
    setShowStrategyModal(true)
  }

  const renderUnderstandingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.understanding.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.understanding.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.understanding.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.understanding.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sourcesCard}>
        <Text style={styles.sources}>{t.stepContent.understanding.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.understanding.button}
      </CompleteButton>
    </View>
  )

  const renderStrategiesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.strategies.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.strategies.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.strategies.description}</Text>

      <View style={styles.strategiesContainer}>
        {Object.entries(STRATEGY_GROUPS).map(([key, strategy]) => (
          <StrategyCard
            key={key}
            strategyKey={key}
            strategy={strategy}
            onPress={handleStrategyPress}
            t={t}
            interactive={true}
          />
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.strategies.button}
      </CompleteButton>
    </View>
  )

  const renderImplementationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.implementation.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.implementation.subtitle}</Text>

      <View style={styles.implementationSteps}>
        {t.stepContent.implementation.steps.map((step, index) => (
          <View key={index} style={styles.implementationItem}>
            <View style={styles.implementationIconContainer}>
              <Ionicons name={step.icon} size={24} color="#16A34A" />
            </View>
            <View style={styles.implementationContent}>
              <Text style={styles.implementationTitle}>{step.title}</Text>
              <Text style={styles.implementationDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.implementation.button}
      </CompleteButton>
    </View>
  )

  const renderBeginnerPlanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.beginnerPlan.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.beginnerPlan.subtitle}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.beginnerPlan.steps.map((step, index) => (
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

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.beginnerPlan.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [renderUnderstandingStep, renderStrategiesStep, renderImplementationStep, renderBeginnerPlanStep]
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

      {/* Strategy Modal (only for Key Strategies step) */}
      <Modal
        visible={showStrategyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStrategyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStrategy && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <MaterialCommunityIcons name={selectedStrategy.icon} size={28} color="#16A34A" style={{ marginRight: 12 }} />
                    <Text style={styles.modalTitle}>{selectedStrategy.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowStrategyModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: selectedStrategy.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedStrategy.effect}</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedStrategy.description}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.examples}</Text>
                <Text style={styles.modalExamples}>{selectedStrategy.examples.join(", ")}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.benefits}</Text>
                {selectedStrategy.benefits.map((benefit, index) => (
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
              <Ionicons name="shield-checkmark-outline" size={48} color="#16A34A" />
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
  strategiesContainer: {
    marginBottom: 24,
  },
  strategyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  strategyInfo: {
    flex: 1,
  },
  strategyName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  strategyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  strategyBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  strategyExamples: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  implementationSteps: {
    marginBottom: 24,
  },
  implementationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  implementationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  implementationContent: {
    flex: 1,
  },
  implementationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  implementationDescription: {
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