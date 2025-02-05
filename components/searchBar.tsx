import { View, Text, TextInput, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import {useLocalSearchParams, usePathname, router} from 'expo-router'
import { Feather } from '@expo/vector-icons';
import {useDebouncedCallback} from "use-debounce"

const SearchBar = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{query?: string}>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback((text:
  string) => router.setParams({query:text}), 500);
  
  const handleSearch = (text:string) => {
    setSearch(text);
    debouncedSearch(text);
  }


  return (
    <View style={styles.searchBar}>
    <Feather name="search" size={20} color="grey" style={styles.icon} />
    <TextInput
      value= {search}
      onChangeText = {handleSearch}
      placeholder="Search..."
      placeholderTextColor="grey"
      style={styles.input}
    />
    </View>
  )
}


const styles =  StyleSheet.create({
 

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

 
})

export default SearchBar