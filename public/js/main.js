// Variables globales
let albumActual = null;
let fotoActualId = null;
let favoritosActuales = [];

// Cargar fotos de un álbum
function cargarFotosAlbum(albumId) {
    albumActual = albumId;
    const nombresAlbumes = {
        1: 'Viajes',
        2: 'Naturaleza',
        3: 'Familia'
    };

    fetch(`/api/album/${albumId}`)
        .then(response => response.json())
        .then(fotos => {
            document.getElementById('galeriaAlbum').style.display = 'block';
            document.getElementById('tituloAlbum').textContent = nombresAlbumes[albumId];
            
            let fotosHTML = '';
            fotos.forEach(foto => {
                fotosHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card foto-card">
                            <img src="${foto.src}" class="card-img-top cursor-pointer" 
                                 onclick="verFoto('${foto.src}', '${foto.titulo}', ${foto.id}, ${foto.likes})">
                            <div class="card-body">
                                <h5 class="card-title">${foto.titulo}</h5>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted">👍 ${foto.likes}</span>
                                    <button class="btn btn-sm btn-warning" onclick="agregarAFavoritosRapido(${foto.id})">⭐</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.getElementById('fotosContainer').innerHTML = fotosHTML;
            window.scrollTo({ top: document.getElementById('galeriaAlbum').offsetTop, behavior: 'smooth' });
        })
        .catch(error => console.error('Error:', error));
}

// Cerrar galería
function cerrarGaleria() {
    document.getElementById('galeriaAlbum').style.display = 'none';
    albumActual = null;
}

// Ver foto en modal
function verFoto(src, titulo, fotoId, likes) {
    fotoActualId = fotoId;
    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalImagen').src = src;
    document.getElementById('likeCount').textContent = likes;
    
    // Verificar si está en favoritos
    verificarFavorito(fotoId);
    
    const modal = new bootstrap.Modal(document.getElementById('modalFoto'));
    modal.show();
}

// Dar like a una foto
function darLike() {
    fetch(`/api/like/${fotoActualId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('likeCount').textContent = data.likes;
            // Actualizar el contador en la galería también
            if (albumActual) {
                cargarFotosAlbum(albumActual);
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

// Cargar contactos con AJAX
function cargarContactos() {
    const btnCargarContactos = document.getElementById('btnCargarContactos');
    const contactosContainer = document.getElementById('contactosContainer');
    
    // Si ya están cargados, solo mostrar/ocultar
    if (contactosContainer.innerHTML && contactosContainer.innerHTML.trim() !== '') {
        contactosContainer.innerHTML = '';
        btnCargarContactos.textContent = 'Cargar Contactos';
        return;
    }

    btnCargarContactos.textContent = 'Cargando...';
    btnCargarContactos.disabled = true;

    fetch('/api/contactos')
        .then(response => response.json())
        .then(contactos => {
            let contactosHTML = '';
            contactos.forEach(contacto => {
                contactosHTML += `
                    <div class="col-md-6 mb-3">
                        <div class="card contacto-card">
                            <div class="card-body">
                                <h5 class="card-title">${contacto.nombre}</h5>
                                <p class="card-text">
                                    📧 <a href="mailto:${contacto.email}">${contacto.email}</a><br>
                                    📱 ${contacto.telefono}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });

            contactosContainer.innerHTML = contactosHTML;
            btnCargarContactos.textContent = 'Ocultar Contactos';
            btnCargarContactos.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            btnCargarContactos.textContent = 'Cargar Contactos';
            btnCargarContactos.disabled = false;
        });
}

// Agregar a favoritos
function agregarFavorito() {
    if (!fotoActualId) return;

    fetch('/api/favoritos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fotoId: fotoActualId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (data.favorito) {
                alert('✅ Agregado a favoritos');
                document.getElementById('btnFavorito').textContent = '⭐ Agregado a Favoritos';
                document.getElementById('btnFavorito').disabled = true;
            } else {
                alert(data.message);
            }
        }
    })
    .catch(error => console.error('Error:', error));
}

// Agregar a favoritos desde la galería rápidamente
function agregarAFavoritosRapido(fotoId) {
    fotoActualId = fotoId;
    fetch('/api/favoritos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fotoId: fotoId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.favorito) {
            alert('✅ Agregado a favoritos');
        }
    })
    .catch(error => console.error('Error:', error));
}

// Verificar si una foto está en favoritos
function verificarFavorito(fotoId) {
    fetch('/api/favoritos')
        .then(response => response.json())
        .then(favoritos => {
            const btnFavorito = document.getElementById('btnFavorito');
            if (favoritos.includes(fotoId)) {
                btnFavorito.textContent = '⭐ Agregado a Favoritos';
                btnFavorito.disabled = true;
            } else {
                btnFavorito.textContent = '⭐ Agregar a Favoritos';
                btnFavorito.disabled = false;
            }
        })
        .catch(error => console.error('Error:', error));
}

// Cargar y mostrar favoritos
function cargarFavoritos() {
    const favoritosContainer = document.getElementById('favoritosContainer');
    
    // Si ya están cargados, limpiar
    if (favoritosContainer.innerHTML && favoritosContainer.innerHTML.trim() !== '') {
        favoritosContainer.innerHTML = '';
        return;
    }

    fetch('/api/favoritos')
        .then(response => response.json())
        .then(favoritos => {
            if (favoritos.length === 0) {
                favoritosContainer.innerHTML = '<div class="col-12"><p class="text-muted">No hay fotos en favoritos</p></div>';
                return;
            }

            // Obtener todas las fotos y filtrar por ID
            Promise.all([
                fetch('/api/album/1').then(r => r.json()),
                fetch('/api/album/2').then(r => r.json()),
                fetch('/api/album/3').then(r => r.json())
            ])
            .then(([fotos1, fotos2, fotos3]) => {
                const todasLasFotos = [...fotos1, ...fotos2, ...fotos3];
                const fotosFavoritas = todasLasFotos.filter(foto => favoritos.includes(foto.id));

                let favoritosHTML = '';
                fotosFavoritas.forEach(foto => {
                    favoritosHTML += `
                        <div class="col-md-4 mb-4">
                            <div class="card foto-card">
                                <img src="${foto.src}" class="card-img-top cursor-pointer" 
                                     onclick="verFoto('${foto.src}', '${foto.titulo}', ${foto.id}, ${foto.likes})">
                                <div class="card-body">
                                    <h5 class="card-title">${foto.titulo}</h5>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted">👍 ${foto.likes}</span>
                                        <button class="btn btn-sm btn-danger" onclick="eliminarFavorito(${foto.id})">🗑️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });

                favoritosContainer.innerHTML = favoritosHTML;
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

// Eliminar de favoritos
function eliminarFavorito(fotoId) {
    fetch(`/api/favoritos/${fotoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('❌ Eliminado de favoritos');
            cargarFavoritos(); // Recargar la lista
        }
    })
    .catch(error => console.error('Error:', error));
}
