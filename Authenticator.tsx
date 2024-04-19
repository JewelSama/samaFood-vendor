import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AppContext } from './Providers/AppProvider';
import AuthStack from './Navigators/AuthStack';
import StackNavigator from './Navigators/StackNavigator';


const Authenticator = () => {
	const { user, setUser } = useContext<any>(AppContext)
	const [ loading, setLoading ] = useState<boolean>(true);

	useEffect(() => {
		SecureStore.getItemAsync('vendor-user')
		.then(userString => {
			if (userString) {
				let userObject = JSON.parse(userString)
				setUser(userObject);
			}
			setLoading(false);
		})
		.catch(err => {
			setLoading(false);
		  	console.log(err);
		})
	}, []);
	console.log("userrbbbb: ", user.length)

	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<ActivityIndicator size="large" color={"#064929"} />
			</View>
		)
	} else if (!user || user.length == 0) {
		return <AuthStack />
	} else {
		return <StackNavigator />
	}

	// if(user !== null && user !== undefined) return <StackNavigator />;
	// else return <AuthStack />;
}

export default Authenticator