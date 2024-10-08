'use client';
import React from "react";
import { useAuth } from '../Context/AuthContext';
import Link from "next/link";

export default function Navbar() {
  const { user, logout, token } = useAuth();

  const getFullImageUrl = (url: string) => {
    if (url && !url.startsWith('http')) {
      return `http://localhost:8000${url}`;
    }
    return url;
  };

  return (
    <div className="navbar bg-background-color">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-white" href="/"> 
          OBLIQUE OCCASIONS 
        </Link>
      </div>
      <div className="flex-none gap-2">

        <div className="dropdown dropdown-end">
          {token ? (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={typeof user?.picture === 'string' ? getFullImageUrl(user.picture) : "/img/img-default-perfil.png"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/img/img-default-perfil.png";
                  }}
                />
              </div>
            </div>
          ) : (
            <Link href="/login" className="btn btn-ghost text-white">
              Login
            </Link>
          )}
          {token && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile" className="justify-between">Profile</Link>
              </li>
              <li>
                <Link href="/profile/settings" className="justify-between">Settings</Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}