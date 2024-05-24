import { AppThunkDispatch } from '@/app/store';
import { login, loginData, signup } from '@/app/store/auth/actions';
import { selectAuth } from '@/app/store/auth/selectors';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ThemedView } from './ThemedView';
import { getAllCategories } from '@/app/store/category/action';
import { AssetSection } from './AssetSection';

export const Main = () => {
	const dispatch: AppThunkDispatch = useDispatch();
  const { user } = useSelector(selectAuth);
	useEffect(() =>{
    // dispatch(signup(loginData));
    // temp login
    dispatch(login(loginData));
  },[]);

  useEffect( ()=> {
    if (user) dispatch(getAllCategories(user.id));
  }, [user])

return (
		<ThemedView style={styles.container}>
      <AssetSection type="in"/>
      <AssetSection type="asset"/>
      <AssetSection type="out"/>
    </ThemedView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});