# Aplicación Web de Perfil y Álbumes de Fotos

**Estado del Proyecto:** ✅ Completado y Funcional

## 📋 Resumen

Aplicación web desarrollada con **Node.js**, **Express**, **EJS** y **AJAX** que permite:
- Mostrar un perfil personal con foto y descripción
- Gestionar 3 álbumes de fotos (3 fotos cada uno)
- Sistema de reacciones (likes) en fotos
- Carga dinámica de contactos con AJAX
- Guardar y gestionar fotos favoritas
- Interfaz responsiva con Bootstrap 5 y animaciones CSS

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar Servidor
```bash
npm start
```
O en modo desarrollo:
```bash
npm run dev
```

### 3. Acceder a la Aplicación
Abre en el navegador: `http://localhost:3000`

## ✨ Características Implementadas

### 1. **Perfil de Usuario**
- Foto del usuario
- Nombre y descripción
- Diseño atractivo con gradiente

### 2. **Álbumes de Fotos**
- 3 Álbumes principales:
  - **Viajes**: Playa, Montaña, Ciudad
  - **Naturaleza**: Bosque, Río, Flores
  - **Familia**: Reunión, Picnic, Celebración
- Sistema de clic para expandir galería
- Botón para volver a la vista de álbumes

### 3. **Sistema de Likes (Reacciones)**
- Contador de likes por foto
- Modal para visualizar fotos en detalle
- Botón para incrementar likes (POST AJAX)
- Contador actualizado en tiempo real

### 4. **Contactos (AJAX)**
- Carga dinámica de 4 contactos
- Información: nombre, email, teléfono
- Botón toggle para mostrar/ocultar
- Diseño con tarjetas con gradiente

### 5. **Sistema de Favoritos**
- Agregar fotos a favoritos desde modal
- Guardar desde galería con botón rápido
- Ver todas las fotos favoritas
- Eliminar de favoritos con botón papelera

## 🛠️ Estructura del Proyecto

```
app-perfil-fotos/
├── app.js                    # Servidor Express principal
├── package.json              # Dependencias
├── README.md                 # Documentación
├── .gitignore                # Archivos excluidos
├── views/
│   └── index.ejs            # Plantilla principal
├── public/
│   ├── css/
│   │   └── styles.css       # Estilos personalizados
│   ├── js/
│   │   └── main.js          # Lógica AJAX y interactividad
│   └── images/              # Carpeta de imágenes
└── routes/                   # Extensible para rutas adicionales
```

## 📡 Endpoints API

### Álbumes
- `GET /api/album/:id` - Obtener fotos de un álbum

### Likes
- `POST /api/like/:fotoId` - Incrementar likes de una foto

### Contactos
- `GET /api/contactos` - Obtener lista de contactos

### Favoritos
- `POST /api/favoritos` - Agregar a favoritos
- `GET /api/favoritos` - Obtener fotos favoritas
- `DELETE /api/favoritos/:fotoId` - Eliminar de favoritos

## 🎨 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| Node.js | 14+ | Runtime JavaScript |
| Express | 4.18.2 | Framework web backend |
| EJS | 3.1.9 | Motor de plantillas |
| Bootstrap | 5.3.0 | Framework CSS |
| AJAX/Fetch | - | Comunicación asíncrona |
| CSS3 | - | Estilos y animaciones |

## 🖼️ Personalización

### Cambiar Imágenes
Edita el archivo `app.js` en las secciones de perfil y álbumes:
```javascript
foto: 'https://tu-url-imagen.jpg'
```

### Agregar Más Álbumes
1. Abre `app.js`
2. Agrega un nuevo objeto al array `albumes`
3. Incluye id único, nombre, foto de portada y array de fotos

### Modificar Contactos
Edita el array `contactos` en `app.js`:
```javascript
const contactos = [
  { id: 1, nombre: 'Nombre', email: 'correo@email.com', telefono: '123-456-7890' }
];
```

## 📱 Responsive Design

La aplicación es completamente responsiva:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

## 🔒 Consideraciones

- Los favoritos se almacenan en memoria (se pierden al reiniciar)
- Los datos están hardcodeados (sin base de datos)
- Las imágenes placeholder pueden no cargar si no hay conexión a internet

## 📚 Futuras Mejoras

- [ ] Base de datos (MongoDB/SQLite)
- [ ] Autenticación de usuarios
- [ ] Sistema de carga de imágenes
- [ ] Comentarios en fotos
- [ ] Sistema de compartir
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda y filtros

## 🐛 Troubleshooting

### El servidor no inicia
```bash
npm install
```

### Puerto 3000 en uso
Cambiar puerto en `app.js`:
```javascript
const PORT = 3001; // Cambiar número
```

### Las imágenes no cargan
Verifica la conexión a internet o carga imágenes locales en `public/images/`

## 📝 Notas de Desarrollo

- Usar `npm run dev` para desarrollo con nodemon
- Editar archivos EJS en `views/`
- Estilos en `public/css/styles.css`
- Lógica AJAX en `public/js/main.js`
- Rutas servidor en `app.js`

## 👨‍💻 Autor

Desarrollado como proyecto educativo

## 📄 Licencia

ISC

---

**¿Preguntas?** Consulta el `README.md` para más detalles.
