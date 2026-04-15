import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLists } from '../context/ListContext';

export const ListDetail = () => {
  // Sacamos el ID de la URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lists, addItemToList, deleteItemFromList, deleteList } = useLists();
  
  // Buscamos la lista actual en nuestro estado global
  const list = lists.find((l) => l.id === id);

  // Estados del formulario para un nuevo elemento
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Si el usuario mete una URL de una lista que no existe
  if (!list) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista no encontrada</h2>
        <Link to="/" className="text-indigo-600 hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  // Comprobamos si ya hemos llegado al límite
  const isFull = list.items.length >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('El título del elemento es obligatorio.');
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
    if (window.confirm('¿Estás seguro de que quieres borrar este Top 5 entero?')) {
      deleteList(list.id);
      navigate('/'); // Volvemos a la home tras borrar
    }
  };

  // Función para copiar el Top 5 con formato para redes sociales
  const handleShare = async () => {
    try {
      const text = `🏆 Mi Top 5: ${list.title} (${list.category})\n\n` +
        list.items.map((item, index) => {
          const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
          return `${medals[index]} ${item.title}`;
        }).join('\n') +
        `\n\n¿Cuál es el tuyo? Crea tus listas en Top 5 de Todo 🚀`;
        
      await navigator.clipboard.writeText(text);
      alert('¡Copiado al portapapeles! Listo para pegar en tus redes.');
    } catch (err) {
      console.error('Error al copiar:', err);
      alert('Hubo un problema al copiar el texto.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Cabecera de la lista */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
        <Link to="/" className="text-sm text-indigo-600 hover:underline mb-4 inline-block">
          &larr; Volver a mis listas
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
              {list.category}
            </span>
            <h1 className="text-4xl font-black mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {list.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow"
            >
              <span>🔗</span> Compartir
            </button>
            <button 
              onClick={handleDeleteList}
              className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium border border-transparent hover:border-red-100"
            >
              Borrar
            </button>
          </div>
        </div>
    </div>

      {/* Los Elementos del Top 5 */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Los elegidos ({list.items.length}/5)</h2>
        
        {list.items.length === 0 ? (
          <p className="text-gray-500 italic py-4">Aún no has añadido nada a este Top 5.</p>
        ) : (
          list.items.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center group hover:shadow-md hover:border-indigo-200 transition-all transform hover:-translate-y-1"
            >
              <div className="text-4xl font-black text-indigo-100 w-10 text-center drop-shadow-sm group-hover:text-indigo-200 transition-colors">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-xl">{item.title}</h3>
                {item.description && <p className="text-gray-500 text-sm mt-1">{item.description}</p>}
              </div>
              <button 
                onClick={() => deleteItemFromList(list.id, item.id)}
                className="bg-red-50 text-red-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-100 hover:scale-110"
                title="Quitar del Top 5"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulario para añadir (Solo se muestra si NO está lleno) */}
      {!isFull ? (
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-900 mb-4">Añadir a la posición {list.items.length + 1}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nombre del elemento..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Breve descripción (opcional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Añadir al Top
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl text-center">
          <span className="text-4xl block mb-2">🏆</span>
          <h3 className="font-bold text-green-800 text-xl">¡Top 5 Completado!</h3>
          <p className="text-green-700 mt-1">Has alcanzado el límite máximo para esta lista.</p>
        </div>
      )}
    </div>
  );
};