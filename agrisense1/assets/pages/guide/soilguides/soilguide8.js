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

// Translation data for Vermicomposting Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Vermicomposting Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "What is Vermicomposting?", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Why Earthworms Are Soil Engineers", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Setting Up a Vermicomposting System", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "What to Feed Your Worms", icon: "restaurant-outline", iconLibrary: "Ionicons" },
      { title: "Harvesting and Using Vermicast", icon: "basket-outline", iconLibrary: "Ionicons" },
      { title: "Beginner's Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      good: {
        name: "Good Materials",
        role: "Perfect worm food for healthy composting",
        examples: ["Vegetable peels", "Banana skins", "Eggshells", "Coffee grounds", "Tea bags", "Chopped leaves"],
        description:
          "These materials provide balanced nutrition for worms and break down easily into high-quality vermicast.",
        benefits: ["Easy to decompose", "Balanced nutrition for worms", "Produces quality vermicast"],
      },
      avoid: {
        name: "Materials to Avoid",
        role: "Can harm worms or attract pests",
        examples: ["Meat", "Fish", "Dairy", "Oily foods", "Citrus scraps", "Spicy foods"],
        description:
          "These materials can irritate worms, attract pests, or create unhealthy conditions in your worm bin.",
        benefits: ["Prevents pest problems", "Keeps worms healthy", "Maintains proper pH balance"],
      },
      bedding: {
        name: "Bedding Materials",
        role: "Provides habitat and carbon balance",
        examples: ["Shredded paper", "Rice straw", "Dried leaves", "Coconut coir", "Cardboard"],
        description:
          "Bedding materials create a comfortable environment for worms and help balance moisture and carbon.",
        benefits: ["Maintains moisture balance", "Provides carbon source", "Creates worm habitat"],
      },
    },
    stepContent: {
      composting: {
        title: "What is Vermicomposting?",
        subtitle: "Turning Waste into Black Gold",
        description:
          "Vermicomposting is the process of using earthworms to break down organic waste (like food scraps, leaves, and manure) into nutrient-rich compost called worm castings or vermicast.",
        benefits: [
          "Produces high-quality organic fertilizer",
          "Improves soil structure and microbial life",
          "Reduces kitchen and farm waste effectively",
          "Can be done in small spaces (urban or rural)",
          "Faster than traditional composting methods",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Research shows vermicast can increase crop yields by 20–50% and improve plant resistance to pests and stress.",
        sources: "Sources: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2019.00044/full",
        button: "Got It! Learn About Soil Engineers",
      },
      ingredients: {
        title: "Why Earthworms Are Called Soil Engineers",
        subtitle: "Worm Castings = Super Fertilizer",
        description:
          "Earthworms transform organic waste into valuable soil amendments through their natural processes.",
        tipTitle: "Farmer Tip:",
        tipText:
          "Worm castings are rich in NPK, micronutrients, and plant growth hormones that improve nutrient availability and water retention.",
        button: "Ready to Set Up Your System!",
      },
      startComposting: {
        title: "Setting Up a Vermicomposting System",
        subtitle: "Choose Your Setup Based on Space",
        homeGarden: {
          title: "For Homes (Small Bins)",
          steps: [
            "Use plastic, wood, or cement containers with drainage holes",
            "Ideal size: 45–60 cm deep; cover to keep it dark",
            "Use Red Wigglers (Eisenia fetida) or local earthworms",
            "Add bedding materials like shredded paper or straw",
            "Keep in a cool, shaded location",
          ],
        },
        farm: {
          title: "For Farms (Bedded Pits or Troughs)",
          steps: [
            "Size: 1m x 2m bed with roofing or shade",
            "Use shredded leaves, rice straw, manure, and kitchen waste",
            "Maintain moisture like a damp sponge",
            "Add earthworms on top and cover with burlap or banana leaves",
            "Keep the system cool, moist, and dark for worm health",
          ],
        },
        source: "Tip: Proper moisture and temperature are key to worm health and productivity",
        button: "Learn What to Feed Them!",
      },
      benefits: {
        title: "What to Feed (and Not Feed) Your Worms",
        subtitle: "Feeding Guide for Healthy Worms",
        description: "Proper feeding ensures healthy worms and high-quality vermicast production.",
        nutrientSupply: [
          "Worm castings are rich in nitrogen, phosphorus, potassium (NPK)",
          "Also contains micronutrients and plant growth hormones",
        ],
        soilHealth: [
          "Worms aerate and mix soil through their burrowing",
          "Creates air channels for root growth and enhances microbial activity",
        ],
        plantGrowth: ["Increases soil porosity and drainage", "Improves nutrient availability and water retention"],
        evidenceTitle: "Benefits of Worm Engineering",
        evidenceText: "Their burrowing enhances soil biodiversity and creates optimal growing conditions for plants.",
        source: "Source: ncbi.nlm.nih.gov/pmc/articles/PMC7512760/",
        button: "Learn Harvesting Methods!",
      },
      mistakes: {
        title: "Harvesting and Using Vermicast",
        subtitle: "From Bin to Garden",
        mistakes: [
          { title: "Stop Feeding", description: "Stop feeding for 1–2 weeks before harvesting" },
          { title: "Separate Materials", description: "Push materials to one side, add new food on the other" },
          { title: "Wait for Migration", description: "Worms will migrate, allowing you to collect vermicast" },
          { title: "Collect Dark Castings", description: "Harvest the dark, crumbly vermicast material" },
          { title: "Dry and Store", description: "Dry slightly and store in a breathable bag" },
        ],
        tipTitle: "Usage Tips:",
        tipText:
          "Mix into seedbeds, add a handful per planting hole, or brew into vermi-tea by soaking in water for 12–24 hours.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner's Action Steps",
        subtitle: "Start Your Worm Farm Today",
        steps: [
          { title: "Build or buy a worm bin", description: "Choose appropriate size for your space and needs" },
          { title: "Add shredded paper or straw as bedding", description: "Create comfortable habitat for worms" },
          {
            title: "Start feeding with small food scraps",
            description: "Begin with small amounts to avoid overfeeding",
          },
          { title: "Keep the bin in a shaded, cool place", description: "Maintain optimal temperature and moisture" },
          { title: "Harvest vermicast in 2–3 months", description: "Collect your first batch of black gold" },
          {
            title: "Apply to crops and observe improvements",
            description: "See the benefits in plant growth and health",
          },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "A handful of worms can feed a whole field. Let them work while you rest.",
        button: "I'm Ready to Start Vermicomposting!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the basics of vermicomposting. Your worms will turn waste into valuable fertilizer for your crops!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Vermicomposting",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Ano ang Vermicomposting?", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Bakit Tinatawag na Soil Engineers ang Bulati", icon: "bug-outline", iconLibrary: "Ionicons" },
      { title: "Pag-setup ng Vermicomposting System", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Ano ang Ipapakain sa mga Bulati", icon: "restaurant-outline", iconLibrary: "Ionicons" },
      { title: "Pag-ani at Paggamit ng Vermicast", icon: "basket-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      good: {
        name: "Magagandang Materyales",
        role: "Perpektong pagkain ng bulati para sa malusog na composting",
        examples: ["Balat ng gulay", "Balat ng saging", "Eggshells", "Coffee grounds", "Tea bags", "Ginupit na dahon"],
        description:
          "Ang mga materyales na ito ay nagbibigay ng balanseng nutrisyon sa mga bulati at madaling nabubulok upang maging de-kalidad na vermicast.",
        benefits: ["Madaling mabulok", "Balanseng nutrisyon para sa bulati", "Gumagawa ng de-kalidad na vermicast"],
      },
      avoid: {
        name: "Mga Materyales na Iwasan",
        role: "Maaaring makapinsala sa bulati o mag-attract ng peste",
        examples: ["Karne", "Isda", "Dairy", "Matatabang pagkain", "Citrus scraps", "Maanghang na pagkain"],
        description:
          "Ang mga materyales na ito ay maaaring mag-irritate sa mga bulati, mag-attract ng peste, o lumikha ng hindi malusog na kondisyon sa worm bin.",
        benefits: [
          "Pinipigilan ang mga problema sa peste",
          "Pinapanatiling malusog ang bulati",
          "Pinapanatili ang tamang pH balance",
        ],
      },
      bedding: {
        name: "Mga Bedding Materials",
        role: "Nagbibigay ng tirahan at carbon balance",
        examples: ["Ginupit na papel", "Dayami ng palay", "Tuyong dahon", "Coconut coir", "Karton"],
        description:
          "Ang mga bedding materials ay lumilikha ng komportableng kapaligiran para sa mga bulati at tumutulong sa pagbalanse ng moisture at carbon.",
        benefits: [
          "Pinapanatili ang moisture balance",
          "Nagbibigay ng carbon source",
          "Lumilikha ng tirahan ng bulati",
        ],
      },
    },
    stepContent: {
      composting: {
        title: "Ano ang Vermicomposting?",
        subtitle: "Paggawa ng Basura na Black Gold",
        description:
          "Ang vermicomposting ay ang proseso ng paggamit ng mga bulati upang sirain ang organic waste (tulad ng food scraps, dahon, at dumi) upang maging nutrient-rich na compost na tinatawag na worm castings o vermicast.",
        benefits: [
          "Gumagawa ng high-quality na organic fertilizer",
          "Pinapabuti ang soil structure at microbial life",
          "Binabawasan ang kitchen at farm waste nang epektibo",
          "Maaaring gawin sa maliliit na espasyo (urban o rural)",
          "Mas mabilis kaysa sa traditional na composting methods",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ipinapakita ng pananaliksik na ang vermicast ay maaaring magpataas ng ani ng 20–50% at mapabuti ang resistance ng halaman sa peste at stress.",
        sources: "Pinagmulan: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2019.00044/full",
        button: "Nakuha Ko! Alamin ang Soil Engineers",
      },
      ingredients: {
        title: "Bakit Tinatawag na Soil Engineers ang mga Bulati",
        subtitle: "Worm Castings = Super Fertilizer",
        description:
          "Ang mga bulati ay binabago ang organic waste upang maging valuable na soil amendments sa pamamagitan ng kanilang natural na proseso.",
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang worm castings ay mayaman sa NPK, micronutrients, at plant growth hormones na pinapabuti ang nutrient availability at water retention.",
        button: "Handa na sa Pag-setup ng System!",
      },
      startComposting: {
        title: "Pag-setup ng Vermicomposting System",
        subtitle: "Pumili ng Setup Base sa Espasyo",
        homeGarden: {
          title: "Para sa mga Bahay (Maliliit na Bins)",
          steps: [
            "Gumamit ng plastic, kahoy, o cement containers na may drainage holes",
            "Ideal na laki: 45–60 cm na lalim; takpan upang panatilihing madilim",
            "Gumamit ng Red Wigglers (Eisenia fetida) o local earthworms",
            "Magdagdag ng bedding materials tulad ng ginupit na papel o dayami",
            "Itago sa malamig at liliman na lugar",
          ],
        },
        farm: {
          title: "Para sa mga Bukid (Bedded Pits o Troughs)",
          steps: [
            "Laki: 1m x 2m bed na may bubong o lilim",
            "Gumamit ng ginupit na dahon, dayami ng palay, dumi, at kitchen waste",
            "Panatilihin ang moisture tulad ng basang sponge",
            "Magdagdag ng mga bulati sa ibabaw at takpan ng burlap o dahon ng saging",
            "Panatilihin ang system na malamig, basa, at madilim para sa kalusugan ng bulati",
          ],
        },
        source: "Tip: Ang tamang moisture at temperatura ay susi sa kalusugan at productivity ng bulati",
        button: "Alamin kung Ano ang Ipapakain!",
      },
      benefits: {
        title: "Ano ang Ipapakain (at Hindi Ipapakain) sa mga Bulati",
        subtitle: "Feeding Guide para sa Malusog na Bulati",
        description:
          "Ang tamang pagpapakain ay nagsisiguro ng malusog na bulati at high-quality na vermicast production.",
        nutrientSupply: [
          "Ang worm castings ay mayaman sa nitrogen, phosphorus, potassium (NPK)",
          "Naglalaman din ng micronutrients at plant growth hormones",
        ],
        soilHealth: [
          "Ang mga bulati ay nag-aerate at naghahalo ng lupa sa pamamagitan ng kanilang paghuhukay",
          "Lumilikha ng air channels para sa root growth at pinapahusay ang microbial activity",
        ],
        plantGrowth: [
          "Pinapataas ang soil porosity at drainage",
          "Pinapabuti ang nutrient availability at water retention",
        ],
        evidenceTitle: "Mga Benepisyo ng Worm Engineering",
        evidenceText:
          "Ang kanilang paghuhukay ay pinapahusay ang soil biodiversity at lumilikha ng optimal na growing conditions para sa mga halaman.",
        source: "Pinagmulan: ncbi.nlm.nih.gov/pmc/articles/PMC7512760/",
        button: "Alamin ang Mga Paraan ng Pag-ani!",
      },
      mistakes: {
        title: "Pag-ani at Paggamit ng Vermicast",
        subtitle: "Mula sa Bin Hanggang sa Hardin",
        mistakes: [
          { title: "Itigil ang Pagpapakain", description: "Itigil ang pagpapakain ng 1–2 linggo bago mag-harvest" },
          {
            title: "Ihiwalay ang mga Materyales",
            description: "Itulak ang mga materyales sa isang gilid, magdagdag ng bagong pagkain sa kabilang gilid",
          },
          {
            title: "Maghintay ng Migration",
            description: "Ang mga bulati ay lilipat, na magbibigay-daan sa pag-collect ng vermicast",
          },
          {
            title: "Kolektahin ang Dark Castings",
            description: "I-harvest ang madilim at crumbly na vermicast material",
          },
          { title: "Patuyuin at I-store", description: "Patuyuin ng kaunti at i-store sa breathable na bag" },
        ],
        tipTitle: "Mga Tip sa Paggamit:",
        tipText:
          "Ihalo sa seedbeds, magdagdag ng isang dakot sa bawat planting hole, o gawing vermi-tea sa pamamagitan ng pagbabad sa tubig ng 12–24 oras.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Inyong Worm Farm Ngayon",
        steps: [
          {
            title: "Gumawa o bumili ng worm bin",
            description: "Pumili ng tamang laki para sa inyong espasyo at pangangailangan",
          },
          {
            title: "Magdagdag ng ginupit na papel o dayami bilang bedding",
            description: "Lumikha ng komportableng tirahan para sa mga bulati",
          },
          {
            title: "Simulan ang pagpapakain ng maliliit na food scraps",
            description: "Magsimula sa maliliit na dami upang maiwasan ang overfeeding",
          },
          {
            title: "Itago ang bin sa liliman at malamig na lugar",
            description: "Panatilihin ang optimal na temperatura at moisture",
          },
          {
            title: "I-harvest ang vermicast sa 2–3 buwan",
            description: "Kolektahin ang inyong unang batch ng black gold",
          },
          {
            title: "I-apply sa mga pananim at obserbahan ang mga pagbabago",
            description: "Tingnan ang mga benepisyo sa paglago at kalusugan ng halaman",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang isang dakot ng bulati ay maaaring pakainin ang buong bukid. Hayaan silang magtrabaho habang kayo ay nagpapahinga.",
        button: "Handa na Akong Magsimula ng Vermicomposting!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa vermicomposting. Ang inyong mga bulati ay magbabago ng basura upang maging valuable na fertilizer para sa inyong mga pananim!",
      completionButton: "Magaling!",
    },
  },
}

// Worm Materials for visual styling (renamed from COMPOST_INGREDIENTS)
const COMPOST_INGREDIENTS = {
  good: { color: "#2F855A", bgColor: "#E6FFFA", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
  avoid: { color: "#DC2626", bgColor: "#FEF2F2", icon: "close-circle-outline", iconLibrary: "Ionicons" },
  bedding: { color: "#B45309", bgColor: "#FFF7ED", icon: "layers-outline", iconLibrary: "Ionicons" },
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

// Interactive Worm Material Card (renamed from CompostIngredientCard)
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
export default function VermicompostingGuide() {
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

      <Text style={styles.sectionTitle}>Worm Castings Benefits</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Soil Engineering Benefits</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Plant Growth Benefits</Text>
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
            <Ionicons name="basket-outline" size={20} color="#2F855A" />
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
              <Ionicons name="bulb-outline" size={48} color="#2F855A" />
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
