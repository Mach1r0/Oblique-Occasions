"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

export default function Profile() {
  const { update } = useAuth();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [picture, setPicture] = useState(user?.picture || "");
  const [uploadedFileName, setUploadedFileName] = useState("");

  if (!user) {
    return (
      <div>
        <h1 className="flex flex-col h-screen text-4xl items-center justify-center text-blue-500">
          You need to log in to show the settings page
        </h1>
      </div>
    );
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
      setUploadedFileName(file.name);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      name,
    email,
      username,
    };
  
    if (picture) {
      updatedData.picture = picture;
    }
  
    await update(updatedData);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="flex flex-row items-center bg-white shadow-lg rounded-lg p-6 w-full mb-6">
          <div className="w-20 h-20 bg-black rounded-full overflow-hidden">
            <img
              src={typeof picture === "string" ? picture : URL.createObjectURL(picture)}
              alt="Profile Picture"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>
          </div>
        </div>

        <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
          <form className="flex flex-col gap-3 w-full">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                className="w-full border-2 bg-white border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full border-2 bg-white border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full border-2 bg-white border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="picture" className="block mb-1">Picture</label>
              <label
                htmlFor="picture"
                className="block w-full bg-black text-white px-4 py-2 rounded-md cursor-pointer text-center"
              >
                Change Picture
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                className="hidden"
                onChange={handlePictureChange}
              />
              {uploadedFileName && (
                <p className="mt-2 text-sm text-gray-600">
                  Uploaded file: {uploadedFileName}
                </p>
              )}
            </div>
          </form>
          <div className="flex">
            <p>Do you want to change the password?</p>
          </div>
          <button
            className="bg-blue-500 text-white rounded-md p-2 mt-6 w-full"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}