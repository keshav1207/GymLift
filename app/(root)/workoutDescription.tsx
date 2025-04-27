import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text, Image, View, StyleSheet, ScrollView } from 'react-native';

const WorkoutDescription = () => {

  // Extract the query parameters from the URL
  const { name} = useLocalSearchParams();

 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          
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