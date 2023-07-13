import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Home from './Src/Screen/Home.jsx';
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(()=>{
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
  },[])
  return (
    <View style={styles.container}>
      
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App