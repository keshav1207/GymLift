import { View, Text,  StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/.expo/components/searchBar'

const exercises = [
  { id: '1', name: 'Chest Press (Machine)', category: 'Chest', image: require('@/assets/images/profilepic.jpg') },
  { id: '2', name: 'Shoulder Press (Machine)', category: 'Shoulder', image: require('@/assets/images/profilepic.jpg') },
  { id: '3', name: 'Leg Press (Machine)', category: 'Legs', image: require('@/assets/images/profilepic.jpg') },
  { id: '4', name: 'Back Extension (Machine)', category: 'Back', image: require('@/assets/images/profilepic.jpg') },
  { id: '5', name: 'Bicep Curl (Machine)', category: 'Arms', image: require('@/assets/images/profilepic.jpg') },
  { id: '6', name: 'Tricep Pushdown (Cable)', category: 'Arms', image: require('@/assets/images/profilepic.jpg') },
  { id: '7', name: 'Lat Pulldown (Machine)', category: 'Back', image: require('@/assets/images/profilepic.jpg') },
  { id: '8', name: 'Leg Curl (Machine)', category: 'Legs', image: require('@/assets/images/profilepic.jpg') },
  { id: '9', name: 'Smith Machine Squat', category: 'Legs', image: require('@/assets/images/profilepic.jpg') },
  { id: '10', name: 'Dumbbell Chest Fly', category: 'Chest', image: require('@/assets/images/profilepic.jpg') },
  { id: '11', name: 'Chest Press2 (Machine)', category: 'Chest', image: require('@/assets/images/profilepic.jpg') },
  { id: '12', name: 'Shoulder Press2 (Machine)', category: 'Shoulder', image: require('@/assets/images/profilepic.jpg') },
  { id: '13', name: 'Leg Press2 (Machine)', category: 'Legs', image: require('@/assets/images/profilepic.jpg') },
  
];

console.log(exercises.length); 

const exercise = () => {

  const renderExercise = ({ item }: { item: any }) => (
    <View style={styles.exerciseContainer}>
      <TouchableOpacity>
        <View style={styles.exercise}>
          <Image style={{ width: 40, height: 40 }} source={item.image} />
          <View>
            <Text style={ {fontWeight: 'bold'}}>{item.name}</Text>
            <Text>{item.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );



  return (
    <SafeAreaView style={{ flex: 1 }}>

   <View>
    <View style={styles.header}>
      <Text style={styles.headerText}>Exercises</Text>
      </View>

      <SearchBar/>



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

    </View>
      

    <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }} // Ensures FlatList takes up remaining space
        contentContainerStyle={{ paddingBottom: 100}} // Fixed issue with FlatList skipping last element
      />


    </SafeAreaView>
  )
}

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
      
    },

    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },

    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 20,
      height: 40,
      margin: 10,
    },

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

    exercise: {
      flexDirection: "row",
      gap: 15,
    },

    exerciseContainer: {
      margin: 20,
    }
})
export default exercise