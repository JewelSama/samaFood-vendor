import { TouchableOpacity, TextInput, ScrollView, Text, View, ActivityIndicator } from 'react-native'
import { DeviceHeight } from '../../utils/Dimension';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import { isEmpty } from '../../utils';
import { LoginAPI } from '../../endpoints';
import { AppContext } from '../../Providers/AppProvider';
import * as SecureStore from 'expo-secure-store';


const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext<any>(AppContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  
  const validateForm = () => {
		if(
			isEmpty(email) || isEmpty(password)
		){
			alert('All input fields are required.');
			return false;
		}
		
		return true;
	}

  const formData = {
    'email': email.toLowerCase().trim(),
    'password': password,
  }

  const Login = () => {
    if(!validateForm()) return;

    
    setLoading(true)
    // console.log(JSON.stringify(formData))

    fetch(`${LoginAPI}`, {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(resp => {
      setLoading(false)
      if(resp?.errors){
        return alert(resp?.message)
      }

      console.log(resp)
      setUser(resp)

      			
			const userResponse = {
        id: resp.user.id,
        username: resp.user.username,
        phone_number: resp.user.phone_number,
				email: resp.user.email,
				token: resp.token,
				address: resp.user.address,

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
      <ScrollView className='h-full' showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets>
        <>
        <View className="px-4 bg-red-30" style={{height: DeviceHeight * 0.7}}>
          <View className="mt-5 space-y-2">
            <Text className="text-3xl" style={{fontFamily: 'SemiBold'}}>Sign In to your account</Text>
            <Text className="text-slate-500 text-base" style={{fontFamily: 'SemiBold'}}>Let's sign you in. You have been missed.</Text>
          </View>
          <View className='mt-5 space-y-5'>

            <View className="space-y-1">
            <Text className="text-base text-gray-600" style={{fontFamily: 'Regular'}}>Email Address</Text>
            <TextInput
              className="border-zinc-300 px-3 h-14 bg-gray-40 font-semibold w-full border"
              placeholder='Enter email'
              textAlignVertical='center'
              selectionColor='#064929'
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular', borderRadius: 7}}
              editable={!loading}
              value={email}
              onChangeText={setEmail}
              />
          </View>

            <View className="space-y-1">
            <Text className="text-base text-gray-600" style={{fontFamily: 'Regular'}}>Password</Text>
            <TextInput
              className="border-zinc-300 px-3 h-14 bg-gray-40 font-semibold w-full border"
              placeholder='Enter pasword'
              textAlignVertical='center'
              selectionColor='#064929'
              secureTextEntry
              caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular', borderRadius: 7}}
              editable={!loading}
              value={password}
              onChangeText={setPassword}
              />
          </View>

        </View>
        <View className='mt-4'>
          <TouchableOpacity className='items-end'>
            <Text className="text-[#064929]" style={{fontFamily: 'SemiBold'}}>Forgot your Password?</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View className='px-4 bg-blue-20' style={{height: DeviceHeight * 0.3}}>
          <TouchableOpacity
          className="h-14 mb-2 w-full bg-[#064929] items-center justify-center rounded-md"
          disabled={loading} onPress={Login}
          >
            {
              !loading ? (
                <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Sign In</Text>
              ) : (
                <ActivityIndicator size={'small'} color={'white'} />
              )
            }
          </TouchableOpacity>
          <TouchableOpacity disabled={loading} onPress={()=> navigation.navigate('SignUp')} className='justify-center'>
            <Text className='text-center text-sm' style={{fontFamily: 'Regular'}}>Don't have an account? <Text className='text-[#064929]' style={{fontFamily: 'Bold'}}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
        </>
        </ScrollView>
      </SafeAreaView>
  )
}

export default LoginScreen