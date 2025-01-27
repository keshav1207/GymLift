import { View, Text , ScrollView, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView style={styles.container}>

      <Text   style={{ fontWeight: "bold", fontSize: 22 }}> Profile </Text>

      <Image  style={styles.image} source={require('@/assets/images/profilepic.jpg')}/>

   
      <ScrollView>

      <View style={styles.option}>
      <Text > Personal </Text>
      <Image  style={{ width: 40, height: 40 }} source={require('@/assets/icons/personal.png')}/>
    </View>
      
    <View style={styles.option}>
      <Text > Reminder </Text>
      <Image  style={{ width: 40, height: 40 }} source={require('@/assets/icons/reminder.png')}/>
    </View>

    <View style={styles.option}>
      <Text > Log Out </Text>
      <Image  style={{ width: 40, height: 40 }} source={require('@/assets/icons/logout.png')}/>
      </View>

      </ScrollView>

    </SafeAreaView>
  )
}


  const styles = StyleSheet.create({
        container: {
          backgroundColor: "white",
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
         
          
      },

      image: {
        width: 225,
        margin: 10,
        borderRadius: 50, 
      },

      option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
      }
  })
export default profile