import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Switch } from 'react-native';
import Home from './components/Home'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
      alignItems: 'center',
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
      fontSize: 10,
    },
    modeContainer: {
      position: 'absolute',
      top: 0,
      left: 35
    },
  });
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.modeContainer}>
        <Switch value={isDarkMode} onValueChange={() => { setIsDarkMode(!isDarkMode) }}>
        </Switch>
        <Text style={styles.text}>{isDarkMode ? "Light mode" : "Dark mode"}</Text>
      </View>
      <Home isDarkMode={isDarkMode} />
    </View>
  );
}