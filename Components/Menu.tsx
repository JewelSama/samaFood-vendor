import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { baseURL } from '../endpoints'
// import { Feather } from '@expo/vector-icons'

const Menu = ({ menu }: any) => {
  return (
    <View  className={`bg-white border px-4 pt-4 pb-2 border-gray-200`} style={{marginBottom: 2}}>
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className="text-lg mb-1" style={{fontFamily: 'SemiBold'}}>{menu?.name}</Text>
                <Text className="text-slate-700" style={{fontFamily: 'Regular'}}>{menu?.description}</Text>
                <Text className="text-slate-700 mt-2" style={{fontFamily: 'Regular'}}> ₦{menu?.price}</Text>
            </View>
            <View>
                <Image 
                    style={{borderWidth: 1, borderColor: "#f3f3f4"}}
                    source={{uri: baseURL+'/'+menu?.display_pic}}
                    className="h-20 w-20 bg-gray-300 p-4"
                />
            </View>
        </View>
        <View className='items-end mt-1 mr-1'>
            <TouchableOpacity className='px-1'>
                <Text className='text-red-600' style={{fontFamily: 'Bold'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Menu