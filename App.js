// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import AddItemScreen from './screens/AddItemScreen';
import { ItemProvider } from './ItemContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ItemProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="AddItem" component={AddItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
};

export default App;
