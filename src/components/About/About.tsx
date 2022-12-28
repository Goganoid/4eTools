import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
export const About = () => {
  return (
    <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
        <View>
            <Text variant='titleSmall' style={{color:"gray",marginVertical:20}}>Developed by @yokano</Text>
            <Text variant='titleSmall' style={{color:"gray",marginVertical:20}}>App launcher icon by @kardash.iryna</Text>
        </View>
    </View>
  )
}
