# 📁 Estructura del Proyecto - Mapa Completo

```
c:\Users\romeo\OneDrive\Documentos\Trabajodesignado/
│
├── 📄 app.js                          ⭐ ARCHIVO PRINCIPAL
│   ├── Configuración de Express
│   ├── Rutas principales
│   ├── Endpoints AJAX (/api/*)
│   ├── Datos: perfil, álbumes, contactos, favoritos
│   └── Puerto: 3000
│
├── 📄 package.json                    
│   ├── Scripts: npm start, npm run dev
│   ├── Dependencias: express, ejs, body-parser
│   └── DevDependencies: nodemon
│
├── 📄 README.md                       📖 Documentación Principal
├── 📄 GUIA_USO.md                     📖 Guía Completa de Usuario
├── 📄 INICIO_RAPIDO.md                📖 Guía de 3 Pasos
├── 📄 .gitignore                      🔒 Archivos excluidos de Git
│
├── 📁 views/
│   └── 📄 index.ejs                   🎨 Plantilla HTML/EJS
│       ├── Navbar con navegación
│       ├── Sección Perfil
│       ├── Sección Álbumes
│       ├── Sección Contactos
│       ├── Sección Favoritos
│       └── Modal para fotos
│
├── 📁 public/                         🌍 Archivos Estáticos
│   │
│   ├── 📁 css/
│   │   └── 📄 styles.css              🎨 Estilos Personalizados
│   │       ├── Variables CSS
│   │       ├── Temas de color
│   │       ├── Animaciones
│   │       ├── Cards y modales
│   │       ├── Responsividad
│   │       └── Bootstrap custom
│   │
│   ├── 📁 js/
│   │   └── 📄 main.js                 ⚙️ Lógica AJAX
│   │       ├── cargarFotosAlbum()
│   │       ├── verFoto()
│   │       ├── darLike()
│   │       ├── cargarContactos()
│   │       ├── agregarFavorito()
│   │       ├── cargarFavoritos()
│   │       ├── eliminarFavorito()
│   │       └── Gestión de variables globales
│   │
│   └── 📁 images/                    🖼️ Carpeta de Imágenes
│       ├── perfil.jpg (opcional)
│       ├── album1_cover.jpg (opcional)
│       ├── viaje1.jpg (opcional)
│       └── ... (ver nota de imágenes)
│
├── 📁 routes/                        🛣️ Rutas (Extensible)
│
└── 📁 .github/
    └── 📄 copilot-instructions.md    🤖 Instrucciones de Copilot

```

## 📊 Desglose de Archivos

### Archivos Principales

#### `app.js` (250+ líneas)
**Responsabilidades:**
- Inicializar Express
- Configurar middleware
- Definir estructura de datos
- Implementar rutas GET/POST/DELETE
- Gestionar favoritos en memoria

**Endpoints:**
```
GET  /                        → Página principal
GET  /api/album/:id           → Obtener fotos del álbum
POST /api/like/:fotoId        → Aumentar likes
GET  /api/contactos           → Cargar contactos
POST /api/favoritos           → Agregar favorito
GET  /api/favoritos           → Ver favoritos
DELETE /api/favoritos/:fotoId → Eliminar favorito
```

#### `index.ejs` (200+ líneas)
**Estructura:**
- Navbar con Bootstrap
- Section Perfil (Card)
- Section Álbumes (Grid de Cards)
- Section Contactos (Botón + Contenedor)
- Section Favoritos (Botón + Contenedor)
- Modal para visualizar fotos

#### `main.js` (300+ líneas)
**Funciones:**
- `cargarFotosAlbum(albumId)` → Carga AJAX de fotos
- `cerrarGaleria()` → Vuelve a álbumes
- `verFoto()` → Abre modal con foto
- `darLike()` → POST AJAX para likes
- `cargarContactos()` → GET AJAX de contactos
- `agregarFavorito()` → POST AJAX favorito
- `cargarFavoritos()` → GET AJAX favoritos
- `eliminarFavorito()` → DELETE AJAX favorito
- `verificarFavorito()` → Verifica si está en favoritos

#### `styles.css` (300+ líneas)
**Componentes:**
- Variables CSS personalizadas
- Navbar styling
- Cards personalizadas
- Botones con gradientes
- Animaciones y transiciones
- Modal styling
- Responsividad (media queries)
- Temas de color

### Archivos de Configuración

#### `package.json`
```json
{
  "name": "app-perfil-fotos",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "ejs": "^3.1.9",
    "body-parser": "^1.20.2"
  }
}
```

#### `.gitignore`
```
node_modules/
.env
.DS_Store
*.log
.vscode/
```

### Archivos de Documentación

| Archivo | Propósito | Extensión |
|---------|-----------|-----------|
| README.md | Documentación completa | ~250 líneas |
| GUIA_USO.md | Manual de usuario | ~400 líneas |
| INICIO_RAPIDO.md | Guía rápida | ~100 líneas |
| .github/copilot-instructions.md | Meta-documentación | ~200 líneas |

## 🔌 Conexiones Entre Archivos

```
app.js
├─→ express (servidor)
├─→ body-parser (middleware)
├─→ ejs (rendering)
└─→ Datos de prueba

views/index.ejs
├─→ Bootstrap 5 CDN
├─→ public/css/styles.css
├─→ public/js/main.js
└─→ Forma formularios y modales

public/js/main.js
├─→ Fetch API (AJAX)
├─→ app.js endpoints
├─→ Bootstrap modal JS
└─→ DOM manipulation

public/css/styles.css
├─→ Bootstrap customization
├─→ CSS variables
└─→ Animaciones personalizadas
```

## 📈 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Archivos de código | 5 |
| Archivos de documentación | 4 |
| Líneas de código | ~1,200 |
| Endpoints AJAX | 7 |
| Álbumes | 3 |
| Fotos por álbum | 3 |
| Contactos | 4 |
| Dependencias | 3 |
| Dev Dependencies | 1 |
| Bootstrap Components | 5+ |
| Funciones JavaScript | 8+ |

## 🎯 Puntos Clave de Desarrollo

### Backend (Node.js/Express)
- ✅ Routing REST
- ✅ Middleware body-parser
- ✅ Gestión de datos en memoria
- ✅ Endpoints AJAX
- ✅ Respuestas JSON

### Frontend (HTML/CSS/JavaScript)
- ✅ EJS templating
- ✅ AJAX/Fetch API
- ✅ DOM manipulation
- ✅ Bootstrap 5
- ✅ Animaciones CSS3
- ✅ Responsive design

### Características
- ✅ MVC pattern básico
- ✅ Separación de responsabilidades
- ✅ AJAX sin page reload
- ✅ Data persistence (sesión)
- ✅ Error handling
- ✅ User feedback (modals, alerts)

## 🚀 Próxima Expansión

Para evolucionar el proyecto:
1. Agregar base de datos (MongoDB/SQLite)
2. Implementar autenticación
3. Crear sistema de carga de imágenes
4. Agregar comentarios
5. Implementar búsqueda/filtros
6. Agregar rutas API modulares
7. Crear temas personalizables

---

**Última actualización:** Abril 22, 2026
**Estado:** ✅ Funcional y Documentado
