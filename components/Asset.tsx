import { CategoryType, ICategory } from '@/app/types';
import React, { useRef, useState } from 'react';
import {Text, View, StyleSheet, PanResponder, Animated, } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    padding: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#73c1d7',
    borderWidth: 2,
    overflow: 'hidden',
  },
  title: {
    color: '#61dafb',
    fontSize: 18,
    fontWeight: 600,
  },
  balance: {
    color: '#f0f0f0'
  }
});

interface AssetProps extends ICategory {}
export const Asset = ({name }: AssetProps) => {


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
    <Animated.View style={[styles.container, { 
      transform: position.getTranslateTransform(), 
      opacity: dragging ? 0.8 : 1, 
  },]} {...panResponder.panHandlers}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.balance}>{100}</Text>

    </Animated.View>
  );
};

