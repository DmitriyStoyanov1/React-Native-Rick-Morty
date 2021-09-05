import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {CharactersPage} from './pages/characters';
import {EpisodesPage} from './pages/episodes';
import {LocationsPage} from './pages/locations';
import {StartPage} from './pages/start';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartPage}
          options={{title: 'Start'}}
        />

        <Stack.Screen
          name="Characters"
          component={CharactersPage}
          options={{title: 'Characters'}}
        />

        <Stack.Screen
          name="Episodes"
          component={EpisodesPage}
          options={{title: 'Episodes'}}
        />

        <Stack.Screen
          name="Locations"
          component={LocationsPage}
          options={{title: 'Locations'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
