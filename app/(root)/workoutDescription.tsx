import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text,  View, StyleSheet, ScrollView } from 'react-native';
import { getWorkoutDetails } from '@/lib/appwrite';
import { useEffect,useState } from 'react';

const WorkoutDescription = () => {

    type WorkoutParams ={
        name: string | string[];
    }

  // Extract the query parameters from the URL
  const { name } = useLocalSearchParams<WorkoutParams>();

  const [exercises, setExercises] = useState<any[]>([]);

  // This line was added because the useLocalSearchParams sometimes return arrays but typescript require a string for the API call
  const workoutName: string = Array.isArray(name) ? name[0] : name; 

  useEffect(() => {

    const loadWorkout = async () => {
      try {

        if (!workoutName) throw new Error('Workout name is required');

        const  data = await getWorkoutDetails(workoutName);

        setExercises(data); 


      } catch (err: any) {

        console.log('Failed to load workout details');
        throw err;
      }

    }

        loadWorkout();
    
  }, []); 



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>

          {exercises.map((exercise, index) => (
            <View key={index}>
              <Text >{exercise.name}</Text>
              <Text>
                Sets: {exercise.sets} | Reps: {exercise.reps}
              </Text>
            </View>
          ))}
          
        </View>

      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },

});

export default WorkoutDescription;