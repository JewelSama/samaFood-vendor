import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from "expo-image-picker"
import { isEmpty } from '../utils'
import { Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { AppContext } from '../Providers/AppProvider'
import { CreateMenuAPI } from '../endpoints'


const CreateMenuScreen = ({ navigation }: any) => {
  const { user, setMenus } = useContext<any>(AppContext)
    const [ image, setImage ] = useState(null)
    const [res, setRes] = useState([])
    const [ loading, setLoading ] = useState(false)

    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState('')

    const PickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [1, 1],
          quality: 1,
          selectionLimit: 1
        }) 
        // console.log(result)
    
        if(!result.canceled){
          // @ts-ignore
          setImage(result.assets[0].uri)
          // @ts-ignore
    
          setRes(result.assets[0])
        }
        // console.log(result.assets[0])
    }

    const formData = new FormData();
    // @ts-ignore
    if(res.uri){
        // @ts-ignore
      formData.append('display_pic', {
        // @ts-ignore
        uri:  res?.uri, 
        name: "image.jpg",
        type: "image/jpeg" 
      })}

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    const validateForm = () => {
		if(
			isEmpty(name) || isEmpty(description) || isEmpty(price)
		){
			alert('All input fields are required.');
			return false;
		}
		
		return true;
	}

    const Create = () => {
    if(!validateForm()) return;
    if(image === null){
        return alert("Select an image for your menu")
      }
      setLoading(true)
      
      fetch(`${CreateMenuAPI}/${user?.id}`, {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }),
        body: formData
      })
      .then(res => res.json())
      .then(resp => {
        setLoading(false)
        if(resp?.errors){
          return alert(resp?.message)
        }
        console.log(resp)
  
        setMenus(resp?.data)
        alert('Menu created successfully')
        navigation.navigate('Home')
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })

    }



  return (
    <SafeAreaView className='h-full bg-white' style={{paddingHorizontal: 6}}>
    <View className='h-full px-4'>
        <View className='pb-2  items-center mt-1 border-gray-200' style={{borderBottomWidth: 1}}>
            <Text className="text-xl" style={{fontFamily: 'Bold'}}>Create Menu</Text>
        </View>

        <ScrollView className='h-full mt-7 space-y-3' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Name</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter name of menu'
              textAlignVertical='center'
              selectionColor='#064929'
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular'}}
              editable={!loading}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Description</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter description'
              textAlignVertical='center'
              selectionColor='#064929'
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular'}}
              editable={!loading}
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Price</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter price'
              textAlignVertical='center'
              selectionColor='#064929'
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular'}}
              editable={!loading}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <View className="space-y-1 pt-1 mb-10">
        <Text className="text-lg text-gray-600" style={{fontFamily: 'SemiBold'}}>Menu Photo</Text>
        {!image ? <TouchableOpacity className="flex flex-row justify-center h-48 space-x-2 mt-16 bg-gray-200  items-center rounded-md" onPress={PickImage}>
                <MaterialIcons name='photo-library' size={34} color="rgb(51, 65, 85)" />
                <Text className="text-lg text-slate-700" style={{fontFamily: 'Bold'}}>Select menu photo</Text>
              </TouchableOpacity>
                : (
                    <>
                      <View className="mt-5 rounded-sm">
                        <Image 
                          source={{ uri: image }}
                          className="h-96 rounded-sm"
                        />
                      </View>
                      <TouchableOpacity className="items-center mt-4 bg-gray-200 p-2 rounded-md" onPress={PickImage}><Text className="text-lg font-bold text-slate-700">Change Image</Text></TouchableOpacity>
                    </>
                )
              }
          </View>


          <TouchableOpacity
                className="h-14  w-full bg-[#064929] items-center justify-center rounded-md"
                disabled={loading} onPress={Create}
            >
          {
            !loading ? (
              <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Create Menu</Text>
            ) : (
              <ActivityIndicator size={'small'} color={"white"} />
            )
          }
      </TouchableOpacity>



        </>            
        </ScrollView>
    </View>
    </SafeAreaView>
        
  )
}

export default CreateMenuScreen