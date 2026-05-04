import { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import { useLists } from '../context/ListContext';
import { usePlan } from '../context/PlanProvider';
import type { TopList } from '../types';

interface ListCardProps {
  list: TopList;
  index: number;
  onDelete: (id: string) => void;
}

export const SortableListCard = ({ list, index, onDelete }: ListCardProps) => {
  const { updateListCustomImage } = useLists();
  const { limits } = usePlan();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    animationDelay: `${index * 0.05}s`,
  };

  const maxItems = limits.maxItems > 0 ? limits.maxItems : Infinity;
  const isFull = list.items.length >= maxItems;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && limits.customImages) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateListCustomImage(list.id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="list-card card-hover"
      {...attributes}
      {...listeners}
    >
      {list.customImage ? (
        <div className="list-card-image">
          <img src={list.customImage} alt={list.title} />
        </div>
      ) : (
        <span className="list-category">{list.category}</span>
      )}
      <h3>{list.title}</h3>
      
      <div className="list-card-footer">
        <span className="item-count-small">
          {list.items.length}/{maxItems === Infinity ? '∞' : maxItems} elementos
        </span>
        {isFull && <span className="complete-badge-small">✓ Completado</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <Link 
          to={`/list/${list.id}`}
          className="contrast button"
          style={{ flex: 1, textAlign: 'center', minWidth: '80px' }}
        >
          Ver Top 5
        </Link>
        {limits.customImages && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="secondary outline"
            aria-label="Subir imagen"
          >
            📷
          </button>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(list.id);
          }}
          className="delete-btn secondary outline"
          aria-label="Eliminar lista"
          onPointerDown={(e) => e.stopPropagation()}
        >
          ✕
        </button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </article>
  );
};