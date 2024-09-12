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

export const checkFollowStatus = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`http://localhost:8000/api/user/check-follow-status/${userId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export async function fetchArtist(artistSlug) {
  try {
    const response = await fetch(`http://localhost:8000/api/artists/${artistSlug}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched artist data:", data);
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
    console.log("Fetched album data:", JSON.stringify(data, null, 2));  
    return data;
  } catch (error) {
    console.error("Error fetching album:", error);
    throw error;
  }
}

export async function FollwersList(userid){
  try{
    const response = await fetch(`http://localhost:8000/api/user/followers/${user.id}/`,{
      method: 'GET',
      headers: {
        'Content-type': 'application',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }) 
    if (!response.ok){
      throw error; 
      console.log("Error on fetch followers", error)
    }
    const data = await response.json()
    console.log("Fetching followers", data)
    return data; 
  } catch(error){
    console.log("Error on fetch", error)
  }
}

export async function FollowingList(userid){
  try{
    const response = await fetch(`http://localhost:8000/api/user/followers/${user.id}/`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application',
        'Authorization': `Bearer ${localStorage.getItem('token')}}`
      }

    });
    if (!response.ok) {
      throw error; 
      console.log("Error fetching Follow", error)
    }
    const data = await response.json()
    console.log("Fetching follow", data);
  }catch (error){
    console.log("error on fetch:", error)
  }
}

export async function fetchArtists() {
  try {
    const response = await fetch(`http://localhost:8000/api/artists/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched artists data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
}

export async function followArtist(artistId) {
  try {
    const response = await fetch(`http://localhost:8000/api/user/follow/artist/${artistId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`  
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Followed artist:", data);
    return data;
  } catch (error) {
    console.error("Error following artist:", error);
    throw error;
  }
}
