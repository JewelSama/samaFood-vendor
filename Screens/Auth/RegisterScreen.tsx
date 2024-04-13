import { ScrollView, TouchableOpacity, Image, Text, View, TextInput, useColorScheme } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ( {navigation}: any ) => {

  return (
    <SafeAreaView className='h-full'>
    <View className="px-4 h-full">
      <TouchableOpacity className='mt-3' onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={'#000'} size={20} />
      </TouchableOpacity>
      <View className="mt-5 space-y-2">
        <Text className="text-3xl" style={{fontFamily: 'Bold'}}>Set up your account</Text>
        <Text className="text-slate-500 text-base" style={{fontFamily: 'SemiBold'}}>Set up your account to begin deliveries</Text>
      </View>
      <ScrollView className="mt-7 space-y-3 h-full bg-red-30" showsVerticalScrollIndicator={false} automaticallyAdjustKeyboardInsets  contentContainerStyle={{paddingBottom: 60}}>
        <>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Username</Text>
          <View className='border-zinc-300 border h-14 rounded-md flex flex-row items-center'>
            <TextInput
              className=" px-3 bg-gray-40 font-semibold w-full h-full"
              placeholder='Enter username'
              textAlignVertical='center'
              selectionColor='#FFAB48'
			        // textContentType='al'
			        keyboardType='numeric'
              // caretHidden={loading}
              placeholderTextColor="rgb(148, 163, 184)"
              style={{fontFamily: 'Regular'}}
              // editable={!loading}
              // value={username}
              // onChangeText={setUsername}
            />
          </View>
        </View>

      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Email Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter email address'
            textAlignVertical='center'
            selectionColor='#FFAB48'
            textContentType='emailAddress'
			      keyboardType='email-address'
            // caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            // editable={!loading}
            // value={username}
            // onChangeText={setUsername}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Phone Number</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter phone number'
            textAlignVertical='center'
            selectionColor='#FFAB48'
            // caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            // keyboardType='phon'
            // editable={!loading}
            // value={username}
            // onChangeText={setUsername}
            />
        </View>

      <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Address</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter address'
            textAlignVertical='center'
            selectionColor='#FFAB48'
            // caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            // editable={!loading}
            // value={username}
            // onChangeText={setUsername}
            />
        </View>

        <View className="space-y-1">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#FFAB48'
            // caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            // editable={!loading}
            // value={username}
            // onChangeText={setUsername}
			      secureTextEntry={true}
            />
        </View>
        <View className="space-y-1 mb-5">
          <Text className="text-lg text-gray-600" style={{fontFamily: 'Regular'}}>Confirm Password</Text>
          <TextInput
            className="border-zinc-300 px-3 bg-gray-40 font-semibold w-full h-14 border rounded-md"
            placeholder='Enter password'
            textAlignVertical='center'
            selectionColor='#FFAB48'
            // caretHidden={loading}
            placeholderTextColor="rgb(148, 163, 184)"
            style={{fontFamily: 'Regular'}}
            // editable={!loading}
            // value={username}
            // onChangeText={setUsername}
			secureTextEntry={true}
            />
        </View>
        <TouchableOpacity
        className="h-14  w-full bg-[#FFAB48] items-center justify-center rounded-md"
        // disabled={loading} onPress={Register}
        onPress={() => navigation.navigate("OTP")}
        >
          <Text className="text-white text-xl" style={{fontFamily: 'Bold', fontSize: 18}}>Continue</Text>
      </TouchableOpacity>
        </>
      </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default RegisterScreen