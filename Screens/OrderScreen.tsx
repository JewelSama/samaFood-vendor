import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Order from '../Components/Order'

const OrderScreen = () => {
  return (
    <SafeAreaView className='h-full bg-white' style={{paddingHorizontal: 6}}>
    <View className='h-full'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Your Orders</Text>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
            <>
                <Order />
            </>
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderScreen