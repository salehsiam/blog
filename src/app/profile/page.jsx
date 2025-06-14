"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.name || "",
        email: session.user.email || "",
        bio: "This is your default bio.",
        image: session.user.image || "",
      });
      setPreview(session.user.image || "");
    }
  }, [session]);

  if (status === "loading")
    return <p className="text-center mt-10">Loading...</p>;
  if (!session)
    return (
      <p className="text-center mt-10">Please sign in to view your profile.</p>
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = { ...profile };
    if (imageFile) updatedProfile.image = preview;

    // TODO: send to backend
    setProfile(updatedProfile);
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Profile
        </h1>

        {!isEditing ? (
          <div className="flex flex-col items-center gap-4 text-gray-700">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="Profile"
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
            <div className="text-center space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {profile.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-semibold">Bio:</span> {profile.bio}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="flex flex-col items-center">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-green-400 mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full bg-gray-100 border rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="3"
              />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full shadow hover:from-green-600 hover:to-emerald-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full shadow hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
