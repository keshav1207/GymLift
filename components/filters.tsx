import React, {useState} from 'react'
import {View,Text,ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import {useLocalSearchParams} from "expo-router"


function filters() {

const params = useLocalSearchParams<{filter?: string}>();
const [selectedCategory, setSelectedCategory] =
useState(params.filter || 'All');

const handleCategory = (category: string) => {}



  return (
    
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >

        <View style={styles.filterContainer}>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Arms</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Back</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Chest</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Legs</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Shoulder</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Other</Text> </TouchableOpacity>

        </View>
      </ScrollView>



  )
}



const styles =  StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10,
        gap: 3,
        margin: 5,
      },
  
      filterBtn: {
        
        width: 80,  
        height: 30,  
        backgroundColor: "black",
        color: "white",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
  

    
 });

export default filters