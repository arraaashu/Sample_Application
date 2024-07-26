import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItemsFromStorage = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error(error);
      }
    };

    loadItemsFromStorage();
  }, []);

  const saveItemsToStorage = async (newItems) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
  };

  const editItem = (index, updatedItem) => {
    const updatedItems = items.map((item, i) => (i === index ? updatedItem : item));
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    saveItemsToStorage(updatedItems);
  };

  return (
    <ItemContext.Provider value={{ items, setItems, addItem, editItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};
