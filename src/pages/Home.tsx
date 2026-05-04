import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useLists } from '../context/ListContext';
import { usePlan } from '../context/PlanProvider';
import { SortableListCard } from '../components/SortableListCard';
import { ConfirmModal } from '../components/ConfirmModal';

export const Home = () => {
  const { lists, createList, reorderLists, deleteList } = useLists();
  const { limits } = usePlan();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; listId?: string }>({ isOpen: false });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !category.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const result = createList(title.trim(), category.trim());
    
    if (result.success) {
      setTitle('');
      setCategory('');
    } else {
      setError(result.error || 'Error desconocido');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = lists.findIndex((list) => list.id === active.id);
      const newIndex = lists.findIndex((list) => list.id === over.id);
      reorderLists(oldIndex, newIndex);
    }
  };

  const handleDeleteClick = (listId: string) => {
    setDeleteConfirm({ isOpen: true, listId });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.listId) {
      deleteList(deleteConfirm.listId);
    }
    setDeleteConfirm({ isOpen: false });
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({ isOpen: false });
  };

  const hasLists = lists.length > 0;

  return (
    <div className="slide-up">
      <section className="form-section">
        <h3>Crear nuevo Top 5</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid">
            <input
              type="text"
              placeholder="Título (ej: Mis películas favoritas)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Título de la lista"
            />
            <input
              type="text"
              placeholder="Categoría (ej: Cine)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Categoría"
            />
          </div>
          <button type="submit" className="secondary">
            Crear Lista
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>

      <section style={{ marginTop: '2.5rem' }}>
        <h3>Tus Rankings ({lists.length}/{limits.maxLists === -1 ? '∞' : limits.maxLists})</h3>
        
        {!hasLists ? (
          <div className="empty-state">
            <p>Aún no has creado ninguna lista.</p>
            <p><small>¡Crea tu primer Top 5 arriba!</small></p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={lists.map((l) => l.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid-lists">
                {lists.map((list, index) => (
                  <SortableListCard 
                    key={list.id} 
                    list={list} 
                    index={index}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </section>

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Eliminar lista"
        message="¿Estás seguro de que quieres eliminar esta lista? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        danger={true}
      />
    </div>
  );
};