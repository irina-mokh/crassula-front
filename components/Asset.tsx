import { ICategory } from '@/app/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated, Pressable, LayoutAnimation, LayoutChangeEvent, LayoutRectangle, PanResponderGestureState, } from 'react-native';
import { ThemedText } from './ThemedText';
import { AppThunkDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/app/store/category/action';
import { Link } from 'expo-router';

const SIZE = 80;
interface AssetProps extends ICategory {}
export const Asset = ({name, balance, id }: AssetProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // const borderColor = isHovered ? useThemeColor({}, 'accent') : 'red';
  const borderColor = useThemeColor({}, 'accent');

  const backgroundColor = useThemeColor({}, 'bgTint');

	const dispatch: AppThunkDispatch = useDispatch();
  const deleteAsset = () => {
    dispatch(deleteCategory(id));
  }

  const pan = new Animated.ValueXY();
  const panResponder = 
    PanResponder.create({ 
      onStartShouldSetPanResponder: () => true, 
      onMoveShouldSetPanResponder: () => true, 
      onPanResponderGrant: () => { 
        // When touch gesture starts,  
        //set dragging to true 
        // setDragging(true); 
      }, 
      onPanResponderMove: Animated.event( 
        [ null, { dx: pan.x, dy: pan.y, }], 
        { useNativeDriver: false } 
      ),
      onPanResponderRelease: (e, gesture) => {
        // console.log(e);
        // console.log(gesture);
        checkDropZone(gesture);
        if(isHovered){ 
          console.log('is drop zone');
        }else{
          Animated.spring(
            pan,
            {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false
            }
          ).start();
        }
      }
    }); 

  const [dz, setDropZone] = useState<LayoutRectangle>();
  const setDropZoneValues = (event: LayoutChangeEvent) => {
      setDropZone(event.nativeEvent.layout);
  }

  const checkDropZone = (gesture: PanResponderGestureState) => {
    if (dz) {
      // console.log(dz);
      const isOver = gesture.moveY > dz.y  && gesture.moveY < dz.y + dz.height
      setIsHovered(isOver);
    }
}
  return (
    <Link href={{
      pathname: `category/${id}`,
    }}>
      <Animated.View
        onLayout={setDropZoneValues}
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.container, 
          {borderColor, backgroundColor}]}
      >
        <ThemedText>{name}</ThemedText>
        <ThemedText>{balance}</ThemedText>
        <Pressable style={styles.delete} onPress={deleteAsset}>
          <ThemedText style={{fontSize: 10, lineHeight: 10, padding: 3}}>✖</ThemedText>
        </Pressable>

      </Animated.View>
    </Link>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: SIZE,
    height: SIZE,
    padding: 2,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});