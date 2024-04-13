import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'

const SettingsScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white' style={{paddingHorizontal: 6}}>
    <View className='h-full'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Settings</Text>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <>
                <TouchableOpacity  className='flex flex-row space-x-4 items-center' style={{width: 342, height: 54, paddingVertical: 8, paddingHorizontal: 10}}>
				    <View>
				    	<AntDesign name="logout" color="#FFAB48" size={22} />
				    </View>
				    <View className='flex-1'>
				    	<Text className='text-[#FFAB48] text-sm' style={{fontFamily: 'SemiBold'}}>Logout</Text>
				    </View>
			    </TouchableOpacity>
            </>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default SettingsScreen