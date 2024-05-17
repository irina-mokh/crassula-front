import React from 'react';
import { Modal, StyleSheet, View} from 'react-native';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TextBtn } from './TextBtn';
import { ThemedText } from './ThemedText';

interface PopupProps {
	title: string;
	close: () => void;
	handler: () => void;
	children: React.ReactNode;
}
export const Popup = ({close, children, title, handler}: PopupProps) => {
	const bgTint = useThemeColor({}, 'bgTint');
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
      >
        <ThemedView style={styles.centeredView}>
          <ThemedView style={styles.modalView}>
						{/* HEADER */}
						<ThemedView style={[styles.header, {backgroundColor: bgTint}] }>
							<ThemedText>{title}</ThemedText>
						</ThemedView>
						<View style={styles.container}>
							{children}
							<View style={styles.row}>
								<TextBtn text="OK" handler={handler}></TextBtn>
								<TextBtn text="Cancel" handler={close}></TextBtn>
							</View>
						</View>
          </ThemedView>
        </ThemedView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor: '#5857579e',

  },
  modalView: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
		overflow: 'hidden'
  },
	header: {
		width: '100%',
		padding: 10,
	},
	container: {
		padding: 10,
	},

	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
	},
});
