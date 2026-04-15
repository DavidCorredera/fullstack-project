import { type ReactNode, useCallback, useMemo } from 'react';
import { ListContext } from './ListContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { TopList, Item } from '../types';

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useLocalStorage<TopList[]>('top5_lists', []);

  const createList = useCallback((title: string, category: string) => {
    if (lists.length >= 10) {
      return { success: false, error: 'Límite alcanzado: En la versión local solo puedes crear hasta 10 listas.' };
    }
    const newList: TopList = {
      id: crypto.randomUUID(),
      title,
      category,
      items: [],
      createdAt: Date.now(),
    };
    setLists((prev) => [...prev, newList]);
    return { success: true };
  }, [lists.length, setLists]);

  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, [setLists]);

  const addItemToList = useCallback((listId: string, itemData: Omit<Item, 'id'>) => {
    let errorMsg = '';
    
    setLists((prevLists) => {
      const listIndex = prevLists.findIndex((l) => l.id === listId);
      if (listIndex === -1) {
        errorMsg = 'Lista no encontrada.';
        return prevLists;
      }
      const targetList = prevLists[listIndex];
      if (targetList.items.length >= 5) {
        errorMsg = '¡Top 5 completado! No puedes añadir más elementos.';
        return prevLists;
      }
      const newItem: Item = {
        ...itemData,
        id: crypto.randomUUID(),
      };
      const updatedLists = [...prevLists];
      updatedLists[listIndex] = {
        ...targetList,
        items: [...targetList.items, newItem],
      };
      return updatedLists;
    });

    return errorMsg ? { success: false, error: errorMsg } : { success: true };
  }, [setLists]);

  const deleteItemFromList = useCallback((listId: string, itemId: string) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter((item) => item.id !== itemId),
        };
      }
      return list;
    }));
  }, [setLists]);

  const contextValue = useMemo(() => ({
    lists,
    createList,
    deleteList,
    addItemToList,
    deleteItemFromList
  }), [lists, createList, deleteList, addItemToList, deleteItemFromList]);

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};