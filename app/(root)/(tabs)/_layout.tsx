import {  Text, View, Image, StyleSheet} from "react-native";
import React from "react";
import {Tabs} from "expo-router"


const TabsLayout = () => {
    return(
        <Tabs
        
        screenOptions = {{

            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
               borderTopColor: '#0061FF1A' ,
               borderTopWidth: 1,
               minHeight: 80,
               paddingTop: 20,
            },
            headerShown: false,
        }}
        
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: () => (
                        <View>
                       <Image source={require("@/assets/icons/home.png")} style={styles.image} />
                       <Text style={styles.label}> Home</Text>
                       </View>
                    )
                    
                }}

            />


            <Tabs.Screen
                name="exercise"
                options={{
                    title: 'Exercise',
                    headerShown: false,
                    tabBarIcon: () => (
                        <View>
                       <Image source={require("@/assets/icons/exercise.png")} style={styles.image} />
                       <Text style={styles.label}> Exercise</Text>
                       </View>
                    )
                    
                }}

            />


            <Tabs.Screen
                name="workout"
                options={{
                    title: 'Workout',
                    headerShown: false,
                    tabBarIcon: () => (
                        <View>
                       <Image source={require("@/assets/icons/workout.png")} style={styles.image} />
                       <Text style={styles.label}> Workout</Text>
                       </View>
                    )
                    
                }}

            />



            <Tabs.Screen
                name="profile"
                options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarIcon: () => (
                        <View>
                       <Image source={require("@/assets/icons/profile.png")} style={styles.image} />
                       <Text style={styles.label}> Profile</Text>
                       </View>
                    )
                    
                }}

            />
            
        </Tabs>
    )
}


const styles = StyleSheet.create({

    image: {
        width: 50, 
        height: 40, 
        borderRadius: 10, 
        resizeMode: 'contain'
      },

    label: {
        fontSize: 11
    }

})

export default TabsLayout