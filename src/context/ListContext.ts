// src/context/ListContext.ts
import { createContext, useContext } from 'react';
import type { TopList, Item } from '../types';

export interface ListContextType {
  lists: TopList[];
  createList: (title: string, category: string) => { success: boolean; error?: string };
  deleteList: (id: string) => void;
  addItemToList: (listId: string, item: Omit<Item, 'id'>) => { success: boolean; error?: string };
  deleteItemFromList: (listId: string, itemId: string) => void;
  editItemInList: (listId: string, itemId: string, newTitle: string, newDescription?: string) => void;
  reorderLists: (oldIndex: number, newIndex: number) => void;
  reorderItems: (listId: string, oldIndex: number, newIndex: number) => void;
  updateListCustomColor: (listId: string, color?: string) => void;
  updateListCustomImage: (listId: string, image?: string) => void;
  updateItemImage: (listId: string, itemId: string, imageUrl?: string) => void;
}

export const ListContext = createContext<ListContextType | undefined>(undefined);

// 👇 ESTO ES LO QUE TE FALTABA 👇
export const useLists = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useLists debe usarse dentro de un ListProvider');
  }
  return context;
};