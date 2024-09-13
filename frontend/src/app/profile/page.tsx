'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { FollowingList, FollowersList } from '../fetch/fetchData';
import Link from 'next/link';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('following');
  const [following, setFollowing] = useState([]); 
  const [followers, setFollowers] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowData = async () => { 
      if (user) {
        try {
          const followingData = await FollowingList(user.id); 
          const followersData = await FollowersList(user.id); 
          
          setFollowing(followingData || []); 
          setFollowers(followersData || []); 
        } catch (err) {
          console.error("Error fetching follow data:", err);
          setError("Failed to load follow data. Please try again later.");
        }
      }
    }

    fetchFollowData();
  }, [user]);

  if (!user) {
    return <div>
        <h1 className='flex flex-col h-screen text-4xl items-center justify-center text-blue-500'>
          You need to log in to show the profile page
        </h1>
    </div>;
  }

  const getFullImageUrl = (url) => {
    if (url && !url.startsWith('http')) {
      return `http://localhost:8000${url}`;
    }
    return url;
  };

  return (
    <div className='flex flex-col items-center w-full h-screen bg-gray-100 p-6'>
      <div className='flex flex-row items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <div className='w-20 h-20 bg-black rounded-full overflow-hidden'>
          <img 
            src={getFullImageUrl(user.picture)} 
            alt="Profile Picture" 
            className='object-cover w-full h-full'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/img/img-default-perfil.png';
            }}
          />
        </div>
        <div className='ml-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>{user.name}</h1>
          <Link href='profile/settings'>
          <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Edit Profile
          </button>
          </Link>
        </div>
      </div>

      <div className='flex mt-10'>
        <button
          onClick={() => setActiveTab('following')}
          className={`px-4 py-2 ${activeTab === 'following' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-md`}
        >
          Following
        </button>
        <button
          onClick={() => setActiveTab('followers')}
          className={`px-4 py-2 ${activeTab === 'followers' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-md`}
        >
          Followers
        </button>
      </div>

      <div className='flex flex-col mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        {error && <p className="text-red-500">{error}</p>}
        {activeTab === 'following' && (
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Following</h2>
            {following.length > 0 ? (
              <div className='space-y-4'>
                {following.map((followedUser) => (
                  <div key={followedUser.id} className='flex items-center space-x-4'>
                    <img 
                      src={getFullImageUrl(followedUser.picture)} 
                      alt='Following picture' 
                      className='w-10 h-10 rounded-full'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/img/img-default-perfil.png';
                      }}
                    />
                    <h3 className='text-lg font-medium'>{followedUser.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-600'>You are not following anyone yet.</p>
            )}
          </div>
        )}

        {activeTab === 'followers' && (
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Followers</h2>
            {followers.length > 0 ? (
              <div className='space-y-4'>
                {followers.map((follower) => (
                  <div key={follower.id} className='flex items-center space-x-4'>
                    <img 
                      src={getFullImageUrl(follower.picture)} 
                      alt='Follower picture' 
                      className='w-10 h-10 rounded-full'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/img/img-default-perfil.png';
                      }}
                    />
                    <h3 className='text-lg font-medium'>{follower.name}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-600'>You don't have any followers yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}