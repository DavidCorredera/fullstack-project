import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useLists } from '../context/ListContext';
import { usePlan } from '../context/PlanProvider';
import { SortableTopItem } from '../components/SortableTopItem';
import { ConfirmModal } from '../components/ConfirmModal';

export const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lists, addItemToList, deleteList, reorderItems, updateListCustomColor, updateListCustomImage } = useLists();
  const { limits } = usePlan();
  
  const list = lists.find((l) => l.id === id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  if (!list) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>Lista no encontrada</h2>
        <p>La lista que buscas no existe.</p>
        <Link to="/" className="contrast button">Volver al inicio</Link>
      </div>
    );
  }

  const maxItems = limits.maxItems > 0 ? limits.maxItems : Infinity;
  const isFull = list.items.length >= maxItems;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título es obligatorio.');
      return;
    }

    const result = addItemToList(list.id, {
      title: title.trim(),
      description: description.trim() || undefined,
    });

    if (result.success) {
      setTitle('');
      setDescription('');
    } else {
      setError(result.error || 'Error al añadir el elemento');
    }
  };

  const handleDeleteList = () => {
    setDeleteConfirm({ isOpen: true, listId: list.id });
  };

  const handleShare = async () => {
    try {
      const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
      const text = `🏆 Mi Top 5: ${list.title} (${list.category})\n\n` +
        list.items.map((item, index) => {
          return `${medals[index]} ${item.title}${item.description ? `\n   ${item.description}` : ''}`;
        }).join('\n') +
        `\n\n🔥 ¿Cuál es el tuyo? Crea el tuyo en Top 5`;
        
      await navigator.clipboard.writeText(text);
      alert('¡Copiado al portapapeles!');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = list.items.findIndex((item) => item.id === active.id);
      const newIndex = list.items.findIndex((item) => item.id === over.id);
      reorderItems(list.id, oldIndex, newIndex);
    }
  };

  const handleConfirmDelete = () => {
    deleteList(list.id);
    navigate('/');
    setDeleteConfirm({ isOpen: false });
  };

  const handleCancelDelete = () => {
    setDeleteConfirm({ isOpen: false });
  };

  return (
    <div className="slide-up">
      <Link to="/" className="back-link">
        &larr; Volver a mis listas
      </Link>

      {list.customImage && (
        <img src={list.customImage} alt={list.title} className="list-header-image" />
      )}

      <div className="list-header" style={list.customColor ? { borderBottomColor: list.customColor } : undefined}>
        <div className="list-meta">
          <span className="list-category">{list.category}</span>
          <h1 className="list-title">{list.title}</h1>
        </div>
        <div className="list-actions">
          {limits.customTheme && (
            <div className="color-picker-section">
              <button
                className="color-picker-btn"
                onClick={() => {
                  const color = list.customColor || '#6366f1';
                  updateListCustomColor(list.id, color);
                }}
                title="Cambiar color"
              >
                <input
                  type="color"
                  value={list.customColor || '#6366f1'}
                  onChange={(e) => updateListCustomColor(list.id, e.target.value)}
                  style={{ width: 24, height: 24, padding: 0, border: 'none' }}
                />
                Color
              </button>
              {list.customColor && (
                <button
                  className="remove-color-btn"
                  onClick={() => updateListCustomColor(list.id, undefined)}
                  title="Quitar color"
                >
                  ✕
                </button>
              )}
              {limits.customImages && (
                <button
                  className="color-picker-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Subir imagen"
                >
                  📷 Imagen
                </button>
              )}
            </div>
          )}
          <button onClick={handleShare} className="secondary outline" aria-label="Compartir">
            📋 Compartir
          </button>
          <button onClick={handleDeleteList} className="secondary outline contrast" aria-label="Eliminar">
            🗑️ Eliminar
          </button>
        </div>
      </div>

      <div className="top-list">
        <h4 className="item-count">
          Los elegidos ({list.items.length}/{limits.maxItems === -1 ? '∞' : limits.maxItems}) — Arrastra para reordenar
        </h4>
        
        {list.items.length === 0 ? (
          <div className="empty-state">
            <p>Aún no has añadido nada a este Top 5.</p>
            <p><small>¡Añade tu primer elemento!</small></p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={list.items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {list.items.map((item, index) => (
                <SortableTopItem
                  key={item.id}
                  item={item}
                  index={index}
                  listId={list.id}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      {!isFull ? (
        <div className="form-section">
          <h3>Añadir a la posición {list.items.length + 1}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del elemento..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Nombre del elemento"
            />
            <input
              type="text"
              placeholder="Breve descripción (opcional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Descripción"
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="secondary">
              Añadir al Top
            </button>
          </form>
        </div>
      ) : (
        <div className="complete-badge">
          <span style={{ fontSize: '2.5rem' }}>🏆</span>
          <div>
            <h3>¡Top 5 Completado!</h3>
            <p>Has alcanzado el límite máximo. ¡Excelente elección!</p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              updateListCustomImage(list.id, reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }}
        style={{ display: 'none' }}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Eliminar lista"
        message="¿Estás seguro de que quieres eliminar esta lista? Se borrarán todos los elementos. Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        danger={true}
      />
    </div>
  );
};