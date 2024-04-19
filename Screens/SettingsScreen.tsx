import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import { AppContext } from '../Providers/AppProvider'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { baseURL } from '../endpoints'




type TListItem = {
	icon: any,
	title: string,
	subtext: string,
	screenName: string
};


const SettingsScreen = ({ navigation }: any) => {
  const { setUser, user } = useContext<any>(AppContext)
  // console.log(user)

  const ListItem = ({ icon, title, subtext, screenName }: TListItem) => <TouchableOpacity onPress={() => navigation.navigate(screenName)} className='flex flex-row space-x-4 items-center my-1' style={{width: 342, height: 54, paddingVertical: 8, paddingHorizontal: 10}}>
  <View className='flex flex-row space-x-4 items-center'>
    <View>
      {icon}
    </View>
    <View className='flex-1'>
      <Text className='text-sm' style={{fontFamily: 'SemiBold'}}>{title}</Text>
      <Text className='text-xs text-[#8A8A8A]' style={{fontFamily: 'Regular'}}>{subtext}</Text>
    </View>
  </View>
  <View>
    <AntDesign name="right" color={'#121212'} size={20} />
  </View>
</TouchableOpacity>;


  const Logout = async() => {
		Alert.alert('Logout', 'Are you sure you want to logout?', [
			{
			  text: 'Cancel',
			  onPress: () => console.log('Cancel Pressed'),
			  style: 'cancel',
			},
			{text: 'Yes', onPress: async() => {
				await SecureStore.deleteItemAsync('vendor-user'),
				// @ts-ignore
				setUser(null);
				alert('You have been logged out.')
			}
			
		},
		])
	}

  return (
    <SafeAreaView className='h-full bg-white'>
    <View className='px-5 h-full'>
      <View className='flex flex-row pb-2 justify-between items-center mt-1'>
                  <TouchableOpacity onPress={navigation.goBack} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#064929" size={20} />
                  </TouchableOpacity>
        <Text className="text-xl" style={{fontFamily: 'Bold'}}>My Profile</Text>

                  <TouchableOpacity disabled={true} className="p-2 bg-white rounded-full">
                      <AntDesign name='arrowleft' color="#fff" size={18} />
                  </TouchableOpacity>
      </View>

      <ScrollView className='h-full' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <>
          <View className='items-center justify-center relative mt-2'>
            <View style={{height: 117, width: 117}} className='bg-[#064929]  items-center justify-center rounded-full'>
              <View style={{height: 115, width: 115}} className='bg-white rounded-full items-center justify-center'>
                <Image 
                  source={{ uri: baseURL+'/'+user?.display_pic }}
                  className='rounded-full'
                  style={{height: 110, width: 110}}
                />
              </View>
              <TouchableOpacity className='h-6 w-6 items-center justify-center bg-white rounded-full absolute bottom-2 right-0'>
                <AntDesign name='camerao' size={15} color="#064929" />
              </TouchableOpacity>
            </View>

            <View className='mt-2'>
              <View className='bg-[#EDFFDC] flex flex-row items-center justify-center space-x-1' style={{width: 70, height: 20, borderRadius: 10, paddingVertical: 3, paddingHorizontal: 5}}>
                <View style={{height: 4, width: 4}} className='bg-[#75A843] rounded-full'></View>
                <Text className='text-[#497320] text-xs' style={{fontFamily: 'Regular'}}>Available</Text>
              </View>
            </View>

            <View className='items-center justify-center mt-1'>
              <Text className='text-base' style={{fontFamily: 'Bold'}}>{user?.name}</Text>
              <Text className='text-[#8A8A8A]' style={{fontFamily: 'Regular'}}>{user?.email}</Text>
            </View>
          </View>

          <View className='mt-4 space-y-4'>
            <ListItem icon={<MaterialIcons name="person-outline" color={'#121212'} size={22} />} title="Personal Information" subtext="Phone Number, Address, Email etc." screenName="" />
            <ListItem icon={<AntDesign name="setting" color={'#121212'} size={22} />} title="Settings" subtext="Notification, Security, Theme, Language" screenName="" />
            <ListItem icon={<AntDesign name="question" color={'#121212'} size={22} />} title="About Afriride" subtext="Terms and conditions, Privacy Policy" screenName="" />
            <ListItem icon={<Feather name="phone" color={'#121212'} size={22} />} title="Contact Support" subtext="Customer Service care support" screenName={''} />

            <TouchableOpacity onPress={Logout} className='flex flex-row space-x-4 items-center' style={{width: 342, height: 54, paddingVertical: 8, paddingHorizontal: 10}}>
              <View>
                <AntDesign name="logout" color="rgb(248, 113, 113)" size={22} />
              </View>
              <View className='flex-1'>
                <Text className='text-red-400 text-sm' style={{fontFamily: 'SemiBold'}}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
    </View>
  </SafeAreaView>
  )
}

export default SettingsScreen