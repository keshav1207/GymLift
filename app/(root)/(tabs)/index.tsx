import { Text, View, TouchableOpacity, Alert} from "react-native";
import { Link } from "expo-router";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";


export default function Index() {
  const { refetch, isLogged, loading } = useGlobalContext();


  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      Alert.alert('Success', 'Logged out successfully.');
      refetch(); 
    } else {
      Alert.alert('Error', 'Failed to log out.');
    }
  };


  if (!loading && !isLogged) {
    return <Redirect href="/sign-in" />;
  }

  return (
    


    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text style={{ marginBottom: 20, fontWeight: "bold", fontSize: 20 }}> Welcome to GymLift!</Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/workout"> Workout</Link>
      <Link href="/profile"> Profile</Link>
    

      <TouchableOpacity onPress={handleLogout}>
                    <View className='logOutBtn'>
                      </View>
                      <Text> Log out</Text>
     </TouchableOpacity>
      

    </View>

    

  
  );
}
