// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; // Install if needed

import Welcome from './assets/pages/welcome/Welcome';
import Option from './assets/pages/option/Option';
import Login from './assets/pages/login/Login';
import Register from './assets/pages/register/Register';
import ForgotPassword from './assets/pages/forgotpassword/Forgotpassword';
import Home from './assets/pages/Homepage/Home';

// ✅ New Screens
import Map from './assets/pages/map/Map';
import Guide from './assets/pages/guide/Guide';
import Notifications from './assets/pages/notification/Notification';
import SoilLog from './assets/pages/soillog/SoilLog';
import Profile from './assets/pages/profile/Profile';
import CropGuide from './assets/pages/guide/CropGuides';
import SoilGuide from './assets/pages/guide/SoilGuides';

import CropGuideList from './assets/pages/guide/CropGuideList'; // 👈 import this
import SoilGuideList from './assets/pages/guide/SoilGuideList.js'; // ✅ add this



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

        {/* ✅ Additional Screens */}
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
        <Stack.Screen name="Guide" component={Guide} options={{ headerShown: false }} />
        <Stack.Screen name="CropGuide" component={CropGuide} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuide" component={SoilGuide} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
        <Stack.Screen name="SoilLog" component={SoilLog} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

        <Stack.Screen name="CropGuideList" component={CropGuideList} options={{ headerShown: false }} />
        <Stack.Screen name="SoilGuideList" component={SoilGuideList} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
