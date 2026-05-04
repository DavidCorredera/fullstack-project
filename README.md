# 🏆 Top 5

Una aplicación web moderna para crear, organizar y compartir tus listas de favoritos con un diseño minimalista y profesional.

## ✨ Características

- **Creación de listas ilimitadas** (según plan) para organizar tus Top 5 favoritos
- **Arrastrar y soltar** para reordenar tanto listas como elementos
- **Soporte para imágenes personalizadas** en listas y elementos (Plan Premium+)
- **Tema personalizable** con selector de colores por lista (Plan Ultimate)
- **Compartir** tus Top 5 en redes sociales con formato optimizado
- **Exportar** listas a JSON (Plan Premium+)
- **Diseño dark mode profesional** con PICO CSS
- **Animaciones suaves** y transiciones elegantes
- **Totalmente responsive** - funciona en móvil, tablet y desktop
- **Almacenamiento local** - tus datos se guardan en tu navegador

## 🚀 Tecnologías

- **React 19** - Biblioteca de UI moderna
- **TypeScript** - Tipado estático para mayor robustez
- **Vite** - Bundler ultrarrápido
- **PICO CSS** - Framework CSS minimalista y elegante
- **@dnd-kit** - Drag & drop accesible y fluido
- **React Router v7** - Enrutamiento moderno
- **LocalStorage API** - Persistencia de datos local

## 📦 Instalación

```bash
npm install
npm run dev
```

## 📋 Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 💎 Planes

| Característica | Gratis | Starter | Premium | Ultimate |
|---------------|--------|---------|---------|----------|
| Listas | 10 | 25 | 50 | Ilimitadas |
| Elementos por lista | 5 | 7 | 10 | Ilimitados |
| Compartir | ✓ | ✓ | ✓ | ✓ |
| Exportar JSON | ✕ | ✕ | ✓ | ✓ |
| Imágenes personalizadas | ✕ | ✕ | ✓ | ✓ |
| Tema personalizado | ✕ | ✕ | ✕ | ✓ |
| Soporte prioritario | ✕ | ✕ | ✕ | ✓ |
| Precio | 0€ | 2.99€/mes | 4.99€/mes | 9.99€/mes |

## 🎨 Características de UI/UX

- **Header minimalista** con navegación intuitiva
- **Grid de listas** con cards animadas al hacer hover
- **Vista de detalle** con rankings visuales (medallas 1-5)
- **Formularios elegantes** con validación en tiempo real
- **Modales de confirmación** para eliminaciones
- **Empty states** atractivos cuando no hay contenido
- **Footer profesional** adaptado al contenido

## 📂 Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx     # Layout principal con header/footer
│   ├── ListCard.tsx   # Card de lista (legacy)
│   ├── SortableListCard.tsx  # Card arrastrable
│   ├── SortableTopItem.tsx  # Item arrastrable
│   └── ConfirmModal.tsx     # Modal de confirmación
├── context/            # Context API
│   ├── ListContext.ts      # Contexto de listas
│   ├── ListProvider.tsx    # Provider de listas
│   ├── PlanProvider.tsx    # Provider de planes
│   └── PlanContext.ts      # Contexto de planes
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx       # Página principal
│   ├── ListDetail.tsx # Detalle de lista
│   ├── Plans.tsx      # Página de planes
│   └── NotFound.tsx   # Página 404
├── hooks/              # Custom hooks
│   └── useLocalStorage.ts
├── types/              # Definiciones de TypeScript
│   └── index.ts
├── App.tsx            # Configuración de rutas
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales y variables CSS
```

## 🔧 Próximas mejoras

- [ ] Sincronización en la nube
- [ ] Autenticación de usuarios
- [ ] Compartir listas con enlace público
- [ ] Más opciones de personalización
- [ ] PWA (Progressive Web App)
- [ ] Integración con redes sociales

## 📄 Licencia

MIT

---

Hecho con ❤️ para organizar el caos de tus favoritos.