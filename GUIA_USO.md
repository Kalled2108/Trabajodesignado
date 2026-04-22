# 📖 Guía Completa de Uso - Aplicación de Perfil y Fotos

## 🎯 Funcionalidades Detalladas

### 1️⃣ PERFIL DE USUARIO
**Ubicación:** Sección superior de la página

**Características:**
- Foto del perfil en alta resolución
- Nombre del usuario
- Descripción personal
- Diseño con degradado atractivo

**Cómo usar:**
- Solo visualización, no hay interacción requerida
- La información se carga automáticamente

---

### 2️⃣ ÁLBUMES DE FOTOS
**Ubicación:** Sección "Mis Álbumes"

**Características:**
- 3 álbumes diferentes
- Cada álbum contiene 3 fotos
- Portada visual del álbum
- Contador de fotos

**Cómo usar:**
1. Haz clic en cualquier álbum
2. Se expandirá la galería del álbum
3. Verás todas las fotos del álbum
4. Puedes volver con el botón "← Volver a Álbumes"

**Álbumes disponibles:**
| Álbum | Fotos | Descripción |
|---|---|---|
| 🗺️ Viajes | Playa, Montaña, Ciudad | Momentos de aventura |
| 🌿 Naturaleza | Bosque, Río, Flores | Belleza natural |
| 👨‍👩‍👧‍👦 Familia | Reunión, Picnic, Celebración | Momentos especiales |

---

### 3️⃣ SISTEMA DE LIKES (REACCIONES)
**Ubicación:** En cada foto de la galería y en el modal

**Características:**
- Contador de likes por foto
- Botón para dar más likes
- Visualización en tiempo real
- Modal grande para ver detalles

**Cómo usar:**
1. Haz clic en cualquier foto para abrirla en un modal
2. Verás el contador de likes actual
3. Haz clic en el botón "👍" para aumentar likes
4. El contador se actualiza automáticamente
5. Cierra el modal con el botón "Cerrar" o la X

**Datos:**
- Cada foto tiene un contador inicial de likes
- Los likes se almacenan en memoria del servidor

---

### 4️⃣ CONTACTOS (AJAX DINÁMICO)
**Ubicación:** Sección "Mis Contactos"

**Características:**
- 4 contactos disponibles
- Información: nombre, email, teléfono
- Carga dinámica sin recargar página
- Botón toggle para mostrar/ocultar
- Estilos con gradiente atractivo

**Cómo usar:**
1. Haz clic en "Cargar Contactos"
2. Se cargarán dinámicamente los 4 contactos
3. Cada tarjeta de contacto muestra:
   - 📧 Email (clickeable para enviar correo)
   - 📱 Número de teléfono
4. Haz clic nuevamente para ocultar los contactos

**Contactos disponibles:**
| Nombre | Email | Teléfono |
|---|---|---|
| María García | maria@email.com | 123-456-7890 |
| Carlos López | carlos@email.com | 123-456-7891 |
| Ana Martínez | ana@email.com | 123-456-7892 |
| Pedro Sánchez | pedro@email.com | 123-456-7893 |

---

### 5️⃣ FOTOS FAVORITAS
**Ubicación:** Sección "Fotos Favoritas"

**Características:**
- Guardar fotos favoritas
- Ver todas tus fotos favoritas en un solo lugar
- Eliminar de favoritos
- Persistencia en la sesión actual

**Cómo usar:**

#### Agregar a Favoritos (3 formas):

**Opción A: Desde el Modal**
1. Abre cualquier foto haciendo clic en ella
2. Haz clic en "⭐ Agregar a Favoritos"
3. Se agregará a tu lista de favoritos

**Opción B: Desde la Galería**
1. En la galería del álbum, busca el botón ⭐
2. Haz clic en el botón amarillo en cada foto
3. Se agregará rápidamente sin abrir modal

**Opción C: Desde Favoritos**
1. Ya agregada, el botón mostrará "⭐ Agregado a Favoritos" (deshabilitado)

#### Ver Tus Favoritos:
1. Desplázate a la sección "Fotos Favoritas"
2. Haz clic en "Mostrar Favoritos"
3. Se cargarán todas tus fotos favoritas
4. Verás cada foto con sus likes y opción de eliminar
5. Haz clic en el botón 🗑️ para eliminar

---

## 🧭 Navegación General

### Barra de Navegación
En la parte superior hay un menú rápido:
- 📸 Mi Perfil - Vuelve al inicio
- Perfil - Va a la sección de perfil
- Álbumes - Va a la sección de álbumes
- Contactos - Va a la sección de contactos
- Favoritos - Va a la sección de favoritos

### Scroll Automático
Cuando cargas un álbum o cambias de sección, la página hace scroll automático a esa área.

---

## 💾 Persistencia de Datos

### Lo que se conserva:
- ✅ Likes en fotos (mientras el servidor esté activo)
- ✅ Favoritos agregados (durante la sesión actual)

### Lo que NO se conserva:
- ❌ Favoritos después de cerrar el servidor
- ❌ Cambios en perfiles o contactos

**Nota:** Para persistencia permanente, será necesario conectar una base de datos.

---

## 🎨 Características de Diseño

### Temas de Color
- **Principal:** Azul (#007bff)
- **Secundario:** Púrpura (#764ba2)
- **Fondos:** Gradientes modernos
- **Textos:** Blanco sobre fondo oscuro

### Animaciones
- ✨ Fade-in al cargar contenido
- 🎞️ Transiciones suaves en botones
- 📸 Zoom en imágenes al pasar el mouse
- 📊 Elevación de cards en hover

### Responsividad
- 📱 Optimizado para teléfonos
- 📱 Optimizado para tablets
- 💻 Optimizado para desktop
- 🎯 Interfaz adaptativa

---

## ⌨️ Atajos y Tips

### Tips Útiles
1. **Email directo:** Haz clic en el email de un contacto para abrir tu cliente de correo
2. **Modal rápido:** Cada foto abre un modal grande para mejor visualización
3. **Filtrado mental:** Los favoritos se muestran separados para gestión fácil
4. **Contador real-time:** Los likes se actualizan al instante
5. **Experiencia fluida:** Todo funciona con AJAX sin recargar página

### Navegación Rápida
- Usa el navbar superior para saltar entre secciones
- Usa "Volver a Álbumes" para regresar desde la galería
- Haz scroll para navegar entre secciones

---

## 🛠️ Solución de Problemas

### Las fotos no cargan
**Solución:** Verifica tu conexión a internet (usa imágenes placeholder online)

### Los contactos no aparecen
**Solución:** Espera a que AJAX termine de cargar, luego haz clic nuevamente

### Los likes no aumentan
**Solución:** Intenta actualizar la página o cierra y abre el modal nuevamente

### Favoritos vacíos
**Solución:** Agrega fotos usando cualquiera de las 3 opciones mencionadas

---

## 📊 Ejemplo de Flujo Completo

1. **Inicio** → Ves el perfil de Juan
2. **Explora** → Haz clic en "Viajes"
3. **Interactúa** → Abre la foto "Playa"
4. **Dale like** → Haz clic en 👍 (pasa de 5 a 6)
5. **Guarda** → Haz clic en ⭐ Agregar a Favoritos
6. **Ve contactos** → Haz clic en "Cargar Contactos"
7. **Consulta favoritos** → Ve en la sección "Fotos Favoritas"
8. **Gestiona** → Puedes eliminar con 🗑️

---

## 📞 Support

Para reportar issues o sugerir mejoras, revisa el `README.md` o consulta a tu desarrollador.

**¡Disfruta la aplicación!** 🎉
