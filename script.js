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
            // Crear un contenedor para cada canción
            const trackDiv = document.createElement('div');
            trackDiv.className = 'track-item';
    
            // Crear el elemento para el título y el enlace
            const title = document.createElement('h2');
            const link = document.createElement('a');
            link.href = `trackInfo.html?id=${item.id}`;
            link.textContent = item.title;
            title.appendChild(link);
            trackDiv.appendChild(title);
    
            // Crear el elemento para la imagen del álbum
            const albumImg = document.createElement('img');
            albumImg.src = item.album.cover_big;
            albumImg.alt = `Portada del álbum ${item.album.title}`;
            albumImg.style.maxWidth = '200px'; // Opcional: ajustar tamaño
            trackDiv.appendChild(albumImg);
    
            // Crear el reproductor de audio
            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = item.preview;
            trackDiv.appendChild(audioPlayer);
    
            // Agregar el contenedor al contenedor principal
            tracksList.appendChild(trackDiv);
        });
      }
         
  } catch (error) {
      console.error(error);
  }
}
