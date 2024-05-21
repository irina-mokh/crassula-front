import { FlatList, StyleSheet } from 'react-native'
import { AddBtn } from './AddBtn'
import { Asset } from './Asset'
import { selectCategory } from '@/app/store/category/selectors';
import { useSelector } from 'react-redux';
import { CategoryType } from '@/app/types';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

type AssetSectionProps = {
	type: CategoryType,
}

const SECTIONS = {
	in: 'incomes',
	asset: 'assets',
	out: 'expense'
}
export const AssetSection = ({type}: AssetSectionProps) => {
	const { data: categories } = useSelector(selectCategory);
	console.log(categories);
	return (
		<ThemedView style={styles.section}>
			<ThemedText type="defaultSemiBold">{SECTIONS[type]}:</ThemedText>
				<FlatList horizontal data={categories.filter(cat => cat.type === type)}  renderItem={({item, index, separators}) => (
					<Asset key={item.id} {...item}/>
					)} ListFooterComponent={<AddBtn type={type}></AddBtn>}/>
				
		</ThemedView>
	)
}


const styles = StyleSheet.create({
  section: {
    paddingVertical: 4,
  },

});