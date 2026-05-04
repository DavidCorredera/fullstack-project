import { Link } from 'react-router-dom';
import type { TopList } from '../types';

interface ListCardProps {
  list: TopList;
  onDelete: (id: string) => void;
}

export const ListCard = ({ list, onDelete }: ListCardProps) => {
  const isFull = list.items.length === 5;

  return (
    <article className="list-card card-hover">
      <span className="list-category">{list.category}</span>
      <h3>{list.title}</h3>
      
      <div className="list-card-footer">
        <span className="item-count-small">
          {list.items.length}/5 elementos
        </span>
        {isFull && <span className="complete-badge-small">✓ Completado</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <Link 
          to={`/list/${list.id}`}
          className="contrast button"
          style={{ flex: 1, textAlign: 'center' }}
        >
          Ver Top 5
        </Link>
        <button 
          onClick={() => onDelete(list.id)}
          className="delete-btn secondary outline"
          aria-label="Eliminar lista"
        >
          ✕
        </button>
      </div>
    </article>
  );
};