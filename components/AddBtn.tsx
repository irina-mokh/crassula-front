import { CategoryType } from '@/app/types'
import { Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { Popup } from './Popup'
import { useState } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { axiosClient } from '@/utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '@/app/store/auth/selectors'
import { AppThunkDispatch } from '@/app/store'
import { createCategory } from '@/app/store/category/action'

type AddBtnProps = {
	type: CategoryType,
}

export const AddBtn = ({type}: AddBtnProps) => {
	const borderColor = useThemeColor({}, 'gray');
	
	const dispatch: AppThunkDispatch = useDispatch();

	const [isAddModal, setIsAddModal] = useState(false);
	const toggleModal = () => {
		setIsAddModal(!isAddModal);
	}

	const {user} = useSelector(selectAuth);

	const [name, setName] = useState('');
	const [balance, setBalance] = useState('');
	const handleSubmit = () => {
		const category = {
			name,
			balance: Number(balance) || 0,
			userId: user?.id || '',
			type,
		}
		dispatch(createCategory(category))
		toggleModal();
	}
	return (
		<>
			<Pressable style={[styles.btn, {borderColor}]} onPress={toggleModal}>
				<ThemedText type='subtitle'>+</ThemedText>
				</Pressable>
			{isAddModal && 
				<Popup close={() => setIsAddModal(false)} handler={handleSubmit}
					title={`Create new ${type.toUpperCase()} category:`}>
					<ThemedView>
						<TextInput style={styles.input} placeholder="Asset name" onChangeText={setName}/>
						{type === 'asset' && <TextInput style={styles.input} placeholder="Start balance" onChangeText={setBalance} />}
					</ThemedView>
				</Popup>}
		</>
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
    borderWidth: 2,
		borderStyle: 'dotted',
	},

	input: {
		color: '#fff',
		padding: 7,
		marginBottom: 10,
	}
})