import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppwrite } from '@/lib/useAppwrite';
import { getAllWorkout } from '@/lib/appwrite';



const WorkoutScreen = () => {
  
  const { data: allWorkouts, loading: allWorkoutsLoading } = useAppwrite({
    fn: getAllWorkout,  
  });

  
  const workouts = allWorkouts || [];

  const styles = StyleSheet.create({
    header: {
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      
    },
    headerText: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      
    },
    workoutBox: {
      padding: 20,  
      marginBottom: 15,
      marginLeft: 40,
      backgroundColor: '#f9f9f9', 
      borderRadius: 10,  
      elevation: 5, 
      alignItems: 'center',  
      justifyContent: 'center',  
      width: '40%',  
      aspectRatio: 1,  
    },
    
    workoutTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center', 
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

    flatContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      padding: 20,  
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: '#f9f9f9', 
      borderRadius: 10,  
      elevation: 5, 
      alignItems: 'center',  
      justifyContent: 'center',  
      fontSize: 12,
      fontWeight: 'bold',
       
     

    }
  });

  const navigateToWorkoutDescription = (name: string) => {
      router.push(`/workoutDescription?name=${name}`);
    };

    
  const renderWorkout = ({ item }: { item: any }) => (
    <View style={styles.workoutBox}>
      <TouchableOpacity onPress={() => navigateToWorkoutDescription(item.Name)}>
        <Text style={styles.workoutTitle}>{item.Name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Workouts</Text>
       <TouchableOpacity> 
        
       <Text style={styles.button}> Create Workout</Text>
        
        </TouchableOpacity>
      </View>

      {allWorkoutsLoading ? (
        <Text>Loading workouts...</Text>
      ) : workouts.length > 0 ? (
        <FlatList
          data={workouts}  
          renderItem={renderWorkout}
          keyExtractor={(item) => item.Name}  
          style={{ flex: 1 }}
          contentContainerStyle={styles.flatContainer} 
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No workouts found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default WorkoutScreen;
