import { useState, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLists } from '../context/ListContext';
import { usePlan } from '../context/PlanProvider';
import { ConfirmModal } from './ConfirmModal';
import type { Item } from '../types';

interface TopItemProps {
  item: Item;
  index: number;
  listId: string;
}

export const SortableTopItem = ({ item, index, listId }: TopItemProps) => {
  const { deleteItemFromList, editItemInList, updateItemImage } = useLists();
  const { limits } = usePlan();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDescription, setEditDescription] = useState(item.description || '');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      editItemInList(listId, item.id, editTitle.trim(), editDescription.trim() || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(item.title);
    setEditDescription(item.description || '');
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && limits.customImages) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItemImage(listId, item.id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    deleteItemFromList(listId, item.id);
    setDeleteConfirm(false);
  };

  return (
    <>
      <article
        ref={setNodeRef}
        style={style}
        className={`top-item rank-${index + 1}`}
        {...attributes}
        {...listeners}
      >
        <div className={`top-rank rank-${index + 1}`}>
          {index + 1}
        </div>
        
        <div className="top-item-content">
          {isEditing ? (
            <div className="edit-form">
              <div className="grid" style={{ gap: '0.5rem' }}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Título"
                  autoFocus
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Descripción (opcional)"
                />
              </div>
              <div className="edit-actions">
                <button 
                  onClick={handleSave}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="secondary"
                  aria-label="Guardar"
                >
                  ✓ Guardar
                </button>
                <button 
                  onClick={handleCancel}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="secondary outline"
                  aria-label="Cancelar"
                >
                  ✕ Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="top-item-image" />
              )}
              <h4>{item.title}</h4>
              {item.description && (
                <p>{item.description}</p>
              )}
            </>
          )}
        </div>

        {!isEditing && (
          <div className="top-item-actions">
            {limits.customImages && (
              <button
                onClick={() => fileInputRef.current?.click()}
                onPointerDown={(e) => e.stopPropagation()}
                className="secondary outline"
                aria-label="Añadir imagen"
              >
                📷
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              onPointerDown={(e) => e.stopPropagation()}
              className="secondary outline"
              aria-label="Editar"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              onPointerDown={(e) => e.stopPropagation()}
              className="delete-btn secondary outline"
              aria-label="Eliminar"
            >
              🗑️
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </article>

      <ConfirmModal
        isOpen={deleteConfirm}
        title="Eliminar elemento"
        message={`¿Estás seguro de que quieres eliminar "${item.title}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm(false)}
        danger={true}
      />
    </>
  );
};