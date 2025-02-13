import { View, Text,  StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/.expo/components/searchBar'
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { getAllExercises, getExercise } from "@/lib/appwrite";



const exercise = () => {

const { user } = useGlobalContext();
const params = useLocalSearchParams<{ query?: string; filter?: string }>();


const { data: allExercises, loading: allExercisesLoading } =
    useAppwrite({
      fn: getAllExercises,
    });

  const {
    data: exercises,
    refetch,
    loading,
  } = useAppwrite({
    fn: getExercise,
    params: {
      filter: params.filter!,
      query: params.query!,
      
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      
    });

  }, [params.filter, params.query]);




  const renderExercise = ({ item }: { item: any }) => (
    <View style={styles.exerciseContainer}>
      <TouchableOpacity>
        <View style={styles.exercise}>
          <Image style={{ width: 40, height: 40 }} source={{ uri: item.Image }} />
          <View>
            <Text style={ {fontWeight: 'bold'}}>{item.Name}</Text>
            <Text>{item.MuscleGroup}</Text>
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
        data={allExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
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