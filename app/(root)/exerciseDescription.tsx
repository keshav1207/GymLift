import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, Text, Image } from 'react-native';

const ExerciseDescription = () => {
  // Extract the query parameters from the URL
  const { description, name, muscleGroup, image } = useLocalSearchParams();

    // Ensure 'image' is treated as a string, even if it's an array
    const imageUrl = Array.isArray(image) ? image[0] : image;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Exercise Description: {description}</Text>
      <Text>Exercise Name: {name}</Text>
      <Text>Muscle Group: {muscleGroup}</Text>
      
      
      {image && (
        <Image
          source={{ uri: decodeURIComponent(imageUrl) }}
          style={{ width: 200, height: 200 }} 
        />
      )}
    </SafeAreaView>
  );
};

export default ExerciseDescription;
