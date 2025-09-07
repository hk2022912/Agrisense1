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

// Translation data for Mulching Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Mulching Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "What Is Mulching and Why It Matters", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Types of Mulch and Their Benefits", icon: "layers-outline", iconLibrary: "Ionicons" },
      { title: "How Mulch Protects and Improves Soil", icon: "shield-outline", iconLibrary: "Ionicons" },
      { title: "How to Apply Mulch Effectively", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Mulching for Different Crops", icon: "flower-outline", iconLibrary: "Ionicons" },
      { title: "Beginner's Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      organic: {
        name: "Organic Mulch",
        role: "Decomposes into humus, improves soil fertility",
        examples: ["Rice straw", "Dry leaves", "Grass clippings", "Coco husk", "Compost"],
        description:
          "Organic mulches break down over time, adding nutrients and organic matter to improve soil structure and fertility.",
        benefits: ["Adds organic matter", "Improves soil fertility", "Feeds soil microbes"],
      },
      inorganic: {
        name: "Inorganic Mulch",
        role: "Long-lasting weed barrier, reduces water loss",
        examples: ["Plastic sheets", "Gravel", "Landscape fabric"],
        description: "Inorganic mulches don't decompose, providing long-term weed control and moisture retention.",
        benefits: ["Long-lasting protection", "Excellent weed barrier", "Reduces water loss"],
      },
      living: {
        name: "Living Mulch",
        role: "Adds nitrogen, protects soil while growing",
        examples: ["Cover crops", "Mungbean", "Clover"],
        description: "Living mulches are cover crops that protect soil while actively growing and can fix nitrogen.",
        benefits: ["Adds nitrogen naturally", "Protects soil while growing", "Improves soil biology"],
      },
    },
    stepContent: {
      composting: {
        title: "What Is Mulching and Why It Matters",
        subtitle: "Protecting Soil with Natural Cover",
        description:
          "Mulching is the practice of covering the soil surface with organic or inorganic materials to protect, insulate, and enrich the soil.",
        benefits: [
          "Prevents soil erosion and crusting",
          "Reduces water evaporation by up to 70%",
          "Suppresses weed growth effectively",
          "Regulates soil temperature naturally",
          "Adds organic matter (if biodegradable)",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Research shows mulched soils can have 30–50% more microbial activity and significantly higher carbon content than bare soils.",
        sources: "Sources: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.601124/full",
        button: "Got It! Learn About Mulch Types",
      },
      ingredients: {
        title: "Types of Mulch and Their Benefits",
        subtitle: "Choose the Right Mulch for Your Needs",
        description: "Different types of mulch offer unique benefits for soil protection and plant growth.",
        tipTitle: "Farmer Tip:",
        tipText:
          "Organic mulch is ideal for small-scale farmers and home gardeners, while plastic mulch is commonly used in vegetable farming for moisture control.",
        button: "Ready to Learn Protection Benefits!",
      },
      startComposting: {
        title: "How Mulch Protects and Improves the Soil",
        subtitle: "Multiple Ways Mulch Benefits Your Garden",
        homeGarden: {
          title: "Erosion Control & Moisture Retention",
          steps: [
            "Shields soil from rain impact and wind damage",
            "Reduces surface runoff in sloped areas",
            "Traps water below the mulch layer",
            "Allows better water use efficiency in dry seasons",
            "Reduces irrigation needs significantly",
          ],
        },
        farm: {
          title: "Temperature Regulation & Soil Enrichment",
          steps: [
            "Keeps roots cooler in hot weather and warmer in cold nights",
            "Reduces plant stress and boosts growth",
            "Organic mulches slowly decompose, feeding soil microbes",
            "Improves soil structure and fertility over time",
            "Increases soil carbon content naturally",
          ],
        },
        source: "Source: nature.com/articles/s41598-020-77476-6",
        button: "Learn Application Methods!",
      },
      benefits: {
        title: "How to Apply Mulch Effectively",
        subtitle: "Step-by-Step Application Guide",
        description: "Proper mulch application ensures maximum benefits for your crops and soil.",
        nutrientSupply: ["Clear the soil of weeds and debris completely", "Water the area before applying mulch"],
        soilHealth: [
          "Spread mulch evenly around plants (2–4 inches thick for organic types)",
          "Keep mulch 1–2 inches away from plant stems or trunks to prevent rot",
        ],
        plantGrowth: [
          "Reapply mulch every 2–3 months or as it decomposes",
          "For weed control, use thicker layers (up to 6 inches)",
        ],
        evidenceTitle: "Best Practices",
        evidenceText: "Apply at the start of the dry season or after transplanting crops for best results.",
        source: "Tip: Avoid using diseased plant matter as mulch",
        button: "See Crop-Specific Tips!",
      },
      mistakes: {
        title: "Mulching for Different Crops",
        subtitle: "Tailored Mulching for Each Crop Type",
        mistakes: [
          { title: "Vegetables", description: "Rice straw, plastic mulch - Keeps soil warm, boosts yield" },
          { title: "Fruit Trees", description: "Dry leaves, coco husk - Retains moisture, protects roots" },
          { title: "Root Crops", description: "Grass clippings, compost - Prevents soil hardening" },
          { title: "Green Onions", description: "Rice straw or sawdust - Keeps roots cool, suppresses weeds" },
          { title: "Calamansi", description: "Dry grass, compost mulch - Enriches topsoil, saves water" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Match your mulch type to your crop needs - vegetables need warmth, trees need moisture retention.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner's Action Steps",
        subtitle: "Start Mulching Today",
        steps: [
          {
            title: "Gather mulch materials from your home or farm",
            description: "Use rice straw, leaves, or grass clippings",
          },
          { title: "Apply 2–4 inches thick mulch around crops", description: "Ensure even coverage for best results" },
          { title: "Monitor soil moisture and weed growth weekly", description: "Check effectiveness regularly" },
          { title: "Replace decomposed mulch every few months", description: "Maintain consistent soil protection" },
          { title: "Try living mulch in fallow areas", description: "Use cover crops for soil protection" },
          { title: "Observe plant health and yield differences", description: "Compare mulched vs. non-mulched plots" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Mulch is your soil's armor—it protects, feeds, and keeps the heat out.",
        button: "I'm Ready to Mulch!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText: "You've mastered the basics of mulching. Your soil will be protected and your crops will thrive!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Mulching",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Ano ang Mulching at Bakit Mahalaga", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Mga Uri ng Mulch at Kanilang Benepisyo", icon: "layers-outline", iconLibrary: "Ionicons" },
      { title: "Paano Pinoprotektahan ng Mulch ang Lupa", icon: "shield-outline", iconLibrary: "Ionicons" },
      { title: "Paano Mag-apply ng Mulch nang Epektibo", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Mulching para sa Iba't ibang Pananim", icon: "flower-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      organic: {
        name: "Organic na Mulch",
        role: "Nabubulok at nagiging humus, pinapabuti ang fertility ng lupa",
        examples: ["Dayami ng palay", "Tuyong dahon", "Ginupit na damo", "Bunot ng niyog", "Kompost"],
        description:
          "Ang mga organic na mulch ay nabubulok sa paglipas ng panahon, nagdadagdag ng sustansya at organic matter para sa lupa.",
        benefits: [
          "Nagdadagdag ng organic matter",
          "Pinapabuti ang fertility ng lupa",
          "Pinapakain ang mga mikrobyo sa lupa",
        ],
      },
      inorganic: {
        name: "Inorganic na Mulch",
        role: "Matagal na hadlang sa damo, binabawasan ang pagkawala ng tubig",
        examples: ["Plastic sheets", "Graba", "Landscape fabric"],
        description:
          "Ang mga inorganic na mulch ay hindi nabubulok, nagbibigay ng pangmatagalang kontrol sa damo at pagpapanatili ng moisture.",
        benefits: ["Matagal na proteksyon", "Napakahusay na hadlang sa damo", "Binabawasan ang pagkawala ng tubig"],
      },
      living: {
        name: "Living Mulch",
        role: "Nagdadagdag ng nitrogen, pinoprotektahan ang lupa habang lumalaki",
        examples: ["Cover crops", "Munggo", "Clover"],
        description:
          "Ang living mulches ay mga cover crops na pinoprotektahan ang lupa habang aktibong lumalaki at maaaring mag-fix ng nitrogen.",
        benefits: [
          "Natural na nagdadagdag ng nitrogen",
          "Pinoprotektahan ang lupa habang lumalaki",
          "Pinapabuti ang biology ng lupa",
        ],
      },
    },
    stepContent: {
      composting: {
        title: "Ano ang Mulching at Bakit Mahalaga",
        subtitle: "Pagprotekta sa Lupa gamit ang Natural na Takip",
        description:
          "Ang mulching ay ang pagsasanay ng pagtakip sa ibabaw ng lupa gamit ang organic o inorganic na materyales upang protektahan, i-insulate, at payamanin ang lupa.",
        benefits: [
          "Pinipigilan ang soil erosion at crusting",
          "Binabawasan ang water evaporation ng hanggang 70%",
          "Epektibong pinipigilan ang paglago ng damo",
          "Natural na nire-regulate ang temperatura ng lupa",
          "Nagdadagdag ng organic matter (kung biodegradable)",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ipinapakita ng pananaliksik na ang mga lupang may mulch ay maaaring magkaroon ng 30–50% na mas maraming microbial activity at mas mataas na carbon content kaysa sa mga hubad na lupa.",
        sources: "Pinagmulan: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.601124/full",
        button: "Nakuha Ko! Alamin ang Mga Uri ng Mulch",
      },
      ingredients: {
        title: "Mga Uri ng Mulch at Kanilang Benepisyo",
        subtitle: "Pumili ng Tamang Mulch para sa Inyong Pangangailangan",
        description:
          "Ang iba't ibang uri ng mulch ay nag-aalok ng natatanging benepisyo para sa proteksyon ng lupa at paglago ng halaman.",
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang organic mulch ay ideal para sa mga small-scale farmers at home gardeners, habang ang plastic mulch ay karaniwang ginagamit sa vegetable farming para sa moisture control.",
        button: "Handa na sa Mga Benepisyo ng Proteksyon!",
      },
      startComposting: {
        title: "Paano Pinoprotektahan at Pinapabuti ng Mulch ang Lupa",
        subtitle: "Maraming Paraan na Nakakatulong ang Mulch sa Inyong Hardin",
        homeGarden: {
          title: "Erosion Control at Moisture Retention",
          steps: [
            "Pinoprotektahan ang lupa mula sa impact ng ulan at pinsala ng hangin",
            "Binabawasan ang surface runoff sa mga nakaahong lugar",
            "Natatrap ang tubig sa ilalim ng mulch layer",
            "Nagbibigay-daan sa mas magandang paggamit ng tubig sa dry seasons",
            "Binabawasan nang malaki ang pangangailangan sa irrigation",
          ],
        },
        farm: {
          title: "Temperature Regulation at Soil Enrichment",
          steps: [
            "Pinapalamig ang mga ugat sa mainit na panahon at pinapainit sa malamig na gabi",
            "Binabawasan ang stress ng halaman at pinapalakas ang paglago",
            "Ang mga organic mulches ay dahan-dahang nabubulok, pinapakain ang mga soil microbes",
            "Pinapabuti ang istruktura at fertility ng lupa sa paglipas ng panahon",
            "Natural na pinapataas ang soil carbon content",
          ],
        },
        source: "Pinagmulan: nature.com/articles/s41598-020-77476-6",
        button: "Alamin ang Mga Paraan ng Pag-apply!",
      },
      benefits: {
        title: "Paano Mag-apply ng Mulch nang Epektibo",
        subtitle: "Hakbang-hakbang na Gabay sa Pag-apply",
        description:
          "Ang tamang pag-apply ng mulch ay nagsisiguro ng maximum na benepisyo para sa inyong mga pananim at lupa.",
        nutrientSupply: [
          "Linisin ang lupa mula sa mga damo at basura nang lubusan",
          "Diligan ang lugar bago mag-apply ng mulch",
        ],
        soilHealth: [
          "Ilatag ang mulch nang pantay sa paligid ng mga halaman (2–4 inches na kapal para sa organic types)",
          "Panatilihin ang mulch na 1–2 inches ang layo mula sa mga tangkay o trunk ng halaman upang maiwasan ang pagkabulok",
        ],
        plantGrowth: [
          "Muling mag-apply ng mulch tuwing 2–3 buwan o kapag nabubulok na",
          "Para sa weed control, gumamit ng mas makapal na layers (hanggang 6 inches)",
        ],
        evidenceTitle: "Mga Best Practices",
        evidenceText:
          "Mag-apply sa simula ng dry season o pagkatapos mag-transplant ng mga pananim para sa pinakamahusay na resulta.",
        source: "Tip: Iwasang gamitin ang may sakit na plant matter bilang mulch",
        button: "Tingnan ang Mga Tip para sa Specific na Pananim!",
      },
      mistakes: {
        title: "Mulching para sa Iba't ibang Pananim",
        subtitle: "Tailored na Mulching para sa Bawat Uri ng Pananim",
        mistakes: [
          {
            title: "Mga Gulay",
            description: "Dayami ng palay, plastic mulch - Pinapanatiling mainit ang lupa, pinapataas ang ani",
          },
          {
            title: "Mga Punong Prutas",
            description: "Tuyong dahon, bunot ng niyog - Pinapanatiling basa, pinoprotektahan ang mga ugat",
          },
          { title: "Mga Root Crops", description: "Ginupit na damo, kompost - Pinipigilan ang pagtigas ng lupa" },
          {
            title: "Green Onions",
            description: "Dayami ng palay o sawdust - Pinapalamig ang mga ugat, pinipigilan ang damo",
          },
          {
            title: "Calamansi",
            description: "Tuyong damo, compost mulch - Pinapayaman ang topsoil, nagtitipid ng tubig",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Itugma ang uri ng mulch sa pangangailangan ng inyong pananim - ang mga gulay ay nangangailangan ng init, ang mga puno ay nangangailangan ng moisture retention.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Mulching Ngayon",
        steps: [
          {
            title: "Magtipon ng mulch materials mula sa inyong bahay o bukid",
            description: "Gamitin ang dayami ng palay, dahon, o ginupit na damo",
          },
          {
            title: "Mag-apply ng 2–4 inches na kapal na mulch sa paligid ng mga pananim",
            description: "Siguraduhing pantay ang takip para sa pinakamahusay na resulta",
          },
          {
            title: "Subaybayan ang soil moisture at paglago ng damo lingguhan",
            description: "Regular na suriin ang effectiveness",
          },
          {
            title: "Palitan ang nabubulok na mulch tuwing ilang buwan",
            description: "Panatilihin ang tuloy-tuloy na proteksyon ng lupa",
          },
          {
            title: "Subukan ang living mulch sa mga fallow areas",
            description: "Gamitin ang cover crops para sa proteksyon ng lupa",
          },
          {
            title: "Obserbahan ang kalusugan ng halaman at pagkakaiba sa ani",
            description: "Ikumpara ang may mulch vs. walang mulch na mga plot",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Ang mulch ay armor ng inyong lupa—pinoprotektahan, pinapakain, at pinapalamig ito.",
        button: "Handa na Akong Mag-mulch!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa mulching. Mapoprotektahan ang inyong lupa at magpapalago ang inyong mga pananim!",
      completionButton: "Magaling!",
    },
  },
}

// Mulch Types for visual styling (renamed from COMPOST_INGREDIENTS)
const COMPOST_INGREDIENTS = {
  organic: { color: "#2F855A", bgColor: "#E6FFFA", icon: "grass", iconLibrary: "MaterialCommunityIcons" },
  inorganic: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "layers-outline", iconLibrary: "Ionicons" },
  living: { color: "#059669", bgColor: "#ECFDF5", icon: "flower-outline", iconLibrary: "MaterialCommunityIcons" },
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

// Interactive Mulch Type Card (renamed from CompostIngredientCard)
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
export default function MulchingGuide() {
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

      <Text style={styles.sectionTitle}>Preparation Steps</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Application Method</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Maintenance Tips</Text>
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
            <Ionicons name="leaf-outline" size={20} color="#2F855A" />
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
              <Ionicons name="layers-outline" size={48} color="#2F855A" />
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
