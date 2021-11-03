import React from 'react';
import { View, StyleSheet } from 'react-native';

type props = { children: any, isDarkMode: boolean }

const Card = ({ children, isDarkMode }: props) => {
  const styles = StyleSheet.create({
    card: {
      width: 240,
      marginTop: 15,
      marginBottom: 10,
      height: 240,
      shadowColor: isDarkMode ? 'white' : 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: isDarkMode ? 'black' : 'white',
      padding: 10,
      borderRadius: 10,
      alignItems: 'flex-end'
    }
  });
  return (
    <View style={{ ...styles.card }}>{children}</View>
  );
};



export default Card;
