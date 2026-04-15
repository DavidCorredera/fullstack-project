import { createContext, useContext, type ReactNode, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { TopList, Item } from '../types';

// Definimos qué funciones y datos expondrá nuestro contexto
interface ListContextType {
  lists: TopList[];
  createList: (title: string, category: string) => { success: boolean; error?: string };
  deleteList: (id: string) => void;
  addItemToList: (listId: string, item: Omit<Item, 'id'>) => { success: boolean; error?: string };
  deleteItemFromList: (listId: string, itemId: string) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  // Usamos nuestro custom hook para persistir la data. Inicialmente es un array vacío.
  const [lists, setLists] = useLocalStorage<TopList[]>('top5_lists', []);

  // Función para crear lista con límite de 10
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

  // Función para borrar una lista entera
  const deleteList = useCallback((id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  }, [setLists]);

  // Función para añadir ítem respetando el Top 5
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

  // Función para borrar un ítem
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

  // Memoizamos el valor del contexto para evitar re-renders innecesarios en los hijos
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

// Custom Hook para consumir el contexto fácilmente
export const useLists = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useLists debe usarse dentro de un ListProvider');
  }
  return context;
};