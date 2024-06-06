import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View,StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper'
import { PowerTrackerParams } from '../../types/navigatorTypes';
import { URImage } from '../shared/ImageGallery';
import { ModalContainer } from '../shared/ModalContainer';
export const CustomPowerDetails = ({ navigation, route }:NativeStackScreenProps<PowerTrackerParams,'CustomPowerDetails'>) => {
    const power = route.params.power;
    const theme = useTheme();
    const styles = StyleSheet.create({
        stat: {
            paddingVertical: 3,
            fontSize:15,
        },
        name: {
            fontWeight: "bold",
            fontSize:25,
        },
        bold_text: {
            fontWeight: "bold",
            fontSize:15,
        },
        stats: {
            flexDirection: 'column',
            flexWrap: "wrap",
        },
        element: {
            height: 90,
            padding: 10,
            marginVertical: 5,
            zIndex: 1,
    
        },
        title: {
            width: "70%"
        },
        icon: {
            padding: 0, margin: 0
        },
    })
    return (
        <ModalContainer navigation={navigation}>
            <View style={{justifyContent:"space-around",paddingVertical:"10%"}}>
                <Text style={styles.name}>{power.name}</Text>
                <View style={styles.stats}>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Level: </Text>{power.level}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Action: </Text>{power.action}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>Type: </Text>{power.type}</Text>
                </View>
                {power.notes.length>0 && <Text style={styles.stat}><Text style={styles.bold_text}>Notes: </Text>{power.notes}</Text>}
                {power.image_uri && URImage(power.image_uri)}
            </View>
        </ModalContainer>
    )
}

