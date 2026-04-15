import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">¡Ups! Esta página no existe en tu Top 5.</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
};