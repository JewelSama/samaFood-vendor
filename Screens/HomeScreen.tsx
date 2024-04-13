import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Menu from '../Components/Menu'

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView className='h-full' style={{paddingHorizontal: 6}}>
    <View className='h-full'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Chillout Restaurant Menu</Text>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <>
                <Menu />
                <Menu />
            </>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen