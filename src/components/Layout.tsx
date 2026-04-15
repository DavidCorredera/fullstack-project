import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            🏆 Top 5 de Todo
          </Link>
          <span className="text-sm bg-indigo-800 px-3 py-1 rounded-full">
            Versión Local
          </span>
        </div>
      </header>
      
      {/* Aquí es donde React Router inyectará las diferentes páginas (Home, Detalle...) */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Hecho con ❤️ para organizar el caos</p>
      </footer>
    </div>
  );
};