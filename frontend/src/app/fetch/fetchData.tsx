import axios from 'axios';

interface FollowUser {
  id: number;
  picture: string;
  name: string;
}

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

export const checkFollowStatus = async (userId: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log("No token found");
    return { is_following: false };
  }

  try {
    const response = await fetch(`http://localhost:8000/api/user/check-follow-status/${userId}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 403) {
      console.log("Authentication failed. Token may be invalid or expired.");
      return { is_following: false };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return { is_following: false };
  }
};

export async function fetchArtist(artistSlug: string) {
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

export async function fetchArtistAlbums(artistSlug: string) {
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

export async function fetchAlbum(albumName: string) {
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

export async function FollowersList(userId: number): Promise<FollowUser[]> {
  try {
    const response = await fetch(`http://localhost:8000/api/user/followers/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetching followers", data);
    return data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
}

export async function FollowingList(userId: number): Promise<FollowUser[]> {
  try {
    const response = await fetch(`http://localhost:8000/api/user/following/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetching following", data);
    return data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
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

export async function followArtist(artistId: number) {
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

export const handleFollow = async (artistId: number) => {
  console.log("Follow button clicked");
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to follow an artist.");
      return false;
    }

    const response = await fetch(
      `http://localhost:8000/api/user/follow/${artistId}/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 403) {
      alert("Authentication failed. Please log in again.");
      return false;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    return true;
  } catch (error) {
    console.error("Error following artist:", error);
    alert("An error occurred while trying to follow the artist.");
    return false;
  }
};

export const handleUnfollow = async (artistId: number) => {
  console.log("Unfollow button clicked");
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to unfollow an artist.");
      return false;
    }

    const response = await fetch(
      `http://localhost:8000/api/user/unfollow/${artistId}/`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 403) {
      alert("Authentication failed. Please log in again.");
      return false;
    }

    if (response.status === 400) {
      const data = await response.json();
      console.log("Unfollow error:", data.message);
      alert(data.message);
      return false;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    return true;
  } catch (error) {
    console.error("Error unfollowing artist:", error);
    alert("An error occurred while trying to unfollow the artist.");
    return false;
  }
};