import { useThemeColor } from '@/hooks/useThemeColor';
import { Pressable, StyleSheet, Text } from 'react-native';

interface TextBtnProps {
	handler: () => void;
	text: string
}
export const TextBtn = ({handler, text}: TextBtnProps) => {
	const accent = useThemeColor({}, 'accent');
	return (
		<Pressable
			style={[styles.button, {borderColor: accent}]}
			onPress={handler}>
				<Text style={styles.text}>{text}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
		borderWidth: 2,
		minWidth: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});