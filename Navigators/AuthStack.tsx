import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack