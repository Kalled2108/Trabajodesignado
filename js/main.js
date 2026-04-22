// Variables globales y Estado Inicial
let albumActual = null;
let fotoActualId = null;

// Datos Iniciales (Fallback para modo estático)
const INITIAL_DATA = {
    perfil: {
        nombre: 'Kalled21',
        descripcion: 'Programador Junior apasionado por el desarrollo web, la arquitectura de software y la creación de experiencias digitales excepcionales.',
        foto: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
    },
    albumes: [
        { id: 1, nombre: 'Exploración Global', foto: '/images/viaje_1.png', fotos: [
            { id: 1, src: '/images/viaje_1.png', titulo: 'Atardecer en París', likes: 124 },
            { id: 2, src: '/images/viaje_2.png', titulo: 'Luces de Tokyo', likes: 89 },
            { id: 3, src: '/images/viaje_3.png', titulo: 'Paraíso en Bali', likes: 210 }
        ]},
        { id: 2, nombre: 'Esencia Natural', foto: '/images/naturaleza_1.png', fotos: [
            { id: 4, src: '/images/naturaleza_1.png', titulo: 'Bosque Místico', likes: 156 },
            { id: 5, src: '/images/naturaleza_2.png', titulo: 'Cumbres Nevadas', likes: 98 },
            { id: 6, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000', titulo: 'Valle de Flores', likes: 142 }
        ]},
        { id: 3, nombre: 'Legado Familiar', foto: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000', fotos: [
            { id: 7, src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000', titulo: 'Tarde de Picnic', likes: 345 },
            { id: 8, src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000', titulo: 'Atardecer en Familia', likes: 278 },
            { id: 9, src: 'https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&q=80&w=1000', titulo: 'Hogar Cálido', likes: 195 }
        ]}
    ],
    contactos: [
        { id: 1, nombre: 'Valentina Martínez', email: 'valentina@studio.com', telefono: '+34 612 345 678' },
        { id: 2, nombre: 'Julián Castro', email: 'julian@media.com', telefono: '+34 698 765 432' }
    ],
    favoritos: []
};

// Detección de Modo (Node.js vs GitHub Pages)
const isLive = () => window.location.hostname !== 'localhost' && !window.location.hostname.includes('github.io') && window.location.protocol !== 'file:';
// Para forzar modo estático en local (para pruebas de GH Pages):
const isStatic = () => window.location.hostname.includes('github.io') || window.location.protocol === 'file:' || !isLive();

// Manejo de Datos Híbrido
function getData() {
    if (!isStatic()) return null; // El servidor maneja los datos
    const stored = localStorage.getItem('kled_studio_db');
    if (stored) return JSON.parse(stored);
    localStorage.setItem('kled_studio_db', JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
}

function saveData(data) {
    if (isStatic()) {
        localStorage.setItem('kled_studio_db', JSON.stringify(data));
    }
}

// --- FUNCIONES CORE ---

function cargarFotosAlbum(albumId) {
    albumActual = albumId;
    if (isStatic()) {
        const db = getData();
        const album = db.albumes.find(a => a.id === albumId);
        renderGaleria(album.fotos, album.nombre);
    } else {
        fetch(`/api/album/${albumId}`)
            .then(r => r.json())
            .then(fotos => {
                const albumesNombres = { 1: 'Exploración Global', 2: 'Esencia Natural', 3: 'Legado Familiar' };
                renderGaleria(fotos, albumesNombres[albumId]);
            });
    }
}

function renderGaleria(fotos, nombreAlbum) {
    document.getElementById('albumesContainer').style.display = 'none';
    document.getElementById('galeriaAlbum').style.display = 'block';
    document.getElementById('tituloAlbum').textContent = nombreAlbum;
    
    let html = '';
    fotos.forEach(foto => {
        const liked = isPhotoLiked(foto.id);
        html += `
            <div class="card" onclick="verFoto('${foto.src}', '${foto.titulo}', ${foto.id}, ${foto.likes})">
                <img src="${foto.src}" class="card-img" alt="${foto.titulo}">
                <div class="card-body">
                    <h3 class="card-title">${foto.titulo}</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="card-meta">${liked ? '❤️' : '🤍'} ${foto.likes}</span>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn-action" onclick="event.stopPropagation(); agregarAFavoritosRapido(${foto.id})">⭐</button>
                            <button class="btn-action delete-btn" onclick="event.stopPropagation(); confirmarEliminarFoto(${albumActual}, ${foto.id})">🗑️</button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById('fotosContainer').innerHTML = html;
    window.scrollTo({ top: document.getElementById('galeriaAlbum').offsetTop - 100, behavior: 'smooth' });
}

function verFoto(src, titulo, fotoId, likes) {
    fotoActualId = fotoId;
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalImagen').src = src;
    document.getElementById('likeCount').textContent = likes;
    verificarFavorito(fotoId);
    
    const btnLike = document.getElementById('btnLike');
    if (isPhotoLiked(fotoId)) {
        btnLike.disabled = true; btnLike.style.opacity = '0.5';
    } else {
        btnLike.disabled = false; btnLike.style.opacity = '1';
    }
    
    document.getElementById('modalFoto').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function darLike() {
    if (isPhotoLiked(fotoActualId)) return;
    if (isStatic()) {
        const db = getData();
        db.albumes.forEach(a => {
            const f = a.fotos.find(foto => foto.id === fotoActualId);
            if (f) f.likes++;
        });
        saveData(db);
        markPhotoAsLiked(fotoActualId);
        actualizarUIModalLike(parseInt(document.getElementById('likeCount').textContent) + 1);
    } else {
        fetch(`/api/like/${fotoActualId}`, { method: 'POST' })
            .then(r => r.json())
            .then(data => {
                actualizarUIModalLike(data.likes);
                markPhotoAsLiked(fotoActualId);
            });
    }
}

function actualizarUIModalLike(count) {
    document.getElementById('likeCount').textContent = count;
    document.getElementById('btnLike').disabled = true;
    if (albumActual) cargarFotosAlbum(albumActual);
}

// Perfil
function actualizarPerfil(event) {
    event.preventDefault();
    const nombre = document.getElementById('editNombre').value;
    const descripcion = document.getElementById('editDescripcion').value;
    const file = document.getElementById('editFoto').files[0];

    if (isStatic()) {
        const db = getData();
        db.perfil.nombre = nombre;
        db.perfil.descripcion = descripcion;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                db.perfil.foto = e.target.result;
                saveData(db);
                actualizarDOMPerfil(db.perfil);
            };
            reader.readAsDataURL(file);
        } else {
            saveData(db);
            actualizarDOMPerfil(db.perfil);
        }
        cerrarModalEditar();
    } else {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        if (file) formData.append('foto', file);
        fetch('/api/perfil', { method: 'POST', body: formData })
            .then(r => r.json()).then(data => {
                actualizarDOMPerfil(data.perfil);
                cerrarModalEditar();
            });
    }
}

function actualizarDOMPerfil(p) {
    document.getElementById('perfilNombre').textContent = p.nombre;
    document.getElementById('perfilDescripcion').textContent = p.descripcion;
    document.querySelector('.profile-image').src = p.foto;
}

// Contactos
function cargarContactos() {
    const btn = document.getElementById('btnCargarContactos');
    const container = document.getElementById('contactosContainer');
    if (container.innerHTML !== '' && btn.textContent === 'Ocultar Contactos') {
        container.innerHTML = ''; btn.textContent = 'Cargar Red de Contactos'; return;
    }
    if (isStatic()) {
        renderContactos(getData().contactos);
        btn.textContent = 'Ocultar Contactos';
    } else {
        fetch('/api/contactos').then(r => r.json()).then(data => {
            renderContactos(data);
            btn.textContent = 'Ocultar Contactos';
        });
    }
}

function renderContactos(contactos) {
    let html = '';
    contactos.forEach(c => {
        html += `
            <div class="contact-card">
                <div style="display: flex; justify-content: space-between;">
                    <div><h3>${c.nombre}</h3><p>📧 ${c.email}</p><p>📱 ${c.telefono}</p></div>
                    <button class="btn-action delete-btn" onclick="confirmarEliminarContacto(${c.id})">🗑️</button>
                </div>
            </div>`;
    });
    document.getElementById('contactosContainer').innerHTML = html;
}

function subirContacto(event) {
    event.preventDefault();
    const c = { id: Date.now(), nombre: document.getElementById('contactoNombre').value, email: document.getElementById('contactoEmail').value, telefono: document.getElementById('contactoTelefono').value };
    if (isStatic()) {
        const db = getData(); db.contactos.push(c); saveData(db);
        cerrarModalAñadirContacto(); cargarContactos();
    } else {
        fetch('/api/contactos', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(c) })
            .then(() => { cerrarModalAñadirContacto(); cargarContactos(); });
    }
}

// Fotos y Álbumes
function subirFoto(event) {
    event.preventDefault();
    const titulo = document.getElementById('inputTitulo').value;
    const file = document.getElementById('inputFoto').files[0];
    if (isStatic()) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const db = getData();
            const alb = db.albumes.find(a => a.id === albumActual);
            alb.fotos.push({ id: Date.now(), src: e.target.result, titulo, likes: 0 });
            saveData(db); cerrarModalAñadir(); cargarFotosAlbum(albumActual);
        };
        reader.readAsDataURL(file);
    } else {
        const fd = new FormData(); fd.append('titulo', titulo); fd.append('foto', file);
        fetch(`/api/album/${albumActual}/foto`, { method: 'POST', body: fd })
            .then(() => { cerrarModalAñadir(); cargarFotosAlbum(albumActual); });
    }
}

function confirmarEliminarFoto(albId, fId) {
    if (!confirm('¿Eliminar esta foto?')) return;
    if (isStatic()) {
        const db = getData();
        const alb = db.albumes.find(a => a.id === albId);
        alb.fotos = alb.fotos.filter(f => f.id !== fId);
        saveData(db); cargarFotosAlbum(albId);
    } else {
        fetch(`/api/album/${albId}/foto/${fId}`, { method: 'DELETE' }).then(() => cargarFotosAlbum(albId));
    }
}

function confirmarEliminarAlbum(id) {
    if (!confirm('¿Eliminar este álbum?')) return;
    if (isStatic()) {
        const db = getData();
        db.albumes = db.albumes.filter(a => a.id !== id);
        saveData(db); location.reload();
    } else {
        fetch(`/api/album/${id}`, { method: 'DELETE' }).then(() => location.reload());
    }
}

function confirmarEliminarContacto(id) {
    if (!confirm('¿Eliminar este contacto?')) return;
    if (isStatic()) {
        const db = getData();
        db.contactos = db.contactos.filter(c => c.id !== id);
        saveData(db); cargarContactos();
    } else {
        fetch(`/api/contactos/${id}`, { method: 'DELETE' }).then(() => {
            document.getElementById('contactosContainer').innerHTML = '';
            cargarContactos();
        });
    }
}

// Favoritos
function agregarFavorito() {
    if (!fotoActualId) return;
    if (isStatic()) {
        const db = getData();
        if (!db.favoritos.includes(fotoActualId)) {
            db.favoritos.push(fotoActualId); saveData(db);
        }
        actualizarUIFavorito(true);
    } else {
        fetch('/api/favoritos', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({fotoId: fotoActualId}) })
            .then(r => r.json()).then(data => actualizarUIFavorito(data.favorito));
    }
}

function actualizarUIFavorito(isFav) {
    const btn = document.getElementById('btnFavorito');
    if (isFav) { btn.classList.add('active'); btn.textContent = '⭐ En Favoritos'; }
}

function cargarFavoritos() {
    const container = document.getElementById('favoritosContainer');
    if (container.innerHTML !== '') { container.innerHTML = ''; return; }
    if (isStatic()) {
        const db = getData();
        const todas = db.albumes.flatMap(a => a.fotos);
        const filtradas = todas.filter(f => db.favoritos.includes(f.id));
        renderFavoritos(filtradas);
    } else {
        fetch('/api/favoritos').then(r => r.json()).then(favIds => {
            Promise.all([1,2,3].map(id => fetch(`/api/album/${id}`).then(r => r.json())))
                .then(res => renderFavoritos(res.flat().filter(f => favIds.includes(f.id))));
        });
    }
}

function renderFavoritos(fotos) {
    let html = '';
    fotos.forEach(f => {
        html += `
            <div class="card" onclick="verFoto('${f.src}', '${f.titulo}', ${f.id}, ${f.likes})">
                <img src="${f.src}" class="card-img">
                <div class="card-body">
                    <h3>${f.titulo}</h3>
                    <button class="btn-action delete-btn" onclick="event.stopPropagation(); eliminarFavorito(${f.id})">🗑️ Eliminar</button>
                </div>
            </div>`;
    });
    document.getElementById('favoritosContainer').innerHTML = html || '<p>No hay favoritos.</p>';
}

function eliminarFavorito(id) {
    if (isStatic()) {
        const db = getData(); db.favoritos = db.favoritos.filter(f => f !== id); saveData(db);
        document.getElementById('favoritosContainer').innerHTML = ''; cargarFavoritos();
    } else {
        fetch(`/api/favoritos/${id}`, { method: 'DELETE' }).then(() => {
            document.getElementById('favoritosContainer').innerHTML = ''; cargarFavoritos();
        });
    }
}

function verificarFavorito(id) {
    const btn = document.getElementById('btnFavorito');
    if (isStatic()) {
        const db = getData();
        const isFav = db.favoritos.includes(id);
        btn.classList.toggle('active', isFav);
        btn.textContent = isFav ? '⭐ En Favoritos' : '⭐ Favorito';
    } else {
        fetch('/api/favoritos').then(r => r.json()).then(favs => {
            const isFav = favs.includes(id);
            btn.classList.toggle('active', isFav);
            btn.textContent = isFav ? '⭐ En Favoritos' : '⭐ Favorito';
        });
    }
}

function agregarAFavoritosRapido(id) {
    fotoActualId = id; agregarFavorito();
}

// Helpers para Likes
function isPhotoLiked(id) { return (JSON.parse(localStorage.getItem('user_likes') || '[]')).includes(id); }
function markPhotoAsLiked(id) {
    const likes = JSON.parse(localStorage.getItem('user_likes') || '[]');
    if (!likes.includes(id)) { likes.push(id); localStorage.setItem('user_likes', JSON.stringify(likes)); }
}

// Modales UI
function abrirModalEditarPerfil() {
    document.getElementById('editNombre').value = document.getElementById('perfilNombre').textContent;
    document.getElementById('editDescripcion').value = document.getElementById('perfilDescripcion').textContent;
    document.getElementById('modalEditarPerfil').style.display = 'flex';
}
function cerrarModalEditar() { document.getElementById('modalEditarPerfil').style.display = 'none'; }
function cerrarModal() { document.getElementById('modalFoto').style.display = 'none'; document.body.style.overflow = 'auto'; }
function abrirModalAñadirFoto() { document.getElementById('modalAñadirFoto').style.display = 'flex'; }
function cerrarModalAñadir() { document.getElementById('modalAñadirFoto').style.display = 'none'; }
function abrirModalAñadirContacto() { document.getElementById('modalAñadirContacto').style.display = 'flex'; }
function cerrarModalAñadirContacto() { document.getElementById('modalAñadirContacto').style.display = 'none'; }

window.onclick = (e) => {
    if (e.target.className === 'modal-overlay') {
        cerrarModal(); cerrarModalAñadir(); cerrarModalEditar(); cerrarModalAñadirContacto();
    }
};

// Carga Inicial (Para mostrar álbumes en modo estático si es necesario)
if (isStatic()) {
    // Si estamos en modo estático, el EJS no renderizó los álbumes dinámicamente al inicio
    // pero el index.html generado ya tiene el estado actual. 
    // Sin embargo, para mayor robustez, podríamos re-renderizar si localStorage tiene cambios.
}
