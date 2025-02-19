import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text, Image, View, StyleSheet, ScrollView } from 'react-native';

const ExerciseDescription = () => {
  // Extract the query parameters from the URL
  const { description, name, muscleGroup, image } = useLocalSearchParams();

  // Ensure 'image' is treated as a string, even if it's an array
  const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>Muscle Group: {muscleGroup}</Text>
          <Text style={styles.description}> {description}</Text>
        </View>

        {image && (
          <Image
            source={{ uri: decodeURIComponent(imageUrl) }}
            style={styles.image}
          />
        )}
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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 20,
    resizeMode: 'cover',
  },
});

export default ExerciseDescription;