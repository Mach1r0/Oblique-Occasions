import axios from 'axios';

export interface FollowUser {
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

export async function FollowingList(artistId: number): Promise<FollowUser[]> {
  try {
    const response = await fetch(`http://localhost:8000/api/user/following/${artistId}/`, {
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

export async function followArtist(artistId: number): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("No token found");
      return false;
    }

    const response = await fetch(`http://localhost:8000/api/user/follow/artist/${artistId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 403) {
      console.log("Authentication failed. Token may be invalid or expired.");
      return false;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Followed artist:", data);
    return true;
  } catch (error) {
    console.error("Error following artist:", error);
    if (error instanceof Error) {
      console.error(error.message);
    }
    return false;
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

    const success = await followArtist(artistId);
    if (success) {
      alert("You are now following this artist.");
      return true;
    } else {
      throw new Error("Failed to follow artist.");
    }
  } catch (error) {
    console.error("Error following artist:", error);
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An error occurred while trying to follow the artist.");
    }
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
      `http://localhost:8000/api/user/unfollow/artist/${artistId}/`,
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
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    alert(data.message);
    return true;
  } catch (error) {
    console.error("Error unfollowing artist:", error);
    if (error instanceof Error) {
      alert(error.message || "An error occurred while trying to unfollow the artist.");
    } else {
      alert("An unknown error occurred while trying to unfollow the artist.");
    }
    return false;
  }
}