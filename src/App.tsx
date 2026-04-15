// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
// Importaremos ListDetail en el siguiente paso

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout envuelve a todas las páginas para mantener el Menú arriba */}
        <Route path="/" element={<Layout />}>
          
          {/* Ruta principal (/) */}
          <Route index element={<Home />} />
          
          {/* Aquí irá la ruta de detalles: <Route path="list/:id" element={<ListDetail />} /> */}

          {/* Ruta comodín para el Error 404 */}
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;