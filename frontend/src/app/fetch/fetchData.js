export async function fetchAlbums() {
  try {
    const response = await fetch("http://localhost:8000/api/albums/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched albums data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
}

export async function fetchArtist(artistSlug = '') {
  try {
    let url = 'http://localhost:8000/api/artists/';
    if (artistSlug) {
      url += `${artistSlug}/`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched artist data:", data);
    // Return the data as is, without assuming any structure
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
}

export async function fetchArtistAlbums(artistSlug) {
  try {
    const response = await fetch(`http://localhost:8000/api/artists/${artistSlug}/albums/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched artist albums data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    throw error;
  }
}

export async function fetchAlbum(albumName) {
  try {
    const encodedName = encodeURIComponent(albumName.replace(/ /g, '-'));
    const response = await fetch(`http://localhost:8000/api/albums/name/${encodedName}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched album data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching album:", error);
    throw error;
  }
}
