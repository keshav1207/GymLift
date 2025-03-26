import { View, Text, StyleSheet } from 'react-native'
import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from 'react'

const workout = () => {
  return (
    <View style={styles.header}>

          <Text style={styles.headerText}>Workout</Text>
    </View>
  )
}

export default workout

const styles =  StyleSheet.create({
    header: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },

    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      
    }
  })