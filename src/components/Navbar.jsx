"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const menuItems = (
    <>
      <li>
        <Link
          href="/"
          className="hover:text-purple-600 transition duration-200"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/blogs"
          className="hover:text-purple-600 transition duration-200"
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="hover:text-purple-600 transition duration-200"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="hover:text-purple-600 transition duration-200"
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-3">
        {/* Left: Logo & Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h12M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link
            href="/"
            className="text-2xl font-bold text-purple-700 tracking-wide ml-2"
          >
            <span className="hover:text-purple-500 transition">Blog</span>
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 text-base font-medium">
            {menuItems}
          </ul>
        </div>

        {/* Right: Auth Buttons & User Dropdown */}
        <div className="navbar-end space-x-2 relative">
          {status === "authenticated" ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-purple-600 text-2xl focus:outline-none"
                >
                  <FaUserCircle />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50 text-sm">
                    <li className="hover:bg-purple-50">
                      <Link href="/addBlog" className="block px-4 py-2">
                        Add Blog
                      </Link>
                    </li>
                    <li className="hover:bg-purple-50">
                      <Link href="/myBlog" className="block px-4 py-2">
                        My Blogs
                      </Link>
                    </li>
                    <li className="hover:bg-purple-50">
                      <Link href="/profile" className="block px-4 py-2">
                        Profile
                      </Link>
                    </li>
                    <li className="hover:bg-purple-50">
                      <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2"
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="btn btn-primary btn-sm rounded-full shadow-md hover:scale-105 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
