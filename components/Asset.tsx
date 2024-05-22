import { ICategory } from '@/app/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useRef, useState } from 'react';
import { StyleSheet, PanResponder, Animated, } from 'react-native';
import { ThemedText } from './ThemedText';

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    padding: 2,
    marginHorizontal: 5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    
    borderColor: '#73c1d7',
    borderWidth: 2,
    overflow: 'hidden',
  },
});

interface AssetProps extends ICategory {}
export const Asset = ({name, balance }: AssetProps) => {
  const borderColor = useThemeColor({}, 'accent');
	

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

  return (
    <Animated.View style={[styles.container, {        borderColor,
      transform: position.getTranslateTransform(), 
      opacity: dragging ? 0.8 : 1, 
  },]} {...panResponder.panHandlers}>
      <ThemedText>{name}</ThemedText>
      <ThemedText>{balance}</ThemedText>

    </Animated.View>
  );
};

