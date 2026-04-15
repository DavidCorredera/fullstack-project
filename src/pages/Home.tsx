import { useState } from 'react';
import { useLists } from '../context/ListContext';
import { ListCard } from '../components/ListCard';

export const Home = () => {
  const { lists, createList, deleteList } = useLists();
  
  // Estado local para controlar los inputs del formulario
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  // Manejador del formulario (Paso 10)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    setError('');

    if (!title.trim() || !category.trim()) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    const result = createList(title.trim(), category.trim());
    
    if (result.success) {
      // Limpiamos el formulario si ha ido bien
      setTitle('');
      setCategory('');
    } else {
      // Mostramos el error si hemos llegado al límite de 10 listas
      setError(result.error || 'Error desconocido');
    }
  };

  return (
    <div className="space-y-8">
      {/* Sección del Formulario */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Crear nuevo Top 5</h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Título (ej: Mis películas de terror)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Categoría (ej: Cine)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Crear
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </section>

      {/* Sección de la cuadrícula de Listas */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tus Rankings</h2>
        {lists.length === 0 ? (
          <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            Aún no has creado ninguna lista. ¡Anímate con tu primer Top 5!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {lists.map((list) => (
              <ListCard key={list.id} list={list} onDelete={deleteList} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};