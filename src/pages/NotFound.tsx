import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="not-found slide-up">
      <h1>404</h1>
      <h2>¡Ups! Página no encontrada</h2>
      <p>La página que buscas no existe en tu Top 5.</p>
      <Link to="/" className="contrast button">Volver al Inicio</Link>
    </div>
  );
};