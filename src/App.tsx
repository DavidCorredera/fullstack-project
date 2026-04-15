// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ListDetail } from './pages/ListDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout envuelve a todas las páginas para mantener el Menú arriba */}
        <Route path="/" element={<Layout />}>
          
          {/* Ruta principal (/) */}
          <Route index element={<Home />} />
          
          {<Route path="list/:id" element={<ListDetail />} />}

          {/* Ruta error 404 */}
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;