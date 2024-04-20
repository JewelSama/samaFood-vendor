import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { dateTimeFormatter } from '../utils'
import { AppContext } from '../Providers/AppProvider'
import { OrderStatusAPI } from '../endpoints'

const OrderDetailScreen = ({ navigation, route }: any) => {
    const [ loading, setLoading ] = useState(false)
    const [ redLoading, setredLoading ] = useState(false)
    const { order } = route.params;
    const { user } = useContext<any>(AppContext)


    // console.log(order)
    const givenDateString = order?.created_at;
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    // @ts-ignore
    const difference = currentDate - givenDate;

    // Convert milliseconds to hours
    const differenceInHours = difference / (1000 * 60 * 60);

    const DeclineFormData = {
        "status": "declined"
    }
    const AcceptFormData = {
        "status": "accepted"
    }

    const Accept = () => {
        setLoading(true)
    
        fetch(`${OrderStatusAPI}/${order?.id}`, {
          method: 'PUT',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          }),
          body: JSON.stringify(AcceptFormData)
        })
        .then(res => res.json())
        .then(resp => {
          setLoading(false)
          console.log(resp)
          if(resp?.errors){
            return alert(resp?.message)
          }
          console.log(resp?.data)
                
          navigation.goBack()
            alert("Order accepted.")
        })
        
        .catch(err => {
          setLoading(false)
          console.log(err)
          alert('Something went wrong')
        })
    }

    const Decline = () => {
        setredLoading(true)
    
        fetch(`${OrderStatusAPI}/${order?.id}`, {
          method: 'PUT',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          }),
          body: JSON.stringify(DeclineFormData)
        })
        .then(res => res.json())
        .then(resp => {
          setredLoading(false)
          console.log(resp)
          if(resp?.errors){
            return alert(resp?.message)
          }
            navigation.goBack()
            alert("Order declined.")
        })
        
        .catch(err => {
          setredLoading(false)
          console.log(err)
          alert('Something went wrong')
        })

    }


  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='h-full'>
      <View className='flex flex-row pb-2 justify-between items-center mt-1'>
                  <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#064929" size={20} />
                  </TouchableOpacity>
        <Text className="text-xl" style={{fontFamily: 'Bold'}}>Order {order?.trx_ref}</Text>

                  <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#fff" size={18} />
                  </TouchableOpacity>
      </View>

        <ScrollView className='h-full px-5' showsVerticalScrollIndicator={true} contentContainerStyle={{paddingBottom: 100}}>
        <View className='mt-2'>
            
            <View className="mt-1 space-y-6">
                <Text className='text-2xl text-center' style={{fontFamily: 'Bold'}}>Items Ordered</Text>
                {
                    order?.items.map((item: any, index: any) => (
                        <View key={index} className="items-start border-b border-gray-200 pb-1 pt-1">
                            <Text className="text-lg" style={{fontFamily: 'Bold'}}>{item?.menu?.name}</Text>
                            <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>Quantity: {item?.quantity}</Text>
                        </View>
                    ))
                }
            </View>


            <View className="mt-10">
            <Text className='text-2xl mt-2 text-center' style={{fontFamily: 'Bold'}}>Delivery</Text>

            <View className="mt-1 space-y-6">
               
                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Transaction Reference</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{order?.trx_ref}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Phone Number</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{order?.user?.phone_number}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Delivery Address</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{order?.delivery_address}</Text>
                </View>


                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Total Price</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{order?.total_price}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Created At</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{dateTimeFormatter(order?.created_at)}</Text>
                </View>

                <View className="items-start border-b border-gray-200 pb-1 pt-1">
                    <Text className="text-lg" style={{fontFamily: 'Bold'}}>Order Status</Text>
                    <Text className="text-lg" style={{fontFamily: 'SemiBold'}}>{order?.status}</Text>
                </View>
                
            </View>
            </View>

            <View className='mt-8'>
            <TouchableOpacity
                className={`h-14 mb-2 w-full ${differenceInHours > 5 ? 'bg-gray-300' : 'bg-green-500'} items-center justify-center rounded-md`}
                disabled={loading || differenceInHours > 5 || redLoading} onPress={Accept}
            >
            {
              !loading ? (
                <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Accept Order</Text>
              ) : (
                <ActivityIndicator size={'small'} color={'white'} />
              )
            }
          </TouchableOpacity>

            <TouchableOpacity
                className="h-14 mb-2 w-full bg-red-400 items-center justify-center rounded-md"
                disabled={redLoading || loading} onPress={Decline} 
            >
            {
              !redLoading ? (
                <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Decline Order</Text>
              ) : (
                <ActivityIndicator size={'small'} color={'white'} />
              )
            }
          </TouchableOpacity>
            </View>


        </View>            
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderDetailScreen