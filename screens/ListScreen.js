// ListScreen.js
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ItemContext } from '../ItemContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ListScreen = ({ navigation }) => {
  const { items, setItems, deleteItem } = useContext(ItemContext);

  useFocusEffect(
    React.useCallback(() => {
      const loadItems = async () => {
        try {
          const storedItems = await AsyncStorage.getItem('items');
          if (storedItems) setItems(JSON.parse(storedItems));
        } catch (error) {
          console.error(error);
        }
      };
      loadItems();
    }, [])
  );

  const handleDelete = (index) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteItem(index) }
    ]);
  };

  const handleEdit = (index, item) => {
    navigation.navigate('AddItem', { index, item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.description}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEdit(index, item)} />
              <Button title="Delete" onPress={() => handleDelete(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Add Item" onPress={() => navigation.navigate('AddItem')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  text: { fontSize: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});

export default ListScreen;
