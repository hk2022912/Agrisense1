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

// Translation data
const TRANSLATIONS = {
  en: {
    headerTitle: "Soil Moisture Management Guide",
    progressTitle: "Your Progress",
    complete: "Complete",
    nextUp: "Next Up:",
    tapToContinue: "Tap to continue →",
    steps: [
      { title: "Why Soil Moisture Matters", icon: "water" },
      { title: "Understanding Soil Water Types", icon: "water-opacity" },
      { title: "Techniques to Maintain Ideal Soil Moisture", icon: "sprout" },
      { title: "Monitor & Adjust Soil Moisture", icon: "magnify" },
      { title: "Match Irrigation to Soil Type", icon: "terrain" },
      { title: "Beginner’s Action Steps", icon: "checkbox-marked-circle-outline" },
    ],
    stepContent: {
      whyImportant: {
        title: "Why Soil Moisture Matters",
        subtitle: "Not Too Wet. Not Too Dry. Just Right.",
        description:
          "Soil moisture is the amount of water held between soil particles. It directly affects seed germination, root development, nutrient absorption, and overall crop health.",
        benefits: [
          "Supports healthy microbial life",
          "Reduces crop stress and drought risk",
          "Maximizes fertilizer effectiveness",
          "Improves yield and crop consistency",
          "Prevents root rot and waterlogging",
        ],
        sources: "Sources: fao.org | agritech.tnau.ac.in | frontiersin.org/articles/10.3389/fsufs.2021.657682/full",
        button: "Got It! Let's Learn More",
      },
      soilWaterTypes: {
        title: "Understanding Soil Water Types",
        subtitle: "Different Types of Water in Soil",
        types: [
          {
            name: "Gravitational Water",
            description: ["Drains quickly after rain or irrigation", "Not available to plants", "Common in sandy soils"],
          },
          {
            name: "Capillary Water",
            description: ["Held between soil particles", "Easily available for plant uptake", "Ideal moisture range"],
          },
          {
            name: "Hygroscopic Water",
            description: ["Tightly bound to soil particles", "Unavailable to plants", "Dominant in clay-heavy, dry soils"],
          },
        ],
        tip: "Plants thrive best when soil holds capillary water, just before the “wilting point.”",
        button: "Ready to Learn Techniques!",
      },
      techniques: {
        title: "Techniques to Maintain Ideal Soil Moisture",
        subtitle: "Practical Methods for Water Management",
        techniques: [
          {
            name: "Mulching",
            description: ["Use dried leaves, straw, or rice hulls to prevent surface evaporation", "Keeps soil cool and conserves water"],
          },
          {
            name: "Drip Irrigation or Soaker Hoses",
            description: ["Delivers water directly to roots with minimal waste", "Prevents overwatering and leaf diseases"],
          },
          {
            name: "Organic Matter Boost",
            description: [
              "Compost and vermicompost improve soil’s sponge-like quality",
              "Helps sandy soils hold more water",
              "Improves drainage in compacted soils",
            ],
          },
          {
            name: "Cover Crops",
            description: ["Reduce evaporation and shade the soil", "Prevent soil cracking during dry spells"],
          },
        ],
        source: "Source: mdpi.com/2073-4395/11/6/1145",
        button: "Let’s Monitor Soil Moisture!",
      },
      monitorAdjust: {
        title: "Monitor & Adjust Soil Moisture",
        subtitle: "Stay on Top of Your Soil’s Needs",
        tools: [
          {
            title: "Hand Test",
            description: "Squeeze a ball of soil—should hold together but not drip",
          },
          {
            title: "Soil Moisture Meter",
            description: "Affordable probes for real-time readings",
          },
          {
            title: "Tensiometers",
            description: "Measure how hard plants must work to extract water",
          },
          {
            title: "Mobile Apps",
            description: "Some track rainfall and moisture levels using local data",
          },
        ],
        signs: {
          title: "Signs of Moisture Problems",
          problems: ["Too dry? Wilting, curling leaves, cracked soil", "Too wet? Yellowing leaves, root rot, fungal growth"],
        },
        evidence: "Studies show that regular monitoring can increase water use efficiency by 30–50%.",
        button: "Let’s Match Irrigation to Soil!",
      },
      irrigationSoilType: {
        title: "Match Irrigation to Soil Type",
        subtitle: "Tailor Watering to Your Soil",
        tableTitle: "Irrigation by Soil Type",
        headers: ["Soil Type", "Moisture Behavior", "Irrigation Tip"],
        rows: [
          ["Sandy soil", "Drains quickly", "Water more often, less volume"],
          ["Loamy soil", "Balanced moisture", "Ideal for most crops"],
          ["Clay soil", "Holds water longer", "Water deeply but less often"],
        ],
        source: "Source: agriculture.gov.au",
        button: "Show Me Action Steps!",
      },
      actionSteps: {
        title: "Beginner’s Action Steps",
        subtitle: "Simple Steps to Start Managing Soil Moisture",
        steps: [
          {
            title: "Check your soil type and water-holding capacity",
            description: "Understand your soil to plan effective watering",
          },
          {
            title: "Mulch your plots to reduce evaporation",
            description: "Use organic materials to conserve water",
          },
          {
            title: "Install a basic drip or bucket irrigation system",
            description: "Ensure efficient water delivery to roots",
          },
          {
            title: "Add compost to improve soil water retention",
            description: "Boost soil’s ability to hold moisture",
          },
          {
            title: "Water early in the morning or late afternoon to reduce loss",
            description: "Minimize evaporation during cooler parts of the day",
          },
          {
            title: "Track rainfall and adjust watering based on soil feel",
            description: "Monitor conditions to avoid over- or under-watering",
          },
        ],
        tip: {
          title: "Farmer Tip",
          text: '"Don’t wait for crops to droop. Healthy soil should feel like a wrung-out sponge—moist, not muddy."',
        },
        button: "I’m Ready to Start!",
      },
    },
    modal: {
      completionTitle: "Guide Complete!",
      completionText:
        "You’ve mastered the fundamentals of soil moisture management. Your crops and soil will thrive with this knowledge!",
      completionButton: "Amazing!",
    },
  },
  tl: {
    headerTitle: "Gabay sa Pamamahala ng Kahalumigmigan ng Lupa",
    progressTitle: "Inyong Progreso",
    complete: "Tapos na",
    nextUp: "Susunod:",
    tapToContinue: "Pindutin para magpatuloy →",
    steps: [
      { title: "Bakit Mahalaga ang Kahalumigmigan ng Lupa", icon: "water" },
      { title: "Pag-unawa sa mga Uri ng Tubig sa Lupa", icon: "water-opacity" },
      { title: "Mga Teknik para Panatilihin ang Tamang Kahalumigmigan", icon: "sprout" },
      { title: "Subaybayan at Ayusin ang Kahalumigmigan ng Lupa", icon: "magnify" },
      { title: "Itugma ang Patubig sa Uri ng Lupa", icon: "terrain" },
      { title: "Mga Hakbang para sa mga Nagsisimula", icon: "checkbox-marked-circle-outline" },
    ],
    stepContent: {
      whyImportant: {
        title: "Bakit Mahalaga ang Kahalumigmigan ng Lupa",
        subtitle: "Hindi Masyadong Basa. Hindi Masyadong Tuyo. Tama Lang.",
        description:
          "Ang kahalumigmigan ng lupa ay ang dami ng tubig na hawak sa pagitan ng mga particle ng lupa. Direktang nakakaapekto ito sa pagtubo ng binhi, pag-unlad ng ugat, pagsipsip ng sustansya, at pangkalahatang kalusugan ng pananim.",
        benefits: [
          "Sumusuporta sa malusog na microbial life",
          "Binabawasan ang stress ng pananim at panganib ng tagtuyot",
          "Pinapataas ang bisa ng pataba",
          "Pinapabuti ang ani at pagkakapare-pareho ng pananim",
          "Pinipigilan ang pagkabulok ng ugat at waterlogging",
        ],
        sources: "Sources: fao.org | agritech.tnau.ac.in | frontiersin.org/articles/10.3389/fsufs.2021.657682/full",
        button: "Nakuha Ko! Matuto Pa Tayo",
      },
      soilWaterTypes: {
        title: "Pag-unawa sa mga Uri ng Tubig sa Lupa",
        subtitle: "Iba't Ibang Uri ng Tubig sa Lupa",
        types: [
          {
            name: "Gravitational Water",
            description: [
              "Mabilis na umaagos pagkatapos ng ulan o patubig",
              "Hindi magagamit ng mga halaman",
              "Karaniwan sa mabuhanging lupa",
            ],
          },
          {
            name: "Capillary Water",
            description: [
              "Hinawakan sa pagitan ng mga particle ng lupa",
              "Madaling magagamit para sa pagsipsip ng halaman",
              "Tamang hanay ng kahalumigmigan",
            ],
          },
          {
            name: "Hygroscopic Water",
            description: [
              "Mahigpit na nakakabit sa mga particle ng lupa",
              "Hindi magagamit ng mga halaman",
              "Nangingibabaw sa lupaing mataas sa clay at tuyo",
            ],
          },
        ],
        tip: "Pinakamahusay na umuunlad ang mga halaman kapag ang lupa ay may hawak na capillary water, bago ang “wilting point.”",
        button: "Handa na Matuto ng mga Teknik!",
      },
      techniques: {
        title: "Mga Teknik para Panatilihin ang Tamang Kahalumigmigan",
        subtitle: "Mga Praktikal na Paraan para sa Pamamahala ng Tubig",
        techniques: [
          {
            name: "Mulching",
            description: ["Gumamit ng tuyong dahon, dayami, o balat ng palay para maiwasan ang pagsingaw sa ibabaw", "Pinapanatili ang lamig ng lupa at nagtitipid ng tubig"],
          },
          {
            name: "Drip Irrigation o Soaker Hoses",
            description: ["Nagdadala ng tubig diretso sa mga ugat na may kaunting basura", "Pinipigilan ang sobrang pagdidilig at sakit sa dahon"],
          },
          {
            name: "Organic Matter Boost",
            description: [
              "Ang compost at vermicompost ay nagpapabuti sa kalidad ng lupa na parang espongha",
              "Tumutulong sa mabuhanging lupa na hawakan ang mas maraming tubig",
              "Pinapabuti ang drainage sa mga siksik na lupa",
            ],
          },
          {
            name: "Cover Crops",
            description: ["Binabawasan ang pagsingaw at nagtatabing sa lupa", "Pinipigilan ang pagkakahati ng lupa sa mga tuyong panahon"],
          },
        ],
        source: "Source: mdpi.com/2073-4395/11/6/1145",
        button: "Subaybayan Natin ang Kahalumigmigan ng Lupa!",
      },
      monitorAdjust: {
        title: "Subaybayan at Ayusin ang Kahalumigmigan ng Lupa",
        subtitle: "Manatiling Alerto sa mga Pangangailangan ng Inyong Lupa",
        tools: [
          {
            title: "Hand Test",
            description: "Pisilin ang isang bola ng lupa—dapat magkadikit ngunit hindi tumulo",
          },
          {
            title: "Soil Moisture Meter",
            description: "Abot-kayang mga probe para sa real-time na pagbabasa",
          },
          {
            title: "Tensiometers",
            description: "Sinusukat kung gaano kahirap kailangang magtrabaho ang mga halaman para kumuha ng tubig",
          },
          {
            title: "Mobile Apps",
            description: "Ang ilan ay sumusubaybay sa ulan at antas ng kahalumigmigan gamit ang lokal na datos",
          },
        ],
        signs: {
          title: "Mga Palatandaan ng Problema sa Kahalumigmigan",
          problems: [
            "Masyadong tuyo? Nalalanta, nagkukulot na dahon, basag na lupa",
            "Masyadong basa? Naninilaw na dahon, nabubulok na ugat, pagtubo ng fungi",
          ],
        },
        evidence: "Ipinapakita ng mga pag-aaral na ang regular na pagsubaybay ay maaaring magpataas ng kahusayan sa paggamit ng tubig ng 30–50%.",
        button: "Itugma Natin ang Patubig sa Lupa!",
      },
      irrigationSoilType: {
        title: "Itugma ang Patubig sa Uri ng Lupa",
        subtitle: "Iayon ang Pagdidilig sa Inyong Lupa",
        tableTitle: "Patubig ayon sa Uri ng Lupa",
        headers: ["Uri ng Lupa", "Pag-uugali ng Kahalumigmigan", "Tip sa Patubig"],
        rows: [
          ["Mabuhanging lupa", "Mabilis na umaagos", "Magdilig nang madalas, mas kaunting dami"],
          ["Loamy na lupa", "Balanseng kahalumigmigan", "Mainam para sa karamihan ng pananim"],
          ["Lupang clay", "Mas matagal humawak ng tubig", "Magdilig nang malalim ngunit hindi madalas"],
        ],
        source: "Source: agriculture.gov.au",
        button: "Ipakita ang mga Hakbang!",
      },
      actionSteps: {
        title: "Mga Hakbang para sa mga Nagsisimula",
        subtitle: "Mga Simpleng Hakbang para Simulan ang Pamamahala ng Kahalumigmigan ng Lupa",
        steps: [
          {
            title: "Suriin ang uri ng lupa at kapasidad na humawak ng tubig",
            description: "Unawain ang inyong lupa para magplano ng epektibong pagdidilig",
          },
          {
            title: "Mag-mulch sa mga plot para mabawasan ang pagsingaw",
            description: "Gumamit ng organikong materyales para makatipid ng tubig",
          },
          {
            title: "Mag-install ng pangunahing drip o bucket irrigation system",
            description: "Tiyakin ang mahusay na pagdadala ng tubig sa mga ugat",
          },
          {
            title: "Magdagdag ng compost para mapabuti ang paghawak ng tubig sa lupa",
            description: "Palakasin ang kakayahan ng lupa na humawak ng kahalumigmigan",
          },
          {
            title: "Magdilig ng maaga sa umaga o hapon para mabawasan ang pagkawala",
            description: "Iwasan ang pagsingaw sa mas malamig na bahagi ng araw",
          },
          {
            title: "Subaybayan ang ulan at ayusin ang pagdidilig batay sa pakiramdam ng lupa",
            description: "Subaybayan ang mga kondisyon para maiwasan ang sobra o kulang na pagdidilig",
          },
        ],
        tip: {
          title: "Tip mula sa Magsasaka",
          text: '"Huwag hintayin na malanta ang mga pananim. Ang malusog na lupa ay dapat pakiramdam ay parang esponghang piniga—basa, hindi maputik."',
        },
        button: "Handa na Akong Magsimula!",
      },
    },
    modal: {
      completionTitle: "Tapos na ang Gabay!",
      completionText:
        "Natutunan ninyo na ang mga pangunahing kaalaman sa pamamahala ng kahalumigmigan ng lupa. Uunlad ang inyong mga pananim at lupa dahil sa kaalamang ito!",
      completionButton: "Kahanga-hanga!",
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
            <MaterialCommunityIcons name="check-circle" size={16} color="#16A34A" style={{ marginRight: 4 }} />
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
    <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
  </TouchableOpacity>
)

// Main Component
export default function SoilMoistureGuide() {
  const navigation = useNavigation()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [progressAnim] = useState(new Animated.Value(0))
  const [isNavigating, setIsNavigating] = useState(false)
  const [language, setLanguage] = useState("en")
  const [showCompletionModal, setShowCompletionModal] = useState(false)
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

  const renderWhyImportantStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.whyImportant.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.whyImportant.subtitle}</Text>
      <Text style={styles.description}>{t.stepContent.whyImportant.description}</Text>

      <View style={styles.benefitsCard}>
        {t.stepContent.whyImportant.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <MaterialCommunityIcons name="check-circle" size={18} color="#16A34A" />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.whyImportant.sources}</Text>

      <CompleteButton onPress={() => handleStepComplete(0)} isLoading={isNavigating}>
        {t.stepContent.whyImportant.button}
      </CompleteButton>
    </View>
  )

  const renderSoilWaterTypesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.soilWaterTypes.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.soilWaterTypes.subtitle}</Text>

      {t.stepContent.soilWaterTypes.types.map((type, index) => (
        <View key={index} style={styles.benefitsCard}>
          <Text style={styles.sectionTitle}>{type.name}</Text>
          {type.description.map((desc, idx) => (
            <View key={idx} style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#16A34A" />
              <Text style={styles.benefitText}>{desc}</Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.tipCard}>
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#D97706" />
        <View style={styles.tipContent}>
          <Text style={styles.tipText}>{t.stepContent.soilWaterTypes.tip}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(1)} isLoading={isNavigating}>
        {t.stepContent.soilWaterTypes.button}
      </CompleteButton>
    </View>
  )

  const renderTechniquesStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.techniques.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.techniques.subtitle}</Text>

      {t.stepContent.techniques.techniques.map((technique, index) => (
        <View key={index} style={styles.benefitsCard}>
          <Text style={styles.sectionTitle}>{technique.name}</Text>
          {technique.description.map((desc, idx) => (
            <View key={idx} style={styles.benefitItem}>
              <MaterialCommunityIcons name="check-circle" size={18} color="#16A34A" />
              <Text style={styles.benefitText}>{desc}</Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.sources}>{t.stepContent.techniques.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(2)} isLoading={isNavigating}>
        {t.stepContent.techniques.button}
      </CompleteButton>
    </View>
  )

  const renderMonitorAdjustStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.monitorAdjust.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.monitorAdjust.subtitle}</Text>

      <View style={styles.monitoringGrid}>
        {t.stepContent.monitorAdjust.tools.map((tool, index) => (
          <View key={index} style={styles.monitoringItem}>
            <View style={styles.monitoringIconContainer}>
              <MaterialCommunityIcons
                name={["hand-back-right-outline", "gauge", "tune", "cellphone-information"][index]}
                size={20}
                color="#16A34A"
              />
            </View>
            <View style={styles.monitoringItemContent}>
              <Text style={styles.monitoringItemTitle}>{tool.title}</Text>
              <Text style={styles.monitoringItemDescription}>{tool.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>{t.stepContent.monitorAdjust.signs.title}</Text>
      {t.stepContent.monitorAdjust.signs.problems.map((problem, index) => (
        <View key={index} style={styles.benefitItem}>
          <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#D97706" />
          <Text style={styles.benefitText}>{problem}</Text>
        </View>
      ))}

      <Text style={styles.description}>{t.stepContent.monitorAdjust.evidence}</Text>

      <CompleteButton onPress={() => handleStepComplete(3)} isLoading={isNavigating}>
        {t.stepContent.monitorAdjust.button}
      </CompleteButton>
    </View>
  )

  const renderIrrigationSoilTypeStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.irrigationSoilType.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.irrigationSoilType.subtitle}</Text>

      <Text style={styles.tableTitle}>{t.stepContent.irrigationSoilType.tableTitle}</Text>

      <View style={styles.rotationTable}>
        <View style={styles.rotationHeader}>
          {t.stepContent.irrigationSoilType.headers.map((header, index) => (
            <Text key={index} style={styles.rotationHeaderText}>
              {header}
            </Text>
          ))}
        </View>
        {t.stepContent.irrigationSoilType.rows.map((row, index) => (
          <View key={index} style={styles.rotationRow}>
            {row.map((cell, idx) => (
              <View key={idx} style={styles.plotCell}>
                <Text style={styles.plotName}>{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.sources}>{t.stepContent.irrigationSoilType.source}</Text>

      <CompleteButton onPress={() => handleStepComplete(4)} isLoading={isNavigating}>
        {t.stepContent.irrigationSoilType.button}
      </CompleteButton>
    </View>
  )

  const renderActionStepsStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t.stepContent.actionSteps.title}</Text>
      <Text style={styles.stepSubtitle}>{t.stepContent.actionSteps.subtitle}</Text>

      <View style={styles.actionStepsContainer}>
        {t.stepContent.actionSteps.steps.map((step, index) => (
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
        <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#D97706" />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>{t.stepContent.actionSteps.tip.title}</Text>
          <Text style={styles.tipText}>{t.stepContent.actionSteps.tip.text}</Text>
        </View>
      </View>

      <CompleteButton onPress={() => handleStepComplete(5)} isLoading={isNavigating}>
        {t.stepContent.actionSteps.button}
      </CompleteButton>
    </View>
  )

  const renderStepContent = () => {
    const steps = [
      renderWhyImportantStep,
      renderSoilWaterTypesStep,
      renderTechniquesStep,
      renderMonitorAdjustStep,
      renderIrrigationSoilTypeStep,
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
              <Ionicons name="trophy-outline" size={48} color="#16A34A" />
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
    minWidth: 140,
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
  tableTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
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
  sources: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginBottom: 12,
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
    fontStyle: "italic",
    marginBottom: 8,
  },
  rotationTable: {
    marginBottom: 24,
  },
  rotationHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  rotationHeaderText: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  rotationRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  plotCell: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  plotName: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
  },
  monitoringGrid: {
    marginBottom: 24,
  },
  monitoringItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  monitoringIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  monitoringItemContent: {
    flex: 1,
  },
  monitoringItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  monitoringItemDescription: {
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