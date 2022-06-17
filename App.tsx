import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RootStack from './src/navigation/RootStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <RootStack />
  )
}