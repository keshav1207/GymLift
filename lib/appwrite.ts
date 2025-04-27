
import {Client, Avatars, Account, OAuthProvider, Databases,Query} from "react-native-appwrite"
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session';
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
            
            Query.equal('name', workoutName),
            'expand=exerciseInstances.exercise'

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
      console.log("Error occured getting workout details");
      throw error;
    }
  };