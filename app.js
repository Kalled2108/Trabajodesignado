const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Helpers para Persistencia
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer la base de datos:', err);
    return { perfil: {}, albumes: [], contactos: [], favoritos: [] };
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al escribir en la base de datos:', err);
  }
};

// Configurar Multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Solo se permiten imágenes!"));
  }
});

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  const db = readDB();
  res.render('index', { 
    perfil: db.perfil, 
    albumes: db.albumes, 
    contactos: db.contactos 
  });
});


// AJAX - Actualizar perfil
app.post('/api/perfil', upload.single('foto'), (req, res) => {
  const db = readDB();
  const { nombre, descripcion } = req.body;
  if (nombre) db.perfil.nombre = nombre;
  if (descripcion) db.perfil.descripcion = descripcion;
  if (req.file) {
    db.perfil.foto = '/uploads/' + req.file.filename;
  }
  writeDB(db);
  res.json({ success: true, perfil: db.perfil });
});

// AJAX - Obtener fotos de un álbum
app.get('/api/album/:id', (req, res) => {
  const db = readDB();
  const album = db.albumes.find(a => a.id === parseInt(req.params.id));
  if (album) {
    res.json(album.fotos);
  } else {
    res.status(404).json({ error: 'Álbum no encontrado' });
  }
});

// AJAX - Añadir foto a un álbum
app.post('/api/album/:id/foto', upload.single('foto'), (req, res) => {
  const db = readDB();
  const album = db.albumes.find(a => a.id === parseInt(req.params.id));
  if (album) {
    const { titulo } = req.body;
    if (!titulo || !req.file) {
      return res.status(400).json({ error: 'Título y archivo son requeridos' });
    }
    const nuevaFoto = {
      id: Date.now(),
      src: '/uploads/' + req.file.filename,
      titulo,
      likes: 0
    };
    album.fotos.push(nuevaFoto);
    writeDB(db);
    res.json({ success: true, foto: nuevaFoto });
  } else {
    res.status(404).json({ error: 'Álbum no encontrado' });
  }
});

// AJAX - Dar like a una foto
app.post('/api/like/:fotoId', (req, res) => {
  const db = readDB();
  for (let album of db.albumes) {
    const foto = album.fotos.find(f => f.id === parseInt(req.params.fotoId));
    if (foto) {
      foto.likes += 1;
      writeDB(db);
      return res.json({ success: true, likes: foto.likes });
    }
  }
  res.status(404).json({ error: 'Foto no encontrada' });
});

// AJAX - Obtener contactos
app.get('/api/contactos', (req, res) => {
  const db = readDB();
  res.json(db.contactos);
});

// AJAX - Añadir contacto
app.post('/api/contactos', (req, res) => {
  const db = readDB();
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email || !telefono) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  const nuevoContacto = {
    id: Date.now(),
    nombre,
    email,
    telefono
  };
  db.contactos.push(nuevoContacto);
  writeDB(db);
  res.json({ success: true, contacto: nuevoContacto });
});

// AJAX - Agregar a favoritos
app.post('/api/favoritos', (req, res) => {
  const db = readDB();
  const { fotoId } = req.body;
  if (!db.favoritos.find(f => f === fotoId)) {
    db.favoritos.push(fotoId);
    writeDB(db);
    res.json({ success: true, favorito: true });
  } else {
    res.json({ success: true, favorito: false, message: 'Ya está en favoritos' });
  }
});

// AJAX - Obtener favoritos
app.get('/api/favoritos', (req, res) => {
  const db = readDB();
  res.json(db.favoritos);
});

// AJAX - Eliminar de favoritos
app.delete('/api/favoritos/:fotoId', (req, res) => {
  const db = readDB();
  const index = db.favoritos.indexOf(parseInt(req.params.fotoId));
  if (index > -1) {
    db.favoritos.splice(index, 1);
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'No encontrado en favoritos' });
  }
});

// AJAX - Eliminar contacto
app.delete('/api/contactos/:id', (req, res) => {
  const db = readDB();
  const index = db.contactos.findIndex(c => c.id === parseInt(req.params.id));
  if (index > -1) {
    db.contactos.splice(index, 1);
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Contacto no encontrado' });
  }
});

// AJAX - Eliminar foto de un álbum
app.delete('/api/album/:albumId/foto/:fotoId', (req, res) => {
  const db = readDB();
  const album = db.albumes.find(a => a.id === parseInt(req.params.albumId));
  if (album) {
    const index = album.fotos.findIndex(f => f.id === parseInt(req.params.fotoId));
    if (index > -1) {
      album.fotos.splice(index, 1);
      writeDB(db);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Foto no encontrada en el álbum' });
    }
  } else {
    res.status(404).json({ error: 'Álbum no encontrado' });
  }
});

// AJAX - Eliminar álbum
app.delete('/api/album/:id', (req, res) => {
  const db = readDB();
  const index = db.albumes.findIndex(a => a.id === parseInt(req.params.id));
  if (index > -1) {
    db.albumes.splice(index, 1);
    writeDB(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Álbum no encontrado' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
