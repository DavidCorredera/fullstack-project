import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    // Añadimos dark:bg-gray-900 y dark:text-gray-100 para el fondo global
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <header className="bg-indigo-600 dark:bg-indigo-800 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors">
            🏆 Top 5 de Todo
          </Link>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>Hecho con ❤️ para organizar el caos</p>
      </footer>
    </div>
  );
};