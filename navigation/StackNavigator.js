import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';
import AddItemScreen from '../screens/AddItemScreen';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="AddItem" component={AddItemScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default StackNavigator;
