'use client';
import React from 'react';
import { useAuth } from '../Context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center w-full h-screen bg-gray-100 p-6'>
      <div className='flex flex-row items-center bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <div className='w-20 h-20 bg-black rounded-full overflow-hidden'>
          <img src={user.picture} alt="Profile Picture" className='object-cover w-full h-full' />
        </div>
        <div className='ml-4'>
          <h1 className='text-2xl font-semibold text-gray-800'>{user.name}</h1>
          <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            Edit Profile
          </button>
        </div>
      </div>

      <div className='flex flex-col mt-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Following</h2>
        {user.following && user.following.length > 0 ? (
          <div className='space-y-4'>
            {user.following.map((following: any) => (
              <div key={following.id} className='flex items-center space-x-4'>
                <img src={following.picture} alt='Following picture' className='w-10 h-10 rounded-full' />
                <h3 className='text-lg font-medium'>{following.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-600'>You are not following anyone yet.</p>
        )}
      </div>
    </div>
  );
}
