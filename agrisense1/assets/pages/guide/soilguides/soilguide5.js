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

// Translation data for Composting Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Composting Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "Understand What Composting Is", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Key Ingredients for Composting", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "How to Start Composting", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Benefits of Using Compost", icon: "globe-outline", iconLibrary: "Ionicons" },
      { title: "Common Mistakes to Avoid", icon: "warning-outline", iconLibrary: "Ionicons" },
      { title: "Beginner’s Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      greens: {
        name: "Greens",
        role: "Nitrogen (fuel for microbes)",
        examples: ["Vegetable peels", "Fruit scraps", "Manure"],
        description: "Greens provide nitrogen, which fuels microbial activity to break down organic matter.",
        benefits: ["Supplies nitrogen", "Speeds decomposition", "Boosts microbial growth"],
      },
      browns: {
        name: "Browns",
        role: "Carbon (structure and energy)",
        examples: ["Dry leaves", "Rice straw", "Sawdust"],
        description: "Browns provide carbon, offering structure and energy for the composting process.",
        benefits: ["Provides carbon balance", "Prevents odors", "Maintains pile structure"],
      },
      water: {
        name: "Water",
        role: "Keeps pile moist",
        examples: ["Rainwater", "Light sprinkling"],
        description: "Water maintains the moisture level needed for microbial activity, like a wrung sponge.",
        benefits: ["Supports microbial activity", "Prevents drying", "Aids decomposition"],
      },
      air: {
        name: "Air",
        role: "Prevents foul odor and speeds breakdown",
        examples: ["Turning or aerating the pile"],
        description: "Aeration ensures oxygen flow, preventing anaerobic conditions and speeding up decomposition.",
        benefits: ["Prevents bad odors", "Speeds up process", "Promotes aerobic decomposition"],
      },
    },
    stepContent: {
      composting: {
        title: "Understand What Composting Is",
        subtitle: "A Natural Soil Enhancer",
        description:
          "Composting is the natural process of breaking down organic materials like kitchen waste, animal manure, and plant residues into nutrient-rich humus. It turns waste into a valuable soil conditioner.",
        benefits: [
          "Improves soil structure and water retention",
          "Adds organic matter and micronutrients",
          "Supports beneficial soil microbes and earthworms",
          "Reduces farm and household waste",
          "Cuts fertilizer costs over time",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Composting can reduce waste volume by 50–70% and improve soil fertility, cutting fertilizer use by up to 30%.",
        sources: "Sources: fao.org | epa.gov | sciencedirect.com/science/article/abs/pii/S0048969720360834",
        button: "Got It! Let's Start Composting",
      },
      ingredients: {
        title: "Key Ingredients for Composting",
        subtitle: "Balance Greens and Browns",
        description: "To make healthy compost, you need a good balance of greens and browns, plus water and air.",
        tipTitle: "Farmer Tip:",
        tipText: "Shred or chop materials for faster composting. Aim for a 2:1 brown-to-green ratio.",
        button: "Ready to Build a Pile!",
      },
      startComposting: {
        title: "How to Start Composting",
        subtitle: "Step-by-Step Guide",
        homeGarden: {
          title: "For Home Gardens (Backyard or Containers)",
          steps: [
            "Choose a bin or dig a small pit (1m x 1m)",
            "Layer browns and greens alternately",
            "Add a bit of old compost or soil to introduce microbes",
            "Keep it moist (like a wrung sponge)",
            "Turn the pile every 1–2 weeks",
            "Compost is ready in 2–3 months when dark, crumbly, and earthy-smelling",
          ],
        },
        farm: {
          title: "For Farms (Open Pile or Windrow Method)",
          steps: [
            "Use larger amounts of crop residues, animal manure, and straw",
            "Build piles at least 1.5m high to generate heat",
            "Monitor temperature (ideal: 50–65°C) to kill pathogens and weed seeds",
            "Turn the pile every 2–3 weeks using a shovel or tractor",
            "Mature compost in 2–4 months depending on material and climate",
          ],
        },
        source: "Source: frontiersin.org/articles/10.3389/fsufs.2020.00087/full",
        button: "Explore Compost Benefits!",
      },
      benefits: {
        title: "Benefits of Using Compost in Soil",
        subtitle: "Enhancing Soil and Plants",
        description: "Compost improves soil and supports healthier plant growth in multiple ways.",
        nutrientSupply: [
          "Releases nutrients slowly (unlike synthetic fertilizers)",
          "Contains micronutrients like boron, zinc, and sulfur",
        ],
        soilHealth: [
          "Improves soil aeration and porosity",
          "Enhances water retention—especially helpful in drought-prone areas",
          "Buffers soil pH and improves microbial biodiversity",
        ],
        plantGrowth: [
          "Increases root development and crop resilience",
          "Reduces plant stress and risk of disease",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText: "Research shows compost can increase yields by up to 20–40% in some crops (e.g., tomato, leafy greens).",
        source: "Source: mdpi.com/2071-1050/13/17/9996",
        button: "Learn What to Avoid!",
      },
      mistakes: {
        title: "Common Mistakes to Avoid",
        subtitle: "Keep Your Compost Healthy",
        mistakes: [
          { title: "Too Wet", description: "Causes bad odor and rot" },
          { title: "Too Dry", description: "Slows breakdown" },
          { title: "Too Much Green", description: "Attracts pests and creates ammonia smell" },
          { title: "No Turning", description: "Slows the composting process" },
          { title: "Adding Non-compostables", description: "Plastic, meat, oily food cause contamination and pests" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "If your compost smells bad, add more browns and mix well.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner’s Action Steps",
        subtitle: "Start Composting Today",
        steps: [
          { title: "Start a compost pile or bin", description: "Use food scraps and dry leaves" },
          { title: "Maintain 2:1 brown-to-green ratio", description: "Balance materials for optimal decomposition" },
          { title: "Turn your pile regularly", description: "Ensure airflow to speed up the process" },
          { title: "Keep it moist—not soaked", description: "Maintain moisture like a wrung sponge" },
          { title: "Use finished compost", description: "Apply in pots, gardens, or fields" },
          { title: "Educate others", description: "Teach family or neighbors how to compost" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "One person’s waste is another plant’s feast. Composting turns trash into treasure for your soil.",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText: "You've mastered the basics of composting. Your soil will thrive with this knowledge!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Paggawa ng Kompost",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Unawain ang Kompost", icon: "leaf-outline", iconLibrary: "Ionicons" },
      { title: "Mga Pangunahing Sangkap", icon: "nutrition-outline", iconLibrary: "Ionicons" },
      { title: "Paano Magsimula sa Kompost", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Mga Benepisyo ng Kompost", icon: "globe-outline", iconLibrary: "Ionicons" },
      { title: "Mga Pagkakamaling Iwasan", icon: "warning-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      greens: {
        name: "Mga Berde",
        role: "Nitrogen (pagkain para sa mga mikrobyo)",
        examples: ["Balat ng gulay", "Mga scrap ng prutas", "Dumi ng hayop"],
        description: "Ang mga berde ay nagbibigay ng nitrogen, na nagpapakain sa aktibidad ng mikrobyo upang masira ang organikong materyal.",
        benefits: ["Nagbibigay ng nitrogen", "Pinapabilis ang pagkabulok", "Nadadagdagan ang paglago ng mikrobyo"],
      },
      browns: {
        name: "Mga Kayumanggi",
        role: "Carbon (istruktura at enerhiya)",
        examples: ["Tuyong dahon", "Dayami ng palay", "Supot"],
        description: "Ang mga kayumanggi ay nagbibigay ng carbon, na nagbibigay ng istruktura at enerhiya para sa proseso ng kompost.",
        benefits: ["Nagbibigay ng balanse ng carbon", "Pinipigilan ang masamang amoy", "Pinapanatili ang istruktura ng tambak"],
      },
      water: {
        name: "Tubig",
        role: "Pinapanatiling basa ang tambak",
        examples: ["Tubig-ulan", "Bahagyang pagdidilig"],
        description: "Ang tubig ay nagpapanatili ng antas ng moisture na kinakailangan para sa aktibidad ng mikrobyo, tulad ng isang piniga na espongha.",
        benefits: ["Sumusuporta sa aktibidad ng mikrobyo", "Pinipigilan ang pagkatuyo", "Tumutulong sa pagkabulok"],
      },
      air: {
        name: "Hangin",
        role: "Pinipigilan ang masamang amoy at pinapabilis ang pagkabulok",
        examples: ["Pag-ikot o pagpapahangin sa tambak"],
        description: "Ang aeration ay nagsisiguro ng daloy ng oxygen, pinipigilan ang anaerobic na kondisyon at pinapabilis ang pagkabulok.",
        benefits: ["Pinipigilan ang masamang amoy", "Pinapabilis ang proseso", "Nagtataguyod ng aerobic decomposition"],
      },
    },
    stepContent: {
      composting: {
        title: "Unawain ang Kompost",
        subtitle: "Natural na Pampahusay ng Lupa",
        description:
          "Ang paggawa ng kompost ay ang natural na proseso ng pagkabulok ng mga organikong materyal tulad ng basura sa kusina, dumi ng hayop, at mga labi ng halaman upang maging nutrient-rich na humus. Ginagawa nitong mahalagang kondisyoner ng lupa ang basura.",
        benefits: [
          "Pinapabuti ang istruktura ng lupa at pagpapanatili ng tubig",
          "Nagdadagdag ng organikong materyal at micronutrients",
          "Sumusuporta sa mga kapaki-pakinabang na mikrobyo sa lupa at mga uod",
          "Binabawasan ang basura sa bukid at sambahayan",
          "Binabawasan ang gastos sa pataba sa paglipas ng panahon",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ang paggawa ng kompost ay maaaring magpabawas ng dami ng basura ng 50–70% at mapabuti ang fertility ng lupa, na binabawasan ang paggamit ng pataba ng hanggang 30%.",
        sources: "Pinagmulan: fao.org | epa.gov | sciencedirect.com/science/article/abs/pii/S0048969720360834",
        button: "Nakuha Ko! Simulan ang Kompost",
      },
      ingredients: {
        title: "Mga Pangunahing Sangkap sa Kompost",
        subtitle: "Balanseng Mga Berde at Kayumanggi",
        description: "Upang makagawa ng malusog na kompost, kailangan ng magandang balanse ng mga berde at kayumanggi, kasabay ng tubig at hangin.",
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Gumupit o tadtarin ang mga materyal para sa mas mabilis na kompost. Hangarin ang 2:1 brown-to-green ratio.",
        button: "Handa na Magtayo ng Tambak!",
      },
      startComposting: {
        title: "Paano Magsimula sa Kompost",
        subtitle: "Gabay sa Hakbang-hakbang",
        homeGarden: {
          title: "Para sa Hardin sa Bahay (Bakuran o Lalagyan)",
          steps: [
            "Pumili ng bin o maghukay ng maliit na hukay (1m x 1m)",
            "Maglagay ng mga berde at kayumanggi na magkakasunod",
            "Magdagdag ng kaunting lumang kompost o lupa upang ipakilala ang mga mikrobyo",
            "Panatilihing basa (tulad ng piniga na espongha)",
            "Iikot ang tambak tuwing 1–2 linggo",
            "Handa ang kompost sa loob ng 2–3 buwan kapag madilim, malutong, at may amoy na lupa",
          ],
        },
        farm: {
          title: "Para sa Bukid (Open Pile o Windrow Method)",
          steps: [
            "Gumamit ng mas malaking dami ng mga labi ng pananim, dumi ng hayop, at dayami",
            "Magtayo ng mga tambak na hindi bababa sa 1.5m ang taas upang makabuo ng init",
            "Subaybayan ang temperatura (ideal: 50–65°C) upang patayin ang mga pathogen at buto ng damo",
            "Iikot ang tambak tuwing 2–3 linggo gamit ang asada o traktor",
            "Matutunaw ang kompost sa loob ng 2–4 na buwan depende sa materyal at klima",
          ],
        },
        source: "Pinagmulan: frontiersin.org/articles/10.3389/fsufs.2020.00087/full",
        button: "Galugarin ang Mga Benepisyo ng Kompost!",
      },
      benefits: {
        title: "Mga Benepisyo ng Paggamit ng Kompost sa Lupa",
        subtitle: "Pagpapahusay ng Lupa at Halaman",
        description: "Ang kompost ay nagpapabuti sa lupa at sumusuporta sa mas malusog na paglago ng halaman sa maraming paraan.",
        nutrientSupply: [
          "Dahan-dahang naglalabas ng sustansya (hindi tulad ng mga sintetikong pataba)",
          "Naglalaman ng micronutrients tulad ng boron, zinc, at sulfur",
        ],
        soilHealth: [
          "Pinapabuti ang aeration at porosity ng lupa",
          "Pinapahusay ang pagpapanatili ng tubig—lalo na sa mga lugar na madaling matuyuan",
          "Nagbabalanse ng pH ng lupa at nagpapabuti sa microbial biodiversity",
        ],
        plantGrowth: [
          "Nadadagdagan ang pag-unlad ng ugat at katatagan ng pananim",
          "Binabawasan ang stress ng halaman at panganib ng sakit",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText: "Ipinapakita ng pananaliksik na ang kompost ay maaaring magpataas ng ani ng hanggang 20–40% sa ilang mga pananim (hal., kamatis, mga madahong gulay).",
        source: "Pinagmulan: mdpi.com/2071-1050/13/17/9996",
        button: "Alamin ang Dapat Iwasan!",
      },
      mistakes: {
        title: "Mga Karaniwang Pagkakamali na Dapat Iwasan",
        subtitle: "Panatilihing Malusog ang Iyong Kompost",
        mistakes: [
          { title: "Masyadong Basa", description: "Nagdudulot ng masamang amoy at pagkabulok" },
          { title: "Masyadong Tuyo", description: "Pinapabagal ang pagkabulok" },
          { title: "Sobrang Berde", description: "Nakakaakit ng mga peste at lumilikha ng amoy ng ammonia" },
          { title: "Walang Pag-ikot", description: "Pinapabagal ang proseso ng kompost" },
          { title: "Pagdaragdag ng Hindi Kompostable", description: "Ang plastik, karne, at mamantikang pagkain ay nagdudulot ng kontaminasyon at peste" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Kung masama ang amoy ng iyong kompost, magdagdag ng mas maraming kayumanggi at haluin nang maayos.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Kompost Ngayon",
        steps: [
          { title: "Magtayo ng tambak o bin ng kompost", description: "Gumamit ng mga scrap ng pagkain at tuyong dahon" },
          { title: "Panatilihin ang 2:1 brown-to-green ratio", description: "Balanseng materyal para sa pinakamainam na pagkabulok" },
          { title: "Iikot ang tambak nang regular", description: "Siguraduhing may daloy ng hangin upang mapabilis ang proseso" },
          { title: "Panatilihing basa—hindi babad", description: "Panatilihin ang moisture tulad ng piniga na espongha" },
          { title: "Gamitin ang tapos na kompost", description: "Ilapat sa mga paso, hardin, o bukirin" },
          { title: "Turuan ang iba", description: "Turuan ang pamilya o kapitbahay kung paano magkompost" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Ang basura ng isang tao ay pagkain ng halaman. Ang kompost ay ginagawang kayamanan ang basura para sa iyong lupa.",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText: "Natutunan ninyo na ang mga pangunahing kaalaman sa paggawa ng kompost. Magpapalago ang inyong lupa dahil sa kaalamang ito!",
      completionButton: "Magaling!",
    },
  },
}

// Compost Ingredients for visual styling
const COMPOST_INGREDIENTS = {
  greens: { color: "#2F855A", bgColor: "#E6FFFA", icon: "leaf-outline", iconLibrary: "Ionicons" },
  browns: { color: "#B45309", bgColor: "#FFF7ED", icon: "leaf-maple", iconLibrary: "MaterialCommunityIcons" },
  water: { color: "#2B6CB0", bgColor: "#EBF8FF", icon: "water-outline", iconLibrary: "Ionicons" },
  air: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "weather-windy", iconLibrary: "MaterialCommunityIcons" },
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

// Interactive Compost Ingredient Card
const CompostIngredientCard = ({ ingredientKey, ingredient, onPress, t, interactive = false }) => {
  const IconComponent = ingredient.iconLibrary === "MaterialCommunityIcons" ? MaterialCommunityIcons : Ionicons;

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
  );
};

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function CompostingGuide() {
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

      <Text style={styles.sectionTitle}>Nutrient Supply</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Soil Health</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Plant Growth</Text>
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
            <Ionicons name="close-circle-outline" size={20} color="#B45309" />
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
                      <MaterialCommunityIcons name={selectedIngredient.icon} size={28} color="#2F855A" style={{ marginRight: 12 }} />
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
              <Ionicons name="trash-bin-outline" size={48} color="#2F855A" />
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
    backgroundColor: "#FFF7ED",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  mistakeContent: {
    flex: 1,
    marginLeft: 12,
  },
  mistakeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B45309",
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