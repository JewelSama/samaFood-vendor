import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import { Feather } from '@expo/vector-icons'
import OrderScreen from '../Screens/OrderScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import CreateMenuScreen from '../Screens/CreateMenuScreen';

const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#064929',
            tabBarStyle: {
                height: 75,
                backgroundColor: 'white',
                paddingTop: 10,
                paddingBottom: 15
            }
        }}
    >

        <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home", headerShown: false,
		    tabBarIcon: ({ color }) => <Feather name="home" size={30} color={color} /> }} 
        />

        <Tab.Screen name="AddMenu" component={CreateMenuScreen} options={{ title: "Add Menu", headerShown: false,
		    tabBarIcon: ({ color }) => <Feather name="plus-square" size={30} color={color} /> }} 
        />

        <Tab.Screen name="Orders" component={OrderScreen} options={{ title: "Orders", headerShown: false,
		    tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={30} color={color} /> }} 
        />

        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: "Settings", headerShown: false,
		    tabBarIcon: ({ color }) => <Feather name="settings" size={30} color={color} /> }} 
        />

  </Tab.Navigator>
  )
}

export default TabNavigator