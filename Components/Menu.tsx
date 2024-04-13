import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
// import { Feather } from '@expo/vector-icons'

const Menu = () => {
  return (
    <View  className={`bg-white border px-4 pt-4 pb-2 border-gray-200`} style={{marginBottom: 2}}>
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className="text-lg mb-1" style={{fontFamily: 'SemiBold'}}>{"Jollof Rice"}</Text>
                <Text className="text-slate-700" style={{fontFamily: 'Regular'}}>{"Sweet and tasty Jollof"}</Text>
                <Text className="text-slate-700 mt-2" style={{fontFamily: 'Regular'}}> ₦{"1500"}</Text>
            </View>
            <View>
                <Image 
                    style={{borderWidth: 1, borderColor: "#f3f3f4"}}
                    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEAtfryy3h79PfpxPs7zB6hNVslMDtTu5S2AdP8wqjQ&s'}}
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