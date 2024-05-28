import { StyleSheet} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../store/category/selectors';
import { FlatList } from 'react-native-gesture-handler';
import { getCategory } from '../store/category/action';
import { getActions } from '../store/action/actions';
import { selectAction } from '../store/action/selectors';
import { useEffect } from 'react';
import { AppThunkDispatch } from '../store';
import { actionSlice } from '../store/action/reducer';

export default function Category() {
  const { id } = useLocalSearchParams();
  const dispatch: AppThunkDispatch = useDispatch();

  useEffect( ()=> {
    if (id && !Array.isArray(id)) dispatch(getActions(id));
  }, [id]);

  const actSlice = useSelector(selectAction);
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
