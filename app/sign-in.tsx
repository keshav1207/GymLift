import React from 'react'
import { Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, View, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

const { height } = Dimensions.get('window');
      const signIn = () => {
        const {refetch, loading, isLogged} = useGlobalContext();
        if(!loading && isLogged) return <Redirect href={"/"}/>
        const handleLogin = async () => {
            const result = await login();

            if(result) {
              refetch();
            }else {
              Alert.alert('Error', 'Failed to Login');
            }

        };

        return (
          <SafeAreaView  style={styles.container}>
            <ScrollView style={styles.sview} >

              <Image source={require('../assets/images/mainPhoto.jpeg')}  style={styles.image} />

              <View className='welcome' style={styles.welcome}>
                <Text > Welcome to GymLift!</Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}> Let's Get You Closer To </Text>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>  Your Fitness Goals</Text>
                <Text style={styles.text}>Log In with Google</Text>

              </View>

              
             <TouchableOpacity onPress={handleLogin}>
              <View className='loginBtn'style={styles.loginBtn}>
              
                <Image  style={{ width: 25, height: 25 }} source={require('../assets/images/googleIcon.png')}/>
                <Text> Continue With Google</Text>

                </View>
                </TouchableOpacity>
              
              

            </ScrollView>
           
          </SafeAreaView>
        )
      };

      const styles = StyleSheet.create({
        container: {
          backgroundColor: "white",
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
         
          
      },

      text: {
        marginTop: 20,
        
        
      },

      sview: {
        width: '100%',
          flex: 1,
          padding: 20,
          
          
      },

      image:{
        width: '100%',
        height: height * 0.6 ,
        resizeMode: 'cover',
        borderRadius: 10,
      },

      welcome: {
        marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,

      },

      loginBtn: {
        marginTop: 50,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        padding: 10,
        width: 370,

        //Add box show style
       backgroundColor: 'white', 
        borderRadius: 20,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 10, 
          elevation: 5
      

      }
    
    
    });
      
      export default signIn