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

// Translation data for Soil Fertility Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Soil Fertility Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "What is Soil Fertility and Why It Matters", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Key Nutrients for Soil Fertility", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "Natural Ways to Boost Soil Fertility", icon: "flower-outline", iconLibrary: "Ionicons" },
      { title: "Address Soil pH for Maximum Nutrient Uptake", icon: "flask-outline", iconLibrary: "Ionicons" },
      { title: "Smart Fertilizer Use Based on Soil Needs", icon: "bulb-outline", iconLibrary: "Ionicons" },
      { title: "Beginner's Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      primary: {
        name: "Primary Nutrients (N-P-K)",
        role: "Essential macronutrients for plant growth",
        examples: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)"],
        description:
          "The three most important nutrients that plants need in large quantities for healthy growth and development.",
        benefits: [
          "Leafy growth and chlorophyll",
          "Root strength and flowering",
          "Overall plant health and disease resistance",
        ],
      },
      secondary: {
        name: "Secondary & Micronutrients",
        role: "Support structure and critical plant functions",
        examples: ["Calcium", "Magnesium", "Sulfur", "Zinc", "Boron", "Iron"],
        description:
          "These nutrients are needed in smaller amounts but are crucial for proper plant metabolism and structure.",
        benefits: ["Improve soil structure", "Support plant metabolism", "Enable critical plant functions"],
      },
      organic: {
        name: "Natural Fertility Boosters",
        role: "Improve soil structure and long-term fertility",
        examples: ["Compost", "Animal manure", "Green manure", "Vermicompost", "Cover crops", "Mulch"],
        description:
          "Natural materials that enhance soil fertility by adding organic matter and supporting beneficial soil life.",
        benefits: ["Improve soil structure", "Increase water retention", "Support beneficial microbes"],
      },
    },
    stepContent: {
      composting: {
        title: "What is Soil Fertility and Why It Matters",
        subtitle: "Fertile Soil = Stronger Crops",
        description:
          "Soil fertility is the soil's ability to provide essential nutrients for plant growth. Fertile soil supports healthy roots, improves water retention, and boosts crop yield sustainably.",
        benefits: [
          "Supplies balanced nutrients (N-P-K and micronutrients)",
          "Promotes root development and strong plant growth",
          "Holds water better, especially during dry periods",
          "Encourages beneficial microbes and earthworms",
          "Reduces the need for excessive synthetic fertilizers",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Research shows combining compost with synthetic fertilizers can boost yields by 25–40% in many crops.",
        sources: "Sources: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.00017/full",
        button: "Got It! Learn About Key Nutrients",
      },
      ingredients: {
        title: "Key Nutrients for Soil Fertility",
        subtitle: "Understanding Plant Nutrition Needs",
        description:
          "Plants require a balanced supply of nutrients to grow healthy and productive. Understanding these nutrients helps you make better fertilization decisions.",
        tipTitle: "Farmer Tip:",
        tipText:
          "Balanced soil nutrition prevents stunted growth and poor yield. Each nutrient plays a specific role in plant health.",
        button: "Ready to Learn Natural Methods!",
      },
      startComposting: {
        title: "Natural Ways to Boost Soil Fertility",
        subtitle: "Building Long-term Soil Health",
        homeGarden: {
          title: "Organic Matter & Green Manure",
          steps: [
            "Add compost, animal manure, and crop residues to enrich the soil",
            "Improves soil structure, moisture holding, and microbial life",
            "Use green manure & cover crops like mungbean, cowpea, or mustard",
            "These crops fix nitrogen and protect soil naturally",
            "Add biomass when turned under as green manure",
          ],
        },
        farm: {
          title: "Vermicompost, Rotation & Mulching",
          steps: [
            "Incorporate vermicompost - earthworm castings boost nutrients and microbial diversity",
            "Rotate crops to prevent nutrient exhaustion",
            "Legumes add nitrogen naturally for the next crop",
            "Use mulch to keep soil cool and moist",
            "Organic mulch breaks down into valuable humus",
          ],
        },
        source: "Source: mdpi.com/2071-1050/14/3/1457",
        button: "Learn About pH Management!",
      },
      benefits: {
        title: "Address Soil pH for Maximum Nutrient Uptake",
        subtitle: "pH Affects Nutrient Availability",
        description: "Soil pH greatly affects how well plants can absorb nutrients from the soil.",
        nutrientSupply: [
          "Acidic soil (pH < 5.5) may lock up phosphorus and reduce calcium/magnesium",
          "Alkaline soil (pH > 7.5) can limit iron and zinc availability",
        ],
        soilHealth: [
          "Use agricultural lime for acidic soils to raise pH",
          "Apply elemental sulfur or compost to reduce alkalinity",
        ],
        plantGrowth: [
          "Always test your soil first before adjusting pH",
          "pH greatly affects nutrient absorption efficiency",
        ],
        evidenceTitle: "pH Management Tips",
        evidenceText: "Proper pH adjustment ensures maximum nutrient uptake and prevents nutrient lockup in soil.",
        source: "Source: extension.psu.edu/soil-ph-and-lime-what-grows-where",
        button: "Learn Smart Fertilizer Use!",
      },
      mistakes: {
        title: "Smart Fertilizer Use Based on Soil Needs",
        subtitle: "Efficient and Sustainable Fertilization",
        mistakes: [
          {
            title: "Follow Soil Test Recommendations",
            description: "Apply the right nutrient at the right time and rate; Use split applications",
          },
          {
            title: "Combine Organic and Inorganic Fertilizers",
            description: "Organic feeds soil microbes; Inorganic gives faster results",
          },
          {
            title: "Avoid Over-application",
            description: "Too much nitrogen can cause leafy growth but weak fruits",
          },
          {
            title: "Use Slow-release Products",
            description: "Controlled-release fertilizers reduce nutrient loss",
          },
          {
            title: "Time Applications Properly",
            description: "Apply fertilizers when plants can best utilize them",
          },
        ],
        tipTitle: "Integration Tip:",
        tipText:
          "Combining organic and inorganic fertilizers provides both immediate nutrition and long-term soil health benefits.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner's Action Steps",
        subtitle: "Start Building Fertile Soil Today",
        steps: [
          {
            title: "Test your soil's pH and nutrient levels at least once a year",
            description: "Know your soil's current condition before making improvements",
          },
          {
            title: "Add organic matter regularly",
            description: "Use compost, manure, and crop residues to build soil health",
          },
          {
            title: "Rotate crops and include legumes every 2–3 seasons",
            description: "Prevent nutrient depletion and naturally add nitrogen",
          },
          {
            title: "Use mulch to protect and enrich your soil",
            description: "Organic mulch conserves moisture and adds nutrients",
          },
          {
            title: "Apply fertilizers based on soil test, not guesswork",
            description: "Use scientific data to guide your fertilization decisions",
          },
          {
            title: "Observe plant health and adjust based on performance",
            description: "Monitor results and fine-tune your soil management",
          },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Don't just feed your plants—feed your soil, and it will feed your crops for years.",
        button: "I'm Ready to Build Fertile Soil!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the basics of soil fertility. Your soil will now support healthier, more productive crops for years to come!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Soil Fertility",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Ano ang Soil Fertility at Bakit Mahalaga", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Mga Key Nutrients para sa Soil Fertility", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "Natural na Paraan para sa Soil Fertility", icon: "flower-outline", iconLibrary: "Ionicons" },
      {
        title: "Pag-address ng Soil pH para sa Maximum Nutrient Uptake",
        icon: "flask-outline",
        iconLibrary: "Ionicons",
      },
      { title: "Smart na Paggamit ng Fertilizer", icon: "bulb-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      primary: {
        name: "Primary Nutrients (N-P-K)",
        role: "Essential macronutrients para sa paglago ng halaman",
        examples: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)"],
        description:
          "Ang tatlong pinakamahalagang nutrients na kailangan ng mga halaman sa malaking dami para sa malusog na paglago at development.",
        benefits: [
          "Leafy growth at chlorophyll",
          "Root strength at flowering",
          "Overall plant health at disease resistance",
        ],
      },
      secondary: {
        name: "Secondary at Micronutrients",
        role: "Sumusuporta sa structure at critical plant functions",
        examples: ["Calcium", "Magnesium", "Sulfur", "Zinc", "Boron", "Iron"],
        description:
          "Ang mga nutrients na ito ay kailangan sa mas maliit na dami pero crucial para sa tamang plant metabolism at structure.",
        benefits: [
          "Pinapabuti ang soil structure",
          "Sumusuporta sa plant metabolism",
          "Nagbibigay-daan sa critical plant functions",
        ],
      },
      organic: {
        name: "Natural Fertility Boosters",
        role: "Pinapabuti ang soil structure at long-term fertility",
        examples: ["Kompost", "Animal manure", "Green manure", "Vermicompost", "Cover crops", "Mulch"],
        description:
          "Natural na materyales na pinapahusay ang soil fertility sa pamamagitan ng pagdadagdag ng organic matter at pagsuporta sa beneficial soil life.",
        benefits: [
          "Pinapabuti ang soil structure",
          "Pinapataas ang water retention",
          "Sumusuporta sa beneficial microbes",
        ],
      },
    },
    stepContent: {
      composting: {
        title: "Ano ang Soil Fertility at Bakit Mahalaga",
        subtitle: "Fertile Soil = Mas Malakas na Pananim",
        description:
          "Ang soil fertility ay ang kakayahan ng lupa na magbigay ng essential nutrients para sa paglago ng halaman. Ang fertile soil ay sumusuporta sa malusog na ugat, pinapabuti ang water retention, at pinapataas ang ani nang sustainable.",
        benefits: [
          "Nagbibigay ng balanced nutrients (N-P-K at micronutrients)",
          "Pinapalakas ang root development at malakas na paglago ng halaman",
          "Mas mahusay na humahawak ng tubig, lalo na sa dry periods",
          "Hinihikayat ang beneficial microbes at bulati",
          "Binabawasan ang pangangailangan sa labis na synthetic fertilizers",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ipinapakita ng pananaliksik na ang pagsasama ng compost sa synthetic fertilizers ay maaaring magpataas ng ani ng 25–40% sa maraming pananim.",
        sources: "Pinagmulan: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.00017/full",
        button: "Nakuha Ko! Alamin ang Mga Key Nutrients",
      },
      ingredients: {
        title: "Mga Key Nutrients para sa Soil Fertility",
        subtitle: "Pag-unawa sa Plant Nutrition Needs",
        description:
          "Ang mga halaman ay nangangailangan ng balanced supply ng nutrients upang lumago nang malusog at produktibo. Ang pag-unawa sa mga nutrients na ito ay tumutulong sa inyo na gumawa ng mas magandang fertilization decisions.",
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang balanced soil nutrition ay pinipigilan ang stunted growth at poor yield. Ang bawat nutrient ay may specific na papel sa kalusugan ng halaman.",
        button: "Handa na sa Natural na Mga Paraan!",
      },
      startComposting: {
        title: "Natural na Paraan para Mapataas ang Soil Fertility",
        subtitle: "Pagbuo ng Long-term Soil Health",
        homeGarden: {
          title: "Organic Matter at Green Manure",
          steps: [
            "Magdagdag ng compost, animal manure, at crop residues upang payamanin ang lupa",
            "Pinapabuti ang soil structure, moisture holding, at microbial life",
            "Gumamit ng green manure at cover crops tulad ng munggo, cowpea, o mustasa",
            "Ang mga pananim na ito ay natural na nag-fix ng nitrogen at pinoprotektahan ang lupa",
            "Magdagdag ng biomass kapag ginawa nang green manure",
          ],
        },
        farm: {
          title: "Vermicompost, Rotation at Mulching",
          steps: [
            "Isama ang vermicompost - ang earthworm castings ay pinapataas ang nutrients at microbial diversity",
            "Mag-rotate ng mga pananim upang maiwasan ang nutrient exhaustion",
            "Ang mga legumes ay natural na nagdadagdag ng nitrogen para sa susunod na pananim",
            "Gumamit ng mulch upang panatilihing malamig at basa ang lupa",
            "Ang organic mulch ay nabubulok upang maging valuable na humus",
          ],
        },
        source: "Pinagmulan: mdpi.com/2071-1050/14/3/1457",
        button: "Alamin ang pH Management!",
      },
      benefits: {
        title: "Pag-address ng Soil pH para sa Maximum Nutrient Uptake",
        subtitle: "Ang pH ay Nakakaapekto sa Nutrient Availability",
        description:
          "Ang soil pH ay malaking nakakaapekto sa kung gaano kahusay na makakakuha ng nutrients ang mga halaman mula sa lupa.",
        nutrientSupply: [
          "Ang acidic soil (pH < 5.5) ay maaaring mag-lock up ng phosphorus at mabawasan ang calcium/magnesium",
          "Ang alkaline soil (pH > 7.5) ay maaaring limitahan ang iron at zinc availability",
        ],
        soilHealth: [
          "Gumamit ng agricultural lime para sa acidic soils upang itaas ang pH",
          "Mag-apply ng elemental sulfur o compost upang mabawasan ang alkalinity",
        ],
        plantGrowth: [
          "Palaging i-test muna ang inyong lupa bago mag-adjust ng pH",
          "Ang pH ay malaking nakakaapekto sa nutrient absorption efficiency",
        ],
        evidenceTitle: "pH Management Tips",
        evidenceText:
          "Ang tamang pH adjustment ay nagsisiguro ng maximum nutrient uptake at pinipigilan ang nutrient lockup sa lupa.",
        source: "Pinagmulan: extension.psu.edu/soil-ph-and-lime-what-grows-where",
        button: "Alamin ang Smart Fertilizer Use!",
      },
      mistakes: {
        title: "Smart na Paggamit ng Fertilizer Base sa Soil Needs",
        subtitle: "Efficient at Sustainable na Fertilization",
        mistakes: [
          {
            title: "Sundin ang Soil Test Recommendations",
            description: "Mag-apply ng tamang nutrient sa tamang oras at rate; Gumamit ng split applications",
          },
          {
            title: "Pagsamahin ang Organic at Inorganic Fertilizers",
            description:
              "Ang organic ay pinapakain ang soil microbes; Ang inorganic ay nagbibigay ng mas mabilis na resulta",
          },
          {
            title: "Iwasang Mag-over-application",
            description: "Ang sobrang nitrogen ay maaaring magdulot ng leafy growth pero mahinang prutas",
          },
          {
            title: "Gumamit ng Slow-release Products",
            description: "Ang controlled-release fertilizers ay binabawasan ang nutrient loss",
          },
          {
            title: "I-time nang Tama ang Applications",
            description: "Mag-apply ng fertilizers kapag pinakamahusay na magagamit ng mga halaman",
          },
        ],
        tipTitle: "Integration Tip:",
        tipText:
          "Ang pagsasama ng organic at inorganic fertilizers ay nagbibigay ng immediate nutrition at long-term soil health benefits.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Pagbuo ng Fertile Soil Ngayon",
        steps: [
          {
            title: "I-test ang pH at nutrient levels ng inyong lupa hindi bababa sa isang beses sa taon",
            description: "Alamin ang kasalukuyang kondisyon ng inyong lupa bago gumawa ng improvements",
          },
          {
            title: "Magdagdag ng organic matter nang regular",
            description: "Gumamit ng compost, manure, at crop residues upang makabuo ng soil health",
          },
          {
            title: "Mag-rotate ng mga pananim at isama ang legumes tuwing 2–3 seasons",
            description: "Pigilan ang nutrient depletion at natural na magdagdag ng nitrogen",
          },
          {
            title: "Gumamit ng mulch upang protektahan at payamanin ang inyong lupa",
            description: "Ang organic mulch ay nag-conserve ng moisture at nagdadagdag ng nutrients",
          },
          {
            title: "Mag-apply ng fertilizers base sa soil test, hindi sa guesswork",
            description: "Gumamit ng scientific data upang gabayan ang inyong fertilization decisions",
          },
          {
            title: "Obserbahan ang kalusugan ng halaman at mag-adjust base sa performance",
            description: "Subaybayan ang mga resulta at i-fine-tune ang inyong soil management",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Huwag lang pakainin ang inyong mga halaman—pakainin ang inyong lupa, at ito ay magpapakain sa inyong mga pananim sa loob ng maraming taon.",
        button: "Handa na Akong Makabuo ng Fertile Soil!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa soil fertility. Ang inyong lupa ay susuportahan na ang mas malusog at mas produktibong mga pananim sa loob ng maraming taon!",
      completionButton: "Magaling!",
    },
  },
}

// Soil Fertility Components for visual styling (renamed from COMPOST_INGREDIENTS)
const COMPOST_INGREDIENTS = {
  primary: { color: "#2F855A", bgColor: "#E6FFFA", icon: "test-tube", iconLibrary: "MaterialCommunityIcons" },
  secondary: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "flask-outline", iconLibrary: "MaterialCommunityIcons" },
  organic: { color: "#B45309", bgColor: "#FFF7ED", icon: "leaf", iconLibrary: "MaterialCommunityIcons" },
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

// Interactive Fertility Component Card (renamed from CompostIngredientCard)
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
export default function SoilFertilityGuide() {
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

      <Text style={styles.sectionTitle}>pH Problems</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>pH Adjustment Methods</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Important Reminders</Text>
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
            <Ionicons name="bulb-outline" size={20} color="#2F855A" />
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
              <Ionicons name="sunny-outline" size={48} color="#2F855A" />
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
