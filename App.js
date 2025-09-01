import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import BottomTabs from './src/navigation/BottomTabs'
import WelcomeScreen from './src/screens/onboard/WelcomeScreen';
import FeaturesScreen from './src/screens/onboard/FeaturesScreen';
import PrivacyTermsScreen from './src/screens/onboard/PrivacyTermsScreen';
import QuizStart from './src/screens/quiz/QuizStart';
import ResultScreen from './src/screens/quiz/ResultScreen';
import QuizHistory from './src/screens/quiz/QuizHistory';
import AddTaskScreen from './src/screens/task/AddTaskScreen'
import EditTaskScreen from './src/screens/task/EditTaskScreen'
import ChatDetailsScreen from './src/screens/chat/ChatDetailsScreen'


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='BottomTabs' component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Features' component={FeaturesScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Privacy & Terms' component={PrivacyTermsScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Quiz Start' component={QuizStart} options={{ headerShown: false }} />
        <Stack.Screen name='ResultScreen' component={ResultScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Quiz History' component={QuizHistory} options={{ headerShown: false }} />
        <Stack.Screen name='Add Task' component={AddTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Edit Task' component={EditTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Chat Details' component={ChatDetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator