import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigators/StackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback, useEffect } from 'react';
import AuthStack from './Navigators/AuthStack';
import TabNavigator from './Navigators/TabNavigator';
import { Text } from 'react-native';
import { AppProvider } from './Providers/AppProvider';
import Authenticator from './Authenticator';




SplashScreen.preventAutoHideAsync();


export default function App() {

  
	const [fontsLoaded] = useFonts({
		'Regular': require('./assets/fonts/Nunito-Regular.ttf'),
		'Medium': require('./assets/fonts/Nunito-Medium.ttf'),
		'SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
		'Bold': require('./assets/fonts/Nunito-Bold.ttf'),
		'ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
	});

  	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) await SplashScreen.hideAsync();
  	}, [fontsLoaded]);

	useEffect(() => {
		onLayoutRootView();
	});

	if (!fontsLoaded) return null;

  return (
			<AppProvider>
		<NavigationContainer>
				<StatusBar style='dark' />
			<Authenticator />
    	</NavigationContainer>
		  	</AppProvider>
  );
}

