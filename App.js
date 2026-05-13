import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/home/HomeScreen';
import MedicationScreen from './screens/MedicationScreen';

import { initDatabase } from './database/initDatabase';

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <NavigationContainer>

      <Tab.Navigator>

        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Medicamentos"
          component={MedicationScreen}
        />

      </Tab.Navigator>

    </NavigationContainer>
  );
}