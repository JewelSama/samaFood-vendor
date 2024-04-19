import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';
import TabNavigator from './TabNavigator';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default StackNavigator