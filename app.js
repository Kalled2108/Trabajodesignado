const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Datos del perfil
const perfil = {
  nombre: 'Juan Pérez',
  descripcion: 'Amante de la fotografía y las aventuras',
  foto: 'https://via.placeholder.com/400x300?text=Perfil'
};

// Datos de álbumes y fotos
const albumes = [
  {
    id: 1,
    nombre: 'Viajes',
    foto: 'https://via.placeholder.com/300x200?text=Album+Viajes',
    fotos: [
      { id: 1, src: 'https://via.placeholder.com/400x300?text=Playa', titulo: 'Playa', likes: 5 },
      { id: 2, src: 'https://via.placeholder.com/400x300?text=Montaña', titulo: 'Montaña', likes: 8 },
      { id: 3, src: 'https://via.placeholder.com/400x300?text=Ciudad', titulo: 'Ciudad', likes: 3 }
    ]
  },
  {
    id: 2,
    nombre: 'Naturaleza',
    foto: 'https://via.placeholder.com/300x200?text=Album+Naturaleza',
    fotos: [
      { id: 4, src: 'https://via.placeholder.com/400x300?text=Bosque', titulo: 'Bosque', likes: 12 },
      { id: 5, src: 'https://via.placeholder.com/400x300?text=Rio', titulo: 'Río', likes: 7 },
      { id: 6, src: 'https://via.placeholder.com/400x300?text=Flores', titulo: 'Flores', likes: 15 }
    ]
  },
  {
    id: 3,
    nombre: 'Familia',
    foto: 'https://via.placeholder.com/300x200?text=Album+Familia',
    fotos: [
      { id: 7, src: 'https://via.placeholder.com/400x300?text=Reunion', titulo: 'Reunión', likes: 20 },
      { id: 8, src: 'https://via.placeholder.com/400x300?text=Picnic', titulo: 'Picnic', likes: 18 },
      { id: 9, src: 'https://via.placeholder.com/400x300?text=Celebracion', titulo: 'Celebración', likes: 22 }
    ]
  }
];

// Datos de contactos
const contactos = [
  { id: 1, nombre: 'María García', email: 'maria@email.com', telefono: '123-456-7890' },
  { id: 2, nombre: 'Carlos López', email: 'carlos@email.com', telefono: '123-456-7891' },
  { id: 3, nombre: 'Ana Martínez', email: 'ana@email.com', telefono: '123-456-7892' },
  { id: 4, nombre: 'Pedro Sánchez', email: 'pedro@email.com', telefono: '123-456-7893' }
];

// Favoritos (almacenados en memoria)
let favoritos = [];

// Rutas
app.get('/', (req, res) => {
  res.render('index', { perfil, albumes, contactos });
});

// AJAX - Obtener fotos de un álbum
app.get('/api/album/:id', (req, res) => {
  const album = albumes.find(a => a.id === parseInt(req.params.id));
  if (album) {
    res.json(album.fotos);
  } else {
    res.status(404).json({ error: 'Álbum no encontrado' });
  }
});

// AJAX - Dar like a una foto
app.post('/api/like/:fotoId', (req, res) => {
  for (let album of albumes) {
    const foto = album.fotos.find(f => f.id === parseInt(req.params.fotoId));
    if (foto) {
      foto.likes += 1;
      return res.json({ success: true, likes: foto.likes });
    }
  }
  res.status(404).json({ error: 'Foto no encontrada' });
});

// AJAX - Obtener contactos
app.get('/api/contactos', (req, res) => {
  res.json(contactos);
});

// AJAX - Agregar a favoritos
app.post('/api/favoritos', (req, res) => {
  const { fotoId } = req.body;
  if (!favoritos.find(f => f === fotoId)) {
    favoritos.push(fotoId);
    res.json({ success: true, favorito: true });
  } else {
    res.json({ success: true, favorito: false, message: 'Ya está en favoritos' });
  }
});

// AJAX - Obtener favoritos
app.get('/api/favoritos', (req, res) => {
  res.json(favoritos);
});

// AJAX - Eliminar de favoritos
app.delete('/api/favoritos/:fotoId', (req, res) => {
  const index = favoritos.indexOf(parseInt(req.params.fotoId));
  if (index > -1) {
    favoritos.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'No encontrado en favoritos' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
