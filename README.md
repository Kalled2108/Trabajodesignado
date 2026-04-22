# Mi Perfil - Aplicación Web de Álbumes de Fotos

Una aplicación web moderna desarrollada con **Node.js**, **Express**, **EJS** y **AJAX** para gestionar un perfil personal, álbumes de fotos, contactos y favoritos.

## Características

✨ **Módulos Principales:**
- 👤 **Perfil**: Información personal con foto y descripción
- 📸 **Álbumes de Fotos**: 3 álbumes con 3 fotos cada uno
- 👍 **Sistema de Reacciones**: Dar likes a las fotos
- 📋 **Contactos**: Cargados dinámicamente con AJAX
- ⭐ **Favoritos**: Guardar y gestionar fotos favoritas

## Requisitos Previos

- Node.js (v14 o superior)
- npm (administrador de paquetes de Node)

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

## Ejecución

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
.
├── app.js                 # Archivo principal del servidor Express
├── package.json          # Dependencias del proyecto
├── views/
│   └── index.ejs         # Plantilla principal
├── public/
│   ├── css/
│   │   └── styles.css    # Estilos personalizados
│   ├── js/
│   │   └── main.js       # Funciones JavaScript (AJAX)
│   └── images/           # Carpeta para imágenes
└── routes/               # Rutas (extensible)
```

## Dependencias

- **express**: ^4.18.2 - Framework web
- **ejs**: ^3.1.9 - Motor de plantillas
- **body-parser**: ^1.20.2 - Middleware para parsear JSON
- **nodemon**: ^3.0.1 - Herramienta de desarrollo

## Funcionalidades AJAX

### 1. Cargar Álbumes
```javascript
GET /api/album/:id
```
Retorna todas las fotos de un álbum específico.

### 2. Dar Like
```javascript
POST /api/like/:fotoId
```
Incrementa el contador de likes de una foto.

### 3. Obtener Contactos
```javascript
GET /api/contactos
```
Carga la lista de contactos dinámicamente.

### 4. Gestionar Favoritos
```javascript
POST /api/favoritos
GET /api/favoritos
DELETE /api/favoritos/:fotoId
```

## Cómo Agregar Imágenes

1. Coloca las imágenes en la carpeta `public/images/`:
   - Perfil: `perfil.jpg`
   - Álbumes: 
     - `album1_cover.jpg`, `viaje1.jpg`, `viaje2.jpg`, `viaje3.jpg`
     - `album2_cover.jpg`, `naturaleza1.jpg`, `naturaleza2.jpg`, `naturaleza3.jpg`
     - `album3_cover.jpg`, `familia1.jpg`, `familia2.jpg`, `familia3.jpg`

2. O utiliza URLs externas en `app.js`

## Estilos

La aplicación utiliza:
- **Bootstrap 5**: Framework CSS para diseño responsivo
- **CSS personalizado**: Animaciones, gradientes y efectos interactivos

## Tecnologías Utilizadas

- ✅ **Node.js & Express** - Backend
- ✅ **EJS** - Templating
- ✅ **AJAX** - Carga dinámica de contenido
- ✅ **Bootstrap 5** - Diseño responsivo
- ✅ **CSS3** - Animaciones y efectos

## Notas de Desarrollo

- Los favoritos se almacenan en memoria (se pierden al reiniciar)
- Para persistencia, considera usar una base de datos como MongoDB o SQLite
- Los datos de ejemplo están hardcodeados en `app.js`

## Posibles Mejoras Futuras

- [ ] Base de datos para persistencia
- [ ] Autenticación de usuarios
- [ ] Carga de imágenes
- [ ] Comentarios en fotos
- [ ] Sistema de compartir
- [ ] Notificaciones

## Licencia

ISC

---

**Desarrollado como proyecto educativo** 📚
