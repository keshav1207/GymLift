import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
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
      <Link href="./root/tabs/workout"> Workout</Link>
      <Link href="/root/tabs/profile"> Profile</Link>
      

    </View>
  );
}
