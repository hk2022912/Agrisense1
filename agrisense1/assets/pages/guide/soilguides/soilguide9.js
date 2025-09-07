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

// Translation data for Soil Testing Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Soil Testing Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "What is Soil Testing and Why It Matters", icon: "flask-outline", iconLibrary: "Ionicons" },
      { title: "What Soil Testing Can Tell You", icon: "analytics-outline", iconLibrary: "Ionicons" },
      { title: "How to Collect Soil Samples Properly", icon: "hand-left-outline", iconLibrary: "Ionicons" },
      { title: "Interpreting Soil Test Results", icon: "document-text-outline", iconLibrary: "Ionicons" },
      { title: "After the Test: Taking Action", icon: "hammer-outline", iconLibrary: "Ionicons" },
      { title: "Beginner's Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      nutrients: {
        name: "Nutrient Levels",
        role: "Essential elements for plant growth",
        examples: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Calcium", "Magnesium", "Micronutrients"],
        description:
          "Soil testing reveals the availability of essential nutrients that plants need for healthy growth and development.",
        benefits: ["Identifies deficiencies", "Prevents over-fertilization", "Optimizes plant nutrition"],
      },
      ph: {
        name: "Soil pH",
        role: "Affects nutrient availability",
        examples: ["Acidic (below 6.0)", "Neutral (6.0-7.0)", "Alkaline (above 7.0)"],
        description:
          "pH determines how well plants can absorb nutrients from the soil. Most crops prefer slightly acidic to neutral pH.",
        benefits: ["Optimizes nutrient uptake", "Guides soil amendments", "Improves crop performance"],
      },
      organic: {
        name: "Organic Matter & Texture",
        role: "Determines soil structure and water holding capacity",
        examples: ["Organic matter %", "Sand content", "Silt content", "Clay content"],
        description:
          "Organic matter and soil texture affect water retention, drainage, and root development in your soil.",
        benefits: ["Better water retention", "Improved soil structure", "Enhanced root development"],
      },
    },
    stepContent: {
      composting: {
        title: "What is Soil Testing and Why It Matters",
        subtitle: "Know Before You Grow",
        description:
          "Soil testing is the process of analyzing soil samples to determine nutrient content, pH level, and organic matter. It helps farmers make informed decisions about fertilizers, soil amendments, and crop planning.",
        benefits: [
          "Reveals nutrient deficiencies or excesses",
          "Identifies soil pH problems (too acidic or alkaline)",
          "Helps apply the right type and amount of fertilizer",
          "Reduces input costs and prevents over-fertilization",
          "Improves crop yield and long-term soil health",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Research shows farmers who base fertilization on soil tests increase productivity by 20–30% compared to guesswork.",
        sources:
          "Sources: fao.org | agrilifeextension.tamu.edu | frontiersin.org/articles/10.3389/fsufs.2022.897087/full",
        button: "Got It! Learn What Tests Reveal",
      },
      ingredients: {
        title: "What Soil Testing Can Tell You",
        subtitle: "Understanding Your Soil's Story",
        description:
          "Soil tests provide valuable information about nutrient levels, pH balance, and soil structure that directly impact crop success.",
        tipTitle: "Farmer Tip:",
        tipText:
          "Most crops prefer pH 6.0–7.0 for optimal nutrient availability. Acidic or alkaline soil may require lime or sulfur amendments.",
        button: "Ready to Learn Sampling Methods!",
      },
      startComposting: {
        title: "How to Collect Soil Samples Properly",
        subtitle: "Step-by-Step Soil Sampling",
        homeGarden: {
          title: "Proper Sampling Technique",
          steps: [
            "Choose sampling spots – collect from several areas of the plot (5–10 spots)",
            "Dig 6–8 inches deep using a trowel or auger",
            "Remove debris and mix soil samples in a clean bucket",
            "Air dry the mixed sample and place 1/2 kg into a labeled bag",
            "Send to a certified soil testing lab or bring to your local agriculture office",
          ],
        },
        farm: {
          title: "Best Practices for Accurate Results",
          steps: [
            "Sample at least once a year (preferably before planting season)",
            "Avoid sampling right after fertilizing or heavy rains",
            "Use clean tools to prevent contamination",
            "Label samples clearly with location and date",
            "Store samples properly until testing",
          ],
        },
        source: "Tip: Consistent sampling methods ensure reliable year-to-year comparisons",
        button: "Learn to Read Test Results!",
      },
      benefits: {
        title: "Interpreting Soil Test Results",
        subtitle: "Understanding Your Soil Report",
        description: "A standard soil test report provides key information to guide your farming decisions.",
        nutrientSupply: [
          "pH: 6.0–7.0 (Balance of acidity and alkalinity)",
          "Organic Matter: 3–5% (Higher = better structure & fertility)",
        ],
        soilHealth: [
          "Nitrogen (N): Medium–High (Needed for leafy crops)",
          "Phosphorus (P): Medium–High (Needed for root/fruit crops)",
        ],
        plantGrowth: [
          "Potassium (K): Medium–High (Supports plant immunity)",
          "Use the test to choose the right fertilizers and correct imbalances",
        ],
        evidenceTitle: "Reading Your Report",
        evidenceText:
          "Understanding these parameters helps you make informed decisions about soil amendments and fertilizer applications.",
        source: "Source: sciencedirect.com | mdpi.com",
        button: "Learn How to Take Action!",
      },
      mistakes: {
        title: "After the Test: Taking Action",
        subtitle: "Turning Results into Better Crops",
        mistakes: [
          { title: "Adjust pH", description: "Add lime if soil is too acidic; Add sulfur or compost if too alkaline" },
          {
            title: "Apply Fertilizer Based on Need",
            description: "Use organic or inorganic sources; Follow recommended rates",
          },
          {
            title: "Consider Slow-Release Options",
            description: "Use slow-release fertilizers or compost for long-term health",
          },
          {
            title: "Improve Organic Matter",
            description: "Add compost, green manure, or cover crops to build soil health",
          },
          {
            title: "Reduce Soil Disturbance",
            description: "Reduce tilling and keep soil covered when possible",
          },
        ],
        tipTitle: "Integration Tip:",
        tipText: "Combine test results with your crop rotation plan for best outcomes and sustainable soil management.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner's Action Steps",
        subtitle: "Start Testing Your Soil Today",
        steps: [
          {
            title: "Collect and send soil samples before every planting season",
            description: "Make soil testing a regular part of your farming routine",
          },
          {
            title: "Learn to read basic test reports",
            description: "Ask agri-technicians if you need help understanding results",
          },
          {
            title: "Use test data to choose crops suited to your soil condition",
            description: "Match crop requirements with your soil's capabilities",
          },
          {
            title: "Adjust fertilizer use and save on costs",
            description: "Apply only what your soil needs based on test results",
          },
          {
            title: "Track improvements in yield and soil health each year",
            description: "Monitor progress and adjust practices accordingly",
          },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Healthy crops start with healthy soil—test it, don't guess it.",
        button: "I'm Ready to Test My Soil!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the basics of soil testing. Your informed decisions will lead to healthier crops and better yields!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Soil Testing",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Ano ang Soil Testing at Bakit Mahalaga", icon: "flask-outline", iconLibrary: "Ionicons" },
      { title: "Ano ang Malalaman sa Soil Testing", icon: "analytics-outline", iconLibrary: "Ionicons" },
      { title: "Paano Kumuha ng Soil Samples nang Tama", icon: "hand-left-outline", iconLibrary: "Ionicons" },
      { title: "Pag-interpret ng Soil Test Results", icon: "document-text-outline", iconLibrary: "Ionicons" },
      { title: "Pagkatapos ng Test: Paggawa ng Aksyon", icon: "hammer-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      nutrients: {
        name: "Nutrient Levels",
        role: "Mga essential elements para sa paglago ng halaman",
        examples: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "Calcium", "Magnesium", "Micronutrients"],
        description:
          "Ang soil testing ay naglalantad ng availability ng mga essential nutrients na kailangan ng mga halaman para sa malusog na paglago at development.",
        benefits: [
          "Natutukoy ang mga deficiencies",
          "Pinipigilan ang over-fertilization",
          "Ino-optimize ang plant nutrition",
        ],
      },
      ph: {
        name: "Soil pH",
        role: "Nakakaapekto sa nutrient availability",
        examples: ["Acidic (below 6.0)", "Neutral (6.0-7.0)", "Alkaline (above 7.0)"],
        description:
          "Ang pH ay tumutukoy kung gaano kahusay na makakakuha ng nutrients ang mga halaman mula sa lupa. Karamihan sa mga pananim ay mas gusto ang slightly acidic to neutral pH.",
        benefits: [
          "Ino-optimize ang nutrient uptake",
          "Gumagabay sa soil amendments",
          "Pinapabuti ang crop performance",
        ],
      },
      organic: {
        name: "Organic Matter at Texture",
        role: "Tumutukoy sa soil structure at water holding capacity",
        examples: ["Organic matter %", "Sand content", "Silt content", "Clay content"],
        description:
          "Ang organic matter at soil texture ay nakakaapekto sa water retention, drainage, at root development sa inyong lupa.",
        benefits: ["Mas magandang water retention", "Pinahusay na soil structure", "Enhanced na root development"],
      },
    },
    stepContent: {
      composting: {
        title: "Ano ang Soil Testing at Bakit Mahalaga",
        subtitle: "Alamin Bago Magtanim",
        description:
          "Ang soil testing ay ang proseso ng pag-analyze ng soil samples upang matukoy ang nutrient content, pH level, at organic matter. Tumutulong ito sa mga magsasaka na gumawa ng informed decisions tungkol sa fertilizers, soil amendments, at crop planning.",
        benefits: [
          "Naglalantad ng nutrient deficiencies o excesses",
          "Natutukoy ang soil pH problems (masyadong acidic o alkaline)",
          "Tumutulong mag-apply ng tamang uri at dami ng fertilizer",
          "Binabawasan ang input costs at pinipigilan ang over-fertilization",
          "Pinapabuti ang crop yield at long-term soil health",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ipinapakita ng pananaliksik na ang mga magsasakang nagbase ng fertilization sa soil tests ay nagtataas ng productivity ng 20–30% kumpara sa guesswork.",
        sources:
          "Pinagmulan: fao.org | agrilifeextension.tamu.edu | frontiersin.org/articles/10.3389/fsufs.2022.897087/full",
        button: "Nakuha Ko! Alamin ang Mga Nalantad ng Tests",
      },
      ingredients: {
        title: "Ano ang Malalaman sa Soil Testing",
        subtitle: "Pag-unawa sa Kwento ng Inyong Lupa",
        description:
          "Ang mga soil tests ay nagbibigay ng valuable information tungkol sa nutrient levels, pH balance, at soil structure na direktang nakakaapekto sa tagumpay ng pananim.",
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Karamihan sa mga pananim ay mas gusto ang pH 6.0–7.0 para sa optimal nutrient availability. Ang acidic o alkaline soil ay maaaring mangailangan ng lime o sulfur amendments.",
        button: "Handa na sa Mga Paraan ng Sampling!",
      },
      startComposting: {
        title: "Paano Kumuha ng Soil Samples nang Tama",
        subtitle: "Hakbang-hakbang na Soil Sampling",
        homeGarden: {
          title: "Tamang Sampling Technique",
          steps: [
            "Pumili ng sampling spots – kumuha mula sa ilang lugar ng plot (5–10 spots)",
            "Maghukay ng 6–8 inches na lalim gamit ang trowel o auger",
            "Alisin ang mga debris at ihalo ang soil samples sa malinis na bucket",
            "I-air dry ang mixed sample at ilagay ang 1/2 kg sa labeled bag",
            "Ipadala sa certified soil testing lab o dalhin sa local agriculture office",
          ],
        },
        farm: {
          title: "Best Practices para sa Accurate Results",
          steps: [
            "Mag-sample ng hindi bababa sa isang beses sa taon (mas mabuti bago ang planting season)",
            "Iwasang mag-sample pagkatapos mag-fertilize o malakas na ulan",
            "Gumamit ng malinis na tools upang maiwasan ang contamination",
            "I-label nang malinaw ang mga samples na may location at date",
            "I-store nang tama ang mga samples hanggang sa testing",
          ],
        },
        source: "Tip: Ang consistent na sampling methods ay nagsisiguro ng reliable year-to-year comparisons",
        button: "Alamin ang Pagbasa ng Test Results!",
      },
      benefits: {
        title: "Pag-interpret ng Soil Test Results",
        subtitle: "Pag-unawa sa Inyong Soil Report",
        description:
          "Ang standard soil test report ay nagbibigay ng key information upang gabayan ang inyong farming decisions.",
        nutrientSupply: [
          "pH: 6.0–7.0 (Balance ng acidity at alkalinity)",
          "Organic Matter: 3–5% (Mas mataas = mas magandang structure at fertility)",
        ],
        soilHealth: [
          "Nitrogen (N): Medium–High (Kailangan para sa leafy crops)",
          "Phosphorus (P): Medium–High (Kailangan para sa root/fruit crops)",
        ],
        plantGrowth: [
          "Potassium (K): Medium–High (Sumusuporta sa plant immunity)",
          "Gamitin ang test upang pumili ng tamang fertilizers at itama ang mga imbalances",
        ],
        evidenceTitle: "Pagbasa ng Inyong Report",
        evidenceText:
          "Ang pag-unawa sa mga parameters na ito ay tumutulong sa inyo na gumawa ng informed decisions tungkol sa soil amendments at fertilizer applications.",
        source: "Pinagmulan: sciencedirect.com | mdpi.com",
        button: "Alamin Paano Gumawa ng Aksyon!",
      },
      mistakes: {
        title: "Pagkatapos ng Test: Paggawa ng Aksyon",
        subtitle: "Paggawa ng Results na Mas Magandang Pananim",
        mistakes: [
          {
            title: "I-adjust ang pH",
            description:
              "Magdagdag ng lime kung masyadong acidic; Magdagdag ng sulfur o compost kung masyadong alkaline",
          },
          {
            title: "Mag-apply ng Fertilizer Base sa Pangangailangan",
            description: "Gumamit ng organic o inorganic sources; Sundin ang recommended rates",
          },
          {
            title: "Isaalang-alang ang Slow-Release Options",
            description: "Gumamit ng slow-release fertilizers o compost para sa long-term health",
          },
          {
            title: "Pahusayin ang Organic Matter",
            description: "Magdagdag ng compost, green manure, o cover crops upang makabuo ng soil health",
          },
          {
            title: "Bawasan ang Soil Disturbance",
            description: "Bawasan ang tilling at panatilihing nakatakip ang lupa kapag posible",
          },
        ],
        tipTitle: "Integration Tip:",
        tipText:
          "Pagsamahin ang test results sa inyong crop rotation plan para sa pinakamahusay na outcomes at sustainable soil management.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Pag-test ng Inyong Lupa Ngayon",
        steps: [
          {
            title: "Kumuha at magpadala ng soil samples bago ang bawat planting season",
            description: "Gawing regular part ng inyong farming routine ang soil testing",
          },
          {
            title: "Matutong magbasa ng basic test reports",
            description:
              "Humingi ng tulong sa mga agri-technicians kung kailangan ninyo ng tulong sa pag-unawa ng results",
          },
          {
            title: "Gamitin ang test data upang pumili ng mga pananim na angkop sa kondisyon ng inyong lupa",
            description: "I-match ang crop requirements sa capabilities ng inyong lupa",
          },
          {
            title: "I-adjust ang fertilizer use at makatipid sa costs",
            description: "Mag-apply lang ng kailangan ng inyong lupa base sa test results",
          },
          {
            title: "I-track ang mga improvements sa yield at soil health bawat taon",
            description: "Subaybayan ang progress at i-adjust ang mga practices nang naaayon",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Ang malusog na pananim ay nagsisimula sa malusog na lupa—i-test ito, huwag hulaan.",
        button: "Handa na Akong I-test ang Aking Lupa!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa soil testing. Ang inyong informed decisions ay magiging dahilan ng mas malusog na pananim at mas magandang ani!",
      completionButton: "Magaling!",
    },
  },
}

// Soil Test Parameters for visual styling (renamed from COMPOST_INGREDIENTS)
const COMPOST_INGREDIENTS = {
  nutrients: { color: "#2F855A", bgColor: "#E6FFFA", icon: "flask-outline", iconLibrary: "MaterialCommunityIcons" },
  ph: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "ph", iconLibrary: "MaterialCommunityIcons" },
  organic: { color: "#B45309", bgColor: "#FFF7ED", icon: "leaf-circle-outline", iconLibrary: "MaterialCommunityIcons" },
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

// Interactive Soil Parameter Card (renamed from CompostIngredientCard)
const CompostIngredientCard = ({ ingredientKey, ingredient, onPress, t, interactive = false }) => {
  const IconComponent = ingredient.iconLibrary === "MaterialCommunityIcons" ? MaterialCommunityIcons : Ionicons
  return (
    <TouchableOpacity
      style={[styles.compostIngredientCard, { backgroundColor: ingredient.bgColor }]}
      onPress={interactive ? () => onPress(ingredientKey) : undefined}
      activeOpacity={interactive ? 0.7 : 1}
      disabled={!interactive}
    >
      <IconComponent name={ingredient.icon} size={36} color="#1A3C34" style={{ marginRight: 16 }} />
      <View style={styles.compostIngredientInfo}>
        <Text style={styles.compostIngredientName}>{t.compostIngredients[ingredientKey].name}</Text>
        <View style={[styles.compostIngredientBadge, { backgroundColor: ingredient.color }]}>
          <Text style={styles.compostIngredientBadgeText}>{t.compostIngredients[ingredientKey].role}</Text>
        </View>
        <Text style={styles.compostIngredientExamples}>
          {t.modal.examples} {t.compostIngredients[ingredientKey].examples.join(", ")}
        </Text>
      </View>
      {interactive && <Ionicons name="chevron-forward" size={20} color={ingredient.color} />}
    </TouchableOpacity>
  )
}

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function SoilTestingGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [showIngredientModal, setShowIngredientModal] = useState(false)
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

  const handleIngredientPress = (ingredientKey) => {
    setSelectedIngredient({
      ...COMPOST_INGREDIENTS[ingredientKey],
      ...t.compostIngredients[ingredientKey],
      key: ingredientKey,
    })
    setShowIngredientModal(true)
  }

  const renderCompostingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.composting.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.composting.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.composting.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.composting.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.composting.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.composting.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.composting.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.composting.button}
      </CompleteButton>
    </View>
  )

  const renderIngredientsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.ingredients.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.ingredients.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.ingredients.description}</Text>

      <View style={styles.compostIngredientsContainer}>
        {Object.entries(COMPOST_INGREDIENTS).map(([key, ingredient]) => (
          <CompostIngredientCard
            key={key}
            ingredientKey={key}
            ingredient={ingredient}
            onPress={handleIngredientPress}
            t={t}
            interactive={true}
          />
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.ingredients.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.ingredients.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.ingredients.button}
      </CompleteButton>
    </View>
  )

  const renderStartCompostingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.startComposting.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.startComposting.subtitle}</Text>

      <Text style={styles.sectionTitle}>{t.stepContent.startComposting.homeGarden.title}</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.startComposting.homeGarden.steps.map((step, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.startComposting.farm.title}</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.startComposting.farm.steps.map((step, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.startComposting.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.startComposting.button}
      </CompleteButton>
    </View>
  )

  const renderBenefitsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.benefits.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.benefits.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.benefits.description}</Text>

      <Text style={styles.sectionTitle}>Basic Parameters</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Major Nutrients</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Using Your Results</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.plantGrowth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.benefits.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.benefits.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.benefits.source}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.benefits.button}
      </CompleteButton>
    </View>
  )

  const renderMistakesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.mistakes.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.mistakes.subtitle}</Text>

      <View style={styles.mistakesContainer}>
        {t.stepContent.mistakes.mistakes.map((mistake, index) => (
          <View key={index} style={styles.mistakeItem}>
            <Ionicons name="hammer-outline" size={20} color="#2F855A" />
            <View style={styles.mistakeContent}>
              <Text style={styles.mistakeTitle}>{mistake.title}</Text>
              <Text style={styles.mistakeDescription}>{mistake.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="bulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.mistakes.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.mistakes.tipText}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.mistakes.button}
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
      renderCompostingStep,
      renderIngredientsStep,
      renderStartCompostingStep,
      renderBenefitsStep,
      renderMistakesStep,
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

      {/* Ingredient Modal */}
      <Modal
        visible={showIngredientModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowIngredientModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedIngredient && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    {selectedIngredient.iconLibrary === "MaterialCommunityIcons" ? (
                      <MaterialCommunityIcons
                        name={selectedIngredient.icon}
                        size={28}
                        color="#2F855A"
                        style={{ marginRight: 12 }}
                      />
                    ) : (
                      <Ionicons name={selectedIngredient.icon} size={28} color="#2F855A" style={{ marginRight: 12 }} />
                    )}
                    <Text style={styles.modalTitle}>{selectedIngredient.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowIngredientModal(false)} style={styles.modalCloseButton}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={[styles.modalBadge, { backgroundColor: selectedIngredient.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedIngredient.role}</Text>
                </View>

                <Text style={styles.modalDescription}>{selectedIngredient.description}</Text>

                <Text style={styles.modalSectionTitle}>{t.modal.examples}</Text>
                <Text style={styles.modalExamples}>{selectedIngredient.examples.join(", ")}</Text>

                <Text style={styles.modalSectionTitle}>{t.modal.benefits}</Text>
                {selectedIngredient.benefits.map((benefit, index) => (
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
              <Ionicons name="trophy-outline" size={48} color="#2F855A" />
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
  compostIngredientsContainer: {
    marginBottom: 24,
  },
  compostIngredientCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  compostIngredientInfo: {
    flex: 1,
  },
  compostIngredientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  compostIngredientBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  compostIngredientBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  compostIngredientExamples: {
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
  mistakesContainer: {
    marginBottom: 24,
  },
  mistakeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F0FDF4",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCFCE7",
  },
  mistakeContent: {
    flex: 1,
    marginLeft: 12,
  },
  mistakeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F855A",
    marginBottom: 4,
  },
  mistakeDescription: {
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
