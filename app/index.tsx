import { Provider } from 'react-redux';
import { Main } from '@/components/Main';
import { store } from './store';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';


export default function App() {
	const navigation = useNavigation();
	useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <Main />
  )
}