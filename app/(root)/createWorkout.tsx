import { View, Text,  StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList, Modal, Button} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '@/.expo/components/searchBar'
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getAllExercises, getExercise, fillWorkout, createNewWorkout, getWorkoutByName } from "@/lib/appwrite";




const createWorkout = () => {

const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
const params = useLocalSearchParams<{ query?: string; filter?: any }>();

const [modalVisible, setModalVisible] = useState(false);
const [currentName, setCurrentName] = useState('');
const [currentSets, setCurrentSets] = useState('');
const [currentReps, setCurrentReps] = useState('');
const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [exerciseInstances, setExerciseInstances] = useState<ExerciseInstance[]>([]);

  //This is what I used to create the workout modal to choose the workout name dynamically
  const [workoutNameModalVisible, setWorkoutNameModalVisible] = useState(false);
const [newWorkoutName, setNewWorkoutName] = useState('');


const { data: allExercises } =
    useAppwrite({
      fn: getAllExercises,
    });

  const {
    data: exercises,
    refetch,
    
  } = useAppwrite({
    fn: getExercise,
    params: {
      filter: selectedFilter || params.filter,
      query: params.query!,
      
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: selectedFilter || params.filter,
      query: params.query!,
      
    });

  }, [params.filter, params.query, selectedFilter, params.query]);


  const handleFilter = (filter: string) => {
    setSelectedFilter(filter); 
  };

  const clearFilter = () => {
    setSelectedFilter(null); 
  };

  type Exercise = {
   
    Description: string; 
    Name: string;
    MuscleGroup: string;
    Image: string; 
  };

  type ExerciseInstance = {
    id: string;
    Name: String;
    Sets: Number;
    Reps: Number;
  }
  
 
  async function confirmWorkout()
  {
    if (!newWorkoutName.trim()) {
      alert("Workout name cannot be empty");
      return;
    }

    if (exerciseInstances.length == 0) {
      alert("Workout  cannot be empty");
      return;
    }


    try {
      
      await createNewWorkout(newWorkoutName.trim());

      await fillWorkout(exerciseInstances, newWorkoutName.trim());

      setWorkoutNameModalVisible(false);

      setNewWorkoutName('');

      alert("Workout created successfully!");


      setExerciseInstances([]);
      setNewWorkoutName('');
     

    } catch (error) {
      console.error(error)
    }
    
  }
  
  async function finaliseWorkout()  {

   
    setWorkoutNameModalVisible(true);
    

  };
  
  const openModal = (exerciseName: string) => {
    setCurrentName(exerciseName); 
    setCurrentSets('');
    setCurrentReps('');
    setModalVisible(true);
  };
  
  

  function addExercise() {

    const updatedExercise: ExerciseInstance = {
      id: editingExerciseId || Date.now().toString(),
      Name: currentName,  
      Sets: parseInt(currentSets) || 0,
      Reps: parseInt(currentReps) || 0,
    };

   
  const alreadyExists = exerciseInstances.some(e => e.Name === currentName);
  if (!editingExerciseId && alreadyExists) {
    
    setModalVisible(false); 
    return;
  }

  
  if (editingExerciseId) {
    setExerciseInstances(prev =>
      prev.map(e => (e.id === editingExerciseId ? updatedExercise : e))
    );

  } else {
    
    setExerciseInstances(prev => [...prev, updatedExercise]);
  }
   
    setCurrentSets('');
    setCurrentReps('');
    setModalVisible(false);

    
  }

  function removeExercise (name:string)
  {

    setExerciseInstances(prev => prev.filter(e => e.Name !== name));

  }


  const renderExercise = ({ item }: { item: any }) => {
    const isAlreadyAdded = exerciseInstances.some(e => e.Name === item.Name);

    return (<View style={styles.exerciseContainer}>
      <TouchableOpacity >
        <View style={styles.exercise}>
          <Image style={{ width: 40, height: 40 }} source={{ uri: item.Image }} />
          <View>
            <Text style={ {fontWeight: 'bold'}}>{item.Name}</Text>
            <Text>{item.MuscleGroup}</Text>
          </View>
          <View>
            <TouchableOpacity  onPress={() => openModal(item.Name)} > <Text style= {styles.button}> {isAlreadyAdded ? 'Update' : 'Add'} </Text> </TouchableOpacity>

          </View>

        {isAlreadyAdded && 
          <View>

            <TouchableOpacity  onPress={() => removeExercise(item.Name)} > <Text style= {styles.button}> Delete </Text> </TouchableOpacity>

          </View>
        }
        

        </View>
      </TouchableOpacity>
    </View>
  );


  }
   

    
    

  // If filter applied, use that otherwise allexercises is used
  const exerciseData = exercises || allExercises;



  

  return (
    <SafeAreaView style={{ flex: 1 }}>

   <View>
    <View style={styles.header}>
      <Text style={styles.headerText}>Exercises</Text>
      <TouchableOpacity style={styles.finaliseBtn}  onPress={finaliseWorkout}> <Text style={{color: "white"}}> Finalise Workout </Text>  </TouchableOpacity>
      </View>

      <SearchBar/>



      <ScrollView horizontal showsHorizontalScrollIndicator={false} >

        <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => clearFilter()} activeOpacity={0.7}>  <Text style={styles.filterBtn}>All</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Arms")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Arms</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Back")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Back</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Chest")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Chest</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Legs")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Legs</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Shoulder")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Shoulder</Text> </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("other")} activeOpacity={0.7}>  <Text style={styles.filterBtn}>Other</Text> </TouchableOpacity>

        </View>
      </ScrollView>

    </View>


      



    {exerciseData != null  && exerciseData.length > 0 ?(<FlatList
        data={exerciseData}
        renderItem={renderExercise}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        style={{ flex: 1 }} // Ensures FlatList takes up remaining space
        contentContainerStyle={{ paddingBottom: 100}} // Fixed issue with FlatList skipping last element
      />
      ):

      (<View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}> No results found</Text>
      </View>)}


      <Modal
     visible={modalVisible}
     animationType="slide"
     transparent={true}
    onRequestClose={() => setModalVisible(false)}>

   <View style={styles.modalOverlay}>
    <View style={styles.modalView}>
      <Text style={styles.modalTitle}>Add Exercise</Text>

      <Text> {currentName} </Text>

      <TextInput
        placeholder="Sets"
        keyboardType="numeric"
        style={styles.input}
        value={currentSets}
        onChangeText={setCurrentSets}
      />
      <TextInput
        placeholder="Reps"
        keyboardType="numeric"
        style={styles.input}
        value={currentReps}
        onChangeText={setCurrentReps}
      />

      <View style={styles.buttonRow}>
        <Button title="Cancel" color="gray" onPress={() => setModalVisible(false)} />
        <Button title="Add" onPress={addExercise} />
      </View>
      </View>
      </View>
      </Modal>
    


      <Modal
      visible={workoutNameModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setWorkoutNameModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Enter Workout Name</Text>
          <TextInput
            placeholder="Workout name"
            value={newWorkoutName}
            onChangeText={setNewWorkoutName}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" color="gray" onPress={() => setWorkoutNameModalVisible(false)} />
            <Button title="Confirm" onPress={confirmWorkout} />
          </View>
        </View>
      </View>
    </Modal>

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
    },

    noResultsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noResultsText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'gray',
    },

    button: {
       
        height: 30,  
        backgroundColor: "black",
        color: "white",
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      fontSize: 6,
    },

    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },

    finaliseBtn: {
      marginTop: 20,
      backgroundColor: "black",
      color: "white",
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 5,
      fontSize: 10,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      
    }

})
export default createWorkout