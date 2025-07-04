// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import Welcome from './assets/pages/welcome/Welcome';
import Option from './assets/pages/option/Option';
import Login from './assets/pages/login/Login';
import Register from './assets/pages/register/Register';
import ForgotPassword from './assets/pages/forgotpassword/Forgotpassword';
import Home from './assets/pages/Homepage/Home';

import FAQScreen from './assets/pages/profile/faq';
import AboutScreen from './assets/pages/profile/about';
import SupportScreen from './assets/pages/profile/contactsupport';

import Map from './assets/pages/map/Map';
import Guide from './assets/pages/guide/Guide';
import Notifications from './assets/pages/notification/Notification';
import SoilLog from './assets/pages/soillog/SoilLog';
import Profile from './assets/pages/profile/Profile';
import CropGuide from './assets/pages/guide/CropGuides';
import SoilGuide from './assets/pages/guide/SoilGuides';

import CropGuideList from './assets/pages/guide/CropGuideList';
import SoilGuideList from './assets/pages/guide/SoilGuideList';

import SoilGuideApp from './assets/pages/guide/soilguides/soilguide1';
import SoilGuide2 from './assets/pages/guide/soilguides/soilguide2';
import SoilGuide3 from './assets/pages/guide/soilguides/soilguide3';
import SoilGuide4 from './assets/pages/guide/soilguides/soilguide4';
import SoilGuide5 from './assets/pages/guide/soilguides/soilguide5';
import SoilGuide6 from './assets/pages/guide/soilguides/soilguide6';
import SoilGuide7 from './assets/pages/guide/soilguides/soilguide7';
import SoilGuide8 from './assets/pages/guide/soilguides/soilguide8';
import SoilGuide9 from './assets/pages/guide/soilguides/soilguide9';
import SoilGuide10 from './assets/pages/guide/soilguides/soilguide10';

import CropGuide1 from './assets/pages/guide/cropguides/cropguide1';
import CropGuide2 from './assets/pages/guide/cropguides/cropguide2';
import CropGuide3 from './assets/pages/guide/cropguides/cropguide3';
import CropGuide4 from './assets/pages/guide/cropguides/cropguide4';
import CropGuide5 from './assets/pages/guide/cropguides/cropguide5';
import CropGuide6 from './assets/pages/guide/cropguides/cropguide6';
import CropGuide7 from './assets/pages/guide/cropguides/cropguide7';
import CropGuide8 from './assets/pages/guide/cropguides/cropguide8';
import CropGuide9 from './assets/pages/guide/cropguides/cropguide9';
import CropGuide10 from './assets/pages/guide/cropguides/cropguide10';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Option" component={Option} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide" component={CropGuide} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide" component={SoilGuide} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="SoilLog" component={SoilLog} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuideList" component={CropGuideList} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuideList" component={SoilGuideList} options={{ headerShown: false }} />

        {/* Profile Subpages */}
        <Stack.Screen name="FAQScreen" component={FAQScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} options={{ headerShown: false }} />

        <Stack.Screen name="SoilGuide1" component={SoilGuideApp} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide2" component={SoilGuide2} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide3" component={SoilGuide3} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide4" component={SoilGuide4} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide5" component={SoilGuide5} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide6" component={SoilGuide6} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide7" component={SoilGuide7} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide8" component={SoilGuide8} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide9" component={SoilGuide9} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide10" component={SoilGuide10} options={{ headerShown: false }} />

        <Stack.Screen name="CropGuide1" component={CropGuide1} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide2" component={CropGuide2} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide3" component={CropGuide3} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide4" component={CropGuide4} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide5" component={CropGuide5} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide6" component={CropGuide6} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide7" component={CropGuide7} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide8" component={CropGuide8} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide9" component={CropGuide9} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide10" component={CropGuide10} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
