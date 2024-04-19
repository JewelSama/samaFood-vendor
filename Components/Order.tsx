import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { dateTimeFormatter } from '../utils'
import { useNavigation } from '@react-navigation/native'

const Order = ({ order }: any) => {
  const navigation: any = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', {order: order})} className='mb-1'>
    <View className='flex flex-row justify-between px-3 items-center h-24'>
      <View className='space-y-1'>
        <Text style={{fontFamily: 'SemiBold'}} className='text-base'>{order?.trx_ref}</Text>
        <Text style={{fontFamily: 'Regular'}} className='text-slate-700'>{dateTimeFormatter(order?.created_at)}</Text>
      </View>
      <View className='items-center space-y-1'>
        {
          order.status === "pending" && (
            <Text style={{fontFamily: 'Regular'}} className='text-yellow-600'>{order.status.toUpperCase()}</Text>
          )
        }
        {
          order.status === "declined" && (
            <Text style={{fontFamily: 'Regular'}} className='text-red-500'>{order.status.toUpperCase()}</Text>
          )
        }
        {
          order.status === "completed" && (
            <Text style={{fontFamily: 'Regular'}} className='text-green-500'>{order.status.toUpperCase()}</Text>
          )
        }
        <Text style={{fontFamily: 'Regular'}} className='text-green-900'>View timeline</Text>
      </View>
    </View>
      <View className='border-gray-100' style={{ borderBottomWidth: 1 }}></View>
    </TouchableOpacity>
  )
}

export default Order