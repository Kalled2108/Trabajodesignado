# 🚀 INICIO RÁPIDO - 3 PASOS

## Paso 1: Instalar Dependencias
```bash
npm install
```
Espera a que termine. Debería ver un mensaje como:
```
added 104 packages
```

## Paso 2: Iniciar el Servidor
```bash
npm start
```
Deberías ver:
```
Servidor ejecutándose en http://localhost:3000
```

## Paso 3: Abrir en el Navegador
Copia y pega esto en tu navegador:
```
http://localhost:3000
```

---

## ✅ Verificar que todo funciona

1. ✔️ ¿Se carga la página? → ¡Bien!
2. ✔️ ¿Ves el perfil de Juan? → ¡Bien!
3. ✔️ ¿Puedes hacer clic en un álbum? → ¡Bien!
4. ✔️ ¿Se cargan los contactos? → ¡Bien!
5. ✔️ ¿Puedes agregar a favoritos? → ¡Bien!

---

## 🛑 Detener el Servidor
En la terminal, presiona: `Ctrl + C`

---

## 🔄 Modo Desarrollo (con auto-reload)
```bash
npm run dev
```
Esto usa nodemon para recargar automáticamente cuando cambies archivos.

---

## 📱 Características Probadas
- ✅ Perfil personal
- ✅ Álbumes de fotos (3 álbumes × 3 fotos)
- ✅ Sistema de likes
- ✅ Contactos AJAX
- ✅ Favoritos (guardar/eliminar)
- ✅ Interfaz responsiva
- ✅ Animaciones CSS

---

## 📂 Archivos Importantes
- `app.js` → Lógica del servidor
- `views/index.ejs` → HTML/Plantilla
- `public/js/main.js` → AJAX y funciones
- `public/css/styles.css` → Estilos personalizados

---

## 🎓 Próximos Pasos (Personalización)

### Cambiar nombre del perfil
Abre `app.js` y busca:
```javascript
const perfil = {
  nombre: 'Tu Nombre',
  descripcion: 'Tu descripción',
```

### Agregar más fotos
En `app.js`, agrega elementos al array `fotos` dentro de cada álbum:
```javascript
{ id: 10, src: 'https://url-imagen.jpg', titulo: 'Título', likes: 0 }
```

### Cambiar puerto
Si el puerto 3000 está en uso, cambia en `app.js`:
```javascript
const PORT = 3001; // o el puerto que prefieras
```

---

## 🆘 Errores Comunes

| Error | Solución |
|---|---|
| `npm: command not found` | Instala Node.js desde nodejs.org |
| `Port 3000 already in use` | Cambia el puerto en app.js o cierra otra app |
| `Cannot find module 'express'` | Ejecuta `npm install` nuevamente |
| `Imágenes no cargan` | Necesitas conexión a internet para URLs placeholder |

---

## 📞 Ayuda

Consulta:
- `README.md` para documentación completa
- `GUIA_USO.md` para usar la aplicación
- `.github/copilot-instructions.md` para info del proyecto

---

**¡Listo para empezar!** 🎉
