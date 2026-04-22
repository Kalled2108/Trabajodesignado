// Variables globales
let albumActual = null;
let fotoActualId = null;

// Cargar fotos de un álbum
function cargarFotosAlbum(albumId) {
    albumActual = albumId;
    const albumesNombres = {
        1: 'Exploración Global',
        2: 'Esencia Natural',
        3: 'Legado Familiar'
    };

    fetch(`/api/album/${albumId}`)
        .then(response => response.json())
        .then(fotos => {
            document.getElementById('albumesContainer').style.display = 'none';
            document.getElementById('galeriaAlbum').style.display = 'block';
            document.getElementById('tituloAlbum').textContent = albumesNombres[albumId];
            
            let fotosHTML = '';
            fotos.forEach(foto => {
                const liked = isPhotoLiked(foto.id);
                fotosHTML += `
                    <div class="card" onclick="verFoto('${foto.src}', '${foto.titulo}', ${foto.id}, ${foto.likes})">
                        <img src="${foto.src}" class="card-img" alt="${foto.titulo}">
                        <div class="card-body">
                            <h3 class="card-title">${foto.titulo}</h3>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="card-meta">${liked ? '❤️' : '🤍'} ${foto.likes}</span>
                                <div style="display: flex; gap: 0.5rem;">
                                    <button class="btn-action" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" 
                                            onclick="event.stopPropagation(); agregarAFavoritosRapido(${foto.id})">⭐</button>
                                    <button class="btn-action" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.2);" 
                                            onclick="event.stopPropagation(); confirmarEliminarFoto(${albumId}, ${foto.id})">🗑️</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.getElementById('fotosContainer').innerHTML = fotosHTML;
            window.scrollTo({ top: document.getElementById('galeriaAlbum').offsetTop - 100, behavior: 'smooth' });
        })
        .catch(error => console.error('Error:', error));
}

// Cerrar galería
function cerrarGaleria() {
    document.getElementById('galeriaAlbum').style.display = 'none';
    document.getElementById('albumesContainer').style.display = 'grid';
    albumActual = null;
    window.scrollTo({ top: document.getElementById('albumes').offsetTop - 100, behavior: 'smooth' });
}

// Modal Logic
function verFoto(src, titulo, fotoId, likes) {
    fotoActualId = fotoId;
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalImagen').src = src;
    document.getElementById('likeCount').textContent = likes;
    
    verificarFavorito(fotoId);
    
    // Verificar si ya le dio like
    const btnLike = document.getElementById('btnLike');
    if (isPhotoLiked(fotoId)) {
        btnLike.classList.add('active');
        btnLike.style.opacity = '0.7';
        btnLike.disabled = true;
    } else {
        btnLike.classList.remove('active');
        btnLike.style.opacity = '1';
        btnLike.disabled = false;
    }
    
    document.getElementById('modalFoto').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modalFoto').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Lógica para añadir fotos
function abrirModalAñadirFoto() {
    document.getElementById('modalAñadirFoto').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModalAñadir() {
    document.getElementById('modalAñadirFoto').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('formAñadirFoto').reset();
}

function subirFoto(event) {
    event.preventDefault();
    if (!albumActual) return;

    const formData = new FormData();
    formData.append('titulo', document.getElementById('inputTitulo').value);
    formData.append('foto', document.getElementById('inputFoto').files[0]);

    fetch(`/api/album/${albumActual}/foto`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cerrarModalAñadir();
            cargarFotosAlbum(albumActual);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Lógica para editar perfil
function abrirModalEditarPerfil() {
    document.getElementById('editNombre').value = document.getElementById('perfilNombre').textContent;
    document.getElementById('editDescripcion').value = document.getElementById('perfilDescripcion').textContent;
    // El input file no se puede poblar por seguridad
    
    document.getElementById('modalEditarPerfil').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModalEditar() {
    document.getElementById('modalEditarPerfil').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function actualizarPerfil(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('nombre', document.getElementById('editNombre').value);
    formData.append('descripcion', document.getElementById('editDescripcion').value);
    const fotoFile = document.getElementById('editFoto').files[0];
    if (fotoFile) {
        formData.append('foto', fotoFile);
    }

    fetch('/api/perfil', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('perfilNombre').textContent = data.perfil.nombre;
            document.getElementById('perfilDescripcion').textContent = data.perfil.descripcion;
            document.querySelector('.profile-image').src = data.perfil.foto;
            cerrarModalEditar();
        }
    })
    .catch(error => console.error('Error:', error));
}

// Cerrar modales al hacer click fuera
window.onclick = function(event) {
    if (event.target.id === 'modalFoto') cerrarModal();
    if (event.target.id === 'modalAñadirFoto') cerrarModalAñadir();
    if (event.target.id === 'modalEditarPerfil') cerrarModalEditar();
    if (event.target.id === 'modalAñadirContacto') cerrarModalAñadirContacto();
}

// Dar like a una foto
function darLike() {
    if (isPhotoLiked(fotoActualId)) return;

    fetch(`/api/like/${fotoActualId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('likeCount').textContent = data.likes;
            markPhotoAsLiked(fotoActualId);
            
            const btnLike = document.getElementById('btnLike');
            btnLike.classList.add('active');
            btnLike.disabled = true;

            if (albumActual) {
                cargarFotosAlbum(albumActual); // Recargar para ver el corazón lleno
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

// Helpers para Likes (Simulando una cuenta con localStorage)
function isPhotoLiked(id) {
    const likes = JSON.parse(localStorage.getItem('user_likes') || '[]');
    return likes.includes(id);
}

function markPhotoAsLiked(id) {
    const likes = JSON.parse(localStorage.getItem('user_likes') || '[]');
    if (!likes.includes(id)) {
        likes.push(id);
        localStorage.setItem('user_likes', JSON.stringify(likes));
    }
}

function actualizarLikesEnGaleria(id, likes) {
    // Buscar el elemento en la galería y actualizar
    // Esto es más profesional que recargar todo el álbum
}

// Contactos AJAX
function cargarContactos() {
    const btn = document.getElementById('btnCargarContactos');
    const container = document.getElementById('contactosContainer');
    
    if (container.innerHTML !== '' && btn.textContent === 'Ocultar Contactos') {
        container.innerHTML = '';
        btn.textContent = 'Cargar Red de Contactos';
        return;
    }

    btn.textContent = 'Sincronizando...';
    btn.disabled = true;

    fetch('/api/contactos')
        .then(response => response.json())
        .then(contactos => {
            let html = '';
            contactos.forEach(c => {
                html += `
                    <div class="contact-card">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div>
                                <h3>${c.nombre}</h3>
                                <p class="contact-info">📧 ${c.email}</p>
                                <p class="contact-info">📱 ${c.telefono}</p>
                            </div>
                            <button class="btn-action" style="padding: 0.5rem; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.2);" 
                                    onclick="confirmarEliminarContacto(${c.id})">🗑️</button>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
            btn.textContent = 'Ocultar Contactos';
            btn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            btn.textContent = 'Reintentar Carga';
            btn.disabled = false;
        });
}

// Lógica para añadir contactos
function abrirModalAñadirContacto() {
    document.getElementById('modalAñadirContacto').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModalAñadirContacto() {
    document.getElementById('modalAñadirContacto').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('formAñadirContacto').reset();
}

function subirContacto(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('contactoNombre').value;
    const email = document.getElementById('contactoEmail').value;
    const telefono = document.getElementById('contactoTelefono').value;

    fetch('/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, telefono })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            cerrarModalAñadirContacto();
            cargarContactos(); // Recargar la lista
        }
    })
    .catch(error => console.error('Error:', error));
}

// Favoritos
function agregarFavorito() {
    if (!fotoActualId) return;

    fetch('/api/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fotoId: fotoActualId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const btn = document.getElementById('btnFavorito');
            if (data.favorito) {
                btn.classList.add('active');
                btn.textContent = '⭐ En Favoritos';
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

function agregarAFavoritosRapido(fotoId) {
    fetch('/api/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fotoId: fotoId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.favorito) {
            // Animación visual o feedback sutil
            console.log('Agregado a favoritos');
        }
    })
    .catch(error => console.error('Error:', error));
}

function verificarFavorito(fotoId) {
    fetch('/api/favoritos')
        .then(response => response.json())
        .then(favoritos => {
            const btn = document.getElementById('btnFavorito');
            if (favoritos.includes(fotoId)) {
                btn.classList.add('active');
                btn.textContent = '⭐ En Favoritos';
            } else {
                btn.classList.remove('active');
                btn.textContent = '⭐ Favorito';
            }
        });
}

function cargarFavoritos() {
    const container = document.getElementById('favoritosContainer');
    
    if (container.innerHTML !== '') {
        container.innerHTML = '';
        return;
    }

    fetch('/api/favoritos')
        .then(response => response.json())
        .then(favoritos => {
            if (favoritos.length === 0) {
                container.innerHTML = '<p class="card-meta">No has seleccionado favoritos todavía.</p>';
                return;
            }

            // Obtener todas las fotos de los 3 álbumes
            Promise.all([
                fetch('/api/album/1').then(r => r.json()),
                fetch('/api/album/2').then(r => r.json()),
                fetch('/api/album/3').then(r => r.json())
            ])
            .then(resultados => {
                const todas = resultados.flat();
                const filtradas = todas.filter(f => favoritos.includes(f.id));

                let html = '';
                filtradas.forEach(foto => {
                    html += `
                        <div class="card" onclick="verFoto('${foto.src}', '${foto.titulo}', ${foto.id}, ${foto.likes})">
                            <img src="${foto.src}" class="card-img" alt="${foto.titulo}">
                            <div class="card-body">
                                <h3 class="card-title">${foto.titulo}</h3>
                                <button class="btn-action" style="background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.2);" 
                                        onclick="event.stopPropagation(); eliminarFavorito(${foto.id})">🗑️ Eliminar</button>
                            </div>
                        </div>
                    `;
                });
                container.innerHTML = html;
            });
        });
}

function eliminarFavorito(fotoId) {
    fetch(`/api/favoritos/${fotoId}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('favoritosContainer').innerHTML = '';
            cargarFavoritos();
        }
    });
}

// Lógica de Eliminación (Albums, Fotos, Contactos)
function confirmarEliminarAlbum(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este álbum y todas sus fotos?')) {
        fetch(`/api/album/${id}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(data => {
            if (data.success) location.reload(); // Recargar para actualizar la lista de álbumes
        });
    }
}

function confirmarEliminarFoto(albumId, fotoId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta fotografía?')) {
        fetch(`/api/album/${albumId}/foto/${fotoId}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(data => {
            if (data.success) cargarFotosAlbum(albumId);
        });
    }
}

function confirmarEliminarContacto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
        fetch(`/api/contactos/${id}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                document.getElementById('contactosContainer').innerHTML = '';
                cargarContactos();
            }
        });
    }
}
