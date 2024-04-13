import { TouchableOpacity, TextInput, ScrollView, useColorScheme, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { DeviceHeight } from '../../utils/Dimension';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }: any) => {

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
              selectionColor='#FFAB48'
              // caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular', borderRadius: 7}}
              // editable={!loading}
              // value={username}
              // onChangeText={setUsername}
              />
          </View>
            <View className="space-y-1">
            <Text className="text-base text-gray-600" style={{fontFamily: 'Regular'}}>Password</Text>
            <TextInput
              className="border-zinc-300 px-3 h-14 bg-gray-40 font-semibold w-full border"
              placeholder='Enter pasword'
              textAlignVertical='center'
              selectionColor='#FFAB48'
              secureTextEntry
              // caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular', borderRadius: 7}}
              // editable={!loading}
              // value={password}
              // onChangeText={setPassword}
              />
          </View>
        </View>
        <View className='mt-4'>
          <TouchableOpacity className='items-end'>
            <Text className="text-[#FFAB48]" style={{fontFamily: 'SemiBold'}}>Forgot your Password?</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View className='px-4 bg-blue-20' style={{height: DeviceHeight * 0.3}}>
          <TouchableOpacity
          className="h-14 mb-2 w-full bg-[#FFAB48] items-center justify-center rounded-md"
          // disabled={loading} onPress={Register}
          >
            <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} className='justify-center'>
            <Text className='text-center text-sm' style={{fontFamily: 'Regular'}}>Don't have an account? <Text className='text-[#FFAB48]'>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
        </>
        </ScrollView>
      </SafeAreaView>
  )
}

export default LoginScreen