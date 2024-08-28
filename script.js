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
  const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(searchUrl, options);
      const result = await response.json();
      
      if (result.data.length > 0) {
          const track = result.data[0];  // Obtén la primera canción encontrada
          const audioUrl = track.preview;
          const trackTitle = track.title;

          // Actualiza el reproductor y el título
          document.getElementById('audioPlayer').src = audioUrl;
          document.getElementById('trackTitle').textContent = trackTitle;
      } else {
          alert("No se encontraron canciones.");
      }
  } catch (error) {
      console.error(error);
  }
}