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

// Translation data for Cover Crops Guide
const TRANSLATIONS = {
  en: {
    headerTitle: "Cover Crops Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue",
    steps: [
      { title: "Understand the Role of Cover Crops", icon: "leaf" },
      { title: "Common Types and Functions", icon: "sprout" },
      { title: "When and How to Plant", icon: "calendar" },
      { title: "Improving the Soil Health", icon: "globe" },
      { title: "Terminating Cover Crops", icon: "scythe" },
      { title: "Beginner’s Action Steps", icon: "checkbox-marked-circle" },
    ],
    coverCropTypes: {
      legumes: {
        name: "Legumes",
        role: "Fix nitrogen from the air",
        examples: ["Mungbean", "Cowpea", "Clover"],
        description: "Legumes capture nitrogen from the atmosphere through root nodules, naturally enriching the soil for future crops.",
        benefits: ["Add nitrogen to soil", "Enhance soil fertility", "Support microbial activity"],
      },
      grasses: {
        name: "Grasses",
        role: "Improve soil structure, reduce erosion",
        examples: ["Rye", "Sorghum", "Napier"],
        description: "Grasses develop extensive root systems that stabilize soil and prevent erosion, while adding organic matter.",
        benefits: ["Prevent soil erosion", "Improve soil structure", "Increase organic matter"],
      },
      brassicas: {
        name: "Brassicas",
        role: "Break compacted soil, reduce pests",
        examples: ["Mustard", "Radish"],
        description: "Brassicas have deep taproots that break up compacted soil and release compounds that suppress soil pests.",
        benefits: ["Reduce soil compaction", "Suppress pests", "Enhance soil aeration"],
      },
      mixes: {
        name: "Mixes",
        role: "Combine multiple benefits",
        examples: ["Legume + Grass combos"],
        description: "Mixes combine the benefits of different cover crops, providing diverse soil improvements in one planting.",
        benefits: ["Multi-benefit soil enhancement", "Balanced nutrient addition", "Improved soil resilience"],
      },
    },
    stepContent: {
      role: {
        title: "Understand the Role of Cover Crops",
        subtitle: "Living Mulch for Soil Protection",
        description:
          "Cover crops are plants grown primarily to improve and protect the soil, not for harvest. They are often grown between main crop seasons or alongside crops as 'living mulch.'",
        benefits: [
          "Reduce soil erosion by covering bare ground",
          "Suppress weeds naturally",
          "Improve soil fertility by adding organic matter",
          "Break pest and disease cycles",
          "Improve water retention and infiltration",
          "Support beneficial soil microbes and earthworms",
        ],
        evidenceTitle: "Scientific Evidence",
        evidenceText:
          "Studies show cover crops can reduce soil erosion by up to 90% and increase soil organic matter by 10–20% over time.",
        sources: "Sources: sare.org | agronomy.org | frontiersin.org | fao.org",
        button: "Got It! Learn More",
      },
      types: {
        title: "Common Types and Functions of Cover Crops",
        subtitle: "Choose the Right Cover Crop",
        description: "Select cover crops based on your climate, soil type, and main crop for maximum benefits.",
        tipTitle: "Farmer Tip:",
        tipText: "Choose species suited to your local conditions for best results.",
        source: "Source: nrcs.usda.gov/resources/guides-and-instructions/cover-crop-chart",
        button: "Ready to Plant!",
      },
      planting: {
        title: "When and How to Plant Cover Crops",
        subtitle: "Timing and Sowing Tips",
        description: "Proper timing and planting methods ensure cover crops establish well and deliver benefits.",
        timing: [
          "Dry Season Prep: Sow before the rainy season to prevent erosion.",
          "Post-Harvest: Plant after main crop harvest to restore soil.",
          "Off-Season: Grow during fallow periods.",
        ],
        sowing: [
          "Use broadcast seeding or rows, depending on space",
          "Water lightly after sowing for better germination",
          "Mix with mulch or compost to improve results",
          "Allow to grow 30–60 days before turning under (green manure)",
        ],
        source: "Sources: agriculturalextension.ph | frontiersin.org/articles/10.3389/fsufs.2021.672750/full",
        button: "Explore Soil Health!",
      },
      soilHealth: {
        title: "How Cover Crops Improve Soil Health",
        subtitle: "Building Stronger Soil",
        description: "Cover crops enhance soil in multiple ways, supporting long-term productivity.",
        fertility: [
          "Legumes add nitrogen through root nodules",
          "Organic matter from decomposed biomass improves nutrient-holding capacity",
          "Prevents nutrient leaching from heavy rains",
        ],
        protection: [
          "Deep roots break up compacted soil and allow air/water movement",
          "Surface roots hold soil in place and prevent erosion",
          "Creates porous, well-aerated soil ideal for crops",
        ],
        soilLife: [
          "Provides a food source for beneficial microbes and fungi",
          "Boosts earthworm activity",
          "Encourages a healthy soil ecosystem that supports crop growth",
        ],
        source: "Source: mdpi.com/2071-1050/13/4/2056",
        button: "Learn Termination Methods!",
      },
      termination: {
        title: "Terminating Cover Crops the Right Way",
        subtitle: "Preparing for the Next Crop",
        description: "Proper termination ensures cover crops benefit the soil without interfering with main crops.",
        methods: [
          "Cut and leave: Use a sickle or mower and leave biomass as surface mulch",
          "Turn under: Incorporate into the topsoil with hoe or shallow tillage",
          "Mulch over: Add dry mulch over cut cover crop for extra weed protection",
        ],
        tipTitle: "Caution:",
        tipText: "Wait 2–3 weeks before planting crops after turning under dense cover crops to allow decomposition and avoid nitrogen tie-up.",
        source: "Source: extension.umn.edu/soil-management-and-health/cover-crops",
        button: "Ready for Action Steps!",
      },
      firstSteps: {
        title: "Beginner’s Action Steps",
        subtitle: "Start with Cover Crops Today",
        steps: [
          { title: "Choose 1–2 cover crop types", description: "Select types suited for your area (e.g., mungbean or mustard)" },
          { title: "Plant after harvest", description: "Sow after main crop or during off-season" },
          { title: "Water for establishment", description: "Water lightly if needed for early growth" },
          { title: "Let grow 4–8 weeks", description: "Allow growth until flowering" },
          { title: "Cut or till before planting", description: "Prepare soil for main crop" },
          { title: "Observe soil changes", description: "Monitor soil softness, moisture, and weed levels" },
        ],
        tipTitle: "Farmer Tip:",
        tipText: "Cover crops are like free insurance for your soil—protecting and feeding it even when you're not planting.",
        button: "I'm Ready to Start!",
      },
    },
    modal: {
      examples: "Examples:",
      benefits: "Benefits:",
      completionTitle: "Guide Complete!",
      completionText: "You've mastered the basics of cover crops. Your soil will thank you for this knowledge!",
      completionButton: "Great Job!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Cover Crops",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy",
    steps: [
      { title: "Unawain ang Papel ng Cover Crops", icon: "leaf" },
      { title: "Mga Karaniwang Uri at Tungkulin", icon: "sprout" },
      { title: "Kailan at Paano Magtanim", icon: "calendar" },
      { title: "Pagpapabuti ng Kalusugan ng Lupa", icon: "globe" },
      { title: "Pagtatapos sa Cover Crops", icon: "scythe" },
      { title: "Mga Hakbang para sa Nagsisimula", icon: "checkbox-marked-circle" },
    ],
    coverCropTypes: {
      legumes: {
        name: "Mga Legumes",
        role: "Nag-aayos ng nitrogen mula sa hangin",
        examples: ["Mungbean", "Cowpea", "Clover"],
        description: "Kinukuha ng mga legumes ang nitrogen mula sa hangin sa pamamagitan ng mga nodule sa ugat, natural na nagpapayaman sa lupa para sa susunod na pananim.",
        benefits: ["Nagdadagdag ng nitrogen sa lupa", "Nagpapahusay ng fertility ng lupa", "Sumusuporta sa aktibidad ng mikrobyo"],
      },
      grasses: {
        name: "Mga Damo",
        role: "Nagpapabuti ng istruktura ng lupa, binabawasan ang pagguho",
        examples: ["Rye", "Sorghum", "Napier"],
        description: "Ang mga damo ay may malawak na sistema ng ugat na nagpapatatag sa lupa at nagpapabawas ng pagguho, habang nagdadagdag ng organikong materyal.",
        benefits: ["Pinipigilan ang pagguho ng lupa", "Nagpapabuti ng istruktura ng lupa", "Nagdadagdag ng organikong materyal"],
      },
      brassicas: {
        name: "Mga Brassicas",
        role: "Bumubuwag sa siksik na lupa, binabawasan ang mga peste",
        examples: ["Mustard", "Radish"],
        description: "Ang mga brassicas ay may malalim na ugat na bumubuwag sa siksik na lupa at naglalabas ng mga compound na pumipigil sa mga peste sa lupa.",
        benefits: ["Binabawasan ang siksik na lupa", "Pumipigil sa mga peste", "Nagpapahusay ng aeration ng lupa"],
      },
      mixes: {
        name: "Mga Halo",
        role: "Pinagsasama ang maraming benepisyo",
        examples: ["Mga kombinasyon ng Legume + Damo"],
        description: "Pinagsasama ng mga halo ang mga benepisyo ng iba't ibang cover crops, na nagbibigay ng iba't ibang pagpapabuti ng lupa sa isang pagtatanim.",
        benefits: ["Multi-benefit na pagpapahusay ng lupa", "Balanseng pagdaragdag ng sustansya", "Pinahusay na katatagan ng lupa"],
      },
    },
    stepContent: {
      role: {
        title: "Unawain ang Papel ng Cover Crops",
        subtitle: "Buhay na Mulch para sa Proteksyon ng Lupa",
        description:
          "Ang mga cover crop ay mga halamang itinanim pangunahin upang mapabuti at maprotektahan ang lupa, hindi para sa ani. Kadalasang itinanim ang mga ito sa pagitan ng mga panahon ng pangunahing pananim o kasabay ng mga pananim bilang 'buhay na mulch.'",
        benefits: [
          "Binabawasan ang pagguho ng lupa sa pamamagitan ng pagtatakip sa walang laman na lupa",
          "Pumipigil sa mga damo nang natural",
          "Pinapabuti ang fertility ng lupa sa pamamagitan ng pagdaragdag ng organikong materyal",
          "Bumubuwag sa mga siklo ng peste at sakit",
          "Pinapabuti ang pagpapanatili ng tubig at pagpasok nito",
          "Sumusuporta sa mga kapaki-pakinabang na mikrobyo sa lupa at mga uod",
        ],
        evidenceTitle: "Siyentipikong Katunayan",
        evidenceText:
          "Ipinapakita ng mga pag-aaral na ang mga cover crop ay maaaring magpabawas ng pagguho ng lupa ng hanggang 90% at magpapataas ng organikong materyal ng lupa ng 10–20% sa paglipas ng panahon.",
        sources: "Pinagmulan: sare.org | agronomy.org | frontiersin.org | fao.org",
        button: "Nakuha Ko! Matuto Pa",
      },
      types: {
        title: "Mga Karaniwang Uri at Tungkulin ng Cover Crops",
        subtitle: "Piliin ang Tamang Cover Crop",
        description: "Pumili ng mga cover crop batay sa inyong klima, uri ng lupa, at pangunahing pananim para sa pinakamataas na benepisyo.",
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Pumili ng mga species na angkop sa inyong lokal na kondisyon para sa pinakamahusay na resulta.",
        source: "Pinagmulan: nrcs.usda.gov/resources/guides-and-instructions/cover-crop-chart",
        button: "Handa na Magtanim!",
      },
      planting: {
        title: "Kailan at Paano Magtanim ng Cover Crops",
        subtitle: "Mga Tip sa Pagpaplan ng Oras at Pagtatanim",
        description: "Ang tamang oras at pamamaraan ng pagtatanim ay nagsisiguro na ang mga cover crop ay maayos na naitatanim at nagbibigay ng benepisyo.",
        timing: [
          "Paghahanda sa Tagtuyot: Maghasik bago ang tag-ulan upang maiwasan ang pagguho.",
          "Pagkatapos ng Ani: Magtanim pagkatapos ng ani ng pangunahing pananim upang maibalik ang lupa.",
          "Off-Season: Magtanim sa mga panahon ng fallow.",
        ],
        sowing: [
          "Gumamit ng broadcast seeding o mga hilera, depende sa espasyo",
          "Magdilig ng bahagya pagkatapos maghasik para sa mas mahusay na pagtubo",
          "Haluan ng mulch o compost upang mapabuti ang mga resulta",
          "Hayaang tumubo ng 30–60 araw bago ibaliktad (green manure)",
        ],
        source: "Pinagmulan: agriculturalextension.ph | frontiersin.org/articles/10.3389/fsufs.2021.672750/full",
        button: "Galugarin ang Kalusugan ng Lupa!",
      },
      soilHealth: {
        title: "Paano Pinapabuti ng Cover Crops ang Kalusugan ng Lupa",
        subtitle: "Pagbuo ng Mas Malakas na Lupa",
        description: "Pinapahusay ng mga cover crop ang lupa sa maraming paraan, na sumusuporta sa pangmatagalang produktibidad.",
        fertility: [
          "Nagdadagdag ang mga legumes ng nitrogen sa pamamagitan ng mga nodule sa ugat",
          "Ang organikong materyal mula sa nabubulok na biomass ay nagpapabuti sa kapasidad ng pagpapanatili ng sustansya",
          "Pinipigilan ang pag-agos ng sustansya mula sa malakas na ulan",
        ],
        protection: [
          "Ang malalim na ugat ay bumubuwag sa siksik na lupa at nagpapahintulot sa paggalaw ng hangin/tubig",
          "Ang mga ugat sa ibabaw ay humahawak sa lupa at pinipigilan ang pagguho",
          "Lumilikha ng buhaghag, maayos na aerated na lupa na mainam para sa mga pananim",
        ],
        soilLife: [
          "Nagbibigay ng pinagkukunan ng pagkain para sa mga kapaki-pakinabang na mikrobyo at fungi",
          "Nadadagdagan ang aktibidad ng mga uod",
          "Hinihikayat ang isang malusog na ekosistema ng lupa na sumusuporta sa paglago ng pananim",
        ],
        source: "Pinagmulan: mdpi.com/2071-1050/13/4/2056",
        button: "Matuto ng Mga Paraan ng Pagtatapos!",
      },
      termination: {
        title: "Pagtatapos sa Cover Crops ng Tama",
        subtitle: "Paghahanda para sa Susunod na Pananim",
        description: "Ang tamang pagtatapos ay nagsisiguro na ang mga cover crop ay nakakabuti sa lupa nang hindi nakakaabala sa mga pangunahing pananim.",
        methods: [
          "Putulin at iwan: Gumamit ng karit o mower at iwan ang biomass bilang mulch sa ibabaw",
          "Ibaliktad: Isama sa topsoil gamit ang asada o mababaw na pag-aararo",
          "Magmulch sa ibabaw: Magdagdag ng tuyong mulch sa ibabaw ng putol na cover crop para sa karagdagang proteksyon sa damo",
        ],
        tipTitle: "Babala:",
        tipText: "Maghintay ng 2–3 linggo bago magtanim ng mga pananim pagkatapos ibaliktad ang makakapal na cover crops upang payagan ang pagkabulok at maiwasan ang nitrogen tie-up.",
        source: "Pinagmulan: extension.umn.edu/soil-management-and-health/cover-crops",
        button: "Handa para sa Mga Hakbang!",
      },
      firstSteps: {
        title: "Mga Hakbang para sa Nagsisimula",
        subtitle: "Simulan ang Cover Crops Ngayon",
        steps: [
          { title: "Pumili ng 1–2 uri ng cover crop", description: "Pumili ng mga uri na angkop sa inyong lugar (hal., mungbean o mustard)" },
          { title: "Magtanim pagkatapos ng ani", description: "Maghasik pagkatapos ng ani ng pangunahing pananim o sa off-season" },
          { title: "Magdilig para sa pagtatatag", description: "Magdilig ng bahagya kung kinakailangan para sa maagang paglago" },
          { title: "Hayaang tumubo ng 4–8 linggo", description: "Payagan ang paglago hanggang sa pamumulaklak" },
          { title: "Putulin o ibaliktad bago magtanim", description: "Ihanda ang lupa para sa pangunahing pananim" },
          { title: "Obserbahan ang mga pagbabago sa lupa", description: "Subaybayan ang lambot ng lupa, moisture, at antas ng damo" },
        ],
        tipTitle: "Tip ng Magsasaka:",
        tipText: "Ang mga cover crop ay parang libreng insurance para sa inyong lupa—pinoprotektahan at pinapakain ito kahit hindi kayo nagtatanim.",
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      examples: "Mga Halimbawa:",
      benefits: "Mga Benepisyo:",
      completionTitle: "Tapos na ang Gabay!",
      completionText: "Natutunan ninyo na ang mga pangunahing kaalaman sa cover crops. Magpapasalamat ang inyong lupa sa kaalamang ito!",
      completionButton: "Magaling!",
    },
  },
}

// Cover Crop Types for visual styling
const COVER_CROP_TYPES = {
  legumes: { color: "#2F855A", bgColor: "#E6FFFA", icon: "leaf" },
  grasses: { color: "#B45309", bgColor: "#FFF7ED", icon: "grass" },
  brassicas: { color: "#6B46C1", bgColor: "#F5F3FF", icon: "flower" },
  mixes: { color: "#2B6CB0", bgColor: "#EBF8FF", icon: "sprout" },
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
            <MaterialCommunityIcons name="check-circle" size={16} color="#2F855A" style={{ marginRight: 4 }} />
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

// Interactive Cover Crop Type Card
const CoverCropTypeCard = ({ typeKey, type, onPress, t, interactive = false }) => (
  <TouchableOpacity
    style={[styles.coverCropTypeCard, { backgroundColor: type.bgColor }]}
    onPress={interactive ? () => onPress(typeKey) : undefined}
    activeOpacity={interactive ? 0.7 : 1}
    disabled={!interactive}
  >
    <MaterialCommunityIcons name={type.icon} size={36} color="#1A3C34" style={{ marginRight: 16 }} />
    <View style={styles.coverCropTypeInfo}>
      <Text style={styles.coverCropTypeName}>{t.coverCropTypes[typeKey].name}</Text>
      <View style={[styles.coverCropTypeBadge, { backgroundColor: type.color }]}>
        <Text style={styles.coverCropTypeBadgeText}>{t.coverCropTypes[typeKey].role}</Text>
      </View>
      <Text style={styles.coverCropTypeExamples}>
        {t.modal.examples} {t.coverCropTypes[typeKey].examples.join(", ")}
      </Text>
    </View>
    {interactive && <MaterialCommunityIcons name="chevron-right" size={20} color={type.color} />}
  </TouchableOpacity>
)

const CompleteButton = ({ onPress, children, isLoading = false }) => (
  <TouchableOpacity style={styles.completeButton} onPress={onPress} disabled={isLoading} activeOpacity={0.8}>
    <Text style={styles.completeButtonText}>{children}</Text>
    <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function CoverCropsGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedCoverCropType, setSelectedCoverCropType] = useState(null)
  const [showCoverCropModal, setShowCoverCropModal] = useState(false)
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

  const handleCoverCropTypePress = (typeKey) => {
    setSelectedCoverCropType({
      ...COVER_CROP_TYPES[typeKey],
      ...t.coverCropTypes[typeKey],
      key: typeKey,
    })
    setShowCoverCropModal(true)
  }

  const renderRoleStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.role.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.role.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.role.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.role.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <View style={styles.evidenceCard}>
        <Text style={styles.evidenceTitle}>{t.stepContent.role.evidenceTitle}</Text>
        <Text style={styles.evidenceText}>{t.stepContent.role.evidenceText}</Text>
        <Text style={styles.sources}>{t.stepContent.role.sources}</Text>
      </View>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.role.button}
      </CompleteButton>
    </View>
  )

  const renderTypesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.types.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.types.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.types.description}</Text>

      <View style={styles.coverCropTypesContainer}>
        {Object.entries(COVER_CROP_TYPES).map(([key, type]) => (
          <CoverCropTypeCard
            key={key}
            typeKey={key}
            type={type}
            onPress={handleCoverCropTypePress}
            t={t}
            interactive={true}
          />
        ))}
      </View>

      <View style={styles.tipCard}>
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.types.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.types.tipText}</Text>
          <Text style={styles.tipSource}>{t.stepContent.types.source}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.types.button}
      </CompleteButton>
    </View>
  )

  const renderPlantingStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.planting.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.planting.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.planting.description}</Text>

      <Text style={styles.sectionTitle}>Timing Tips</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.planting.timing.map((tip, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{tip}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Sowing Tips</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.planting.sowing.map((tip, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{tip}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.planting.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.planting.button}
      </CompleteButton>
    </View>
  )

  const renderSoilHealthStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilHealth.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilHealth.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.soilHealth.description}</Text>

      <Text style={styles.sectionTitle}>Soil Fertility & Nutrients</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.soilHealth.fertility.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Soil Protection & Structure</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.soilHealth.protection.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Soil Life & Microbes</Text>
      <View style={styles.benefitsCard}>
        {t.stepContent.soilHealth.soilLife.map((item, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{item}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.soilHealth.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.soilHealth.button}
      </CompleteButton>
    </View>
  )

  const renderTerminationStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.termination.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.termination.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.termination.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.termination.methods.map((method, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#2F855A" />
            <Text style={styles.benefitText}>{method}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tipCard}>
        <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#B45309" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.termination.tipTitle}</Text>
          <Text style={styles.tipText}>{t.stepContent.termination.tipText}</Text>
          <Text style={styles.tipSource}>{t.stepContent.termination.source}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.termination.button}
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
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#B45309" />
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
      renderRoleStep,
      renderTypesStep,
      renderPlantingStep,
      renderSoilHealthStep,
      renderTerminationStep,
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
          <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
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

      {/* Cover Crop Type Modal */}
      <Modal
        visible={showCoverCropModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCoverCropModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCoverCropType && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalTitleContainer}>
                    <MaterialCommunityIcons name={selectedCoverCropType.icon} size={28} color="#2F855A" style={{ marginRight: 12 }} />
                    <Text style={styles.modalTitle}>{selectedCoverCropType.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowCoverCropModal(false)} style={styles.modalCloseButton}>
                    <MaterialCommunityIcons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <View style={[styles.modalBadge, { backgroundColor: selectedCoverCropType.color }]}>
                  <Text style={styles.modalBadgeText}>{selectedCoverCropType.role}</Text>
                </View>
                <Text style={styles.modalDescription}>{selectedCoverCropType.description}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.examples}</Text>
                <Text style={styles.modalExamples}>{selectedCoverCropType.examples.join(", ")}</Text>
                <Text style={styles.modalSectionTitle}>{t.modal.benefits}</Text>
                {selectedCoverCropType.benefits.map((benefit, index) => (
                  <View key={index} style={styles.modalBenefitItem}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#2F855A" />
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
              <MaterialCommunityIcons name="check" size={20} color="#fff" style={{ marginLeft: 8 }} />
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
  coverCropTypesContainer: {
    marginBottom: 24,
  },
  coverCropTypeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  coverCropTypeInfo: {
    flex: 1,
  },
  coverCropTypeName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
  },
  coverCropTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  coverCropTypeBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  coverCropTypeExamples: {
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
  tipSource: {
    fontSize: 13,
    color: "#92400E",
    fontStyle: "italic",
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