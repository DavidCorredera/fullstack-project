import { useContext } from 'react';
import { ListContext } from '../context/ListContext';

export const useLists = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useLists debe usarse dentro de un ListProvider');
  }
  return context;
};