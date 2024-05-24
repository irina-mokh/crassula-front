import { ICategory } from '@/app/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated, Pressable, } from 'react-native';
import { ThemedText } from './ThemedText';
import { AppThunkDispatch } from '@/app/store';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/app/store/category/action';

interface AssetProps extends ICategory {}
export const Asset = ({name, balance, id }: AssetProps) => {
  const borderColor = useThemeColor({}, 'accent');
	const dispatch: AppThunkDispatch = useDispatch();

  // Create a ref to store the position of the card 
  const position = 
  useRef(new Animated.ValueXY()).current; 

// State to track if the card is being dragged 
const [dragging, setDragging] = useState(false); 

// Create a pan responder to handle touch events 
const panResponder = useRef( 
  PanResponder.create({ 
      onStartShouldSetPanResponder: () => true, 
      onMoveShouldSetPanResponder: () => true, 
      onPanResponderGrant: () => { 
        // When touch gesture starts,  
        //set dragging to true 
        setDragging(true); 
      }, 
      onPanResponderMove: Animated.event( 
        [ null, { dx: position.x, dy: position.y, }], 
        { useNativeDriver: false } 
      ),
      onPanResponderRelease: () => {          
        // When touch gesture is released,  
        //set dragging to false 
        setDragging(false); 
      }, 
    }) 
  ).current; 

  const deleteAsset = () => {
    dispatch(deleteCategory(id));
  }
  return (
    <Animated.View style={[styles.container, {        borderColor,
      transform: position.getTranslateTransform(), 
      opacity: dragging ? 0.8 : 1, 
  },]} {...panResponder.panHandlers}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{balance}</ThemedText>
      <Pressable style={styles.delete} onPress={deleteAsset}>
        <ThemedText style={{fontSize: 10, lineHeight: 10, padding: 3}}>✖</ThemedText>
        </Pressable>

    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 80,
    height: 80,
    padding: 2,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    
    borderColor: '#73c1d7',
    borderWidth: 2,
  },
  delete: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
});