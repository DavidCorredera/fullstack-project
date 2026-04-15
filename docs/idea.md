### docs/idea.md

Proyecto: Top 5 de Todo (Web App)

💡 Idea del Proyecto
Top 5 de Todo es una aplicación web minimalista y directa que permite a los usuarios crear, gestionar y visualizar sus rankings personales sobre cualquier temática imaginable (comida, películas, libros, videojuegos, lugares, etc.). La premisa principal y diferenciadora de la aplicación es que todo ranking está estrictamente limitado a un máximo de 5 posiciones (Top 5).

Dado que esta versión es puramente Front-End (sin backend real), los datos de las listas y elementos se guardarán localmente en el navegador del usuario utilizando localStorage.

🎯 Problema que intenta resolver
A menudo, cuando queremos hacer una lista de nuestros "favoritos" sobre algún tema, nos perdemos en listas interminables y nos cuesta decidir. Además, las aplicaciones de notas genéricas no ofrecen una estructura visual atractiva para rankings. "Top 5 de Todo" resuelve esto:

Forzando la concisión: Al limitar a 5 posiciones, el usuario debe pensar realmente qué es lo más importante o qué le gusta más, evitando listas abrumadoras.

Ofreciendo estructura: Provee una interfaz diseñada específicamente para visualizar rankings, mucho más atractiva que un simple documento de texto.

Inmediatez: Al ser una web app que guarda en local, no requiere registro, inicio de sesión ni conexión constante a internet para funcionar.

👤 Usuario Objetivo
Cualquier persona aficionada a categorizar, rankear y organizar sus preferencias. Desde el usuario casual que quiere hacer un Top 5 de sus restaurantes de comida rápida favoritos, hasta el cinéfilo que quiere organizar sus Top 5 de películas por director.

📋 Funcionalidades Principales (MVP)
Creación de Listas: El usuario puede crear una nueva lista indicando un título y una categoría.

Restricción Core (Top 5): El sistema solo permite añadir un máximo de 5 elementos por cada lista creada.

Gestión de Elementos: Dentro de una lista, el usuario puede añadir elementos (título y breve descripción) y eliminarlos.

Persistencia Local: Todos los datos (listas y sus elementos) se guardan automáticamente en el localStorage del navegador, por lo que no se pierden al refrescar la página.

Límites de la versión "Gratuita" (Simulada): El sistema limitará la creación a un máximo de 10 listas totales (para simular el límite del plan descrito en la idea original).

🚀 Funcionalidades Opcionales (Bonus)
Reordenamiento (Drag & Drop): Capacidad para arrastrar y soltar los elementos dentro de un Top 5 para cambiar su posición (1º, 2º, 3º...).

Modo Oscuro (Dark Mode): Interruptor para cambiar el tema visual de la aplicación.

Compartir (Simulado): Un botón que genere un texto formateado del Top 5 para que el usuario pueda copiarlo y pegarlo en redes sociales.

Edición en línea: Poder editar el texto de un elemento ya creado sin tener que borrarlo y volverlo a crear.

🔮 Posibles mejoras futuras (Fuera del alcance de este MVP local)
Migración a Backend real: Implementar autenticación de usuarios y guardar los datos en una base de datos (Ej. MongoDB o PostgreSQL) para acceder a las listas desde cualquier dispositivo.

Listas Públicas/Privadas: Permitir que los usuarios tengan un perfil público donde muestren sus Top 5 al mundo.

Imágenes: Permitir añadir una imagen de portada o un icono a cada elemento del Top 5.