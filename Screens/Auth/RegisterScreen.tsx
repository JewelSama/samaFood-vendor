import { ScrollView, TouchableOpacity, Image, Text, View, TextInput, useColorScheme, ActivityIndicator } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import { isEmpty } from '../../utils';
import { RegisterAPI } from '../../endpoints';
import { AppContext } from '../../Providers/AppProvider';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from "expo-image-picker"



const RegisterScreen = ( {navigation}: any ) => {
  const [ image, setImage ] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext<any>(AppContext)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [opening_time, setOpening_time] = useState('')
  const [closing_time, setClosing_time] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [password, setPassword] = useState('')
  const [confirPassword, setConfirPassword] = useState('')
  const [res, setRes] = useState([])



  const validateForm = () => {
		if(
			isEmpty(name) || isEmpty(email) || isEmpty(phone) || isEmpty(address) || isEmpty(password) || isEmpty(confirPassword)
		){
			alert('All input fields are required.');
			return false;
		}
		
		return true;
	}

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
  formData.append("email", email.trim().toLowerCase());
  formData.append("password", password.trim().toLowerCase());
  formData.append("password_confirmation", confirPassword.trim().toLowerCase());
  formData.append("opening_time", opening_time);
  formData.append("closing_time", closing_time);
  formData.append("address", address);
  formData.append("description", description);
  formData.append("phone_number", phone.trim().toLowerCase());


  const Register = () => {
    if(!validateForm()) return;

    if(!isEmpty(password) && !isEmpty(confirPassword) && password !== confirPassword){
      return alert("Passwords do not match.")
    }
    if(image === null){
      return alert("Select an image for your restaurant")
    }

    setLoading(true)

    fetch(`${RegisterAPI}`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: formData
    })
    .then(res => res.json())
    .then(resp => {
      setLoading(false)
      if(resp?.errors){
        return alert(resp?.message)
      }

      setUser(resp)

      			
			const userResponse = {
        id: resp.user.id,
        name: resp.user.name,
				email: resp.user.email,
				address: resp.user.address,
				opening_time: resp.user.opening_time,
				closing_time: resp.user.closing_time,
				description: resp.user.description,
        phone_number: resp.user.phone_number,
        display_pic: resp.user.display_pic,
				token: resp.token,

			}
			
			setUser(userResponse);
			SecureStore.setItemAsync('vendor-user', JSON.stringify(userResponse));
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
      alert('Something went wrong')
    })

    
  }

  return (
    <SafeAreaView className='h-full'>
    <View className="px-4 h-full">
      <TouchableOpacity disabled={loading} className='mt-3' onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={'#000'} size={20} />
      </TouchableOpacity>
      <View className="mt-5 space-y-2">
        <Text className="text-3xl" style={{fontFamily: 'Bold'}}>Set up your account</Text>
        <Text className="text-slate-500 text-base" style={{fontFamily: 'SemiBold'}}>Set up your account to begin deliveries</Text>
      </View>
      <ScrollView className="mt-7 space-y-3 h-full bg-red-30" showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets  contentContainerStyle={{paddingBottom: 60}}>
        <>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Name</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter name of restaurant'
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
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Email Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter email address'
            textAlignVertical='center'
            selectionColor='#064929'
            textContentType='emailAddress'
			      keyboardType='email-address'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={email}
            onChangeText={setEmail}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Phone Number</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter phone number'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            keyboardType='phone-pad'
            editable={!loading}
            value={phone}
            onChangeText={setPhone}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Description</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter restaurant description'
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

        <View className="space-y-1 pt-1">
        <Text className="text-lg text-gray-600" style={{fontFamily: 'SemiBold'}}>Restaurant Photo</Text>
        {!image ? <TouchableOpacity className="flex flex-row justify-center h-48 space-x-2 mt-16 bg-gray-200  items-center rounded-md" onPress={PickImage}>
                <MaterialIcons name='photo-library' size={34} color="rgb(51, 65, 85)" />
                <Text className="text-lg text-slate-700" style={{fontFamily: 'Bold'}}>Select restaurant photo</Text>
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


      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Opening Time</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter opening time (e.g 9am)'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={opening_time}
            onChangeText={setOpening_time}
            />
        </View>

      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Closing Time</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter closing time (e.g 9pm)'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={closing_time}
            onChangeText={setClosing_time}
            />
        </View>

      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter address'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={address}
            onChangeText={setAddress}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={password}
            onChangeText={setPassword}
			      secureTextEntry={true}
            />
        </View>
        <View className="space-y-1 mb-5">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Confirm Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#064929'
            caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            editable={!loading}
            value={confirPassword}
            onChangeText={setConfirPassword}
			      secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
        className="h-14  w-full bg-[#064929] items-center justify-center rounded-md"
        disabled={loading} onPress={Register}
        >
          {
            !loading ? (
              <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Continue</Text>
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

export default RegisterScreen