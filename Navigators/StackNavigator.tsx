import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Restaurant" component={App} />
    </Stack.Navigator>
  )
}

export default StackNavigator