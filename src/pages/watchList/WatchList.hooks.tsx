import React, { useState } from 'react';
import { LocalStorageService } from './utils';

interface ITodoItem {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function useWatchList() {
  const initialState = LocalStorageService.getItem('rickAndMortyTodo')
    ? LocalStorageService.getItem('rickAndMortyTodo')
    : [];

  const [items, setItems] = useState<ITodoItem[]>(initialState);

  const makeHash = () => Number(new Date()).toString(36);

  const syncWithLocalStorage = () => {
    LocalStorageService.setItem('rickAndMortyTodo', items);
  };

  // При каждом обновлении элементов списка выполняем синхронизацию
  React.useEffect(syncWithLocalStorage, [items]);

  const addItem = (text: string) => {
    const newItem = {
      id: makeHash(),
      text,
      isCompleted: false,
    };

    setItems([...items, newItem]);
  };

  const removeItem = (removedItemId: string) => {
    const filteredItems = items.filter((item) => item.id !== removedItemId);

    setItems(filteredItems);
  };

  const updateItem = ({
    id,
    isCompleted,
  }: Pick<ITodoItem, 'id' | 'isCompleted'>) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return {
          id,
          text: item.text,
          isCompleted,
        };
      }

      return item;
    });

    setItems(updatedItems);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
}
