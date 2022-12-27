import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { EncounterStackParamList } from '../../types/navigatorTypes'
import { URImage } from '../shared/ImageGallery'
import { ModalContainer } from '../shared/ModalContainer'
export const CustomEntityDetails = ({ navigation, route }: NativeStackScreenProps<EncounterStackParamList, 'CustomEntityDetails'>) => {
    const entity = route.params.entity;
    return (

        <ModalContainer navigation={navigation}>
            <ScrollView contentContainerStyle={{justifyContent:"space-around",height:"100%",paddingVertical:"15%"}}>
                <Text style={styles.entity_name}>{entity.name}</Text>
                <View style={styles.stats}>
                    <Text style={styles.stat}><Text style={styles.bold_text}>HP:</Text>{entity.stats.hp}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>AC:</Text>{entity.stats.ac}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>FOR:</Text>{entity.stats.fort}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>REF:</Text>{entity.stats.ref}</Text>
                    <Text style={styles.stat}><Text style={styles.bold_text}>WILL:</Text>{entity.stats.will}</Text>
                </View>
                {URImage(entity.image_uri!)}
            </ScrollView>
        </ModalContainer>

    )
}

const styles = StyleSheet.create({
    entity_name: {
        fontWeight: "bold",
        fontSize: 25,
    },
    bold_text: {
        fontWeight: "bold",
        fontSize: 15,
    },
    stats: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:"space-around"
    },
    stat: {
        fontSize: 15,
        marginVertical: 5,
    },
})