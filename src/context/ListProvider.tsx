import { type ReactNode, useCallback, useMemo } from 'react';
import { ListContext } from './ListContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { usePlan } from './PlanProvider';
import type { TopList, Item } from '../types';

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useLocalStorage<TopList[]>('top5_lists', []);
  const { limits } = usePlan();

  const createList = useCallback((title: string, category: string) => {
    if (limits.maxLists > 0 && lists.length >= limits.maxLists) {
      return { success: false, error: `Límite alcanzado: Tu plan permite hasta ${limits.maxLists} listas.` };
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
  }, [lists.length, setLists, limits.maxLists]);

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
      const maxItems = limits.maxItems > 0 ? limits.maxItems : Infinity;
      if (targetList.items.length >= maxItems) {
        errorMsg = `¡Límite alcanzado! Tu plan permite hasta ${maxItems} elementos por lista.`;
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
  }, [setLists, limits.maxItems]);

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

  const editItemInList = useCallback((listId: string, itemId: string, newTitle: string, newDescription?: string) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) => 
            item.id === itemId 
              ? { ...item, title: newTitle, description: newDescription }
              : item
          ),
        };
      }
      return list;
    }));
  }, [setLists]);

  const reorderLists = useCallback((oldIndex: number, newIndex: number) => {
    setLists((prev) => {
      const newLists = [...prev];
      const [removed] = newLists.splice(oldIndex, 1);
      newLists.splice(newIndex, 0, removed);
      return newLists;
    });
  }, [setLists]);

  const reorderItems = useCallback((listId: string, oldIndex: number, newIndex: number) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        const newItems = [...list.items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        return { ...list, items: newItems };
      }
      return list;
    }));
  }, [setLists]);

  const updateListCustomColor = useCallback((listId: string, color?: string) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        return { ...list, customColor: color };
      }
      return list;
    }));
  }, [setLists]);

  const updateListCustomImage = useCallback((listId: string, image?: string) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        return { ...list, customImage: image };
      }
      return list;
    }));
  }, [setLists]);

  const updateItemImage = useCallback((listId: string, itemId: string, imageUrl?: string) => {
    setLists((prevLists) => prevLists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map((item) =>
            item.id === itemId ? { ...item, imageUrl } : item
          ),
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
    deleteItemFromList,
    editItemInList,
    reorderLists,
    reorderItems,
    updateListCustomColor,
    updateListCustomImage,
    updateItemImage
  }), [lists, createList, deleteList, addItemToList, deleteItemFromList, editItemInList, reorderLists, reorderItems, updateListCustomColor, updateListCustomImage, updateItemImage]);

  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};