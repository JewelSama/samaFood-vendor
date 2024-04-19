import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Menu from '../Components/Menu'
import { AppContext } from '../Providers/AppProvider'
import { VendorMenusAPI } from '../endpoints'

const HomeScreen = ({ navigation }: any) => {
  const { user } = useContext<any>(AppContext)
  const [ loading, setLoading ] = useState(false)
  const [ menus, setMenus ] = useState([])
  // console.log("user ", user.id)

  const getMenu = async() => {
    setLoading(true)
    await fetch(`${VendorMenusAPI}/${user?.id}`, {
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
      // console.log(resp)
      setMenus(resp?.data.reverse()); 
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })
  }

  useEffect(() => {
    getMenu()
  }, [])


  return (
    <SafeAreaView className='h-full' style={{paddingHorizontal: 6}}>
    <View className='h-full'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>{user?.name} Menu</Text>
        </View>

        <ScrollView className='h-full mt-4' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        {
                !loading ? (
                    <View>
                        {
                            menus && menus.map((menu: any, index: any) => (
                                // @ts-ignore
                                <Menu menu={menu} key={index} />
                            ))

                        }{
                          menus.length < 1 && (
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

export default HomeScreen