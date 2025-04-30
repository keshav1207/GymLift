
import {Client, Avatars, Account, OAuthProvider, Databases,Query, ID} from "react-native-appwrite"
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from "expo-web-browser";
export const config = {
    platform:'com.jsm.gymlift',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    exerciseCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EXERCISE_COLLECTION,
    workoutCollectionId: process.env.EXPO_PUBLIC_APPWRITE_WORKOUT_COLLECTION,
    exerciseInstanceCollectionId: process.env.EXPO_PUBLIC_APPWRITE_EXERCISEINSTANCE_COLLECTION,
}; 


export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export const databases = new Databases(client);


export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

export async function logout() {
    try {
      await account.deleteSession('current');
      console.log('Logged out successfully');
      return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  export async function getAllExercises()
  {
    try {
        const result = await databases.listDocuments(
           config.databaseId!,
           config.exerciseCollectionId!,
           [Query.orderAsc('$createdAt')],

        )

        return result.documents;
      
    } catch (error) {
        console.error(error);
        return [];
    }
  }

  export async function getExerciseByName( exerciseName: any)
  {
    try {
      const result = await databases.listDocuments(
        config.databaseId!,
        config.exerciseCollectionId!,
        [Query.equal('Name', exerciseName)],

      );

      if (result.documents.length === 0) {
        console.log(`No exercise found with name: ${exerciseName}`);
        return null;  
      }


      return result.documents[0];
      
    } catch (error) {
      console.error(error);
    }
  }

  export async function getExercise({filter, query}:
    {filter: string;
    query: string;
  })
  {
   
      try {
        const buildQuery = [Query.orderDesc("$createdAt")];
    
        if (filter && filter !== "All")
          buildQuery.push(Query.equal("MuscleGroup", filter));
    
        if (query)
          buildQuery.push(
            Query.or([
              Query.search("Name", query),
              Query.search("Description", query),
              Query.search("MuscleGroup", query),
            ])
          );
    
        
    
        const result = await databases.listDocuments(
          config.databaseId!,
          config.exerciseCollectionId!,
          buildQuery
        );
    
        return result.documents;
      } catch (error) {
        console.error(error);
        return [];
      }



  }



  export async function createWorkout(name: String)
  {
    try {

      const result = await databases.createDocument(
        config.databaseId!,
        config.workoutCollectionId!,
        ID.unique(),

        {
         Name:name,
          exercisesInstance: []
        }
      
     );

     return result;

      
    } catch (error) {

      console.error(error);
      
    }
  }


  export async function getWorkoutByName  (name: string)  {
    try {

      const response = await databases.listDocuments(
        config.databaseId!,
        config.workoutCollectionId!,
        [
          Query.equal('Name', name)  
        ]
      );
      
      if (response.documents.length > 0) {

        console.log('Workout found:', response.documents[0]);
      
        return response.documents[0]; 

      } else {

        console.log('No workout found with this name');
      }
    } catch (error) {

      console.error('Error fetching workout by name:', error);
    }
  };

  


  type exerInst = {
     Name: String;
     Sets: Number;
     Reps: Number
  }

  

  export async function  fillWorkout(exercisesInstanceArray: exerInst[], workoutName: string)
  {
      const workoutDoc = await getWorkoutByName(workoutName)

      if (!workoutDoc) {
        console.error(`Exercise with name ${workoutName} not found.`);
        return
      }
      

      for (const exercise of exercisesInstanceArray) {
        
      const exerciseDoc =  await getExerciseByName(exercise.Name)

      if (!exerciseDoc) {
        console.error(`Exercise with name ${exercise.Name} not found.`);
        continue;
      }

        const exerciseInstance = await databases.createDocument(
          config.databaseId!,
          config.exerciseInstanceCollectionId!,
          ID.unique(), 
          {
           
            Sets: exercise.Sets,
            Reps: exercise.Reps,
            exercise: exerciseDoc.$id,
          }
        );

      workoutDoc.exerciseInstance.push(exerciseInstance.$id); 

      
      }

      await databases.updateDocument(
        config.databaseId!,
        config.workoutCollectionId!,
        workoutDoc.$id, 
        {
          exerciseInstance: workoutDoc.exerciseInstance,
        }
      );
  }


  export async function getAllWorkout()
  {
    try {
        const result = await databases.listDocuments(
           config.databaseId!,
           config.workoutCollectionId!,
           [Query.orderAsc('$createdAt')],

        )

        return result.documents;
      
    } catch (error) {
        console.error(error);
        return [];
    }
  }

  export async function getWorkoutDetails(workoutName: string)
  {
    try {

      const result = await databases.listDocuments(
        config.databaseId!,
           config.workoutCollectionId!,
           [
            
            Query.equal('Name', workoutName),
           
           ],
           

      );

      const workout = result.documents[0];

      type Exercise = {
         Description: string; 
         Name: string;
         MuscleGroup: string;
         Image: string; 
       };

      type Instance = 
      {

        Sets: number,
        Reps: number,
        exercise: Exercise;
      };
      const exercises = workout.exerciseInstance.map((instance:(Instance)) => ({
        
        sets: instance.Sets,
        reps: instance.Reps,
        name: instance.exercise?.Name || 'Unknown',

      }));


     return exercises;

    } catch (error) {
      console.error("Error occured getting workout details", error);
      throw error;
    }
  };