### docs/components.md

La interfaz de usuario se ha construido utilizando React y Tailwind CSS, priorizando la composición y la reutilización.

1. Tipos Compartidos (src/types/index.ts)
Para asegurar la consistencia de los datos en todos los componentes, se han definido interfaces TypeScript estrictas para la entidad TopList y la entidad Item. Esto garantiza que los componentes siempre reciban la estructura esperada (por ejemplo, validando que el límite del array items se gestione correctamente).

2. Componentes Reutilizables
Layout
Propósito: Actúa como el esqueleto principal de la aplicación.

Comportamiento: Renderiza la barra de navegación (Header) persistente y el pie de página. Utiliza el componente <Outlet /> de React Router para inyectar dinámicamente el contenido de las distintas páginas (Home o ListDetail) en el área principal de la pantalla.

ListCard
Propósito: Mostrar un resumen visual de una lista en la pantalla principal.

Props recibidas (Tipadas): * list: Un objeto de tipo TopList con toda la información.

onDelete: Una función callback que se ejecuta al hacer clic en el botón de borrar.

Características: Muestra el título, la categoría, el progreso (cuántos elementos de 5 tiene rellenados) e incluye un botón de acceso a la vista de detalle. Utiliza estados visuales de Tailwind (como group-hover) para ocultar/mostrar el botón de borrado de forma limpia.