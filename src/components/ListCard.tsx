// src/components/ListCard.tsx
import { Link } from 'react-router-dom';
import type { TopList } from '../types';

interface ListCardProps {
  list: TopList;
  onDelete: (id: string) => void;
}

export const ListCard = ({ list, onDelete }: ListCardProps) => {
  const isFull = list.items.length === 5;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">
            {list.category}
          </span>
          <h3 className="text-xl font-bold mt-2 text-gray-800">{list.title}</h3>
        </div>
        <button 
          onClick={() => onDelete(list.id)}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Borrar lista"
        >
          🗑️
        </button>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">
        {list.items.length} / 5 elementos
        {isFull && <span className="ml-2 text-green-600 text-xs font-semibold">¡Completado!</span>}
      </p>

      <Link 
        to={`/list/${list.id}`}
        className="block w-full text-center bg-gray-50 hover:bg-indigo-50 text-indigo-600 font-medium py-2 rounded-lg transition-colors"
      >
        Ver Top 5
      </Link>
    </div>
  );
};