import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Order from '../Components/Order'
import { AppContext } from '../Providers/AppProvider'
import { VendorOrdersAPI } from '../endpoints'

const OrderScreen = ({ navigation }: any) => {
  const { user, orders, setOrders } = useContext<any>(AppContext)
  const [ loading, setLoading ] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false);


  const getMenu = async() => {
    setLoading(true)
    await fetch(`${VendorOrdersAPI}`, {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${user?.token}`
      })
    })
    .then(res => res.json())
    .then(resp => {
      setLoading(false)
      if(resp?.errors){
        return alert(resp?.message)
      }
      console.log(resp)
      setOrders(resp?.data.reverse()); 
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getMenu()
    }, 2000);
  }, []);

  useEffect(() => {
    getMenu()
  }, [])

  return (
    <SafeAreaView className='h-full bg-white' style={{paddingHorizontal: 6}}>
    <View className='h-full'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Your Orders</Text>
        </View>


        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
                !loading ? (
                    <View>
                        {
                            orders && orders.map((order: any, index: any) => (
                                // @ts-ignore
                                <Order order={order} key={index} />
                            ))

                        }{
                          orders?.length < 1 && (
                            <View className='h-20 justify-center items-center'>
                              <Text className='text-lg' style={{fontFamily: 'Regular'}}>You have no menu</Text>
                            </View>
                          )
                        }
                    </View>
                ) : (
                    <View className='w-full'>
                      <ActivityIndicator color="#064929" size={'small'} />
                    </View>
                )
            }
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default OrderScreen