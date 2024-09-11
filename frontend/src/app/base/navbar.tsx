'use client';
import React from "react";
import { useAuth } from '../Context/AuthContext';
import Link from "next/link";

export default function Navbar() {
  const { user, logout, token } = useAuth();

  return (
    <div className="navbar bg-background-color">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-white" href="/"> 
          OBLIQUE OCCASIONS 
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          {token ? (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user?.picture ? (
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.picture}
                  />
                </div>
              ) : (
                <div className="w-10 rounded-full">
                  <img
                    alt="Default avatar"
                    src="img/img-default-perfil.png"
                  />
                </div>
              )}
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
                <Link href="/settings" className="justify-between">Settings</Link>
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
