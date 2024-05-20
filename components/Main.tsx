import { AppThunkDispatch } from '@/app/store';
import { login, loginData } from '@/app/store/auth/actions';
import { selectAuth } from '@/app/store/auth/selectors';
import { selectCategory } from '@/app/store/category/selectors';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AddBtn } from './AddBtn';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export const Main = () => {
	const dispatch: AppThunkDispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { data: categories } = useSelector(selectCategory);
  const userId = user ? user.id : 0;
  
	useEffect(() =>{
    // temp login
    dispatch(login(loginData));
  },[]);


return (
	<>
		<ThemedView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold">incomes:</ThemedText>
        {/* <Asset title="Food"></Asset> */}
        <AddBtn type="in"></AddBtn>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold">assets:</ThemedText>
        {/* <Asset title="Food"></Asset> */}
        <AddBtn type="asset"></AddBtn>
      </ThemedView>
      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold">expense:</ThemedText>
        {/* <Asset title="Food"></Asset> */}
        <AddBtn type="out"></AddBtn>
      </ThemedView>
    </ThemedView>
	</>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingVertical: 4,
  },

});