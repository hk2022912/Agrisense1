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

// Translation data for Soil Erosion Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Soil Erosion Prevention Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "What is Soil Erosion and Why It's a Problem", icon: "warning-outline", iconLibrary: "Ionicons" },
      { title: "Causes of Soil Erosion in Farms and Gardens", icon: "water-outline", iconLibrary: "Ionicons" },
      { title: "Practical Ways to Prevent Soil Erosion", icon: "shield-outline", iconLibrary: "Ionicons" },
      { title: "Soil-Building Practices That Prevent Erosion", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Erosion Risk Assessment Tips", icon: "search-outline", iconLibrary: "Ionicons" },
      { title: "Beginner's Action Steps", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      water: {
        name: "Water Erosion",
        role: "Caused by heavy rain and runoff",
        examples: ["Heavy rainfall", "Surface runoff", "Sloped lands", "Bare fields"],
        description:
          "Water erosion occurs when rainfall or irrigation water flows over the soil surface, carrying away topsoil and nutrients into rivers and streams.",
        benefits: ["Common on slopes", "Carries nutrients away", "Worsens during storms"],
      },
      wind: {
        name: "Wind Erosion",
        role: "Happens in dry areas with exposed soil",
        examples: ["Dry season conditions", "Loose soil particles", "Exposed fields", "Drought periods"],
        description:
          "Wind erosion occurs when strong winds blow away fine soil particles and organic matter, especially in dry conditions with bare soil.",
        benefits: ["Removes fine particles", "Blows away organic matter", "Common in dry areas"],
      },
      tillage: {
        name: "Tillage Erosion",
        role: "Repeated plowing disturbs soil structure",
        examples: ["Over-plowing", "Deep cultivation", "Mechanical disturbance", "Soil compaction"],
        description:
          "Tillage erosion happens when repeated plowing and cultivation break down soil structure, making it more vulnerable to wind and water erosion.",
        benefits: ["Disturbs soil structure", "Increases vulnerability", "Mechanical damage"],
      },
    },
    stepContent: {
      composting: {
        title: "What is Soil Erosion and Why It's a Problem",
        subtitle: "Soil on the Move = Future at Risk",
        description:
          "Soil erosion is the loss of topsoil due to wind, water, or human activity. Topsoil is the most fertile layer, rich in nutrients and organic matter—once it's gone, it's hard to replace.",
        benefits: [
          "Soil erosion leads to lower yields and poor crop health",
          "Worsens flooding and water pollution",
          "Depletes organic matter and soil life",
          "Increases dependency on fertilizers",
          "Threatens long-term farm productivity and food security",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Erosion can remove 5–20 tons of soil per hectare per year if left unmanaged, threatening global food security.",
        sources: "Sources: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.00057/full",
        button: "Got It! Learn About Erosion Causes",
      },
      ingredients: {
        title: "Causes of Soil Erosion in Farms and Gardens",
        subtitle: "Understanding the Forces That Move Soil",
        description:
          "Soil erosion is caused by three main forces: water, wind, and tillage. Understanding these causes helps you choose the right prevention methods.",
        tipTitle: "Farmer Tip:",
        tipText:
          "Erosion can remove 5–20 tons of soil per hectare per year if left unmanaged. Prevention is always better than restoration.",
        button: "Ready to Learn Prevention Methods!",
      },
      startComposting: {
        title: "Practical Ways to Prevent Soil Erosion",
        subtitle: "Protecting Your Soil Investment",
        homeGarden: {
          title: "Cover Crops & Surface Protection",
          steps: [
            "Plant cover crops to keep soil covered during off-season",
            "Roots hold soil together and absorb water effectively",
            "Best choices: mungbean, rye, cowpea for ground cover",
            "Use mulch and compost to cover soil surface",
            "Reduces impact from raindrops and improves soil texture",
          ],
        },
        farm: {
          title: "Contour Farming & Structural Methods",
          steps: [
            "Use contour farming - plant along natural land contours to slow water flow",
            "Build terraces on hillsides to trap water and reduce runoff",
            "Minimize tillage - avoid over-plowing or deep cultivation",
            "Plant buffer strips or hedges using vetiver grass, banana, or native shrubs",
            "Acts as windbreak and slows down flowing water effectively",
          ],
        },
        source:
          "Sources: soilquality.org | mdpi.com | nrcs.usda.gov/resources/education-and-teaching-materials/soil-erosion",
        button: "Learn Soil-Building Practices!",
      },
      benefits: {
        title: "Soil-Building Practices That Prevent Erosion",
        subtitle: "Strengthening Soil Structure",
        description: "Building healthy soil structure is the foundation of erosion prevention.",
        nutrientSupply: [
          "Add organic matter - compost and manure improve soil binding",
          "Supports microbes that create natural glues (like glomalin)",
        ],
        soilHealth: [
          "Maintain soil structure - avoid working soil when too wet or too dry",
          "Rotate crops to maintain healthy root systems",
        ],
        plantGrowth: [
          "Improve water infiltration using raised beds or swales",
          "Maintain drainage canals and dikes properly",
        ],
        evidenceTitle: "Research Results",
        evidenceText: "Studies show that cover crops and mulch can reduce erosion by up to 90% on sloped fields.",
        source: "Source: sciencedirect.com/science/article/abs/pii/S0341816217301669",
        button: "Learn Risk Assessment!",
      },
      mistakes: {
        title: "Erosion Risk Assessment Tips",
        subtitle: "Early Detection Saves Your Soil",
        mistakes: [
          { title: "Rills or Gullies", description: "Look for channels forming after rainfall in your fields" },
          { title: "Exposed Roots or Rocks", description: "Check for plant roots or stones becoming visible" },
          { title: "Bare Soil Patches", description: "Monitor areas with weak plant growth or no cover" },
          { title: "Water Runoff Patterns", description: "Observe water pooling or running off quickly after rain" },
          { title: "Soil Color Changes", description: "Notice if topsoil appears lighter or different in color" },
        ],
        tipTitle: "Monitoring Tip:",
        tipText: "Take before-and-after photos to monitor changes in the field and track your progress over time.",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner's Action Steps",
        subtitle: "Start Protecting Your Soil Today",
        steps: [
          {
            title: "Keep soil covered at all times using mulch or cover crops",
            description: "Never leave soil bare - always provide protective cover",
          },
          {
            title: "Avoid over-tilling or exposing bare soil",
            description: "Use no-till or reduced-till practices to maintain soil structure",
          },
          {
            title: "Use contour lines or terracing for sloped land",
            description: "Work with the natural landscape to slow water flow",
          },
          {
            title: "Plant grass strips or vetiver on erosion-prone areas",
            description: "Create natural barriers in vulnerable locations",
          },
          {
            title: "Add compost regularly to improve soil binding",
            description: "Build organic matter to strengthen soil structure",
          },
          {
            title: "Check your land after every storm or dry spell",
            description: "Monitor for early signs of erosion and take quick action",
          },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Soil is your farm's foundation—protect it like your harvest depends on it, because it does.",
        button: "I'm Ready to Prevent Erosion!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Characteristics:",
      completionTitle: "Guide Complete!",
      completionText:
        "You've mastered the basics of soil erosion prevention. Your soil will now be protected from wind, water, and degradation for years to come!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Pagpigil ng Soil Erosion",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Ano ang Soil Erosion at Bakit Problema", icon: "warning-outline", iconLibrary: "Ionicons" },
      { title: "Mga Sanhi ng Soil Erosion sa Bukid", icon: "water-outline", iconLibrary: "Ionicons" },
      { title: "Praktikal na Paraan para Pigilan ang Erosion", icon: "shield-outline", iconLibrary: "Ionicons" },
      { title: "Soil-Building Practices na Pumipigil sa Erosion", icon: "construct-outline", iconLibrary: "Ionicons" },
      { title: "Mga Tip sa Erosion Risk Assessment", icon: "search-outline", iconLibrary: "Ionicons" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkmark-circle-outline", iconLibrary: "Ionicons" },
    ],
    compostIngredients: {
      water: {
        name: "Water Erosion",
        role: "Sanhi ng malakas na ulan at runoff",
        examples: ["Malakas na ulan", "Surface runoff", "Nakaahong lupa", "Hubad na bukid"],
        description:
          "Ang water erosion ay nangyayari kapag ang ulan o irrigation water ay dumaloy sa ibabaw ng lupa, dinadala ang topsoil at nutrients sa mga ilog at stream.",
        benefits: ["Karaniwan sa mga slope", "Dinadala ang nutrients", "Lumalala sa mga bagyo"],
      },
      wind: {
        name: "Wind Erosion",
        role: "Nangyayari sa tuyong lugar na may exposed soil",
        examples: ["Dry season conditions", "Loose soil particles", "Exposed fields", "Drought periods"],
        description:
          "Ang wind erosion ay nangyayari kapag ang malakas na hangin ay humihip sa mga pinong soil particles at organic matter, lalo na sa tuyong kondisyon na may hubad na lupa.",
        benefits: ["Tinatanggal ang fine particles", "Hinihip ang organic matter", "Karaniwan sa tuyong lugar"],
      },
      tillage: {
        name: "Tillage Erosion",
        role: "Paulit-ulit na pag-araro ay gumugulong sa soil structure",
        examples: ["Over-plowing", "Malalim na cultivation", "Mechanical disturbance", "Soil compaction"],
        description:
          "Ang tillage erosion ay nangyayari kapag ang paulit-ulit na pag-araro at cultivation ay sinisira ang soil structure, ginagawa itong mas vulnerable sa wind at water erosion.",
        benefits: ["Gumugulong sa soil structure", "Pinapataas ang vulnerability", "Mechanical damage"],
      },
    },
    stepContent: {
      composting: {
        title: "Ano ang Soil Erosion at Bakit Problema",
        subtitle: "Soil na Gumagalaw = Hinaharap na Nanganganib",
        description:
          "Ang soil erosion ay ang pagkawala ng topsoil dahil sa hangin, tubig, o human activity. Ang topsoil ay ang pinaka-fertile na layer, mayaman sa nutrients at organic matter—kapag nawala na, mahirap nang palitan.",
        benefits: [
          "Ang soil erosion ay nagiging dahilan ng mas mababang ani at mahinang kalusugan ng pananim",
          "Pinapahirap ang flooding at water pollution",
          "Nauubos ang organic matter at soil life",
          "Pinapataas ang dependency sa fertilizers",
          "Binabanta ang long-term farm productivity at food security",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ang erosion ay maaaring mag-alis ng 5–20 tons ng lupa bawat hectare bawat taon kung hindi pinangangasiwaan, binabanta ang global food security.",
        sources: "Pinagmulan: fao.org | sciencedirect.com | frontiersin.org/articles/10.3389/fsufs.2020.00057/full",
        button: "Nakuha Ko! Alamin ang Mga Sanhi ng Erosion",
      },
      ingredients: {
        title: "Mga Sanhi ng Soil Erosion sa mga Bukid at Hardin",
        subtitle: "Pag-unawa sa mga Puwersang Gumagalaw sa Lupa",
        description:
          "Ang soil erosion ay sanhi ng tatlong pangunahing puwersa: tubig, hangin, at tillage. Ang pag-unawa sa mga sanhi na ito ay tumutulong sa inyo na pumili ng tamang prevention methods.",
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang erosion ay maaaring mag-alis ng 5–20 tons ng lupa bawat hectare bawat taon kung hindi pinangangasiwaan. Ang prevention ay palaging mas maganda kaysa sa restoration.",
        button: "Handa na sa Mga Paraan ng Prevention!",
      },
      startComposting: {
        title: "Praktikal na Paraan para Pigilan ang Soil Erosion",
        subtitle: "Pagprotekta sa Inyong Soil Investment",
        homeGarden: {
          title: "Cover Crops at Surface Protection",
          steps: [
            "Magtanim ng cover crops upang panatilihing nakatakip ang lupa sa off-season",
            "Ang mga ugat ay naghahawak sa lupa at epektibong sumusupsop ng tubig",
            "Pinakamahusay na pagpipilian: munggo, rye, cowpea para sa ground cover",
            "Gumamit ng mulch at compost upang takpan ang ibabaw ng lupa",
            "Binabawasan ang impact mula sa mga patak ng ulan at pinapabuti ang soil texture",
          ],
        },
        farm: {
          title: "Contour Farming at Structural Methods",
          steps: [
            "Gumamit ng contour farming - magtanim kasama ang natural land contours upang pabagalin ang water flow",
            "Gumawa ng terraces sa mga hillsides upang ma-trap ang tubig at mabawasan ang runoff",
            "Bawasan ang tillage - iwasang mag-over-plow o malalim na cultivation",
            "Magtanim ng buffer strips o hedges gamit ang vetiver grass, saging, o native shrubs",
            "Gumagana bilang windbreak at epektibong pinabagal ang umaagos na tubig",
          ],
        },
        source:
          "Pinagmulan: soilquality.org | mdpi.com | nrcs.usda.gov/resources/education-and-teaching-materials/soil-erosion",
        button: "Alamin ang Soil-Building Practices!",
      },
      benefits: {
        title: "Soil-Building Practices na Pumipigil sa Erosion",
        subtitle: "Pagpapalakas ng Soil Structure",
        description: "Ang pagbuo ng malusog na soil structure ay ang pundasyon ng erosion prevention.",
        nutrientSupply: [
          "Magdagdag ng organic matter - ang compost at manure ay pinapabuti ang soil binding",
          "Sumusuporta sa mga microbes na lumilikha ng natural glues (tulad ng glomalin)",
        ],
        soilHealth: [
          "Panatilihin ang soil structure - iwasang magtrabaho sa lupa kapag masyadong basa o tuyo",
          "Mag-rotate ng mga pananim upang mapanatili ang malusog na root systems",
        ],
        plantGrowth: [
          "Pahusayin ang water infiltration gamit ang raised beds o swales",
          "Panatilihin nang maayos ang drainage canals at dikes",
        ],
        evidenceTitle: "Mga Resulta ng Pananaliksik",
        evidenceText:
          "Ipinapakita ng mga pag-aaral na ang cover crops at mulch ay maaaring mabawasan ang erosion ng hanggang 90% sa mga sloped fields.",
        source: "Pinagmulan: sciencedirect.com/science/article/abs/pii/S0341816217301669",
        button: "Alamin ang Risk Assessment!",
      },
      mistakes: {
        title: "Mga Tip sa Erosion Risk Assessment",
        subtitle: "Ang Maagang Pagtuklas ay Nagsasalba sa Inyong Lupa",
        mistakes: [
          {
            title: "Mga Rills o Gullies",
            description: "Hanapin ang mga channel na nabubuo pagkatapos ng ulan sa inyong bukid",
          },
          { title: "Exposed Roots o Rocks", description: "Suriin ang mga ugat ng halaman o bato na nagiging nakikita" },
          {
            title: "Mga Bare Soil Patches",
            description: "Subaybayan ang mga lugar na may mahinang paglago ng halaman o walang takip",
          },
          {
            title: "Water Runoff Patterns",
            description: "Obserbahan ang tubig na nag-pool o mabilis na tumatagos pagkatapos ng ulan",
          },
          {
            title: "Mga Pagbabago sa Kulay ng Lupa",
            description: "Mapansin kung ang topsoil ay lumilitaw na mas maliwanag o iba ang kulay",
          },
        ],
        tipTitle: "Monitoring Tip:",
        tipText:
          "Kumuha ng before-and-after photos upang subaybayan ang mga pagbabago sa bukid at i-track ang inyong progreso sa paglipas ng panahon.",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Pagprotekta sa Inyong Lupa Ngayon",
        steps: [
          {
            title: "Panatilihing nakatakip ang lupa sa lahat ng oras gamit ang mulch o cover crops",
            description: "Huwag kailanman hayaang maging hubad ang lupa - palaging magbigay ng protective cover",
          },
          {
            title: "Iwasang mag-over-till o mag-expose ng hubad na lupa",
            description: "Gumamit ng no-till o reduced-till practices upang mapanatili ang soil structure",
          },
          {
            title: "Gumamit ng contour lines o terracing para sa nakaahong lupa",
            description: "Makipagtulungan sa natural landscape upang pabagalin ang water flow",
          },
          {
            title: "Magtanim ng grass strips o vetiver sa erosion-prone areas",
            description: "Lumikha ng natural barriers sa mga vulnerable na lokasyon",
          },
          {
            title: "Magdagdag ng compost nang regular upang mapabuti ang soil binding",
            description: "Makabuo ng organic matter upang palakasin ang soil structure",
          },
          {
            title: "Suriin ang inyong lupa pagkatapos ng bawat bagyo o dry spell",
            description: "Subaybayan ang mga maagang senyales ng erosion at kumilos nang mabilis",
          },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText:
          "Ang lupa ay pundasyon ng inyong bukid—protektahan ito na parang nakasalalay dito ang inyong ani, dahil totoo naman.",
        button: "Handa na Akong Pigilan ang Erosion!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Katangian:",
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa pagpigil ng soil erosion. Ang inyong lupa ay mapoprotektahan na mula sa hangin, tubig, at degradation sa loob ng maraming taon!",
      completionButton: "Magaling!",
    },
  },
}

// Erosion Types for visual styling (renamed from COMPOST_INGREDIENTS)
const COMPOST_INGREDIENTS = {
  water: { color: "#2563EB", bgColor: "#EFF6FF", icon: "water-outline", iconLibrary: "Ionicons" },
  wind: { color: "#7C3AED", bgColor: "#F5F3FF", icon: "cloudy-outline", iconLibrary: "Ionicons" },
  tillage: { color: "#DC2626", bgColor: "#FEF2F2", icon: "waves", iconLibrary: "MaterialCommunityIcons" },
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

// Interactive Erosion Type Card (renamed from CompostIngredientCard)
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
export default function SoilErosionGuide() {
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
            <Ionicons name="warning-outline" size={18} color="#DC2626" />
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
            <Ionicons name="shield-checkmark-outline" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{step}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.startComposting.farm.title}</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.startComposting.farm.steps.map((step, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#2F855A" />
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

      <Text style={styles.sectionTitle}>Organic Matter & Soil Binding</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.nutrientSupply.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="leaf-outline" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Soil Structure Maintenance</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.soilHealth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="construct-outline" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Water Management</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.benefits.plantGrowth.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <Ionicons name="water-outline" size={18} color="#2F855A" />
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
            <Ionicons name="search-outline" size={20} color="#DC2626" />
            <View style={styles.mistakeContent}>
              <Text style={styles.mistakeTitle}>{mistake.title}</Text>
              <Text style={styles.mistakeDescription}>{mistake.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <Ionicons name="camera-outline" size={24} color="#B45309" />
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
        <Ionicons name="shield-outline" size={24} color="#B45309" />
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
                    <Ionicons name="information-circle" size={16} color="#2F855A" />
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
              <Ionicons name="shield-checkmark-outline" size={48} color="#2F855A" />
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
    backgroundColor: "#FEF2F2",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  mistakeContent: {
    flex: 1,
    marginLeft: 12,
  },
  mistakeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
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
