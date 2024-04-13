import { View, Text } from 'react-native'
import React from 'react'

const Order = () => {
  return (
    <View className='mb-1'>
    <View className='flex flex-row justify-between px-3 items-center h-24'>
      <View className='space-y-1'>
        <Text style={{fontFamily: 'SemiBold'}} className='text-base'>Chillout Restaurant</Text>
        <Text style={{fontFamily: 'Regular'}} className='text-slate-700'>23rdFeb, 2024.1:30</Text>
      </View>
      <View className='items-center space-y-1'>
        <Text style={{fontFamily: 'Regular'}} className='text-green-500'>Completed</Text>
        <Text style={{fontFamily: 'Regular'}} className='text-green-900'>View timeline</Text>
      </View>
    </View>
      <View className='border-gray-100' style={{ borderBottomWidth: 1 }}></View>
    </View>
  )
}

export default Order