import { View, Text,  StyleSheet, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';

const exercise = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

   <View>
    <View style={styles.header}>
      <Text style={styles.headerText}>Exercises</Text>
      </View>

      <View style={styles.searchBar}>
      <Feather name="search" size={20} color="grey" style={styles.icon} />
      <TextInput
        placeholder="Search..."
        placeholderTextColor="grey"
        style={styles.input}
      />
      </View>



      <ScrollView horizontal showsHorizontalScrollIndicator={false} >

        <View style={styles.filterContainer}>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Arms</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Back</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Chest</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Legs</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Shoulder</Text> </TouchableOpacity>
          <TouchableOpacity>  <Text style={styles.filterBtn}>Other</Text> </TouchableOpacity>

        </View>
      </ScrollView>

    </View>
      

      <ScrollView style={{ flex: 1 }}>

      <View>

      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>



      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>



      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>



      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>


      <View style={styles.exerciseContainer} >
        <TouchableOpacity>  
          <View style={styles.exercise}>
          <Image  style={{ width: 40, height: 40 }} source={require('@/assets/images/profilepic.jpg')}/>
          <View>
            <Text style={ {fontWeight: 'bold'}}>Chest Press (Machine)</Text> 
            <Text>Chest</Text> 
          </View>
          </View>
        </TouchableOpacity>
      </View>


      </View>

    
      </ScrollView>



    </SafeAreaView>
  )
}

const styles =  StyleSheet.create({
    header: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
    },

    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      
    },

    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
    },

    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 20,
      height: 40,
      margin: 10,
    },

    filterContainer: {
      flexDirection: "row",
      alignItems: 'center',
      paddingHorizontal: 10,
      gap: 3,
      margin: 5,
    },

    filterBtn: {
      
      width: 80,  
      height: 30,  
      backgroundColor: "black",
      color: "white",
      borderRadius: 15,
      paddingHorizontal: 15,
      paddingVertical: 5,
      fontSize: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    exercise: {
      flexDirection: "row",
      gap: 15,
    },

    exerciseContainer: {
      margin: 20,
    }
})
export default exercise