import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { dateTimeFormatter } from '../utils'

const OrderDetailScreen = ({ navigation, route }: any) => {

    const { order } = route.params;
    // console.log(order)
  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='px-5 h-full'>
      <View className='flex flex-row pb-2 justify-between items-center mt-1'>
                  <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#064929" size={20} />
                  </TouchableOpacity>
        <Text className="text-xl" style={{fontFamily: 'Bold'}}>Order {order?.trx_ref}</Text>

                  <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#fff" size={18} />
                  </TouchableOpacity>
      </View>

        <ScrollView className='h-full' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <View className='mt-2'>

            <View>
                <View className='p-2 pb-3   mt-2 flex flex-row space-x-3 items-center'>
                  <Text className='text-base text-slate-600' style={{fontFamily: 'Bold'}}>Role Status</Text>
                    {/* <Switch style={{}}  value={isStatusSwitchOn} color='rgb(74, 222, 128)' onValueChange={onToggleStatusSwitch} /> */}
                </View>
            </View>

            <View className="mt-1 space-y-6">
                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg text-slate-600" style={{fontFamily: 'Bold'}}>Transaction Reference</Text>
                    <Text className="text-lg text-slate-700" style={{fontFamily: 'SemiBold'}}>{order?.trx_ref}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg text-slate-600" style={{fontFamily: 'Bold'}}>Delivery Address</Text>
                    <Text className="text-lg text-slate-700" style={{fontFamily: 'SemiBold'}}>{order?.delivery_address}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg text-slate-600" style={{fontFamily: 'Bold'}}>Total Price</Text>
                    <Text className="text-lg text-slate-700" style={{fontFamily: 'SemiBold'}}>{order?.total_price}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg text-slate-600" style={{fontFamily: 'Bold'}}>Created At</Text>
                    <Text className="text-lg text-slate-700" style={{fontFamily: 'SemiBold'}}>{dateTimeFormatter(order?.created_at)}</Text>
                </View>
                

            </View>


        </View>            
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderDetailScreen