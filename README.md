# 🚀 Top 5 de Todo | Fullstack Web App

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Aplicación Fullstack desarrollada con **React**, **TypeScript** y **Express**. El proyecto implementa una arquitectura por capas, gestión de estado global y una metodología de trabajo basada en Sprints.

---

## 📋 Gestión del Proyecto

El desarrollo se ha gestionado mediante **Agile/Scrum**. Puedes consultar la organización de tareas y el progreso del desarrollo en nuestro tablero:

📌 **[Ver Tablero de Trello](https://trello.com/b/AcdH9p3E/fullstack-project)**

| Estado | Descripción |
| :--- | :--- |
| **Backlog** | Requisitos y funcionalidades futuras. |
| **Todo** | Tareas preparadas para el sprint. |
| **In Progress** | Tareas en ejecución. |
| **Done** | Funcionalidades testeadas y completadas. |

---

## 🏗️ Arquitectura y Tecnologías

### Frontend
- **React + Vite**: Interfaz de usuario rápida y moderna.
- **TypeScript**: Seguridad de tipos en todo el flujo de datos.
- **Tailwind CSS**: Estilado eficiente y responsive.
- **Context API & Hooks**: Gestión de estado global y lógica reutilizable.
- **API Client**: Cliente tipado para consumo de endpoints.

### Backend
- **Express**: Servidor robusto y escalable.
- **Arquitectura por capas**: Separación de rutas, controladores y servicios.
- **Persistencia**: Manejo de datos mediante API/Backend (fuente única de verdad).

---

## 📂 Estructura del Repositorio

```text
├── docs/                # Documentación del proceso y metodologías
├── server/              # Código del Backend (Node/Express)
│   ├── src/
│   │   ├── routes/      # Definición de endpoints REST
│   │   ├── controllers/ # Gestión de peticiones y respuestas
│   │   └── services/    # Lógica de negocio y procesamiento
└── src/                 # Código del Frontend (React/TS)
    ├── api/             # Cliente de red y contratos de tipos
    ├── components/      # UI Reutilizable
    ├── context/         # Estado global de la aplicación
    ├── hooks/           # Lógica personalizada (Custom Hooks)
    ├── pages/           # Vistas y navegación
    └── types/           # Definiciones de TypeScript
```

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el proyecto
```bash
git clone https://github.com/DavidCorredera/fullstack-project.git
cd fullstack-project
```

### 2. Levantar el Backend
```bash
cd server
npm install
npm run dev
```

### 3. Levantar el Frontend
```bash
# En una terminal nueva, desde la raíz del proyecto
npm install
npm run dev
```

---

## 📖 Documentación Detallada

Para más información sobre el proceso de construcción, consulta la carpeta [`/docs`](./docs/):
* [Investigación Agile](./docs/agile.md)
* [Definición de la Idea](./docs/idea.md)
* [Diseño y Arquitectura](./docs/design.md)
* [Documentación de API](./docs/api.md)
* [Retrospectiva](./docs/retrospective.md)

---

## 🚀 Despliegue

* 🌐 **Frontend:** [Añade el Link a Vercel/Netlify aquí]
* 🖥️ **Backend:** [Añade el Link a Railway/Render aquí]

---