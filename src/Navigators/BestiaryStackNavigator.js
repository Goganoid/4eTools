import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { EnemyDetails } from '../components/EnemyDetails';
import { MonsterListing } from '../components/MonsterListing';

const Stack = createNativeStackNavigator();

export const BestiaryStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="MonsterListing">
            <Stack.Screen name="MonsterDetails" component={EnemyDetails}
                options={{
                    title: "Details",
                    headerRight: () =>
                        <>
                            <IconButton icon="check" />
                        </>
                    ,
                }} />
            <Stack.Screen
                name="MonsterListing"
                component={MonsterListing}
                options={{
                    title: 'Bestiary',
                        
                }}
            />
        </Stack.Navigator>
    )
}
