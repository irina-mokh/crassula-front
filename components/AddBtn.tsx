import { CategoryType } from '@/app/types'
import { Pressable, StyleSheet, Text, TextInput, useColorScheme } from 'react-native'
import { Popup } from './Popup'
import { useState } from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { axiosClient } from '@/utils/axios'


type AddBtnProps = {
	type: CategoryType,
}

export const AddBtn = ({type}: AddBtnProps) => {
	const borderColor = useThemeColor({}, 'accent');
	
	const [isAddModal, setIsAddModal] = useState(false);
	const toggleModal = () => {
		setIsAddModal(!isAddModal);
	}

	const user = JSON.parse(localStorage.getItem('user') || '');
	const [name, setName] = useState('');
	const [balance, setBalance] = useState('');
	const handleSubmit = () => {
		axiosClient.post('category',{
			name,
			start: Number(balance),
			userId: user.id,
			type,
		})
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
						<TextInput style={styles.input} placeholder="Start balance" onChangeText={setBalance} />
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
	},

	input: {
		color: '#fff',
		padding: 7,
		marginBottom: 10,
	}
})