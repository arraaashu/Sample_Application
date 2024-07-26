// AddItemScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ItemContext } from '../ItemContext';

const AddItemScreen = ({ navigation, route }) => {
  const { index, item } = route.params || {};
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const { addItem, editItem } = useContext(ItemContext);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
    }
  }, [item]);

  const handleSave = () => {
    if (!name || !description) {
      Alert.alert('Validation Error', 'Please fill out all fields');
      return;
    }
    
    if (item) {
      editItem(index, { name, description });
    } else {
      addItem({ name, description });
    }
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title={item ? 'Save Changes' : 'Add Item'} onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }
});

export default AddItemScreen;
