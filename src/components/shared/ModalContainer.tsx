import React, { ReactElement } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
export const ModalContainer = ({children, navigation}:{children:ReactElement, navigation:any}) => {
    return (
        <View
            style={styles.modal}>
            <View style={styles.container}>
                <View style={{paddingHorizontal:15,paddingTop:10}}>
                    {children}
                </View>
                
            </View>
            <View style={styles.close_button_container}>
                    <IconButton icon='close' mode='contained' onPress={()=>{navigation.goBack()}} containerColor="rgb(247, 218, 239)"/>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    close_button_container: {
        position: "absolute",
        bottom: 10,
        alignItems: "center",
        width: "100%",
    },
    modal:{
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: 'center',
        justifyContent: 'center', 
        height: "100%",
        position:"relative",
        
    },
    container: {
        
        borderRadius:10,  
        backgroundColor: "white",
        height: "auto",
        maxHeight:"80%",
        flex:0,
        width: "90%",
        marginHorizontal: "10%",
    },
})