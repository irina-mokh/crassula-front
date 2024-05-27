import { StyleSheet} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../store/category/selectors';
import { FlatList } from 'react-native-gesture-handler';

export default function Category() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const catSlice = useSelector(selectCategory)
  const item = catSlice.data.filter((item) => item.id == id)[0];
  const { name, balance } = item;
  return (
    <ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText type="title">{name}</ThemedText>
        <ThemedText type="subtitle">{balance}</ThemedText>
      </ThemedView>
      <ThemedView>
        {/* <FlatList>

        </FlatList> */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
