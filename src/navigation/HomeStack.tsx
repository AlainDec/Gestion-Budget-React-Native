import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from '../screens/HomeScreen';
import { IncomeScreen } from '../screens/IncomeScreen';
import { ExpenseScreen } from '../screens/ExpenseScreen';

export type HomeStackScreenParamList = {
    Résumé: undefined;
    Revenus: undefined;
    Dépenses: undefined;
};

const Stack = createNativeStackNavigator<HomeStackScreenParamList>();

const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Résumé">
            <Stack.Screen name="Résumé" component={HomeScreen} />
            <Stack.Screen name="Revenus" component={IncomeScreen} />
            <Stack.Screen name="Dépenses" component={ExpenseScreen} />
        </Stack.Navigator>
    )
}

export default HomeStack;
