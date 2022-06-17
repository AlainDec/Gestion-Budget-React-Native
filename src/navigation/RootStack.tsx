
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../navigation/HomeStack';
import { AccountsScreen } from '../screens/AccountsScreen';
import { StatsScreen } from '../screens/StatsScreen';

export type RootStackParamsList = {
    Accueil: undefined;
    Comptes: undefined;
    Statistiques: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamsList>();

const RootStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = '';

                        if (route.name === 'Accueil') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Comptes') {
                            iconName = focused ? 'pencil' : 'pencil-outline';
                        } else if (route.name === 'Statistiques') {
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen
                    name="Accueil"
                    component={HomeStack}
                    options={{
                        headerShown: false
                    }} />
                <Tab.Screen name="Comptes" component={AccountsScreen} />
                <Tab.Screen name="Statistiques" component={StatsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;
