import { CategoryType } from '@/app/types'
import axios from 'axios'
import { Button, Pressable, StyleSheet } from 'react-native'

type AddBtnProps = {
	type: CategoryType,
}

export const AddBtn = ({type}: AddBtnProps) => {
	const createCategory = () => {
		
	}
	return (
		<Pressable style={styles.btn}>+</Pressable>
	)
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#73c1d7',
		color: '#f9f9f9',
    borderWidth: 2,
		fontSize: 20,
		fontWeight: 700,
	}})