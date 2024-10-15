const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'e57ce94e61msh5109f2f5370ed6ep11a3a9jsn8d965bbee3c7',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
  }
};

// Función para buscar la canción
async function searchTrack() {
  const query = document.getElementById('searchInput').value;
  const limitNumber = parseInt(document.getElementById('limitInput').value) || 20;
  const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}&limit=${limitNumber}`;

  try {
    const response = await fetch(searchUrl, options);
    const result = await response.json();
    const tracksList = document.getElementById('tracksList');
    tracksList.innerHTML = '';

    if (result.data.length === 0) {
      alert("No se encontraron canciones.");
      tracksList.innerHTML = '<p>No se encontraron canciones.</p>';
    } else {
      result.data.forEach(item => {
        const trackDiv = document.createElement('div');
        trackDiv.className = 'track-item';
        
        const title = document.createElement('h2');
        const link = document.createElement('a');
        link.href = `../TrackInfo/trackInfo.html?id=${item.id}`;
        link.textContent = item.title;
        title.appendChild(link);
        trackDiv.appendChild(title);
        
        const albumImg = document.createElement('img');
        albumImg.src = item.album.cover_big;
        albumImg.alt = `Portada del álbum ${item.album.title}`;
        albumImg.style.maxWidth = '200px';
        trackDiv.appendChild(albumImg);
        
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = item.preview;
        trackDiv.appendChild(audioPlayer);
        
        tracksList.appendChild(trackDiv);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// Agregar evento para la tecla Enter
document.getElementById('searchInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evitar que se envíe un formulario si está dentro de uno
    searchTrack();
  }
});

// Función para obtener información del track
async function fetchTrackInfo(id) {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${id}`;
  try {
    const response = await fetch(url, options);
    const track = await response.json();
    
    document.getElementById('trackTitle').textContent = track.title;
    const trackDetails = document.getElementById('trackDetails');
    trackDetails.innerHTML = `
      <p><strong>Artista:</strong> <a href="${track.artist.link}" target="_blank">${track.artist.name}</a></p>
      <p><strong>Álbum:</strong> <a href="${track.album.link}" target="_blank">${track.album.title}</a></p>
      <p><strong>Duración:</strong> ${Math.floor(track.duration / 60)}:${track.duration % 60}</p>
      <p><strong>Fecha de Lanzamiento:</strong> ${track.release_date}</p>
      <p><strong>Enlace a la Canción:</strong> <a href="${track.link}" target="_blank">Escuchar</a></p>
      <audio controls src="${track.preview}">Vista previa</audio>
      <img src="${track.album.cover_big}" alt="Portada del Álbum">
    `;
  } catch (error) {
    console.error(error);
    document.getElementById('trackDetails').innerHTML = '<p>No se pudo obtener la información del track.</p>';
  }
}

// Lógica para cargar información de track al inicio
const urlParams = new URLSearchParams(window.location.search);
const trackId = urlParams.get('id');
if (trackId) {
  fetchTrackInfo(trackId);
}
